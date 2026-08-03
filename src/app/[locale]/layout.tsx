import { Anton, Oswald, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterModal } from "@/components/newsletter/NewsletterModal";
import { TikTokPixel } from "@/components/analytics/TikTokPixel";
import { locales, isLocale } from "@/lib/i18n/config";

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

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <div className="grain-overlay" />
        <div className="vignette" />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer locale={locale} />
          <NewsletterModal locale={locale} />
        </CartProvider>
        <Analytics />
        <TikTokPixel />
      </body>
    </html>
  );
}
