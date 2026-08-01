import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const SITE_URL = "https://howlofficial.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${SITE_URL}/producto/${product.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/catalogo`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...productRoutes,
  ];
}
