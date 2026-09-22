import type { Metadata } from "next";

/**
 * Single source of truth for Tourmate SEO configuration.
 * Reads environment variable if set, otherwise defaults to the verified production deployment domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://tourmate-work.vercel.app"
).replace(/\/+$/, "");

export const SITE_NAME = "Tourmate Rentals Sri Lanka";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero-sri-lanka.jpg`;

/**
 * Construct an absolute URL given a relative pathname.
 */
export function absoluteUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Construct canonical URL for a path.
 */
export function buildCanonical(path: string = ""): string {
  return absoluteUrl(path);
}

/**
 * Helper to generate consistent Open Graph and Twitter metadata objects.
 */
export function buildOpenGraphMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  imageAlt = "Tourmate Car Rental Sri Lanka",
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}): Pick<Metadata, "openGraph" | "twitter"> {
  const url = absoluteUrl(path);
  const resolvedImage = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_LK",
      type,
      images: [
        {
          url: resolvedImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [resolvedImage],
    },
  };
}
