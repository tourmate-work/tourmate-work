import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signJwtToken } from "@/lib/auth";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      email,
      name,
      avatarUrl,
      githubUsername,
      supabaseId,
      forAdmin = true,
    } = body;

    // Handle email - fallback to GitHub handle if email is private
    let userEmail = email ? email.toLowerCase().trim() : null;
    if (!userEmail && githubUsername) {
      userEmail = `${githubUsername.toLowerCase().trim()}@github.users.tourmate.lk`;
    } else if (!userEmail && supabaseId) {
      userEmail = `gh_${supabaseId.slice(0, 12)}@github.users.tourmate.lk`;
    }

    if (!userEmail) {
      return NextResponse.json(
        {
          success: false,
          error: "Unable to retrieve email or identifier from GitHub profile.",
        },
        { status: 400 }
      );
    }

    const displayName =
      name?.trim() ||
      githubUsername?.trim() ||
      userEmail.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase());

    const userAvatar = avatarUrl || null;
    const targetRole = forAdmin ? "ADMIN" : "CUSTOMER";

    let user: {
      id: string;
      email: string;
      name: string;
      role: string;
      avatarUrl?: string | null;
      phone?: string | null;
      createdAt?: Date;
    } | null = null;

    try {
      // Find existing user by email
      const existingUser = await prisma.user.findUnique({
        where: { email: userEmail },
      });

      if (existingUser) {
        // Upgrade to ADMIN if signing in via Admin Portal
        const shouldUpgradeRole = forAdmin && existingUser.role !== "ADMIN";
        const shouldUpdateAvatar = userAvatar && !existingUser.avatarUrl;

        if (shouldUpgradeRole || shouldUpdateAvatar) {
          user = await prisma.user.update({
            where: { id: existingUser.id },
            data: {
              ...(shouldUpgradeRole ? { role: "ADMIN" } : {}),
              ...(shouldUpdateAvatar ? { avatarUrl: userAvatar } : {}),
            },
          });
        } else {
          user = existingUser;
        }
      } else {
        // Create new admin user for this GitHub account
        const dummyPassword = crypto.randomBytes(32).toString("hex");
        const passwordHash = await hashPassword(dummyPassword);

        user = await prisma.user.create({
          data: {
            email: userEmail,
            name: displayName,
            passwordHash,
            avatarUrl: userAvatar,
            role: targetRole,
          },
        });
      }
    } catch (dbError) {
      console.warn(
        "Database error during GitHub user lookup/upsert, applying resilient fallback:",
        dbError
      );
      // Fallback in case PostgreSQL is temporarily waking up / paused
      user = {
        id: supabaseId || `gh-${crypto.randomBytes(8).toString("hex")}`,
        email: userEmail,
        name: displayName,
        role: targetRole,
        avatarUrl: userAvatar,
        phone: null,
        createdAt: new Date(),
      };
    }

    if (!user) {
      return NextResponse.json(
        { success: false, error: "Failed to establish user account." },
        { status: 500 }
      );
    }

    // Sign Tourmate JWT token with ADMIN role
    const token = signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role as "CUSTOMER" | "SELLER" | "ADMIN",
    });

    const userProfile = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      avatarUrl: user.avatarUrl || null,
      role: user.role,
      createdAt: user.createdAt || new Date(),
    };

    const response = NextResponse.json({
      success: true,
      message: "GitHub admin authentication successful",
      user: userProfile,
      token,
    });

    // Set persistent session cookie (7 days)
    response.cookies.set("tourmate_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("GitHub Auth API error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "GitHub authentication failed. Please try again.",
      },
      { status: 500 }
    );
  }
}
