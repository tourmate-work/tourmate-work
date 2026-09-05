import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const carId = searchParams.get("carId");
    const sellerId = searchParams.get("sellerId");
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};

    if (userId) where.userId = userId;
    if (carId) where.carId = carId;
    if (status && status !== "All") where.status = status;

    if (sellerId) {
      where.car = { sellerId };
    }

    const bookings = await prisma.booking.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        car: {
          select: {
            id: true,
            name: true,
            brand: true,
            model: true,
            category: true,
            imageUrl: true,
            pricePerDay: true,
            currency: true,
            location: true,
            sellerId: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      count: bookings.length,
      bookings,
    });
  } catch (error) {
    console.error("Fetch bookings error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve bookings" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    const body = await req.json();

    const {
      carId,
      customerName,
      customerEmail,
      customerPhone,
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation,
      specialRequests,
    } = body;

    if (!carId || !customerName || !customerEmail || !customerPhone || !pickupDate || !returnDate) {
      return NextResponse.json(
        {
          success: false,
          error: "Vehicle, customer name, email, phone, pickup date, and return date are required",
        },
        { status: 400 }
      );
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return NextResponse.json(
        { success: false, error: "Invalid pickup or return date provided" },
        { status: 400 }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        { success: false, error: "Return date must be after pickup date" },
        { status: 400 }
      );
    }

    // Check vehicle exists and availability
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: carId },
    });

    if (!vehicle) {
      return NextResponse.json(
        { success: false, error: "Selected vehicle does not exist" },
        { status: 404 }
      );
    }

    if (!vehicle.isAvailable || vehicle.status === "Maintenance") {
      return NextResponse.json(
        { success: false, error: "Selected vehicle is currently unavailable for rental" },
        { status: 400 }
      );
    }

    // Overlapping booking check for the same car (CONFIRMED or ACTIVE)
    const conflict = await prisma.booking.findFirst({
      where: {
        carId,
        status: { in: ["CONFIRMED", "ACTIVE"] },
        AND: [
          { pickupDate: { lte: end } },
          { returnDate: { gte: start } },
        ],
      },
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          error: "This vehicle is already reserved during the requested dates. Please choose different dates or another car.",
        },
        { status: 409 }
      );
    }

    // Calculate duration in days
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const dailyRate = vehicle.pricePerDay;
    const totalPrice = totalDays * dailyRate;

    const booking = await prisma.booking.create({
      data: {
        carId,
        userId: user?.id || null,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim().toLowerCase(),
        customerPhone: customerPhone.trim(),
        pickupDate: start,
        returnDate: end,
        pickupLocation: pickupLocation || vehicle.location,
        returnLocation: returnLocation || pickupLocation || vehicle.location,
        totalDays,
        dailyRate,
        totalPrice,
        status: "CONFIRMED",
        paymentStatus: "UNPAID",
        specialRequests: specialRequests ? specialRequests.trim() : null,
      },
      include: {
        car: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking confirmed successfully!",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create booking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
