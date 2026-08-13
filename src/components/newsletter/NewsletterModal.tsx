"use client";

import { useEffect, useState } from "react";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { getDaysUntilLaunch } from "@/lib/launch";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const SEEN_KEY = "howl_newsletter_modal_seen";
const TIME_TRIGGER_MS = 9_000;
const SCROLL_TRIGGER_RATIO = 0.6;

export function NewsletterModal({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const t = getDictionary(locale).newsletter;

  useEffect(() => {
    if (localStorage.getItem(SEEN_KEY)) return;

    let triggered = false;

    function trigger() {
      if (triggered) return;
      triggered = true;
      localStorage.setItem(SEEN_KEY, "1");
      setOpen(true);
      cleanup();
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) trigger();
    }

    function handleScroll() {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      if (window.scrollY / scrollable >= SCROLL_TRIGGER_RATIO) trigger();
    }

    const timer = window.setTimeout(trigger, TIME_TRIGGER_MS);
    document.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    function cleanup() {
      window.clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    }

    return cleanup;
  }, []);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm px-4"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative w-full max-w-md border border-ink-line bg-ink-soft p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label={t.modalClose}
          className="absolute right-3 top-3 text-cream-dim hover:text-cream text-lg leading-none"
        >
          ✕
        </button>
        <p className="font-condensed uppercase tracking-[0.4em] text-xs text-rust-light mb-3">
          {t.modalEyebrow}
        </p>
        <h3 className="font-display uppercase text-cream text-2xl sm:text-3xl">
          {t.modalHeading1}
          <br />
          {t.modalHeading2}
        </h3>
        <p className="mt-3 text-cream-dim text-sm">{t.modalBody}</p>
        <p className="mt-2 font-condensed uppercase tracking-widest text-xs text-rust-light">
          {t.modalCountdown(getDaysUntilLaunch())}
        </p>
        <div className="mt-6 flex justify-center">
          <NewsletterForm variant="modal" source="exit-intent-modal" locale={locale} />
        </div>
      </div>
    </div>
  );
}
