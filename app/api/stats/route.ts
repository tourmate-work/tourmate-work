import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * GET /api/stats
 * Returns live platform statistics derived from database records.
 */
export async function GET() {
  try {
    // Run all queries in parallel for speed
    const [
      vehicleCount,
      completedBookings,
      uniqueClients,
      oldestBooking,
    ] = await Promise.all([
      // 1. Total vehicles in the fleet (available or on rental — exclude maintenance)
      prisma.vehicle.count({
        where: { status: { not: "Maintenance" } },
      }),

      // 2. Completed + confirmed + active bookings (for KM estimation)
      prisma.booking.findMany({
        where: {
          status: { in: ["COMPLETED", "CONFIRMED", "ACTIVE"] },
        },
        select: { totalDays: true, dailyRate: true },
      }),

      // 3. Unique clients (distinct customer emails across all bookings)
      prisma.booking.findMany({
        distinct: ["customerEmail"],
        select: { customerEmail: true },
      }),

      // 4. Oldest booking to calculate years in operation
      prisma.booking.findFirst({
        orderBy: { createdAt: "asc" },
        select: { createdAt: true },
      }),
    ]);

    // Calculate years in business
    // Use the oldest booking date, or fall back to the oldest vehicle
    let yearsInBusiness = 1;
    if (oldestBooking?.createdAt) {
      const diffMs = Date.now() - new Date(oldestBooking.createdAt).getTime();
      yearsInBusiness = Math.max(1, Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000)));
    } else {
      // Fall back to oldest vehicle creation date
      const oldestVehicle = await prisma.vehicle.findFirst({
        orderBy: { createdAt: "asc" },
        select: { createdAt: true },
      });
      if (oldestVehicle?.createdAt) {
        const diffMs = Date.now() - new Date(oldestVehicle.createdAt).getTime();
        yearsInBusiness = Math.max(1, Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000)));
      }
    }

    // Estimate total KM driven
    // Average ~150 km/day for tour/rental vehicles in Sri Lanka
    const AVG_KM_PER_DAY = 150;
    const totalDays = completedBookings.reduce(
      (sum, b) => sum + (b.totalDays || 0),
      0
    );
    const estimatedKm = totalDays * AVG_KM_PER_DAY;

    return NextResponse.json({
      success: true,
      stats: {
        vehicleCount,
        clientCount: uniqueClients.length,
        yearsInBusiness,
        totalKmDriven: estimatedKm,
      },
    });
  } catch (error) {
    console.error("Stats API error:", error);
    return NextResponse.json(
      {
        success: false,
        // Return sensible fallback stats so the UI never breaks
        stats: {
          vehicleCount: 0,
          clientCount: 0,
          yearsInBusiness: 1,
          totalKmDriven: 0,
        },
      },
      { status: 500 }
    );
  }
}
