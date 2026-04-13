import { notFound } from "next/navigation";
import { GuidePage } from "@/components/nylon-legs/site-sections";
import { getAllGuideSlugs, getGuide, getSiteContent } from "@/content/nylon-legs/site-content";
import { buildNylonLegsMetadata } from "@/lib/nylon-legs-metadata";

export async function generateStaticParams() {
  return [
    { locale: "en", slug: getAllGuideSlugs() },
    { locale: "zh", slug: getAllGuideSlugs() },
  ].flatMap(({ locale, slug }) =>
    slug.map((guideSlug) => ({ locale, slug: guideSlug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const guide = getGuide(locale, slug);

  if (!guide) {
    return {};
  }

  return buildNylonLegsMetadata({
    locale,
    pathname: `/guides/${slug}`,
    title: guide.title,
    description: guide.description,
  });
}

export default async function GuideRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const content = getSiteContent(locale);
  const guide = getGuide(locale, slug);

  if (!guide) {
    notFound();
  }

  return <GuidePage locale={locale} content={content} guide={guide} />;
}
