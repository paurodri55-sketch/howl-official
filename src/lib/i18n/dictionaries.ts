import type { Locale } from "./config";

export const dictionaries = {
  es: {
    header: {
      home: "Inicio",
      catalog: "Catálogo",
      cartAria: "Ver carrito",
    },
    footer: {
      tagline:
        "Ropa de diseño propio. Algodón pesado, estampados trabajados a mano, tiradas limitadas.",
      earlyAccess: "Acceso anticipado a nuevas tiradas",
      shopHeading: "Tienda",
      catalog: "Catálogo",
      cart: "Carrito",
      shippingHeading: "Envíos y devoluciones",
      shippingFree: "Envío gratis a partir de 50 €",
      shippingTime: "Entrega en 3–5 días laborables",
      shippingReturns: "Devoluciones gratuitas hasta 30 días",
      followHeading: "Síguenos",
      copyright: (year: number) => `© ${year} HOWL. Todos los derechos reservados.`,
      disclaimer:
        "Marcas, bandas y colecciones son ficticias. Proyecto de demostración sin afiliación con marcas o artistas reales.",
    },
    newsletter: {
      ctaSection: "Acceso anticipado",
      ctaFooter: "Entrar",
      ctaModal: "Quiero acceso anticipado",
      placeholder: "tu@email.com",
      success:
        "Dentro. Sabrás antes que nadie cuándo sale la tirada — y cuándo se agota.",
      error: "Algo falló, prueba otra vez.",
      sectionEyebrow: "Lista de espera",
      sectionHeading1: "Entérate antes de que",
      sectionHeading2: "se agote",
      sectionBody:
        "Cada tirada es única y no vuelve. Quien está dentro, sabe antes que nadie cuándo sale la siguiente.",
      modalEyebrow: "Lista de espera",
      modalHeading1: "Acceso anticipado",
      modalHeading2: "antes de que se agote",
      modalBody: "Un aviso cuando sale la siguiente tirada. Nada más.",
      modalCountdown: (days: number) => `Faltan ${days} días — 21 de noviembre`,
      modalClose: "Cerrar",
    },
    home: {
      heroEyebrow: "Diseños propios · Edición limitada",
      heroHeading1: "Ropa con",
      heroHeading2: "sello propio",
      heroBody:
        "Camisetas y sudaderas de diseño propio. Algodón pesado, estampados trabajados a mano y tiradas que no vuelven.",
      heroCtaCatalog: "Ver catálogo",
      heroCtaFeatured: "Destacados",
      categoryHeading: "Compra por categoría",
      viewArrow: "Ver →",
      countdownEyebrow: "Próximamente",
      countdownHeading: "21 de noviembre",
      countdownDaysLabel: "días",
      countdownBody: "El primer drop de HOWL sale ese día. No antes.",
      countdownCta: "Avísame cuando salga →",
      newArrivalsHeading: "Novedades",
      viewAllLabel: "Ver todo →",
      featuredHeading: "Destacados",
      whyHowl: [
        {
          title: "Algodón 240–320 g/m²",
          text: "Percha ancha, corte clásico. Nada de camisetas de papel.",
        },
        {
          title: "Serigrafía envejecida",
          text: "Lavado ácido y craquelado a mano para que parezca que sobrevivió a la gira.",
        },
        {
          title: "Tiradas limitadas",
          text: "Cada diseño se imprime una vez. Cuando se agota, no vuelve.",
        },
      ],
      testimonialsHeading: "Lo que dice quien ya pidió",
      testimonials: [
        {
          name: "Marcos R.",
          quote:
            "La tela es densa de verdad, no como esas camisetas finas de otras tiendas. El estampado del escorpión parece serigrafiado a mano.",
          rating: 5,
        },
        {
          name: "Elena V.",
          quote:
            "Pedí la de Hollow Saints y llegó en 3 días. La luna gótica se ve brutal en persona, mejor que en las fotos.",
          rating: 5,
        },
        {
          name: "Diego T.",
          quote:
            "Tirada limitada de verdad — quise repetir color y ya no estaba. Al menos el envío fue rápido.",
          rating: 4,
        },
      ],
      finalCtaHeading: "Nueva colección en la calle",
      finalCtaBody: "Antes de que se agote la talla M, otra vez.",
      finalCtaButton: "Entrar a la tienda",
    },
    catalog: {
      pageTitle: "Catálogo",
      metaTitle: "Catálogo — HOWL",
      metaDescription: "Todas las camisetas, sudaderas y accesorios de HOWL.",
      all: "Todos",
      empty: "No hay productos en esta categoría.",
      categoryLabels: {
        Camisetas: "Camisetas",
        Sudaderas: "Sudaderas",
        Accesorios: "Accesorios",
        Stickers: "Stickers",
      } as Record<string, string>,
    },
    product: {
      bestSeller: "Más vendido",
      new: "Nuevo",
      soldSuffix: "vendidas",
      numberLocale: "es-ES",
    },
  },
  en: {
    header: {
      home: "Home",
      catalog: "Catalog",
      cartAria: "View cart",
    },
    footer: {
      tagline:
        "Original streetwear. Heavyweight cotton, hand-worked prints, limited runs.",
      earlyAccess: "Early access to new drops",
      shopHeading: "Shop",
      catalog: "Catalog",
      cart: "Cart",
      shippingHeading: "Shipping & returns",
      shippingFree: "Free shipping over €50",
      shippingTime: "Delivery in 3–5 business days",
      shippingReturns: "Free returns within 30 days",
      followHeading: "Follow us",
      copyright: (year: number) => `© ${year} HOWL. All rights reserved.`,
      disclaimer:
        "Brands, bands and collections are fictional. Demo project, not affiliated with any real brand or artist.",
    },
    newsletter: {
      ctaSection: "Get early access",
      ctaFooter: "Join",
      ctaModal: "I want early access",
      placeholder: "you@email.com",
      success:
        "You're in. You'll know before anyone else when the drop launches — and when it sells out.",
      error: "Something went wrong, try again.",
      sectionEyebrow: "Waitlist",
      sectionHeading1: "Know before it",
      sectionHeading2: "sells out",
      sectionBody:
        "Every drop is one-of-a-kind and never comes back. Those on the list know first when the next one lands.",
      modalEyebrow: "Waitlist",
      modalHeading1: "Early access",
      modalHeading2: "before it sells out",
      modalBody: "A heads-up when the next drop launches. Nothing else.",
      modalCountdown: (days: number) => `${days} days left — November 21`,
      modalClose: "Close",
    },
    home: {
      heroEyebrow: "Original designs · Limited edition",
      heroHeading1: "Clothes with",
      heroHeading2: "your own mark",
      heroBody:
        "Original tees and hoodies. Heavyweight cotton, hand-worked prints and drops that never come back.",
      heroCtaCatalog: "View catalog",
      heroCtaFeatured: "Featured",
      categoryHeading: "Shop by category",
      viewArrow: "View →",
      countdownEyebrow: "Coming soon",
      countdownHeading: "November 21",
      countdownDaysLabel: "days",
      countdownBody: "The first HOWL drop launches that day. Not before.",
      countdownCta: "Notify me when it drops →",
      newArrivalsHeading: "New arrivals",
      viewAllLabel: "View all →",
      featuredHeading: "Featured",
      whyHowl: [
        {
          title: "240–320 g/m² cotton",
          text: "Wide hanger, classic cut. None of that paper-thin tee stuff.",
        },
        {
          title: "Aged screen print",
          text: "Acid-washed and hand-cracked so it looks like it survived the tour.",
        },
        {
          title: "Limited runs",
          text: "Each design gets printed once. Once it sells out, it's gone for good.",
        },
      ],
      testimonialsHeading: "What people who already ordered say",
      testimonials: [
        {
          name: "Marcos R.",
          quote:
            "The fabric is genuinely heavyweight, not like those thin tees from other stores. The scorpion print looks hand-screened.",
          rating: 5,
        },
        {
          name: "Elena V.",
          quote:
            "Ordered the Hollow Saints tee and it arrived in 3 days. The gothic moon looks brutal in person, better than the photos.",
          rating: 5,
        },
        {
          name: "Diego T.",
          quote:
            "Actually limited — tried to reorder a color and it was already gone. At least shipping was fast.",
          rating: 4,
        },
      ],
      finalCtaHeading: "New collection is out",
      finalCtaBody: "Before size M sells out again.",
      finalCtaButton: "Enter the shop",
    },
    catalog: {
      pageTitle: "Catalog",
      metaTitle: "Catalog — HOWL",
      metaDescription: "All tees, hoodies and accessories from HOWL.",
      all: "All",
      empty: "No products in this category.",
      categoryLabels: {
        Camisetas: "Tees",
        Sudaderas: "Hoodies",
        Accesorios: "Accessories",
        Stickers: "Stickers",
      } as Record<string, string>,
    },
    product: {
      bestSeller: "Best seller",
      new: "New",
      soldSuffix: "sold",
      numberLocale: "en-US",
    },
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
