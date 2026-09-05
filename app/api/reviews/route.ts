import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthUser } from "@/lib/auth";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const carId = searchParams.get("carId");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const where: any = {};
    if (carId) where.carId = carId;

    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      count: reviews.length,
      reviews,
    });
  } catch (error) {
    console.error("Fetch reviews error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    const body = await req.json();
    const { carId, userName, rating, comment } = body;

    if (!carId || !comment || !rating) {
      return NextResponse.json(
        { success: false, error: "Vehicle, rating (1-5), and review comment are required" },
        { status: 400 }
      );
    }

    const numericRating = Math.min(5, Math.max(1, parseFloat(rating)));
    const reviewerName = userName?.trim() || user?.name || "Verified Customer";

    // Create review
    const review = await prisma.review.create({
      data: {
        carId,
        userId: user?.id || null,
        userName: reviewerName,
        rating: numericRating,
        comment: comment.trim(),
      },
    });

    // Recalculate average rating & reviewsCount for the vehicle
    const allReviews = await prisma.review.findMany({
      where: { carId },
      select: { rating: true },
    });

    const totalRatings = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = Number((totalRatings / allReviews.length).toFixed(1));

    await prisma.vehicle.update({
      where: { id: carId },
      data: {
        rating: avgRating,
        reviewsCount: allReviews.length,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Review submitted successfully",
        review,
        updatedRating: avgRating,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Submit review error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
