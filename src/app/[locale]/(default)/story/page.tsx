import { StoryPage } from "@/components/nylon-legs/site-sections";
import { getSiteContent } from "@/content/nylon-legs/site-content";
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
    pathname: "/story",
    title: content.story.title,
    description: content.story.description,
  });
}

export default async function StoryRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  return <StoryPage locale={locale} content={content} />;
}
