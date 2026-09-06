import { prisma } from "../lib/prisma";

async function wipeDatabase() {
  console.log("🧹 Starting complete database wipe...");

  const reviews = await prisma.review.deleteMany();
  console.log(`🗑️ Deleted ${reviews.count} reviews.`);

  const bookings = await prisma.booking.deleteMany();
  console.log(`🗑️ Deleted ${bookings.count} bookings.`);

  const inquiries = await prisma.inquiry.deleteMany();
  console.log(`🗑️ Deleted ${inquiries.count} inquiries.`);

  const vehicles = await prisma.vehicle.deleteMany();
  console.log(`🗑️ Deleted ${vehicles.count} vehicles.`);

  const users = await prisma.user.deleteMany();
  console.log(`🗑️ Deleted ${users.count} users.`);

  console.log("\n✨ Database is now completely empty and clean (0 rows across all tables).");
}

wipeDatabase()
  .catch((e) => {
    console.error("Wipe failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
