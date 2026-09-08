import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (status && status !== "All" && status !== "all") {
      where.status = status.toUpperCase();
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      inquiries,
    });
  } catch (error) {
    console.error("Fetch inquiries error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch vehicle inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      phone,
      carModel,
      carId,
      date,
      pickupDate,
      returnDate,
      pickupLocation,
      returnLocation,
      passengers,
      driverOption,
      additionalMessage,
      subject,
      message,
    } = body;

    if (!name || !email) {
      return NextResponse.json(
        { success: false, error: "Customer name and email are required" },
        { status: 400 }
      );
    }

    // Build comprehensive structured inquiry message if not provided
    let fullMessage = message;
    if (!fullMessage) {
      const parts: string[] = [];
      if (carModel) parts.push(`Vehicle: ${carModel}`);
      if (date) parts.push(`Dates: ${date}`);
      else if (pickupDate && returnDate) parts.push(`Dates: ${pickupDate} to ${returnDate}`);
      if (pickupLocation) parts.push(`Pickup: ${pickupLocation}`);
      if (returnLocation) parts.push(`Return: ${returnLocation}`);
      if (driverOption) {
        parts.push(`Driver: ${driverOption === "driver" ? "With Driver" : "Self-Drive"}`);
      }
      if (passengers) parts.push(`Passengers: ${passengers}`);
      if (additionalMessage && additionalMessage.trim()) {
        parts.push(`Customer Notes: ${additionalMessage.trim()}`);
      }
      fullMessage = parts.join(" | ");
    }

    const inquirySubject =
      subject || (carModel ? `Vehicle Inquiry: ${carModel}` : "General Vehicle Inquiry");

    const inquiry = await prisma.inquiry.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone ? phone.trim() : null,
        subject: inquirySubject,
        carModel: carModel ? carModel.trim() : null,
        date: date || (pickupDate && returnDate ? `${pickupDate} to ${returnDate}` : null),
        message: fullMessage || "Vehicle inquiry from customer",
        status: "PENDING",
      },
    });

    // Optional: If valid carId is provided and exists in DB, also record as PENDING booking
    if (carId && carId !== "manual-inquiry") {
      try {
        const vehicle = await prisma.vehicle.findUnique({
          where: { id: carId },
        });

        if (vehicle && pickupDate && returnDate) {
          const pDate = new Date(pickupDate);
          const rDate = new Date(returnDate);
          if (!isNaN(pDate.getTime()) && !isNaN(rDate.getTime()) && rDate > pDate) {
            const diffTime = Math.abs(rDate.getTime() - pDate.getTime());
            const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
            const totalPrice = diffDays * vehicle.pricePerDay;

            await prisma.booking.create({
              data: {
                carId: vehicle.id,
                customerName: name.trim(),
                customerEmail: email.trim().toLowerCase(),
                customerPhone: phone ? phone.trim() : "N/A",
                pickupDate: pDate,
                returnDate: rDate,
                pickupLocation: pickupLocation || vehicle.location || "Colombo",
                returnLocation: returnLocation || pickupLocation || vehicle.location || "Colombo",
                totalDays: diffDays,
                dailyRate: vehicle.pricePerDay,
                totalPrice,
                status: "PENDING",
                paymentStatus: "UNPAID",
                specialRequests: fullMessage,
              },
            });
          }
        }
      } catch (bookingErr) {
        console.warn("Notice: Optional booking sync skipped:", bookingErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your vehicle inquiry has been submitted successfully to Tourmate.",
        inquiry,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create inquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit vehicle inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: "Inquiry ID and new status are required" },
        { status: 400 }
      );
    }

    const updated = await prisma.inquiry.update({
      where: { id },
      data: { status: status.toUpperCase() },
    });

    return NextResponse.json({
      success: true,
      inquiry: updated,
    });
  } catch (error) {
    console.error("Update inquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry status" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    let id = searchParams.get("id");

    if (!id) {
      try {
        const body = await req.json();
        id = body.id;
      } catch {
        // Body was not JSON
      }
    }

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Inquiry ID is required to delete" },
        { status: 400 }
      );
    }

    await prisma.inquiry.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Delete inquiry error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete inquiry" },
      { status: 500 }
    );
  }
}
