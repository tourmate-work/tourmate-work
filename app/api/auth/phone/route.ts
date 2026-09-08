import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { normalizePhoneNumber, hashPassword, signJwtToken } from "@/lib/auth";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, name } = body;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid mobile phone number." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    const digitsOnly = normalizedPhone.replace(/\D/g, "");

    if (digitsOnly.length < 8) {
      return NextResponse.json(
        { success: false, error: "Please enter a valid phone number (at least 8 digits)." },
        { status: 400 }
      );
    }

    // Find existing user by phone
    let user = await prisma.user.findFirst({
      where: { phone: normalizedPhone },
    });

    if (!user) {
      const generatedEmail = `phone_${digitsOnly}@tourmate.lk`;
      const existingEmail = await prisma.user.findUnique({
        where: { email: generatedEmail },
      });

      if (existingEmail) {
        user = existingEmail;
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
    } else if (name && (user.name.startsWith("User ") || user.name === "Tourmate Member")) {
      // Update name if user previously had placeholder name
      try {
        user = await prisma.user.update({
          where: { id: user.id },
          data: { name: name.trim() },
        });
      } catch {
        // Non-blocking update failure
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
      message: "Authentication successful",
      user: userProfile,
      token,
    });

    response.cookies.set("tourmate_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Phone auth error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to sign in with phone number." },
      { status: 500 }
    );
  }
}
