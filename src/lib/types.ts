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
  | "dove";

export type ProductCategory = "Camisetas" | "Sudaderas" | "Accesorios";

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
  featured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  band: string;
  price: number;
  size: Size;
  color: ProductColor;
  graphic: GraphicIcon;
  quantity: number;
}
