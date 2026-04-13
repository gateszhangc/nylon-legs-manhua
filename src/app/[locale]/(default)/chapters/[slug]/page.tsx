import { notFound } from "next/navigation";
import { ChapterPage } from "@/components/nylon-legs/site-sections";
import { getAllChapterSlugs, getChapter, getSiteContent } from "@/content/nylon-legs/site-content";
import { requireAgeVerification } from "@/lib/age-gate";
import { buildNylonLegsMetadata } from "@/lib/nylon-legs-metadata";

export async function generateStaticParams() {
  return [
    { locale: "en", slug: getAllChapterSlugs() },
    { locale: "zh", slug: getAllChapterSlugs() },
  ].flatMap(({ locale, slug }) =>
    slug.map((chapterSlug) => ({ locale, slug: chapterSlug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const chapter = getChapter(locale, slug);

  if (!chapter) {
    return {};
  }

  return buildNylonLegsMetadata({
    locale,
    pathname: `/chapters/${slug}`,
    title: chapter.title,
    description: chapter.summary,
    noIndex: true,
  });
}

export default async function ChapterRoute({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  await requireAgeVerification(locale, `/${locale}/chapters/${slug}`);
  const content = getSiteContent(locale);
  const chapter = getChapter(locale, slug);

  if (!chapter) {
    notFound();
  }

  return <ChapterPage locale={locale} content={content} chapter={chapter} />;
}
