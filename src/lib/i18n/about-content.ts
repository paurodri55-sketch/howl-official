import type { Locale } from "@/lib/i18n/config";

export const aboutContent = {
  es: {
    title: "Sobre nosotros",
    updated: "HOWL",
    sections: [
      {
        heading: "Ropa que dice algo tuyo",
        body: [
          "HOWL nace de una idea simple: la ropa con la que sales de casa debería decir algo tuyo, no de la marca que la vende.",
        ],
      },
      {
        heading: "Tiradas, no temporadas",
        body: [
          "No hacemos temporadas. Hacemos tiradas. Cada diseño se dibuja desde cero, se imprime una vez y, cuando se agota, desaparece del catálogo para siempre. No hay reposición, no hay \"vuelve en rebajas\". Lo que te llevas es literalmente lo único que va a existir de esa pieza.",
        ],
      },
      {
        heading: "Detalle que se nota puesto",
        body: [
          "Nos obsesiona el detalle que no se ve a simple vista pero se nota al ponértela: algodón pesado de verdad (240-320 g/m²), cortes anchos que aguantan lavados sin deformarse, y una serigrafía envejecida a mano — lavado ácido, craquelado, textura — para que cada prenda salga de fábrica ya con carácter, como si hubiera sobrevivido a algo.",
        ],
      },
      {
        heading: "Cada estampado cuenta algo",
        body: [
          "Cada estampado cuenta algo: una escena, un personaje, una frase que se queda. Nada de logos vacíos ni gráficos genéricos sacados de un catálogo de plantillas. Si un diseño no tiene una historia detrás, no sale a producción.",
        ],
      },
      {
        heading: "Un proyecto pequeño, decisiones reales",
        body: [
          "Somos un proyecto joven e independiente. Diseñamos, decidimos y discutimos cada pieza como equipo antes de darla por buena — no hay departamento de marketing detrás dictando qué se vende, hay gente a la que le importa cómo queda la prenda puesta.",
        ],
      },
      {
        heading: "21 de noviembre de 2026",
        body: [
          "El primer drop sale ese día. No es una fecha de campaña, es el día en que empieza esto de verdad.",
        ],
      },
    ],
  },
  en: {
    title: "About us",
    updated: "HOWL",
    sections: [
      {
        heading: "Clothes that say something of yours",
        body: [
          "HOWL started from a simple idea: what you wear out the door should say something about you, not about the brand that sold it.",
        ],
      },
      {
        heading: "Drops, not seasons",
        body: [
          "We don't do seasons. We do drops. Every design is drawn from scratch, printed once, and once it sells out, it's gone from the catalog for good. No restocks, no \"back in the sale.\" What you get is literally the only one of its kind that will ever exist.",
        ],
      },
      {
        heading: "Detail you feel, not just see",
        body: [
          "We obsess over the detail you don't notice at a glance but feel the moment you put it on: real heavyweight cotton (240-320 g/m²), wide cuts that hold up wash after wash, and hand-aged screen printing — acid wash, cracking, texture — so every piece leaves the factory already looking like it's got a story, like it survived something.",
        ],
      },
      {
        heading: "Every print says something",
        body: [
          "Every print tells you something: a scene, a character, a line that sticks. No empty logos, no generic template graphics. If a design doesn't have a story behind it, it doesn't go into production.",
        ],
      },
      {
        heading: "A small project, real decisions",
        body: [
          "We're a young, independent project. We design, decide, and argue over every piece as a team before calling it done — there's no marketing department dictating what sells, just people who care how the piece actually looks worn.",
        ],
      },
      {
        heading: "November 21, 2026",
        body: [
          "The first drop lands that day. It's not a campaign date — it's the day this actually starts.",
        ],
      },
    ],
  },
} as const;

export function getAboutContent(locale: Locale) {
  return aboutContent[locale];
}
