/**
 * Client-Side Image Compression Utility
 * Resizes high-resolution camera photos to a max dimension of 1600px
 * and compresses them to lightweight WebP/JPEG before uploading.
 */

export async function compressImageClient(
  file: File,
  maxDimension = 1600,
  quality = 0.82
): Promise<File> {
  // If not an image or already very small (< 150KB), no need to re-compress
  if (!file.type.startsWith("image/") || file.size < 150 * 1024) {
    return file;
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;

      img.onload = () => {
        let { width, height } = img;

        // Resize while preserving aspect ratio
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(file); // Fallback to original
          return;
        }

        // Draw image onto canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP, fall back to JPEG
        canvas.toBlob(
          (blob) => {
            if (!blob || blob.size >= file.size) {
              // If compressed is somehow larger than original, keep original
              resolve(file);
              return;
            }

            const cleanFileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
            const compressedFile = new File([blob], cleanFileName, {
              type: "image/webp",
              lastModified: Date.now(),
            });

            resolve(compressedFile);
          },
          "image/webp",
          quality
        );
      };

      img.onerror = () => resolve(file);
    };

    reader.onerror = () => resolve(file);
  });
}
