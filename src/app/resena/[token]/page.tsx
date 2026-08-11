import { verifyReviewToken, hasAlreadyReviewed } from "@/lib/reviews";
import { hasVerifiedPurchase } from "@/lib/orders-store";
import { getProductBySlug } from "@/lib/products";
import { ReviewForm } from "@/components/reviews/ReviewForm";

export default async function ResenaPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const payload = verifyReviewToken(token);

  const invalid = (
    <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
      <h1 className="font-display uppercase text-cream text-3xl mb-4">Enlace no válido</h1>
      <p className="text-cream-dim">
        Este enlace de reseña no es correcto o ha caducado. Si crees que es un error, escríbenos.
      </p>
    </div>
  );

  if (!payload) return invalid;

  const product = getProductBySlug(payload.slug);
  if (!product) return invalid;

  const verified = await hasVerifiedPurchase(payload.email, payload.slug);
  if (!verified) return invalid;

  const alreadyReviewed = await hasAlreadyReviewed(payload.email, payload.slug);
  if (alreadyReviewed) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-3xl mb-4">
          Ya has dejado tu reseña
        </h1>
        <p className="text-cream-dim">
          Gracias de nuevo por tu opinión sobre <span className="text-cream">{product.name}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-24 sm:px-6">
      <p className="font-condensed uppercase tracking-widest text-xs text-rust-light mb-2">
        Compra verificada
      </p>
      <h1 className="font-display uppercase text-cream text-3xl sm:text-4xl mb-8">
        {product.name}
      </h1>
      <ReviewForm token={token} productName={product.name} />
    </div>
  );
}
