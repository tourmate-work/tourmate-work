import { prisma } from "@/lib/prisma";

/**
 * Generates the next sequential unique vehicle code (e.g., "TM-008").
 * Inspects all existing vehicle codes matching the "TM-XXX" pattern,
 * finds the highest numeric value, and returns the next padded code.
 */
export async function getNextVehicleCode(prefix: string = "TM"): Promise<string> {
  try {
    const vehicles = await prisma.vehicle.findMany({
      select: { vehicleCode: true },
    });

    let maxNum = 0;
    const regex = new RegExp(`^${prefix}-(\\d+)$`, "i");

    for (const v of vehicles) {
      if (v.vehicleCode) {
        const match = v.vehicleCode.trim().match(regex);
        if (match && match[1]) {
          const num = parseInt(match[1], 10);
          if (!isNaN(num) && num > maxNum) {
            maxNum = num;
          }
        }
      }
    }

    const nextNum = maxNum + 1;
    return `${prefix}-${String(nextNum).padStart(3, "0")}`;
  } catch (error) {
    console.error("Failed to calculate next vehicleCode:", error);
    // Fallback safe timestamp-based code in case of unexpected failure
    return `${prefix}-${Date.now().toString().slice(-4)}`;
  }
}
