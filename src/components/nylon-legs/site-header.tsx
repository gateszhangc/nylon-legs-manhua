"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { SiteContent, SiteLocale } from "@/content/nylon-legs/site-content";
import { cn } from "@/lib/utils";

type SiteHeaderProps = {
  locale: SiteLocale;
  content: SiteContent;
};

const isActivePath = (pathname: string, href: string) => {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function SiteHeader({ locale, content }: SiteHeaderProps) {
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const nextLocale = locale === "zh" ? "en" : "zh";
  const nextLocaleLabel = locale === "zh" ? "EN" : "中文";
  const navItems = [...content.nav, { href: "/chapters", label: content.labels.readNow }];
  const normalizedPath = pathname.replace(/^\/(en|zh)(?=\/|$)/, "") || "/";
  const localeHref = `/${nextLocale}${normalizedPath === "/" ? "" : normalizedPath}`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(17,11,10,0.86)] backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 text-left"
          onClick={() => setIsOpen(false)}
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(255,231,205,0.2)] bg-[rgba(245,214,170,0.08)] text-sm font-semibold tracking-[0.35em] text-[var(--nl-ink-strong)] transition-transform duration-300 group-hover:scale-[1.04]">
            {content.brandShort}
          </span>
          <span className="hidden min-[420px]:flex flex-col">
            <span className="font-[family-name:var(--font-editorial-serif)] text-2xl leading-none text-[var(--nl-ink-strong)]">
              {content.brandName}
            </span>
            <span className="mt-1 text-[11px] uppercase tracking-[0.34em] text-[var(--nl-ink-soft)]">
              {content.labels.adultOnly} {content.home.eyebrow}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm transition-colors",
                isActivePath(pathname, item.href)
                  ? "bg-[rgba(245,214,170,0.12)] text-[var(--nl-ink-strong)]"
                  : "text-[var(--nl-ink-soft)] hover:text-[var(--nl-ink-strong)]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className="rounded-full border border-white/10 bg-white/5 px-4 text-[var(--nl-ink-strong)] hover:bg-white/10 hover:text-[var(--nl-ink-strong)]"
          >
            <a href={localeHref}>
              {nextLocaleLabel}
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-white/10 bg-white/5 text-[var(--nl-ink-strong)] hover:bg-white/10 hover:text-[var(--nl-ink-strong)] lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label={isOpen ? "Close navigation" : "Open navigation"}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[rgba(18,12,11,0.96)] px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-2xl px-4 py-3 text-sm",
                  isActivePath(pathname, item.href)
                    ? "bg-[rgba(245,214,170,0.12)] text-[var(--nl-ink-strong)]"
                    : "text-[var(--nl-ink-soft)]"
                )}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
