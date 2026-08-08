import { Anton, Oswald, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import "../globals.css";
import { CartProvider } from "@/components/cart/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NewsletterModal } from "@/components/newsletter/NewsletterModal";
import { TikTokPixel } from "@/components/analytics/TikTokPixel";
import { MetaPixel } from "@/components/analytics/MetaPixel";
import { locales, isLocale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/seo";

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

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "HOWL",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-wolf.png`,
      sameAs: [
        "https://www.instagram.com/howlofficial_/",
        "https://www.tiktok.com/@howlofficial",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "HOWL Official",
      url: SITE_URL,
      inLanguage: locale,
    },
  ];

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${oswald.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-cream">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
        <MetaPixel />
      </body>
    </html>
  );
}
