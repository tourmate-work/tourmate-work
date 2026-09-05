import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    const allowed = ["Available", "On Rental", "Maintenance"];
    if (!status || !allowed.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Allowed: ${allowed.join(", ")}` },
        { status: 400 }
      );
    }

    const isAvailable = status === "Available";

    const updated = await prisma.vehicle.update({
      where: { id },
      data: {
        status,
        isAvailable,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Vehicle status updated to ${status}`,
      vehicle: updated,
    });
  } catch (error) {
    console.error("Update vehicle status error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update vehicle status" },
      { status: 500 }
    );
  }
}
