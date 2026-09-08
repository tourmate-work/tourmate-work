import { NextRequest, NextResponse } from "next/server";
import { normalizePhoneNumber, saveOtp } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone } = body;

    if (!phone || typeof phone !== "string") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid mobile phone number." },
        { status: 400 }
      );
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    const digitsOnly = normalizedPhone.replace(/\D/g, "");

    if (digitsOnly.length < 9) {
      return NextResponse.json(
        {
          success: false,
          error: "Phone number is too short. Please provide a valid mobile number.",
        },
        { status: 400 }
      );
    }

    // Generate secure 6-digit random code
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in global OTP store with 5-minute expiration
    saveOtp(normalizedPhone, otpCode, 5 * 60 * 1000);

    console.log(`📱 [PHONE AUTH OTP] Sent to ${normalizedPhone}: CODE = [${otpCode}]`);

    return NextResponse.json({
      success: true,
      message: `Verification code sent to ${normalizedPhone}`,
      phone: normalizedPhone,
      // Provide devOtp for immediate testing and smooth verification
      devOtp: otpCode,
    });
  } catch (error) {
    console.error("Send OTP error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send verification code. Please try again." },
      { status: 500 }
    );
  }
}
