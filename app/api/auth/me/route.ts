import { NextRequest, NextResponse } from "next/server";
import { getAuthUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser(req);
    if (!user) {
      return NextResponse.json({
        success: true,
        user: null,
        authenticated: false,
      });
    }

    return NextResponse.json({
      success: true,
      user,
      authenticated: true,
    });
  } catch (error) {
    console.error("Auth me error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch current user profile" },
      { status: 500 }
    );
  }
}

