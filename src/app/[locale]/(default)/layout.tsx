import { ReactNode } from "react";
import SiteShell from "@/components/nylon-legs/site-shell";
import { getSiteContent } from "@/content/nylon-legs/site-content";

export default async function DefaultLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getSiteContent(locale);

  return (
    <SiteShell locale={content.locale} content={content}>
      {children}
    </SiteShell>
  );
}
