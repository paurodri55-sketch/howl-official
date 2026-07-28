import type { Product, ProductColor } from "@/lib/types";

const COLOR_SLUGS: Record<string, string> = {
  "#1c1712": "black",
  "#e7d9b8": "cream",
  "#a8452a": "rust",
  "#3c4a5c": "denim",
};

/** Foto real compuesta (prenda fotografiada + estampado), si existe para ese color. */
export function getProductPhoto(
  product: Product,
  color: ProductColor
): string | null {
  if (!product.artworkImage) return null;
  const slug = COLOR_SLUGS[color.hex];
  if (!slug) return null;
  const designName = product.artworkImage.split("/").pop()?.replace(/\.png$/, "");
  return `/photos/${designName}-${slug}.png`;
}

/** Foto real con modelo llevando la prenda (delante), en el color dado. */
export function getModelPhoto(
  product: Product,
  color: ProductColor
): string | null {
  if (!product.artworkImage) return null;
  const slug = COLOR_SLUGS[color.hex];
  if (!slug) return null;
  const designName = product.artworkImage.split("/").pop()?.replace(/\.png$/, "");
  return `/photos/models/${designName}-front-${slug}.png`;
}

/** Foto real con modelo, vista trasera (si el producto tiene diseño de espalda). */
export function getModelBackPhoto(product: Product): string | null {
  if (!product.backArtworkImage) return null;
  const designName = product.backArtworkImage.split("/").pop()?.replace(/\.png$/, "");
  return `/photos/models/${designName}-back.png`;
}
