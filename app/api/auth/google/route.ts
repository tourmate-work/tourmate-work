import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signJwtToken } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, avatarUrl, credential } = body;

    let userEmail = email ? email.toLowerCase().trim() : null;
    let userName = name ? name.trim() : null;
    let userAvatar = avatarUrl || null;

    // If Google ID token / JWT credential is provided from Google One-Tap or Google OAuth
    if (credential && typeof credential === "string") {
      try {
        // Decode Google JWT payload safely without external deps
        const parts = credential.split(".");
        if (parts.length === 3) {
          const payloadJson = Buffer.from(parts[1], "base64").toString("utf-8");
          const payload = JSON.parse(payloadJson);
          if (payload.email) {
            userEmail = payload.email.toLowerCase().trim();
          }
          if (payload.name && !userName) {
            userName = payload.name;
          }
          if (payload.picture && !userAvatar) {
            userAvatar = payload.picture;
          }
        }
      } catch (err) {
        console.warn("Failed to decode Google credential token:", err);
      }
    }

    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "A valid Gmail or Google account email is required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email format." },
        { status: 400 }
      );
    }

    // Find existing user by email
    let user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (user) {
      // If user exists and new avatar is available, update it
      if (userAvatar && !user.avatarUrl) {
        try {
          user = await prisma.user.update({
            where: { id: user.id },
            data: { avatarUrl: userAvatar },
          });
        } catch {
          // Non-blocking update failure
        }
      }
    } else {
      // Create new user for this Gmail account
      const dummyPassword = crypto.randomBytes(24).toString("hex");
      const passwordHash = await hashPassword(dummyPassword);

      const displayName =
        userName || userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: displayName,
          passwordHash,
          avatarUrl: userAvatar,
          role: "CUSTOMER",
        },
      });
    }

    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role as "CUSTOMER" | "SELLER" | "ADMIN",
    });

    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      avatarUrl: user.avatarUrl,
      role: user.role,
      createdAt: user.createdAt,
    };

    const response = NextResponse.json({
      success: true,
      message: "Gmail authentication successful",
      user: userProfile,
      token,
    });

    // Set persistent session cookie
    response.cookies.set("tourmate_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google Auth error:", error);
    return NextResponse.json(
      { success: false, error: "Google authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
