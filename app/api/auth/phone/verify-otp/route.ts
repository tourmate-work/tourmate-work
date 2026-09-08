import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePhoneNumber, verifyOtp, hashPassword, signJwtToken } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, code, name } = body;

    if (!phone || !code) {
      return NextResponse.json(
        { success: false, error: "Phone number and 6-digit verification code are required." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    const verification = verifyOtp(normalizedPhone, String(code).trim());

    if (!verification.valid) {
      return NextResponse.json(
        { success: false, error: verification.error || "Invalid verification code." },
        { status: 400 }
      );
    }

    // Check if user exists with this phone number
    let user = await prisma.user.findFirst({
      where: { phone: normalizedPhone },
    });

    // If new user, create account
    if (!user) {
      const digitsOnly = normalizedPhone.replace(/\D/g, "");
      const generatedEmail = `phone_${digitsOnly}@tourmate.lk`;

      // Check if generated email already exists
      const existingByEmail = await prisma.user.findUnique({
        where: { email: generatedEmail },
      });

      if (existingByEmail) {
        user = existingByEmail;
      } else {
        const dummyPassword = crypto.randomBytes(24).toString("hex");
        const passwordHash = await hashPassword(dummyPassword);

        user = await prisma.user.create({
          data: {
            name: name?.trim() || `User ${digitsOnly.slice(-4)}`,
            email: generatedEmail,
            phone: normalizedPhone,
            passwordHash,
            role: "CUSTOMER",
          },
        });
      }
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
      message: "Phone authentication successful",
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
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Authentication failed. Please try again." },
      { status: 500 }
    );
  }
}
