"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  AGE_GATE_COOKIE,
  getAgeGateCookieMaxAge,
} from "@/lib/age-gate-cookie";
import { SiteContent } from "@/content/nylon-legs/site-content";

type AgeGateCardProps = {
  content: SiteContent;
  locale: string;
  returnTo: string;
};

export default function AgeGateCard({
  content,
  locale,
  returnTo,
}: AgeGateCardProps) {
  const [remember, setRemember] = useState(true);

  const handleConfirm = () => {
    const maxAge = remember ? `; max-age=${getAgeGateCookieMaxAge()}` : "";
    document.cookie = `${AGE_GATE_COOKIE}=1; path=/; samesite=lax${maxAge}`;
    window.location.assign(returnTo);
  };

  return (
    <div className="nl-panel max-w-2xl p-8 sm:p-10">
      <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
        {content.labels.adultOnly}
      </p>
      <h1 className="mt-4 font-[family-name:var(--font-editorial-serif)] text-4xl leading-tight text-[var(--nl-ink-strong)] sm:text-5xl">
        {content.ageGate.title}
      </h1>
      <p className="mt-4 text-base leading-8 text-[var(--nl-ink-soft)]">
        {content.ageGate.description}
      </p>
      <p className="mt-4 text-sm leading-7 text-[var(--nl-ink-faint)]">
        {content.ageGate.detail}
      </p>

      <div className="mt-8 flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <Checkbox
          id="remember-age-gate"
          checked={remember}
          onCheckedChange={(value) => setRemember(Boolean(value))}
          className="mt-1 border-white/20 data-[state=checked]:border-[var(--nl-accent)] data-[state=checked]:bg-[var(--nl-accent)]"
        />
        <label
          htmlFor="remember-age-gate"
          className="cursor-pointer text-sm leading-7 text-[var(--nl-ink-soft)]"
        >
          {content.ageGate.remember}
        </label>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={handleConfirm}
          className="h-12 rounded-full bg-[var(--nl-accent)] px-8 text-sm font-semibold text-[#1a0d09] hover:bg-[var(--nl-accent-soft)]"
        >
          <Check className="mr-1" />
          {content.ageGate.confirm}
        </Button>
        <Button
          asChild
          variant="outline"
          className="h-12 rounded-full border-white/15 bg-transparent px-8 text-sm text-[var(--nl-ink-strong)] hover:bg-white/5 hover:text-[var(--nl-ink-strong)]"
        >
          <a href={`/${locale === "zh" ? "zh" : "en"}/story`}>
            {content.ageGate.decline}
          </a>
        </Button>
      </div>
    </div>
  );
}
