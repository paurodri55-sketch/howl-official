import type { Product, ProductColor } from "@/lib/types";

const COLOR_SLUGS: Record<string, string> = {
  "#1c1712": "black",
  "#e7d9b8": "cream",
  "#a8452a": "rust",
  "#3c4a5c": "denim",
  "#e0b23c": "yellow",
};

/** Foto real compuesta (prenda fotografiada + estampado), si existe para ese color. */
export function getProductPhoto(
  product: Product,
  color: ProductColor
): string | null {
  if (product.photoOverride) return `/photos/${product.photoOverride}.png`;
  if (!product.artworkImage) return null;
  const slug = COLOR_SLUGS[color.hex];
  if (!slug) return null;
  const designName = product.artworkImage.split("/").pop()?.replace(/\.png$/, "");
  return `/photos/${designName}-${slug}.png`;
}

/**
 * True si el producto tiene una foto trasera REAL (no el fallback de camiseta
 * lisa) — para decidir si tiene sentido mostrarla como hover en el catálogo.
 */
export function hasRealBackPhoto(product: Product): boolean {
  return Boolean(product.backHeroPhoto || (product.backArtworkImage && product.backTextBaked));
}

/**
 * Foto real de la prenda por detrás (sin modelo). Si el producto tiene diseño
 * trasero propio (foto de estudio real), se usa esa. Si no, y el producto ya
 * tiene foto real delantera, se usa la camiseta lisa real como trasera (mejor
 * que el mockup vectorial, que no combina con el resto de fotos reales).
 */
export function getBackProductPhoto(
  product: Product,
  color: ProductColor
): string | null {
  if (product.backHeroPhoto) {
    return `/photos/${product.backHeroPhoto}.png`;
  }
  const slug = COLOR_SLUGS[color.hex];
  if (!slug) return null;
  if (product.backArtworkImage && product.backTextBaked) {
    const designName = product.backArtworkImage.split("/").pop()?.replace(/\.png$/, "");
    return `/photos/${designName}-${slug}.png`;
  }
  if (product.artworkImage && product.category === "Camisetas") {
    return `/photos/blank-shirt-back-${slug}.png`;
  }
  return null;
}
