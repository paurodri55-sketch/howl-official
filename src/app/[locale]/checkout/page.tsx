"use client";

import { useState, useEffect, Suspense, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/components/cart/CartContext";
import { LinkButton, Button } from "@/components/ui/Button";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { formatPrice } from "@/lib/format";
import { useLocale, withLocale } from "@/lib/i18n/client";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { isPreLaunch } from "@/lib/launch";

const SHIPPING = 4.9;

export default function CheckoutPage() {
  return (
    <Suspense fallback={null}>
      <CheckoutPageInner />
    </Suspense>
  );
}

function CheckoutPageInner() {
  const locale = useLocale();
  const t = getDictionary(locale).checkout;
  const searchParams = useSearchParams();
  const { items, subtotal, clearCart } = useCart();
  const [status, setStatus] = useState<"form" | "loading" | "done">("form");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("success") === "1") {
      setOrderId(searchParams.get("session_id"));
      clearCart();
      setStatus("done");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const total = items.length > 0 ? subtotal + SHIPPING : 0;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setStatus("loading");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customerEmail: email }),
      });
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error ?? t.errorGeneric);
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      setOrderId(data.sessionId);
      clearCart();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorFallback);
      setStatus("form");
    }
  }

  if (isPreLaunch()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-4xl mb-4">
          {t.preLaunchHeading}
        </h1>
        <p className="text-cream-dim mb-8">{t.preLaunchBody}</p>
        <div className="flex justify-center mb-8">
          <NewsletterForm variant="section" source="checkout-pre-launch" locale={locale} />
        </div>
        <LinkButton href={withLocale("/catalogo", locale)}>{t.preLaunchCta}</LinkButton>
      </div>
    );
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-4xl mb-4">
          {t.doneHeading}
        </h1>
        <p className="text-cream-dim mb-2">
          {t.doneReference} <span className="text-cream">{orderId}</span>
        </p>
        <p className="text-cream-dim mb-8">{t.doneBody}</p>
        <LinkButton href={withLocale("/catalogo", locale)}>{t.doneCta}</LinkButton>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-4xl mb-4">
          {t.emptyHeading}
        </h1>
        <p className="text-cream-dim mb-8">{t.emptyBody}</p>
        <LinkButton href={withLocale("/catalogo", locale)}>{t.emptyCta}</LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mb-8">
        {t.pageHeading}
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset>
            <legend className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-4">
              {t.shippingLegend}
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t.fieldFullName} name="name" required />
              <Field label={t.fieldEmail} name="email" type="email" required />
              <Field
                label={t.fieldAddress}
                name="address"
                required
                className="sm:col-span-2"
              />
              <Field label={t.fieldCity} name="city" required />
              <Field label={t.fieldPostalCode} name="postalCode" required />
              <Field label={t.fieldCountry} name="country" required />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-4">
              {t.paymentLegend}
            </legend>
            <div className="border border-ink-line bg-ink-soft p-4 text-sm text-cream-dim">
              {t.paymentNotice}
            </div>
          </fieldset>

          {error && <p className="text-sm text-rust-light">{error}</p>}

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto"
          >
            {status === "loading" ? t.processing : t.payButton(formatPrice(total))}
          </Button>
        </form>

        <div className="h-max border border-ink-line bg-ink-soft p-6">
          <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-4">
            {t.orderSummary}
          </p>
          <ul className="space-y-2 mb-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex justify-between gap-3 text-sm text-cream-dim"
              >
                <span className="min-w-0 truncate">
                  {item.quantity}× {item.name} ({item.size})
                </span>
                <span className="whitespace-nowrap text-cream">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between text-sm text-cream-dim mb-2 border-t border-ink-line pt-4">
            <span>{t.subtotal}</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-cream-dim mb-4">
            <span>{t.shipping}</span>
            <span>{formatPrice(SHIPPING)}</span>
          </div>
          <div className="flex justify-between font-condensed text-lg text-cream border-t border-ink-line pt-4">
            <span>{t.total}</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-condensed uppercase tracking-widest text-xs text-cream-dim">
        {label}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-1.5 w-full border border-cream/30 bg-transparent px-3 py-2.5 text-cream placeholder:text-cream-dim/60 focus:border-rust focus:outline-none"
      />
    </label>
  );
}
