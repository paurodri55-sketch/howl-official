import type { Metadata } from "next";

const SITE_URL = "https://howlofficial.com";
const SITE_NAME = "HOWL Official";
const DESCRIPTION =
  "Camisetas y sudaderas de diseño propio. Estampados trabajados a mano, algodón pesado, tiradas limitadas.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Ropa de diseño propio`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: ["HOWL", "HOWL Official", "howlofficial", "streetwear", "camisetas diseño", "ropa urbana"],
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Ropa de diseño propio`,
    description: DESCRIPTION,
    images: ["/logo-wolf.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Ropa de diseño propio`,
    description: DESCRIPTION,
    images: ["/logo-wolf.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
