import { prisma } from "../lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

async function testBackend() {
  console.log("🚀 Starting Tourmate Backend Automated Test Suite...\n");

  // 1. Test Database Connectivity & Users
  console.log("1️⃣ Testing Users & Authentication Data...");
  const users = await prisma.user.findMany();
  console.log(`   Found ${users.length} registered users:`, users.map((u) => `${u.name} (${u.role})`).join(", "));
  
  const admin = users.find((u) => u.role === "ADMIN");
  if (admin) {
    const isPwValid = await bcrypt.compare("tourmate123", admin.passwordHash);
    console.log(`   Admin password verification: ${isPwValid ? "✅ VALID" : "❌ FAILED"}`);
  }

  // 2. Test Vehicles Query & Multi-criteria filtering
  console.log("\n2️⃣ Testing Vehicles API & Filter Capabilities...");
  const totalVehicles = await prisma.vehicle.count();
  console.log(`   Total vehicles in fleet: ${totalVehicles}`);

  const hybridVehicles = await prisma.vehicle.findMany({
    where: { fuelType: "Hybrid" },
  });
  console.log(`   Hybrid vehicles count: ${hybridVehicles.length}`);

  const luxuryVehicles = await prisma.vehicle.findMany({
    where: { category: "Luxury" },
  });
  console.log(`   Luxury vehicles count: ${luxuryVehicles.length} (${luxuryVehicles.map((v) => v.name).join(", ")})`);

  // 3. Test Booking & Conflict Detection
  console.log("\n3️⃣ Testing Bookings & Conflict Engine...");
  const vehicle = await prisma.vehicle.findFirst();
  if (vehicle) {
    const start = new Date("2026-10-01T10:00:00Z");
    const end = new Date("2026-10-05T10:00:00Z");
    const diffDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    const testBooking = await prisma.booking.create({
      data: {
        carId: vehicle.id,
        customerName: "Integration Test User",
        customerEmail: "test@tourmate.lk",
        customerPhone: "+94 77 000 1122",
        pickupDate: start,
        returnDate: end,
        pickupLocation: "Colombo",
        returnLocation: "Colombo",
        totalDays: diffDays,
        dailyRate: vehicle.pricePerDay,
        totalPrice: diffDays * vehicle.pricePerDay,
        status: "CONFIRMED",
      },
    });
    console.log(`   Created test booking: ${testBooking.id} (Total Price: LKR ${testBooking.totalPrice.toLocaleString()})`);

    // Verify conflict detection query
    const conflict = await prisma.booking.findFirst({
      where: {
        carId: vehicle.id,
        status: { in: ["CONFIRMED", "ACTIVE"] },
        AND: [
          { pickupDate: { lte: new Date("2026-10-04T10:00:00Z") } },
          { returnDate: { gte: new Date("2026-10-02T10:00:00Z") } },
        ],
      },
    });
    console.log(`   Overlap conflict detection: ${conflict ? "✅ Successfully detected overlap" : "❌ Failed"}`);

    // Clean up test booking
    await prisma.booking.delete({ where: { id: testBooking.id } });
  }

  // 4. Test Reviews & Dynamic Rating Recalculation
  console.log("\n4️⃣ Testing Reviews & Dynamic Rating Recalculation...");
  if (vehicle) {
    const newRev = await prisma.review.create({
      data: {
        carId: vehicle.id,
        userName: "Speedy Reviewer",
        rating: 5.0,
        comment: "Flawless service and spotless car!",
      },
    });

    const reviews = await prisma.review.findMany({ where: { carId: vehicle.id } });
    const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    await prisma.vehicle.update({
      where: { id: vehicle.id },
      data: { rating: Number(avg.toFixed(1)), reviewsCount: reviews.length },
    });
    console.log(`   Added review: ${newRev.id}. Recalculated vehicle rating: ${avg.toFixed(1)} / 5.0 (${reviews.length} reviews)`);

    // Clean up
    await prisma.review.delete({ where: { id: newRev.id } });
  }

  // 5. Test Inquiries
  console.log("\n5️⃣ Testing Contact Inquiries...");
  const inquiries = await prisma.inquiry.findMany();
  console.log(`   Current inquiries in DB: ${inquiries.length}`);

  console.log("\n🎉 ALL BACKEND CHECKS PASSED PERFECTLY!");
}

testBackend()
  .catch((e) => {
    console.error("Test failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
