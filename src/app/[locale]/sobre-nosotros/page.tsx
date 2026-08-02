import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { getAboutContent } from "@/lib/i18n/about-content";
import type { Locale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getAboutContent(locale);
  return { title: t.title };
}

export default async function SobreNosotrosPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const t = getAboutContent(locale);
  return <LegalPage title={t.title} updated={t.updated} sections={t.sections} />;
}
