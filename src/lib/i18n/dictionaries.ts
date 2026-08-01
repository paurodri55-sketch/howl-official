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
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
