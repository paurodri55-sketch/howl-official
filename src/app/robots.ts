import type { MetadataRoute } from "next";

const SITE_URL = "https://howlofficial.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/checkout", "/carrito"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
