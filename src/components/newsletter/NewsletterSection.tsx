import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export function NewsletterSection({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).newsletter;
  return (
    <section id="newsletter" className="relative overflow-hidden border-y border-ink-line">
      <div className="absolute inset-0">
        <Image
          src="/artwork/wolfmoon.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-ink/60" />
      </div>
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 text-center">
        <p className="font-condensed uppercase tracking-[0.4em] text-xs text-rust-light mb-4">
          {t.sectionEyebrow}
        </p>
        <h2 className="font-display uppercase text-cream text-3xl sm:text-5xl">
          {t.sectionHeading1}
          <br />
          {t.sectionHeading2}
        </h2>
        <p className="mt-4 max-w-md mx-auto text-cream-dim text-sm sm:text-base">
          {t.sectionBody}
        </p>
        <div className="mt-8 flex justify-center">
          <NewsletterForm variant="section" source="homepage-section" locale={locale} />
        </div>
      </div>
    </section>
  );
}
