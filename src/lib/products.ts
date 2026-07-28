import type { Product, ProductColor } from "@/lib/types";

const inkBlack: ProductColor = { name: "Negro desteñido", hex: "#1c1712" };
const agedCream: ProductColor = { name: "Crema envejecida", hex: "#e7d9b8" };
const oxideRust: ProductColor = { name: "Óxido", hex: "#a8452a" };
const washedDenim: ProductColor = { name: "Azul lavado", hex: "#3c4a5c" };

const tourTeeSizes: Product["sizes"] = ["S", "M", "L", "XL", "XXL"];

const standardDetails = [
  "Algodón pesado 240 g/m², percha ancha",
  "Serigrafía envejecida con lavado ácido",
  "Corte unisex clásico de los 80/90",
  "Tirada limitada — no se reimprime",
];

export const products: Product[] = [
  {
    id: "p1",
    slug: "tour-87-black-orchard",
    name: "Camiseta Tour '87",
    band: "Black Orchard",
    tourYear: "1987",
    price: 27.9,
    description:
      "Réplica de la camiseta de gira de Black Orchard, temporada '87. Estampado craquelado como si hubiera sobrevivido treinta años en el fondo de un armario.",
    details: standardDetails,
    category: "Camisetas",
    sizes: tourTeeSizes,
    colors: [inkBlack, agedCream],
    graphic: "skull",
    featured: true,
  },
  {
    id: "p2",
    slug: "widows-peak-live-at-the-pit",
    name: "Live At The Pit",
    band: "Widow's Peak",
    tourYear: "1991",
    price: 29.9,
    description:
      "Merch oficial (ficticio) del bootleg más buscado de Widow's Peak. Serigrafía a una tinta sobre algodón pesado, como salida de la furgoneta de gira.",
    details: standardDetails,
    category: "Camisetas",
    sizes: tourTeeSizes,
    colors: [inkBlack, oxideRust],
    graphic: "serpent",
    featured: true,
  },
  {
    id: "p3",
    slug: "dust-bowl-prophets-revival",
    name: "Revival Tour",
    band: "Dust Bowl Prophets",
    tourYear: "1979",
    price: 26.5,
    description:
      "La camiseta de la gira de reavivamiento de Dust Bowl Prophets. Grafismo de cruz desgastada y tipografía de cartel de carretera.",
    details: standardDetails,
    category: "Camisetas",
    sizes: tourTeeSizes,
    colors: [agedCream, inkBlack],
    graphic: "cross",
    featured: true,
    isNew: true,
  },
  {
    id: "p4",
    slug: "coyote-wire-static",
    name: "Static",
    band: "Coyote Wire",
    tourYear: "1995",
    price: 28.9,
    description:
      "Diseño inspirado en la portada de 'Static' de Coyote Wire. Rayo estampado a mano, colorido apagado por el sol.",
    details: standardDetails,
    category: "Camisetas",
    sizes: tourTeeSizes,
    colors: [inkBlack, washedDenim],
    graphic: "bolt",
  },
  {
    id: "p5",
    slug: "hollow-saints-midnight-mass",
    name: "Midnight Mass",
    band: "Hollow Saints",
    tourYear: "1983",
    price: 27.9,
    description:
      "Camiseta de la gira 'Midnight Mass' de Hollow Saints. Luna gótica sobre algodón desteñido, para las últimas filas del concierto.",
    details: standardDetails,
    category: "Camisetas",
    sizes: tourTeeSizes,
    colors: [inkBlack, agedCream],
    graphic: "moon",
    isNew: true,
  },
  {
    id: "p6",
    slug: "iron-magnolia-southbound",
    name: "Southbound",
    band: "Iron Magnolia",
    tourYear: "1989",
    price: 27.9,
    description:
      "Alas oxidadas y letras resquebrajadas para la gira 'Southbound' de Iron Magnolia. Un clásico de mercadillo de discos.",
    details: standardDetails,
    category: "Camisetas",
    sizes: tourTeeSizes,
    colors: [oxideRust, inkBlack],
    graphic: "wings",
    featured: true,
  },
  {
    id: "p7",
    slug: "midnight-combine-harvest-of-noise",
    name: "Harvest Of Noise",
    band: "Midnight Combine",
    tourYear: "1997",
    price: 45.0,
    description:
      "Sudadera pesada de la gira 'Harvest Of Noise'. Interior perchado, estampado envejecido a juego con la camiseta original.",
    details: [
      "Algodón/poliéster 320 g/m², interior perchado",
      "Serigrafía envejecida con lavado ácido",
      "Corte oversize unisex",
      "Tirada limitada — no se reimprime",
    ],
    category: "Sudaderas",
    sizes: tourTeeSizes,
    colors: [inkBlack, agedCream],
    graphic: "flame",
  },
  {
    id: "p8",
    slug: "gravel-glory-open-road",
    name: "Open Road",
    band: "Gravel & Glory",
    tourYear: "1985",
    price: 45.0,
    description:
      "Sudadera de carretera de Gravel & Glory. Estrella descentrada al pecho, como la que llevaba el roadie en la última fila del bus.",
    details: [
      "Algodón/poliéster 320 g/m², interior perchado",
      "Serigrafía envejecida con lavado ácido",
      "Corte oversize unisex",
      "Tirada limitada — no se reimprime",
    ],
    category: "Sudaderas",
    sizes: tourTeeSizes,
    colors: [oxideRust, inkBlack],
    graphic: "star",
    isNew: true,
  },
  {
    id: "p9",
    slug: "rustbelt-choir-patch",
    name: "Parche bordado",
    band: "The Rustbelt Choir",
    tourYear: "1992",
    price: 9.9,
    description:
      "Parche bordado de The Rustbelt Choir para chupa o mochila. Termoadhesivo, con borde de sarga envejecido.",
    details: [
      "Bordado 100% hilo de poliéster",
      "Base termoadhesiva + 2 ojales para coser",
      "8.5 cm de diámetro",
      "Tirada limitada — no se reimprime",
    ],
    category: "Accesorios",
    sizes: ["Única"],
    colors: [inkBlack, agedCream],
    graphic: "dove",
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, limit);
}

export function getCategories(): Product["category"][] {
  return Array.from(new Set(products.map((p) => p.category)));
}
