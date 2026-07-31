import Image from "next/image";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { getDaysUntilLaunch } from "@/lib/launch";

export function NewsletterSection() {
  const days = getDaysUntilLaunch();
  return (
    <section className="relative overflow-hidden border-y border-ink-line">
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
          Lista de espera
        </p>
        <h2 className="font-display uppercase text-cream text-3xl sm:text-5xl">
          Entérate antes de que
          <br />
          se agote
        </h2>
        <p className="mt-4 max-w-md mx-auto text-cream-dim text-sm sm:text-base">
          Cada tirada es única y no vuelve. Quien está dentro, sabe antes que
          nadie cuándo sale la siguiente.
        </p>
        <p className="mt-3 font-condensed uppercase tracking-widest text-xs text-rust-light">
          Faltan {days} días — 21 de noviembre, el inicio de HOWL
        </p>
        <div className="mt-8 flex justify-center">
          <NewsletterForm variant="section" source="homepage-section" />
        </div>
      </div>
    </section>
  );
}
