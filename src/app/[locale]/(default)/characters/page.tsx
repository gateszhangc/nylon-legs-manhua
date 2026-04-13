import { CharactersPage } from "@/components/nylon-legs/site-sections";
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
    pathname: "/characters",
    title: content.characters.title,
    description: content.characters.description,
  });
}

export default async function CharactersRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  return <CharactersPage locale={locale} content={content} />;
}
