import { redirect } from "next/navigation";
import AgeGateCard from "@/components/nylon-legs/age-gate-card";
import { getSiteContent } from "@/content/nylon-legs/site-content";
import { isAgeVerified } from "@/lib/age-gate";
import { buildNylonLegsMetadata } from "@/lib/nylon-legs-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  return buildNylonLegsMetadata({
    locale,
    pathname: "/18-plus",
    title: content.ageGate.title,
    description: content.ageGate.description,
    noIndex: true,
  });
}

export default async function AgeGateRoute({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ returnTo?: string }>;
}) {
  const { locale } = await params;
  const { returnTo } = await searchParams;
  const content = getSiteContent(locale);
  const fallback = `/${locale}/chapters`;
  const safeReturnTo =
    returnTo && returnTo.startsWith(`/${locale}/`) ? returnTo : fallback;

  if (await isAgeVerified()) {
    redirect(safeReturnTo);
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center py-8">
      <AgeGateCard content={content} locale={locale} returnTo={safeReturnTo} />
    </div>
  );
}
