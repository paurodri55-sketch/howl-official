import type { Product, ProductColor } from "@/lib/types";

const COLOR_SLUGS: Record<string, string> = {
  "#1c1712": "black",
  "#e7d9b8": "cream",
  "#a8452a": "rust",
  "#3c4a5c": "denim",
  "#e0b23c": "yellow",
  "#f6f3ee": "white",
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

/** Deduce el color "horneado" en un nombre de archivo de foto trasera fija (ej. "moon-back-black" -> "black"). */
function inferBakedColorSlug(filename: string): string | null {
  for (const slug of Object.values(COLOR_SLUGS)) {
    if (filename.endsWith(`-${slug}`)) return slug;
  }
  return null;
}

/**
 * Foto real de la prenda por detrás (sin modelo). Si el producto tiene diseño
 * trasero propio (foto de estudio real), se usa esa. Si no, y el producto ya
 * tiene foto real delantera, se usa la camiseta lisa real como trasera (mejor
 * que el mockup vectorial, que no combina con el resto de fotos reales).
 *
 * Cuando `backHeroPhoto` es una única foto fija (no una por color), se
 * comprueba que su color coincida con el color pedido — si no coincide (ej.
 * el producto tiene 3 colores pero la foto trasera está "horneada" en negro),
 * se cae a la camiseta lisa trasera del color correcto en vez de mostrar un
 * color equivocado.
 */
export function getBackProductPhoto(
  product: Product,
  color: ProductColor
): string | null {
  const slug = COLOR_SLUGS[color.hex];

  const heroForColor = product.backHeroPhotoByColor?.[color.hex];
  if (heroForColor) {
    return `/photos/${heroForColor}.png`;
  }

  if (product.backHeroPhoto) {
    const bakedSlug = inferBakedColorSlug(product.backHeroPhoto);
    if (!bakedSlug || bakedSlug === slug) {
      return `/photos/${product.backHeroPhoto}.png`;
    }
    if (slug && product.category === "Camisetas") {
      return `/photos/blank-shirt-back-${slug}.png`;
    }
    return null;
  }

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
