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

export type ProductCategory = "Camisetas" | "Sudaderas" | "Accesorios" | "Stickers";

export interface TourDate {
  city: string;
  date: string;
}

export interface LogoStyle {
  skew?: number;
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
  /** Traducción al inglés de `description`. Si no existe, se usa la versión en español como fallback. */
  descriptionEn?: string;
  details: string[];
  category: ProductCategory;
  sizes: Size[];
  colors: ProductColor[];
  graphic: GraphicIcon;
  logoStyle: LogoStyle;
  tourDates: TourDate[];
  isNew?: boolean;
  /** Si es false, el producto no aparece en catálogo/inicio pero sigue accesible por enlace directo (stock reducido temporal). Por defecto true. */
  visible?: boolean;
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
  /** Si es true, backArtworkImage ya incluye todo el texto grabado (foto real): no superponer band/tagline/año encima. */
  backTextBaked?: boolean;
  /**
   * Nombre base (sin extensión) de una foto real de la trasera en
   * /photos/, generada solo en negro. Se muestra siempre como
   * referencia de estilo, igual que las fotos de modelo en negro,
   * independientemente del color seleccionado.
   */
  backHeroPhoto?: string;
  /** Igual que backHeroPhoto, pero con una foto real distinta por color (clave = hex del color). Tiene prioridad sobre backHeroPhoto cuando existe entrada para el color seleccionado. */
  backHeroPhotoByColor?: Partial<Record<string, string>>;
  /** Nombre base (sin extensión) de una foto real en /photos/ que se usa siempre como "Foto", sea cual sea la categoría o el color (para accesorios como stickers). */
  photoOverride?: string;
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
