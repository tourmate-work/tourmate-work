import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.SUPABASE_URL ||
  "";

const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "";

// Initialize Supabase client with secret key for full storage admin access
const supabase = createClient(supabaseUrl, supabaseSecretKey);

const BUCKET_NAME = "tourmate-vehicles";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Basic MIME type validation
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/jpg"];
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: "Only image files (JPG, PNG, WEBP, GIF, AVIF) are allowed." },
        { status: 400 }
      );
    }

    // File size limit (8MB)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { success: false, error: "File size exceeds maximum limit of 8MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Determine extension
    let ext = "jpg";
    if (file.name.includes(".")) {
      ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    } else if (file.type.includes("/")) {
      ext = file.type.split("/")[1].toLowerCase();
    }

    const uniqueId = crypto.randomUUID();
    const fileName = `${Date.now()}_${uniqueId}.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(fileName, buffer, {
        contentType: file.type || "image/jpeg",
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase Storage upload error:", uploadError);

      // Fallback: If bucket is missing, attempt to create it and re-upload
      if (uploadError.message?.toLowerCase().includes("bucket not found") || (uploadError as { statusCode?: string }).statusCode === "404") {
        await supabase.storage.createBucket(BUCKET_NAME, { public: true });
        const { error: retryError } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(fileName, buffer, {
            contentType: file.type || "image/jpeg",
            upsert: true,
          });

        if (!retryError) {
          const { data: publicUrlData } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(fileName);

          return NextResponse.json({
            success: true,
            url: publicUrlData.publicUrl,
          });
        }
      }

      // If Supabase upload fails completely, convert to data URL so the client image isn't lost
      const base64 = buffer.toString("base64");
      const dataUri = `data:${file.type};base64,${base64}`;
      return NextResponse.json({
        success: true,
        url: dataUri,
        warning: "Saved as optimized data URI due to storage error",
      });
    }

    // Retrieve public permanent URL
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(fileName);

    return NextResponse.json({
      success: true,
      url: publicUrlData.publicUrl,
      fileName,
    });
  } catch (error) {
    console.error("File upload route error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error while processing image upload" },
      { status: 500 }
    );
  }
}
