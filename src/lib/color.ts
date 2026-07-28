import type { ProductColor } from "@/lib/types";

/** Devuelve un color de tinta (crema u oxido-tinta) legible sobre el hex de tela dado. */
export function getPrintInk(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? "#100d0a" : "#efe4c8";
}

export function isDarkGarment(hex: string): boolean {
  return getPrintInk(hex) === "#efe4c8";
}

/**
 * Elige un color de muestra estable por producto pero distinto entre
 * productos, para que el catálogo no se vea todo del mismo tono oscuro.
 */
export function pickShowcaseColor(product: {
  id: string;
  colors: ProductColor[];
}): ProductColor {
  const idx = product.id.charCodeAt(product.id.length - 1) % product.colors.length;
  return product.colors[idx] ?? product.colors[0];
}
