import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "./prisma";

const JWT_SECRET =
  process.env.JWT_SECRET ||
  process.env.SUPABASE_SECRET_KEY ||
  "tourmate-super-secret-jwt-key-2026-sri-lanka";
const JWT_EXPIRES_IN = "7d";

export interface TokenPayload {
  userId: string;
  email: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
}

export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signJwtToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwtToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextRequest): string | null {
  // 1. Check Authorization header: Bearer <token>
  const authHeader = req.headers.get("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7).trim();
  }

  // 2. Check HTTP cookies: tourmate_token
  const cookieToken = req.cookies.get("tourmate_token")?.value;
  if (cookieToken) {
    return cookieToken;
  }

  return null;
}

export async function getAuthUser(req: NextRequest) {
  const token = getTokenFromRequest(req);
  if (!token) return null;

  const payload = verifyJwtToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: {
      id: true,
      email: true,
      name: true,
      phone: true,
      avatarUrl: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}

export function unauthorizedResponse(message = "Unauthorized. Please log in.") {
  return NextResponse.json({ success: false, error: message }, { status: 401 });
}

export function forbiddenResponse(message = "Forbidden. Insufficient permissions.") {
  return NextResponse.json({ success: false, error: message }, { status: 403 });
}

// ==========================================
// PHONE & OTP VERIFICATION UTILITIES
// ==========================================

export function normalizePhoneNumber(raw: string): string {
  if (!raw) return "";
  let cleaned = raw.replace(/[\s\-\(\)]/g, "").trim();

  // Sri Lanka standard mobile: 07XXXXXXXX (10 digits) -> +947XXXXXXXX
  if (cleaned.startsWith("0") && cleaned.length === 10) {
    cleaned = "+94" + cleaned.substring(1);
  } else if (!cleaned.startsWith("+")) {
    if (cleaned.startsWith("94")) {
      cleaned = "+" + cleaned;
    } else {
      cleaned = "+" + cleaned;
    }
  }
  return cleaned;
}

interface OtpEntry {
  code: string;
  expiresAt: number;
  attempts: number;
}

declare global {
  // eslint-disable-next-line no-var
  var _tourmate_otp_store: Map<string, OtpEntry> | undefined;
}

const otpStore: Map<string, OtpEntry> =
  globalThis._tourmate_otp_store || new Map<string, OtpEntry>();

if (process.env.NODE_ENV !== "production") {
  globalThis._tourmate_otp_store = otpStore;
}

export function saveOtp(phone: string, code: string, ttlMs = 5 * 60 * 1000) {
  otpStore.set(phone, {
    code,
    expiresAt: Date.now() + ttlMs,
    attempts: 0,
  });
}

export function verifyOtp(phone: string, inputCode: string): { valid: boolean; error?: string } {
  const entry = otpStore.get(phone);
  if (!entry) {
    return {
      valid: false,
      error: "No active verification code found. Please request a new code.",
    };
  }

  if (Date.now() > entry.expiresAt) {
    otpStore.delete(phone);
    return {
      valid: false,
      error: "Verification code has expired. Please request a new code.",
    };
  }

  if (entry.attempts >= 5) {
    otpStore.delete(phone);
    return {
      valid: false,
      error: "Too many failed attempts. Please request a new code.",
    };
  }

  if (entry.code !== inputCode.trim()) {
    entry.attempts += 1;
    return {
      valid: false,
      error: "Invalid 6-digit verification code. Please check and try again.",
    };
  }

  // Code verified! Delete consumed OTP
  otpStore.delete(phone);
  return { valid: true };
}
