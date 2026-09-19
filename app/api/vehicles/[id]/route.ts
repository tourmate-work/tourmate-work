import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser, forbiddenResponse } from "@/lib/auth";

function isInvalidOrMockImage(url?: string | null): boolean {
  if (!url || typeof url !== "string") return true;
  const s = url.trim();
  if (!s || s.startsWith("blob:")) return true;
  if (s.includes("/images/mock/")) return true;
  if (
    s.includes("car-side.jpg") ||
    s.includes("car-fleet.jpg") ||
    s.includes("hero-sri-lanka.jpg")
  ) {
    return true;
  }
  return false;
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatarUrl: true,
          },
        },
        reviews: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    let parsedGallery: string[] = [];
    let parsedFeatures: string[] = [];
    try {
      parsedGallery = JSON.parse(vehicle.galleryImages || "[]");
    } catch {
      parsedGallery = [];
    }
    try {
      parsedFeatures = JSON.parse(vehicle.features || "[]");
    } catch {
      parsedFeatures = [];
    }



    let cleanImageUrl = vehicle.imageUrl;
    if (isInvalidOrMockImage(cleanImageUrl)) {
      cleanImageUrl = "";
    }

    const cleanGallery = (parsedGallery.length > 0 ? parsedGallery : [])
      .filter((img) => !isInvalidOrMockImage(img));

    const publicVehicle = { ...vehicle };
    delete (publicVehicle as { vehicleCode?: string | null }).vehicleCode;

    return NextResponse.json({
      success: true,
      vehicle: {
        ...publicVehicle,
        imageUrl: cleanImageUrl,
        galleryImages: cleanGallery,
        features: parsedFeatures,
      },
    });
  } catch (error) {
    console.error("Fetch vehicle detail error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicle details" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();

    const existing = await prisma.vehicle.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = {};
    if (body.vehicleCode !== undefined) {
      const trimmedCode = (body.vehicleCode || "").trim().toUpperCase();
      if (trimmedCode) {
        const existingWithCode = await prisma.vehicle.findFirst({
          where: {
            vehicleCode: trimmedCode,
            id: { not: id },
          },
        });
        if (existingWithCode) {
          return NextResponse.json(
            { success: false, error: `Vehicle ID "${trimmedCode}" is already in use by another vehicle` },
            { status: 400 }
          );
        }
        updateData.vehicleCode = trimmedCode;
      }
    }
    if (body.name !== undefined) updateData.name = body.name;
    if (body.brand !== undefined) updateData.brand = body.brand;
    if (body.model !== undefined) updateData.model = body.model;
    if (body.year !== undefined) updateData.year = parseInt(body.year, 10);
    if (body.category !== undefined) updateData.category = body.category;
    if (body.transmission !== undefined) updateData.transmission = body.transmission;
    if (body.fuelType !== undefined) updateData.fuelType = body.fuelType;
    if (body.seats !== undefined) updateData.seats = parseInt(body.seats, 10);
    if (body.doors !== undefined) updateData.doors = parseInt(body.doors, 10);
    if (body.luggageCapacity !== undefined) updateData.luggageCapacity = parseInt(body.luggageCapacity, 10);
    if (body.pricePerDay !== undefined) updateData.pricePerDay = parseFloat(body.pricePerDay);
    if (body.depositAmount !== undefined) updateData.depositAmount = parseFloat(body.depositAmount);
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl;
    if (body.status !== undefined) {
      updateData.status = body.status;
      if (body.status === "Maintenance" || body.status === "On Rental") {
        updateData.isAvailable = false;
      } else if (body.status === "Available") {
        updateData.isAvailable = true;
      }
    }
    if (body.isAvailable !== undefined) {
      updateData.isAvailable = Boolean(body.isAvailable);
      if (!updateData.isAvailable && (!updateData.status || updateData.status === "Available")) {
        updateData.status = "Maintenance";
      }
    }
    if (body.isFeatured !== undefined) updateData.isFeatured = Boolean(body.isFeatured);
    if (body.location !== undefined) updateData.location = body.location;
    if (body.galleryImages !== undefined) {
      updateData.galleryImages = Array.isArray(body.galleryImages)
        ? JSON.stringify(body.galleryImages)
        : body.galleryImages;
    }
    if (body.features !== undefined) {
      updateData.features = Array.isArray(body.features)
        ? JSON.stringify(body.features)
        : body.features;
    }

    const updated = await prisma.vehicle.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      success: true,
      message: "Vehicle updated successfully",
      vehicle: updated,
    });
  } catch (error) {
    console.error("Update vehicle error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update vehicle" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const user = await getAuthUser(req);

    const vehicle = await prisma.vehicle.findUnique({ where: { id } });
    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Vehicle not found" },
        { status: 404 }
      );
    }

    // Allow seller of the car or admin
    if (user && user.role !== "ADMIN" && vehicle.sellerId && vehicle.sellerId !== user.id) {
      return forbiddenResponse("You do not have permission to delete this vehicle");
    }

    await prisma.vehicle.delete({ where: { id } });

    return NextResponse.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("Delete vehicle error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete vehicle" },
      { status: 500 }
    );
  }
}
