"use client";

import { useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/CartContext";
import { LinkButton, Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";

const SHIPPING = 4.9;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [status, setStatus] = useState<"form" | "loading" | "done">("form");
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
        throw new Error(data.error ?? "No se pudo procesar el pedido");
      }

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
        return;
      }

      setOrderId(data.sessionId);
      clearCart();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Algo salió mal");
      setStatus("form");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-4xl mb-4">
          Pedido simulado con éxito
        </h1>
        <p className="text-cream-dim mb-2">
          Referencia: <span className="text-cream">{orderId}</span>
        </p>
        <p className="text-cream-dim mb-8">
          Este checkout es una simulación local. Cuando se conecte Stripe, este
          paso redirigirá a un pago real y el pedido se enviará a Printful
          para producción y envío.
        </p>
        <LinkButton href="/catalogo">Seguir comprando</LinkButton>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-4xl mb-4">
          No hay nada que pagar
        </h1>
        <p className="text-cream-dim mb-8">Tu carrito está vacío.</p>
        <LinkButton href="/catalogo">Ir al catálogo</LinkButton>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display uppercase text-cream text-4xl sm:text-5xl mb-8">
        Checkout
      </h1>

      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <fieldset>
            <legend className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-4">
              Datos de envío
            </legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre completo" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field
                label="Dirección"
                name="address"
                required
                className="sm:col-span-2"
              />
              <Field label="Ciudad" name="city" required />
              <Field label="Código postal" name="postalCode" required />
              <Field label="País" name="country" required />
            </div>
          </fieldset>

          <fieldset>
            <legend className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-4">
              Pago
            </legend>
            <div className="border border-ink-line bg-ink-soft p-4 text-sm text-cream-dim">
              Pago seguro con Stripe — próximamente. Por ahora, al confirmar se
              simula el pedido sin cobro real.
            </div>
          </fieldset>

          {error && <p className="text-sm text-rust-light">{error}</p>}

          <Button
            type="submit"
            disabled={status === "loading"}
            className="w-full sm:w-auto"
          >
            {status === "loading"
              ? "Procesando…"
              : `Pagar ${formatPrice(total)}`}
          </Button>
        </form>

        <div className="h-max border border-ink-line bg-ink-soft p-6">
          <p className="font-condensed uppercase tracking-widest text-xs text-cream-dim mb-4">
            Resumen del pedido
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
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm text-cream-dim mb-4">
            <span>Envío</span>
            <span>{formatPrice(SHIPPING)}</span>
          </div>
          <div className="flex justify-between font-condensed text-lg text-cream border-t border-ink-line pt-4">
            <span>Total</span>
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
