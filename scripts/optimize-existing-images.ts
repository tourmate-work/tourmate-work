import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import fs from "fs";
import path from "path";

// Load .env manually
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
} catch (e) {
  console.warn("Could not read .env file:", e);
}

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const BUCKET_NAME = "tourmate-vehicles";

async function main() {
  console.log("Connecting to Supabase bucket:", BUCKET_NAME);
  const { data: files, error } = await supabase.storage.from(BUCKET_NAME).list("", {
    limit: 100,
    sortBy: { column: "name", order: "desc" },
  });

  if (error) {
    console.error("Failed to list files:", error);
    process.exit(1);
  }

  console.log(`Found ${files.length} files in bucket ${BUCKET_NAME}.`);

  let totalOriginalBytes = 0;
  let totalOptimizedBytes = 0;
  let optimizedCount = 0;

  for (const file of files) {
    const fileName = file.name;
    if (fileName.startsWith(".")) continue;

    const { data: fileData, error: downloadError } = await supabase.storage
      .from(BUCKET_NAME)
      .download(fileName);

    if (downloadError || !fileData) {
      console.error(`Failed to download ${fileName}:`, downloadError);
      continue;
    }

    const buffer = Buffer.from(await fileData.arrayBuffer());
    const originalSizeKb = buffer.length / 1024;
    totalOriginalBytes += buffer.length;

    // Only optimize if > 250 KB
    if (buffer.length < 250 * 1024) {
      console.log(`[SKIP] ${fileName} is already light (${originalSizeKb.toFixed(1)} KB)`);
      totalOptimizedBytes += buffer.length;
      continue;
    }

    console.log(`[OPTIMIZING] ${fileName} (${originalSizeKb.toFixed(1)} KB)...`);

    try {
      let optimizedBuffer: Buffer;
      let contentType = "image/jpeg";

      if (fileName.endsWith(".png")) {
        // For png, optimize with png compression or convert to clean progressive jpeg
        optimizedBuffer = await sharp(buffer)
          .rotate()
          .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
          .png({ quality: 80, compressionLevel: 8 })
          .toBuffer();
        contentType = "image/png";
      } else if (fileName.endsWith(".webp")) {
        optimizedBuffer = await sharp(buffer)
          .rotate()
          .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
          .webp({ quality: 80, effort: 4 })
          .toBuffer();
        contentType = "image/webp";
      } else {
        // default to progressive mozjpeg
        optimizedBuffer = await sharp(buffer)
          .rotate()
          .resize(1600, 1600, { fit: "inside", withoutEnlargement: true })
          .jpeg({ quality: 80, progressive: true, mozjpeg: true })
          .toBuffer();
        contentType = "image/jpeg";
      }

      const optimizedSizeKb = optimizedBuffer.length / 1024;
      const reduction = (
        ((buffer.length - optimizedBuffer.length) / buffer.length) *
        100
      ).toFixed(1);

      // Re-upload with upsert: true and 1-year immutable cacheControl
      const { error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(fileName, optimizedBuffer, {
          contentType,
          cacheControl: "31536000, public, immutable",
          upsert: true,
        });

      if (uploadError) {
        console.error(`  -> Upload failed for ${fileName}:`, uploadError);
        totalOptimizedBytes += buffer.length;
      } else {
        console.log(
          `  -> SUCCESS: ${originalSizeKb.toFixed(1)} KB -> ${optimizedSizeKb.toFixed(1)} KB (${reduction}% smaller)`
        );
        totalOptimizedBytes += optimizedBuffer.length;
        optimizedCount++;
      }
    } catch (err) {
      console.error(`  -> Error processing ${fileName}:`, err);
      totalOptimizedBytes += buffer.length;
    }
  }

  const origMb = (totalOriginalBytes / (1024 * 1024)).toFixed(2);
  const optMb = (totalOptimizedBytes / (1024 * 1024)).toFixed(2);
  const totalSaved = (
    ((totalOriginalBytes - totalOptimizedBytes) / totalOriginalBytes) *
    100
  ).toFixed(1);

  console.log("\n==========================================");
  console.log(`OPTIMIZATION COMPLETE!`);
  console.log(`Optimized ${optimizedCount} heavy images.`);
  console.log(`Total storage payload: ${origMb} MB -> ${optMb} MB (${totalSaved}% reduction)`);
  console.log("==========================================\n");
}

main();
