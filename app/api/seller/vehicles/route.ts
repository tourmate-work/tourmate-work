import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    const { searchParams } = new URL(req.url);
    const explicitSellerId = searchParams.get("sellerId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    // Admins see ALL vehicles; non-admins only see their own
    if (explicitSellerId) {
      where.sellerId = explicitSellerId;
    } else if (user?.role !== "ADMIN" && user?.id) {
      where.sellerId = user.id;
    }

    const rawVehicles = await prisma.vehicle.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        bookings: {
          select: {
            id: true,
            status: true,
            totalPrice: true,
          },
        },
      },
    });

    const fleet = rawVehicles.map((v) => {
      let parsedGallery: string[] = [];
      let parsedFeatures: string[] = [];
      try {
        parsedGallery = JSON.parse(v.galleryImages || "[]");
      } catch {
        parsedGallery = [];
      }
      try {
        parsedFeatures = JSON.parse(v.features || "[]");
      } catch {
        parsedFeatures = [];
      }

      const totalTrips = v.bookings.filter(
        (b) => b.status === "COMPLETED" || b.status === "CONFIRMED" || b.status === "ACTIVE"
      ).length;

      const totalEarnings = v.bookings
        .filter((b) => b.status !== "CANCELLED")
        .reduce((sum, b) => sum + b.totalPrice, 0);

      return {
        id: v.id,
        vehicleCode: v.vehicleCode || undefined,
        name: v.name,
        brand: v.brand,
        model: v.model,
        category: v.category,
        year: v.year,
        dailyRate: v.pricePerDay,
        currency: v.currency,
        transmission: v.transmission,
        fuel: v.fuelType,
        seats: v.seats,
        doors: v.doors,
        location: v.location,
        status: v.status,
        totalTrips: totalTrips,
        totalEarnings: totalEarnings,
        rating: v.rating,
        type: v.category.toLowerCase(),
        image: v.imageUrl,
        galleryImages: parsedGallery,
        features: parsedFeatures,
        licensePlate: v.licensePlate,
        fuelPolicy: v.fuelPolicy,
        mileageAllowance: v.mileageAllowance,
        securityDeposit: v.depositAmount,
      };
    });

    return NextResponse.json({
      success: true,
      count: fleet.length,
      fleet,
    });
  } catch (error) {
    console.error("Seller vehicles error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch seller vehicles" },
      { status: 500 }
    );
  }
}
