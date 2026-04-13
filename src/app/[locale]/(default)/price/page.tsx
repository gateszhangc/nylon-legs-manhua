import { redirect } from "next/navigation";

export default async function PriceAliasRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/story`);
}
