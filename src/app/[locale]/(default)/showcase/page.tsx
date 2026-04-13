import { redirect } from "next/navigation";

export default async function ShowcaseRedirect({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/chapters`);
}
