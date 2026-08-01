import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { withLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).footer;

  return (
    <footer className="mt-24 border-t border-ink-line bg-ink-soft">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl text-cream">HOWL</p>
            <p className="mt-2 text-sm text-cream-dim max-w-xs">{t.tagline}</p>
            <p className="mt-5 font-condensed uppercase tracking-widest text-xs text-cream-dim/70 mb-2">
              {t.earlyAccess}
            </p>
            <NewsletterForm variant="footer" source="footer" locale={locale} />
          </div>

          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-3">
              {t.shopHeading}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={withLocale("/catalogo", locale)} className="hover:text-rust-light">
                  {t.catalog}
                </Link>
              </li>
              <li>
                <Link href={withLocale("/carrito", locale)} className="hover:text-rust-light">
                  {t.cart}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-3">
              {t.shippingHeading}
            </p>
            <ul className="space-y-2 text-sm text-cream-dim">
              <li>{t.shippingFree}</li>
              <li>{t.shippingTime}</li>
              <li>{t.shippingReturns}</li>
            </ul>
          </div>

          <div>
            <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-3">
              {t.followHeading}
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/howlofficial_/"
                  className="flex items-center gap-2 hover:text-rust-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-none stroke-current"
                    strokeWidth={1.6}
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@howlofficial"
                  className="flex items-center gap-2 hover:text-rust-light"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M16.5 3c.3 1.9 1.5 3.3 3.5 3.6v2.6c-1.3 0-2.5-.4-3.5-1.1v6.6c0 3-2.4 5.3-5.3 5.3S5.9 17.6 5.9 14.6c0-2.9 2.3-5.2 5.1-5.3v2.7c-1.4.1-2.5 1.3-2.5 2.7 0 1.5 1.2 2.7 2.7 2.7s2.7-1.2 2.7-2.7V3h2.6z" />
                  </svg>
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-line pt-6 flex flex-col gap-3 text-xs text-cream-dim/70">
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href={withLocale("/legal/aviso-legal", locale)} className="hover:text-cream-dim">
              {t.legalNotice}
            </Link>
            <Link href={withLocale("/legal/privacidad", locale)} className="hover:text-cream-dim">
              {t.privacy}
            </Link>
            <Link href={withLocale("/legal/cookies", locale)} className="hover:text-cream-dim">
              {t.cookies}
            </Link>
          </div>
          <p>{t.copyright(new Date().getFullYear())}</p>
          <p>{t.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
