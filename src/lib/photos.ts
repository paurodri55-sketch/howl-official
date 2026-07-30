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
  if (!product.artworkImage || product.category === "Accesorios") return null;
  const slug = COLOR_SLUGS[color.hex];
  if (!slug) return null;
  const designName = product.artworkImage.split("/").pop()?.replace(/\.png$/, "");
  return `/photos/${designName}-${slug}.png`;
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
  if (product.artworkImage) {
    return `/photos/blank-shirt-back-${slug}.png`;
  }
  return null;
}

/** Foto real con modelo llevando la prenda (delante), en el color dado. */
export function getModelPhoto(
  product: Product,
  color: ProductColor
): string | null {
  if (!product.artworkImage || product.skipModelPhotos || product.category === "Accesorios") return null;
  const slug = COLOR_SLUGS[color.hex];
  if (!slug) return null;
  const designName = product.artworkImage.split("/").pop()?.replace(/\.png$/, "");
  return `/photos/models/${designName}-front-${slug}.png`;
}

/** Foto real con modelo, vista trasera (si el producto tiene diseño de espalda). */
export function getModelBackPhoto(product: Product): string | null {
  if (!product.backArtworkImage || product.skipModelPhotos) return null;
  const designName = product.backArtworkImage.split("/").pop()?.replace(/\.png$/, "");
  return `/photos/models/${designName}-back.png`;
}
