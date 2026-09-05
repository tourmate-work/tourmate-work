import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const transmission = searchParams.get("transmission");
    const fuelType = searchParams.get("fuelType");
    const seats = searchParams.get("seats");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");
    const location = searchParams.get("location");
    const isFeatured = searchParams.get("isFeatured");
    const isAvailable = searchParams.get("isAvailable");
    const status = searchParams.get("status");
    const sortBy = searchParams.get("sortBy") || "createdAt"; // "price_asc", "price_desc", "rating", "year", "createdAt"
    const sortOrder = searchParams.get("sortOrder") || "desc";
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const skip = (page - 1) * limit;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (category && category !== "All") {
      where.category = { equals: category };
    }

    if (transmission && transmission !== "All") {
      where.transmission = { equals: transmission };
    }

    if (fuelType && fuelType !== "All") {
      where.fuelType = { equals: fuelType };
    }

    if (seats && parseInt(seats, 10) > 0) {
      where.seats = { gte: parseInt(seats, 10) };
    }

    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) where.pricePerDay.gte = parseFloat(minPrice);
      if (maxPrice) where.pricePerDay.lte = parseFloat(maxPrice);
    }

    if (location && location !== "All") {
      where.location = { contains: location };
    }

    if (isFeatured === "true") {
      where.isFeatured = true;
    }

    if (isAvailable === "true") {
      where.isAvailable = true;
    }

    if (status && status !== "All") {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { brand: { contains: search } },
        { model: { contains: search } },
        { location: { contains: search } },
        { category: { contains: search } },
      ];
    }

    // Build orderBy
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let orderBy: any = { createdAt: "desc" };
    if (sortBy === "price_asc") {
      orderBy = { pricePerDay: "asc" };
    } else if (sortBy === "price_desc") {
      orderBy = { pricePerDay: "desc" };
    } else if (sortBy === "rating") {
      orderBy = { rating: "desc" };
    } else if (sortBy === "year") {
      orderBy = { year: sortOrder === "asc" ? "asc" : "desc" };
    }

    const [total, rawVehicles] = await Promise.all([
      prisma.vehicle.count({ where }),
      prisma.vehicle.findMany({
        where,
        orderBy,
        skip,
        take: limit,
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
        },
      }),
    ]);

    // Parse JSON fields (galleryImages, features)
    const vehicles = rawVehicles.map((v) => {
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

      return {
        ...v,
        galleryImages: parsedGallery,
        features: parsedFeatures,
      };
    });

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      vehicles,
    });
  } catch (error) {
    console.error("Fetch vehicles error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicles catalog" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    const body = await req.json();

    const {
      name,
      brand,
      model,
      year,
      category,
      transmission,
      fuelType,
      seats,
      doors,
      luggageCapacity,
      mileageLimit,
      pricePerDay,
      depositAmount,
      imageUrl,
      galleryImages,
      features,
      location,
      licensePlate,
      fuelPolicy,
      mileageAllowance,
      isFeatured,
      isAvailable,
      status,
    } = body;

    if (!name || !category || !pricePerDay) {
      return NextResponse.json(
        { success: false, error: "Vehicle name, category, and price per day are required" },
        { status: 400 }
      );
    }

    // Default or resolve seller
    let sellerId = user?.id;
    if (!sellerId) {
      // Find a default host or assign null
      const defaultSeller = await prisma.user.findFirst({
        where: { role: "SELLER" },
      });
      sellerId = defaultSeller?.id;
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        name: name.trim(),
        brand: brand ? brand.trim() : (name.split(" ")[0] || "Toyota"),
        model: model ? model.trim() : name.trim(),
        year: year ? parseInt(year, 10) : new Date().getFullYear(),
        category: category || "Sedan",
        transmission: transmission || "Automatic",
        fuelType: fuelType || "Petrol",
        seats: seats ? parseInt(seats, 10) : 5,
        doors: doors ? parseInt(doors, 10) : 4,
        luggageCapacity: luggageCapacity ? parseInt(luggageCapacity, 10) : 2,
        mileageLimit: mileageLimit || "Unlimited",
        pricePerDay: parseFloat(pricePerDay),
        depositAmount: depositAmount ? parseFloat(depositAmount) : 0,
        imageUrl: imageUrl || "/images/mock/axio-sedan.jpg",
        galleryImages: Array.isArray(galleryImages) ? JSON.stringify(galleryImages) : "[]",
        features: Array.isArray(features) ? JSON.stringify(features) : "[]",
        location: location || "Colombo, Sri Lanka",
        licensePlate: licensePlate || null,
        fuelPolicy: fuelPolicy || "Same to Same",
        mileageAllowance: mileageAllowance || "Unlimited",
        isFeatured: Boolean(isFeatured),
        isAvailable: isAvailable !== false,
        status: status || "Available",
        sellerId: sellerId || null,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Vehicle listed successfully",
        vehicle: {
          ...vehicle,
          galleryImages: Array.isArray(galleryImages) ? galleryImages : [],
          features: Array.isArray(features) ? features : [],
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create vehicle error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create vehicle listing" },
      { status: 500 }
    );
  }
}
