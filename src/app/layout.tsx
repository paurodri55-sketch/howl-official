import type { Metadata } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterModal } from "@/components/newsletter/NewsletterModal";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

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
  return (
    <html
      lang="es"
      className={`${anton.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <div className="grain-overlay" />
        <div className="vignette" />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <NewsletterModal />
        </CartProvider>
      </body>
    </html>
  );
}
