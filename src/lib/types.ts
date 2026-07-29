export type Size = "S" | "M" | "L" | "XL" | "XXL" | "Única";

export interface ProductColor {
  name: string;
  hex: string;
}

export type GraphicIcon =
  | "bolt"
  | "skull"
  | "star"
  | "wings"
  | "moon"
  | "serpent"
  | "cross"
  | "flame"
  | "dove"
  | "scorpion"
  | "landscape";

export type ProductCategory = "Camisetas" | "Sudaderas" | "Accesorios";

export interface TourDate {
  city: string;
  date: string;
}

export interface LogoStyle {
  tracking: "tight" | "normal" | "wide" | "wider";
  skew?: number;
  decoration?: "bar-both" | "bar-under" | "bar-over" | "none";
  accent: string;
  /** Color vivo de marca (barras + glifos de acento + resplandor del texto). */
  accentColor?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  band: string;
  tourYear: string;
  price: number;
  description: string;
  details: string[];
  category: ProductCategory;
  sizes: Size[];
  colors: ProductColor[];
  graphic: GraphicIcon;
  logoStyle: LogoStyle;
  tourDates: TourDate[];
  featured?: boolean;
  isNew?: boolean;
  /** Ilustración real (PNG, fondo transparente) que sustituye al icono SVG cuando está presente. */
  artworkImage?: string;
  /** Ilustración distinta para la vista trasera (si no se define, se reutiliza artworkImage). */
  backArtworkImage?: string;
  /** Si es true, la vista delantera muestra solo un logo pequeño (sin nombre ni frase), estilo pecho. */
  frontLogoOnly?: boolean;
  /** Si es true, el estampado es solo tipografía (sin ilustración ni recuadro). */
  textOnly?: boolean;
  /** Texto de cabecera distinto para la vista trasera (si no se define, se reutiliza band). */
  backBand?: string;
  /** Frase/cita corta estilo bootleg tee, en mayúsculas, bajo el nombre de banda. */
  tagline?: string;
  /** Valoración media (0-5) mostrada como estrellas. */
  rating?: number;
  /** Número de reseñas asociadas a la valoración. */
  reviewCount?: number;
  /** Número total de unidades vendidas (para mostrar prueba social). */
  purchases?: number;
  /** Precio original antes de descuento, mostrado tachado junto al precio actual. */
  compareAtPrice?: number;
  /** Etiqueta antes del año/número ("Gira", "Colección"...). Por defecto "Gira". */
  editionLabel?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  band: string;
  tourYear: string;
  price: number;
  size: Size;
  color: ProductColor;
  graphic: GraphicIcon;
  logoStyle: LogoStyle;
  artworkImage?: string;
  quantity: number;
}
