import type { Locale } from "@/lib/i18n/config";

export interface FaqEntry {
  question: string;
  answer: string;
  keywords: string[];
}

const faq: Record<Locale, FaqEntry[]> = {
  es: [
    {
      question: "¿Cuándo abre la tienda?",
      answer:
        "HOWL abre oficialmente el 21 de noviembre de 2026. Hasta entonces puedes ver todo el catálogo, pero no se puede comprar todavía — apúntate a la lista de espera para enterarte el primer día.",
      keywords: ["lanza", "abr", "cuando", "fecha", "disponib", "estrena", "21"],
    },
    {
      question: "¿Cuánto tarda el envío?",
      answer:
        "Cada pedido se hace bajo demanda, así que la entrega tarda entre 8 y 9 días laborables desde que se confirma el pago.",
      keywords: ["tarda", "entrega", "llega", "cuanto tiempo", "dias laborables"],
    },
    {
      question: "¿El envío es gratis?",
      answer:
        "Sí, el envío es gratuito a partir de 50 € de pedido. Por debajo de esa cantidad se calcula en el checkout.",
      keywords: ["gratis", "coste", "cuesta", "precio envio", "gastos de envio"],
    },
    {
      question: "¿Puedo devolver o cambiar de talla?",
      answer:
        "Tienes 30 días naturales desde que recibes el pedido para devolverlo o cambiar de talla, sin necesidad de justificar el motivo.",
      keywords: ["devol", "cambio", "reembolso", "reembols", "devuelv"],
    },
    {
      question: "¿Qué tallas hay disponibles?",
      answer:
        "La mayoría de camisetas y sudaderas van de la S a la XXL. La talla exacta la ves en el selector de cada ficha de producto.",
      keywords: ["talla", "tallas", "size", "medida"],
    },
    {
      question: "¿Los diseños se reponen?",
      answer:
        "No. Cada diseño es una tirada única — cuando se agota, no se vuelve a fabricar.",
      keywords: ["tirada", "limitad", "repon", "vuelve", "stock", "agota"],
    },
    {
      question: "¿El pago es seguro?",
      answer:
        "Sí, el pago se procesa con Stripe, la misma pasarela que usan miles de tiendas online — HOWL nunca ve ni guarda tu número de tarjeta.",
      keywords: ["pago", "segur", "stripe", "tarjeta", "fiable"],
    },
    {
      question: "¿Hacéis envíos fuera de España?",
      answer:
        "Todavía no lo tenemos confirmado en la web — escríbenos por Instagram (@howlofficial_) y te decimos disponibilidad para tu país.",
      keywords: [
        "internacional",
        "europa",
        "fuera de espana",
        "otro pais",
        "extranjero",
        "francia",
        "portugal",
        "italia",
        "alemania",
        "reino unido",
        "estados unidos",
        "mexico",
        "argentina",
        "latinoamerica",
      ],
    },
  ],
  en: [
    {
      question: "When does the shop open?",
      answer:
        "HOWL officially opens on November 21, 2026. Until then you can browse the full catalog, but nothing is purchasable yet — join the waitlist to know the moment it drops.",
      keywords: ["launch", "open", "when", "date", "available", "drop", "21"],
    },
    {
      question: "How long does shipping take?",
      answer:
        "Every order is made to demand, so delivery takes 8 to 9 business days once payment is confirmed.",
      keywords: ["delivery", "arrive", "how long", "business days", "take to ship"],
    },
    {
      question: "Is shipping free?",
      answer:
        "Yes, shipping is free on orders over €50. Below that, the cost is calculated at checkout.",
      keywords: ["free", "cost", "price shipping", "shipping fee"],
    },
    {
      question: "Can I return or exchange for a different size?",
      answer:
        "You have 30 calendar days from delivery to return your order or exchange for a different size, no reason required.",
      keywords: ["return", "exchange", "refund", "size change"],
    },
    {
      question: "What sizes are available?",
      answer:
        "Most tees and hoodies run from S to XXL. The exact sizes show up in the selector on each product page.",
      keywords: ["size", "sizes", "measurement"],
    },
    {
      question: "Do designs come back in stock?",
      answer:
        "No. Every design is a one-time drop — once it sells out, it's not made again.",
      keywords: ["restock", "limited", "back in stock", "sold out", "drop again"],
    },
    {
      question: "Is payment secure?",
      answer:
        "Yes, payments are processed through Stripe, the same gateway used by thousands of online stores — HOWL never sees or stores your card number.",
      keywords: ["payment", "secure", "stripe", "card", "safe"],
    },
    {
      question: "Do you ship outside Spain?",
      answer:
        "That's not confirmed on the site yet — message us on Instagram (@howlofficial_) and we'll tell you availability for your country.",
      keywords: [
        "international",
        "europe",
        "outside spain",
        "other country",
        "abroad",
        "france",
        "germany",
        "italy",
        "portugal",
        "united kingdom",
        "united states",
        "mexico",
        "canada",
      ],
    },
  ],
};

export function getFaq(locale: Locale): FaqEntry[] {
  return faq[locale];
}

export function matchFaq(locale: Locale, query: string): FaqEntry | null {
  const normalized = query
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  let best: { entry: FaqEntry; score: number } | null = null;
  for (const entry of faq[locale]) {
    const score = entry.keywords.filter((kw) => normalized.includes(kw)).length;
    if (score > 0 && (!best || score > best.score)) {
      best = { entry, score };
    }
  }
  return best?.entry ?? null;
}
