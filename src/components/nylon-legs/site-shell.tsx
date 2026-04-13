import { ReactNode } from "react";
import SiteHeader from "@/components/nylon-legs/site-header";
import { Link } from "@/i18n/navigation";
import { SiteContent, SiteLocale } from "@/content/nylon-legs/site-content";

type SiteShellProps = {
  locale: SiteLocale;
  content: SiteContent;
  children: ReactNode;
};

export default function SiteShell({
  locale,
  content,
  children,
}: SiteShellProps) {
  return (
    <div className="nl-shell min-h-screen bg-[var(--nl-bg)] text-[var(--nl-ink)]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="nl-mesh absolute inset-0" />
        <div className="nl-grain absolute inset-0 opacity-60" />
      </div>

      <div className="border-b border-white/8 bg-[rgba(242,214,180,0.06)] px-4 py-2 text-center text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-soft)] sm:px-6">
        {content.labels.adultOnly} • {content.labels.bilingual} • {content.home.eyebrow}
      </div>

      <SiteHeader locale={locale} content={content} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {children}
      </main>

      <footer className="mt-12 border-t border-white/8 bg-[rgba(9,5,5,0.72)]">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div className="space-y-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
                {content.footer.disclaimerTitle}
              </p>
              <h2 className="mt-3 font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
                {content.brandName}
              </h2>
            </div>
            <p className="max-w-2xl text-sm leading-7 text-[var(--nl-ink-soft)]">
              {content.footer.disclaimer}
            </p>
            <p className="max-w-2xl text-sm leading-7 text-[var(--nl-ink-soft)]">
              {content.footer.rightsNotice}
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
                {content.footer.navTitle}
              </p>
              <div className="flex flex-col gap-2 text-sm">
                {content.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-[var(--nl-ink-strong)] transition-colors hover:text-[var(--nl-accent)]"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  href="/18-plus"
                  className="text-[var(--nl-ink-strong)] transition-colors hover:text-[var(--nl-accent)]"
                >
                  {content.ageGate.title}
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
                {content.footer.contactTitle}
              </p>
              <div className="space-y-2 text-sm text-[var(--nl-ink-soft)]">
                <p>
                  {content.footer.contactLabel}:{" "}
                  <a
                    href={`mailto:${content.supportEmail}`}
                    className="text-[var(--nl-ink-strong)] hover:text-[var(--nl-accent)]"
                  >
                    {content.supportEmail}
                  </a>
                </p>
                <p>
                  {content.footer.rightsLabel}:{" "}
                  <a
                    href={`mailto:${content.rightsEmail}`}
                    className="text-[var(--nl-ink-strong)] hover:text-[var(--nl-accent)]"
                  >
                    {content.rightsEmail}
                  </a>
                </p>
                <p className="pt-2 text-xs uppercase tracking-[0.24em] text-[var(--nl-ink-faint)]">
                  {content.footer.copyright}
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
