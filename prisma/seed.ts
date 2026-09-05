import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.inquiry.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const passwordHash = await bcrypt.hash("tourmate123", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@tourmate.lk",
      name: "Tourmate Admin",
      passwordHash,
      phone: "+94 77 123 4567",
      role: "ADMIN",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    },
  });

  const seller1 = await prisma.user.create({
    data: {
      email: "seller@tourmate.lk",
      name: "Ceylon Prime Rentals",
      passwordHash,
      phone: "+94 71 987 6543",
      role: "SELLER",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    },
  });

  const customer1 = await prisma.user.create({
    data: {
      email: "customer@tourmate.lk",
      name: "Senesh Perera",
      passwordHash,
      phone: "+94 70 456 7890",
      role: "CUSTOMER",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
    },
  });

  console.log("✅ Users seeded:", admin.email, seller1.email, customer1.email);

  // Seed Fleet of Vehicles
  const vehiclesData = [
    {
      name: "Toyota Axio WXB Hybrid",
      brand: "Toyota",
      model: "Axio WXB",
      year: 2022,
      category: "Sedan",
      transmission: "Automatic",
      fuelType: "Hybrid",
      seats: 5,
      doors: 4,
      luggageCapacity: 2,
      mileageLimit: "Unlimited",
      pricePerDay: 15500,
      depositAmount: 25000,
      imageUrl: "/images/mock/axio-sedan.jpg",
      galleryImages: JSON.stringify([
        "/images/mock/axio-sedan.jpg",
        "/images/car-side.jpg",
        "/images/car-fleet.jpg",
      ]),
      features: JSON.stringify([
        "Air Conditioner",
        "Bluetooth Audio",
        "Reverse Camera",
        "GPS Navigation",
        "Safety Sensing",
        "Eco Mode",
      ]),
      rating: 4.9,
      reviewsCount: 28,
      isFeatured: true,
      isAvailable: true,
      status: "Available",
      location: "Colombo / Katunayake Airport",
      licensePlate: "WP CBH-4821",
      fuelPolicy: "Full to Full",
      mileageAllowance: "Unlimited",
      sellerId: seller1.id,
    },
    {
      name: "Honda Vezel RS Sensing",
      brand: "Honda",
      model: "Vezel RS",
      year: 2023,
      category: "SUV",
      transmission: "Automatic",
      fuelType: "Hybrid",
      seats: 5,
      doors: 5,
      luggageCapacity: 3,
      mileageLimit: "Unlimited",
      pricePerDay: 22000,
      depositAmount: 35000,
      imageUrl: "/images/mock/vezel-suv.jpg",
      galleryImages: JSON.stringify([
        "/images/mock/vezel-suv.jpg",
        "/images/car-fleet.jpg",
        "/images/car-side.jpg",
      ]),
      features: JSON.stringify([
        "Air Conditioner",
        "Adaptive Cruise Control",
        "Leather Interior",
        "Lane Keep Assist",
        "Paddle Shift",
        "Apple CarPlay",
      ]),
      rating: 5.0,
      reviewsCount: 34,
      isFeatured: true,
      isAvailable: true,
      status: "Available",
      location: "Negombo / Airport (CMB)",
      licensePlate: "WP CBA-9120",
      fuelPolicy: "Full to Full",
      mileageAllowance: "Unlimited",
      sellerId: seller1.id,
    },
    {
      name: "Mercedes-Benz C200 AMG Line",
      brand: "Mercedes-Benz",
      model: "C-Class C200",
      year: 2023,
      category: "Luxury",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 5,
      doors: 4,
      luggageCapacity: 3,
      mileageLimit: "Unlimited",
      pricePerDay: 48000,
      depositAmount: 75000,
      imageUrl: "/images/mock/mercedes-amg.jpg",
      galleryImages: JSON.stringify([
        "/images/mock/mercedes-amg.jpg",
        "/images/car-side.jpg",
        "/images/hero-sri-lanka.jpg",
      ]),
      features: JSON.stringify([
        "Panoramic Sunroof",
        "Burmester 3D Surround Sound",
        "Executive Nappa Leather",
        "Chauffeur Available",
        "Digital Light System",
        "Ambient Lighting (64 colors)",
      ]),
      rating: 4.9,
      reviewsCount: 19,
      isFeatured: true,
      isAvailable: true,
      status: "Available",
      location: "Colombo 03 / Galle Road",
      licensePlate: "WP CAG-7777",
      fuelPolicy: "Full to Full",
      mileageAllowance: "Unlimited",
      sellerId: seller1.id,
    },
    {
      name: "Toyota KDH Super GL Luxury",
      brand: "Toyota",
      model: "KDH Super GL",
      year: 2021,
      category: "Van",
      transmission: "Automatic",
      fuelType: "Diesel",
      seats: 10,
      doors: 5,
      luggageCapacity: 8,
      mileageLimit: "Unlimited",
      pricePerDay: 28000,
      depositAmount: 40000,
      imageUrl: "/images/mock/kdh-van.jpg",
      galleryImages: JSON.stringify([
        "/images/mock/kdh-van.jpg",
        "/images/car-fleet.jpg",
      ]),
      features: JSON.stringify([
        "Dual AC Rotational Vents",
        "Reclining Luxury Captain Seats",
        "Power Sliding Door",
        "Large Luggage Bay",
        "Android Auto Display",
      ]),
      rating: 4.8,
      reviewsCount: 42,
      isFeatured: false,
      isAvailable: true,
      status: "Available",
      location: "Kandy / Colombo",
      licensePlate: "WP PE-5421",
      fuelPolicy: "Same to Same",
      mileageAllowance: "Unlimited",
      sellerId: seller1.id,
    },
    {
      name: "Toyota Premio 1.5 G-Superior",
      brand: "Toyota",
      model: "Premio NZT260",
      year: 2020,
      category: "Sedan",
      transmission: "Automatic",
      fuelType: "Petrol",
      seats: 5,
      doors: 4,
      luggageCapacity: 3,
      mileageLimit: "Unlimited",
      pricePerDay: 16500,
      depositAmount: 25000,
      imageUrl: "/images/mock/premio-sedan.jpg",
      galleryImages: JSON.stringify([
        "/images/mock/premio-sedan.jpg",
        "/images/car-side.jpg",
      ]),
      features: JSON.stringify([
        "Air Conditioner",
        "Teak Interior Accents",
        "Push Start Smart Key",
        "Reverse Camera",
        "Electric Driver Seat",
      ]),
      rating: 4.9,
      reviewsCount: 26,
      isFeatured: false,
      isAvailable: true,
      status: "Available",
      location: "Galle / Matara",
      licensePlate: "SP WP-8832",
      fuelPolicy: "Same to Same",
      mileageAllowance: "Unlimited",
      sellerId: seller1.id,
    },
    {
      name: "Land Rover Defender 110 SE",
      brand: "Land Rover",
      model: "Defender 110",
      year: 2023,
      category: "Luxury",
      transmission: "Automatic",
      fuelType: "Diesel",
      seats: 7,
      doors: 5,
      luggageCapacity: 5,
      mileageLimit: "Unlimited",
      pricePerDay: 65000,
      depositAmount: 100000,
      imageUrl: "/images/car-fleet.jpg",
      galleryImages: JSON.stringify([
        "/images/car-fleet.jpg",
        "/images/hero-sri-lanka.jpg",
      ]),
      features: JSON.stringify([
        "Terrain Response 2 AWD",
        "Air Suspension",
        "360 3D Surround Camera",
        "Meridian Audio System",
        "Chilled Center Console",
        "Safari Spec Roof Rack",
      ]),
      rating: 5.0,
      reviewsCount: 15,
      isFeatured: true,
      isAvailable: true,
      status: "Available",
      location: "Colombo / Bentota",
      licensePlate: "WP CBL-1100",
      fuelPolicy: "Full to Full",
      mileageAllowance: "Unlimited",
      sellerId: seller1.id,
    },
  ];

  const createdVehicles = [];
  for (const vData of vehiclesData) {
    const v = await prisma.vehicle.create({
      data: vData,
    });
    createdVehicles.push(v);
  }

  console.log(`🚗 Seeded ${createdVehicles.length} vehicles.`);

  // Seed sample bookings
  const b1 = await prisma.booking.create({
    data: {
      carId: createdVehicles[0].id,
      userId: customer1.id,
      customerName: "Senesh Perera",
      customerEmail: "customer@tourmate.lk",
      customerPhone: "+94 70 456 7890",
      pickupDate: new Date("2026-09-10T09:00:00.000Z"),
      returnDate: new Date("2026-09-14T18:00:00.000Z"),
      pickupLocation: "Bandaranaike Intl Airport (CMB)",
      returnLocation: "Bandaranaike Intl Airport (CMB)",
      totalDays: 4,
      dailyRate: 15500,
      totalPrice: 62000,
      status: "CONFIRMED",
      paymentStatus: "PAID",
      specialRequests: "Arriving on UL 504 at 8:30 AM. Need GPS setup in English.",
    },
  });

  const b2 = await prisma.booking.create({
    data: {
      carId: createdVehicles[1].id,
      userId: customer1.id,
      customerName: "David Miller",
      customerEmail: "david.miller@example.com",
      customerPhone: "+44 7911 123456",
      pickupDate: new Date("2026-09-20T10:00:00.000Z"),
      returnDate: new Date("2026-09-25T10:00:00.000Z"),
      pickupLocation: "Colombo Fort Railway Station",
      returnLocation: "Galle Fort",
      totalDays: 5,
      dailyRate: 22000,
      totalPrice: 110000,
      status: "PENDING",
      paymentStatus: "UNPAID",
      specialRequests: "Require child baby seat in the rear.",
    },
  });

  console.log("📅 Sample bookings created:", b1.id, b2.id);

  // Seed sample reviews
  await prisma.review.create({
    data: {
      carId: createdVehicles[0].id,
      userId: customer1.id,
      userName: "Senesh Perera",
      rating: 5.0,
      comment:
        "The Toyota Axio was impeccably clean and fuel efficiency was phenomenal during our trip across Kandy and Nuwara Eliya!",
    },
  });

  await prisma.review.create({
    data: {
      carId: createdVehicles[1].id,
      userName: "Sarah Jenkins",
      rating: 5.0,
      comment:
        "Loved the Vezel RS! The high ground clearance made mountain roads around Ella an absolute breeze.",
    },
  });

  // Seed sample contact inquiry
  await prisma.inquiry.create({
    data: {
      name: "Marcus Vance",
      email: "marcus.v@globaltravel.com",
      phone: "+1 415 889 0291",
      subject: "Long term rental inquiry (1 month)",
      message:
        "Hi Tourmate team, we are planning a 30-day expedition across Southern Sri Lanka in October. Do you offer corporate/monthly discounted packages for the Land Rover Defender?",
      carModel: "Land Rover Defender 110 SE",
      status: "PENDING",
    },
  });

  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
