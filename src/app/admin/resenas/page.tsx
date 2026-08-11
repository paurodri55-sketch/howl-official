import { getPendingReviews } from "@/lib/reviews";
import { ModerationPanel } from "@/components/reviews/ModerationPanel";

export default async function AdminResenasPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key } = await searchParams;

  if (!process.env.ADMIN_SECRET || key !== process.env.ADMIN_SECRET) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 sm:px-6 text-center">
        <h1 className="font-display uppercase text-cream text-3xl mb-4">No autorizado</h1>
      </div>
    );
  }

  const pending = await getPendingReviews();

  return (
    <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6">
      <h1 className="font-display uppercase text-cream text-3xl sm:text-4xl mb-8">
        Reseñas pendientes
      </h1>
      <ModerationPanel initialPending={pending} adminKey={key} />
    </div>
  );
}
