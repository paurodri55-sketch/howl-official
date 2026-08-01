import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getLegalContent } from "@/lib/i18n/legal-content";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getLegalContent(locale).privacidad;
  return { title: t.title };
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getLegalContent(locale).privacidad;
  return <LegalPage title={t.title} updated={t.updated} sections={t.sections} />;
}
