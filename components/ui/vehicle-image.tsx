"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";
import { Loader2, Image as ImageIcon } from "lucide-react";

export interface VehicleImageProps extends Omit<ImageProps, "src" | "onLoad" | "onError"> {
  src?: string | null;
  fallbackName?: string;
  containerClassName?: string;
  showSpinner?: boolean;
}

export function VehicleImage({
  src,
  alt,
  fill = true,
  className = "",
  containerClassName = "",
  fallbackName,
  showSpinner = true,
  priority = false,
  sizes,
  ...rest
}: VehicleImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Clean and validate source string
  const validSrc = typeof src === "string" ? src.trim() : null;

  // Whenever source URL changes (e.g. thumbnail clicked), re-engage loading state
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [validSrc]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${containerClassName}`}>
      {/* Loading Skeleton / Shimmer Animation when image takes time to load */}
      {isLoading && !hasError && validSrc && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100 dark:bg-[#111116] transition-opacity duration-300">
          {/* Shimmer sweep effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent animate-pulse" />

          {showSpinner && (
            <div className="relative z-20 flex flex-col items-center gap-2 px-3 py-2 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white shadow-md">
              <Loader2 className="h-5 w-5 animate-spin text-violet-400" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-200">
                Loading photo...
              </span>
            </div>
          )}
        </div>
      )}

      {/* Actual Vehicle Photo */}
      {validSrc && !hasError ? (
        <Image
          src={validSrc}
          alt={alt || "Vehicle photo"}
          fill={fill}
          priority={priority}
          sizes={sizes}
          className={`transition-all duration-500 ease-out ${
            isLoading ? "opacity-0 scale-98" : "opacity-100 scale-100"
          } ${className}`}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          {...rest}
        />
      ) : (
        /* Clean, modern photo placeholder if image is missing or cannot load */
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#111116] text-slate-400 p-4 text-center">
          <div className="h-10 w-10 rounded-full bg-slate-200/80 dark:bg-white/5 flex items-center justify-center mb-2">
            <ImageIcon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
          </div>
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 truncate max-w-full">
            {fallbackName || alt || "Vehicle Preview"}
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">TourMate Fleet</span>
        </div>
      )}
    </div>
  );
}
