import { GuidesPage } from "@/components/nylon-legs/site-sections";
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
    pathname: "/guides",
    title: content.guides.title,
    description: content.guides.description,
  });
}

export default async function GuidesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  return <GuidesPage locale={locale} content={content} />;
}
