import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api",
          "/api/*",
          "/checkout",
          "/checkout/*",
          "/account",
          "/account/*",
          "/seller",
          "/seller/*",
        ],
      },
    ],
    sitemap: "https://tourmate.lk/sitemap.xml",
  };
}
