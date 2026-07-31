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

export const metadata: Metadata = {
  title: "HOWL — Ropa de diseño propio",
  description:
    "Camisetas y sudaderas de diseño propio. Estampados trabajados a mano, algodón pesado, tiradas limitadas.",
  openGraph: {
    title: "HOWL — Ropa de diseño propio",
    description:
      "Camisetas y sudaderas de diseño propio. Estampados trabajados a mano, algodón pesado, tiradas limitadas.",
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
