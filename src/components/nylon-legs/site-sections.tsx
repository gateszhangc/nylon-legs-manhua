import Image from "next/image";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import HomeStructuredData from "@/components/nylon-legs/home-structured-data";
import {
  ChapterEntry,
  GuideEntry,
  SiteContent,
  getChapterIndex,
  getChapterPagePath,
} from "@/content/nylon-legs/site-content";

type PageProps = {
  locale: string;
  content: SiteContent;
};

const CHAPTER_ONE_EXTERNAL_URL = "https://sbti-test.lat";

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex max-w-3xl flex-col gap-3">
      <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
        {eyebrow}
      </p>
      <h2 className="font-[family-name:var(--font-editorial-serif)] text-4xl leading-tight text-[var(--nl-ink-strong)] sm:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-8 text-[var(--nl-ink-soft)]">{description}</p>
      ) : null}
    </div>
  );
}

function OfficialLinks({ content }: { content: SiteContent }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {content.officialLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          className="nl-panel group flex items-center justify-between p-4 text-sm text-[var(--nl-ink-strong)] transition-transform duration-300 hover:-translate-y-0.5"
        >
          <span className="font-medium">{link.label}</span>
          <ExternalLink className="h-4 w-4 text-[var(--nl-ink-soft)] transition-colors group-hover:text-[var(--nl-accent)]" />
        </a>
      ))}
    </div>
  );
}

function ChapterCard({
  locale,
  chapter,
  actionLabel,
}: {
  locale: string;
  chapter: ChapterEntry;
  actionLabel: string;
}) {
  return (
    <article className="nl-panel flex h-full flex-col gap-5 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-soft)]">
            {chapter.releaseLabel}
          </p>
          <h3 className="mt-2 font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
            {chapter.title}
          </h3>
        </div>
        <Badge
          variant="outline"
          className="rounded-full border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.28em] text-[var(--nl-ink-soft)]"
        >
          {chapter.pageCount}P
        </Badge>
      </div>
      <p className="text-sm leading-7 text-[var(--nl-ink-soft)]">{chapter.summary}</p>
      <div className="flex flex-wrap gap-2">
        {chapter.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="rounded-full border-white/10 bg-transparent px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--nl-ink-faint)]"
          >
            {tag}
          </Badge>
        ))}
      </div>
      <Button
        asChild
        className="mt-auto h-11 rounded-full bg-[var(--nl-accent)] px-6 text-sm font-semibold text-[#1a0d09] hover:bg-[var(--nl-accent-soft)]"
      >
        <Link href={`/chapters/${chapter.slug}`}>{actionLabel}</Link>
      </Button>
    </article>
  );
}

function GuideCard({ guide, readLabel }: { guide: GuideEntry; readLabel: string }) {
  return (
    <article className="nl-panel flex h-full flex-col gap-4 p-5 sm:p-6">
      <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
        {guide.eyebrow}
      </p>
      <h3 className="font-[family-name:var(--font-editorial-serif)] text-3xl leading-tight text-[var(--nl-ink-strong)]">
        {guide.title}
      </h3>
      <p className="text-sm leading-7 text-[var(--nl-ink-soft)]">{guide.description}</p>
      <Button
        asChild
        variant="outline"
        className="mt-auto h-11 rounded-full border-white/12 bg-transparent px-5 text-sm text-[var(--nl-ink-strong)] hover:bg-white/5 hover:text-[var(--nl-ink-strong)]"
      >
        <Link href={`/guides/${guide.slug}`}>
          {readLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </Button>
    </article>
  );
}

export function HomePage({ locale, content }: PageProps) {
  const latestChapter =
    content.chapters.entries[content.chapters.entries.length - 1] ||
    content.chapters.entries[0];

  return (
    <>
      <HomeStructuredData locale={locale} content={content} />
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-[11px] uppercase tracking-[0.38em] text-[var(--nl-ink-soft)]">
            {content.home.eyebrow}
          </p>
          <div className="space-y-4">
            <h1 className="max-w-4xl font-[family-name:var(--font-editorial-serif)] text-6xl leading-none text-[var(--nl-ink-strong)] sm:text-7xl lg:text-[6.3rem]">
              {content.home.title}
            </h1>
            <p className="text-lg leading-8 text-[var(--nl-ink-strong)]">{content.home.subtitle}</p>
            <p className="max-w-2xl text-base leading-8 text-[var(--nl-ink-soft)]">
              {content.home.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {content.home.chipLabels.map((chip) => (
              <span
                key={chip}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.22em] text-[var(--nl-ink-soft)]"
              >
                {chip}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              className="h-12 rounded-full bg-[var(--nl-accent)] px-7 text-sm font-semibold text-[#1a0d09] hover:bg-[var(--nl-accent-soft)]"
            >
              <a href={CHAPTER_ONE_EXTERNAL_URL} target="_blank" rel="noreferrer">
                {content.home.primaryCta}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="h-12 rounded-full border-white/12 bg-transparent px-7 text-sm text-[var(--nl-ink-strong)] hover:bg-white/5 hover:text-[var(--nl-ink-strong)]"
            >
              <Link href="/guides">{content.home.secondaryCta}</Link>
            </Button>
          </div>
        </div>

        <aside className="nl-panel relative overflow-hidden p-6 sm:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(245,214,170,0.22),transparent_55%),radial-gradient(circle_at_bottom_left,rgba(148,82,67,0.22),transparent_48%)]" />
          <div className="relative space-y-5">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-soft)]">
                {content.labels.latest}
              </span>
              <span className="text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-faint)]">
                {content.labels.noIndexLabel}
              </span>
            </div>
            <Image
              src="/nylon-legs/brand/poster.svg"
              alt="Nylon Legs editorial poster"
              width={960}
              height={1280}
              className="w-full rounded-[2rem] border border-white/8"
              priority
            />
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-soft)]">
                {latestChapter.releaseLabel}
              </p>
              <h2 className="font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
                {latestChapter.title}
              </h2>
              <p className="text-sm leading-7 text-[var(--nl-ink-soft)]">
                {latestChapter.summary}
              </p>
            </div>
          </div>
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="nl-panel p-6 sm:p-8">
          <SectionHeader
            eyebrow={content.labels.storyPulse}
            title={content.home.sectionTitle}
            description={content.home.sectionDescription}
          />
        </div>
        <div className="nl-panel p-6 sm:p-8">
          <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
            {content.home.officialLinksTitle}
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--nl-ink-soft)]">
            {content.home.officialLinksIntro}
          </p>
          <div className="mt-5">
            <OfficialLinks content={content} />
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow={content.labels.chapterList}
          title={content.chapters.title}
          description={content.chapters.listIntro}
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {content.chapters.entries.slice(0, 3).map((chapter) => (
            <ChapterCard
              key={chapter.slug}
              locale={locale}
              chapter={chapter}
              actionLabel={content.labels.readNow}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow={content.labels.profiles}
          title={content.characters.title}
          description={content.characters.description}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {content.characters.entries.map((character) => (
            <article key={character.slug} className="nl-panel flex gap-5 p-5 sm:p-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.5rem] border border-white/10 bg-white/6 font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
                {character.initials}
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-soft)]">
                    {character.role}
                  </p>
                  <h3 className="mt-2 font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
                    {character.name}
                  </h3>
                </div>
                <p className="text-sm leading-7 text-[var(--nl-ink-soft)]">{character.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {character.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-transparent px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--nl-ink-faint)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          eyebrow={content.labels.guideList}
          title={content.guides.title}
          description={content.guides.description}
        />
        <div className="grid gap-5 md:grid-cols-2">
          {content.guides.entries.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} readLabel={content.labels.readGuide} />
          ))}
        </div>
      </section>
    </>
  );
}

export function StoryPage({ content }: PageProps) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={content.labels.synopsis}
        title={content.story.title}
        description={content.story.description}
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <article className="nl-panel p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
            {content.story.synopsisTitle}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-[var(--nl-ink-soft)]">
            {content.story.synopsis.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="nl-panel p-6 sm:p-8">
          <Image
            src="/nylon-legs/brand/poster.svg"
            alt="Nylon Legs poster"
            width={960}
            height={1280}
            className="w-full rounded-[1.75rem] border border-white/8"
          />
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <article className="nl-panel p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
            {content.story.quickFactsTitle}
          </h2>
          <div className="mt-5 space-y-4">
            {content.story.quickFacts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-start justify-between gap-4 border-b border-white/8 pb-4"
              >
                <span className="text-[11px] uppercase tracking-[0.3em] text-[var(--nl-ink-soft)]">
                  {fact.label}
                </span>
                <span className="max-w-[58%] text-right text-sm leading-7 text-[var(--nl-ink-strong)]">
                  {fact.value}
                </span>
              </div>
            ))}
          </div>
        </article>
        <article className="nl-panel p-6 sm:p-8">
          <h2 className="font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
            {content.story.notesTitle}
          </h2>
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--nl-ink-soft)]">
            {content.story.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
          <div className="mt-6">
            <OfficialLinks content={content} />
          </div>
        </article>
      </section>
    </div>
  );
}

export function CharactersPage({ content }: PageProps) {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow={content.labels.cast}
        title={content.characters.title}
        description={content.characters.description}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {content.characters.entries.map((character) => (
          <article key={character.slug} className="nl-panel p-6 sm:p-8">
            <div className="flex items-start gap-5">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.8rem] border border-white/10 bg-white/6 font-[family-name:var(--font-editorial-serif)] text-4xl text-[var(--nl-ink-strong)]">
                {character.initials}
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--nl-ink-soft)]">
                  {character.role}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-editorial-serif)] text-4xl text-[var(--nl-ink-strong)]">
                  {character.name}
                </h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-8 text-[var(--nl-ink-soft)]">{character.bio}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {character.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="rounded-full border-white/10 bg-transparent px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--nl-ink-faint)]"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ChaptersPage({ locale, content }: PageProps) {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow={content.labels.chapterList}
        title={content.chapters.title}
        description={content.chapters.description}
      />
      <div className="nl-panel p-5 text-sm leading-7 text-[var(--nl-ink-soft)] sm:p-6">
        {content.chapters.ageGateNotice} {content.chapters.listIntro}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {content.chapters.entries.map((chapter) => (
          <ChapterCard
            key={chapter.slug}
            locale={locale}
            chapter={chapter}
            actionLabel={content.labels.readNow}
          />
        ))}
      </div>
    </div>
  );
}

export function GuidesPage({ content }: PageProps) {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow={content.labels.guideList}
        title={content.guides.title}
        description={content.guides.description}
      />
      <div className="grid gap-5 md:grid-cols-2">
        {content.guides.entries.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} readLabel={content.labels.readGuide} />
        ))}
      </div>
    </div>
  );
}

export function GuidePage({
  content,
  guide,
}: PageProps & { guide: GuideEntry }) {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow={guide.eyebrow}
        title={guide.title}
        description={guide.description}
      />
      <div className="grid gap-6">
        {guide.sections.map((section) => (
          <article key={section.title} className="nl-panel p-6 sm:p-8">
            <h2 className="font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)]">
              {section.title}
            </h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-[var(--nl-ink-soft)]">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.bullets?.length ? (
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--nl-ink-soft)]">
                {section.bullets.map((bullet) => (
                  <li key={bullet} className="flex gap-3">
                    <span className="mt-2 h-2 w-2 rounded-full bg-[var(--nl-accent)]" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}

export function FaqPage({ content }: PageProps) {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow={content.labels.questions}
        title={content.faq.title}
        description={content.faq.description}
      />
      <div className="nl-panel p-2 sm:p-3">
        <Accordion type="single" collapsible className="w-full">
          {content.faq.entries.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`faq-${index}`}
              className="border-white/8 px-4 sm:px-5"
            >
              <AccordionTrigger className="py-5 text-left font-[family-name:var(--font-editorial-serif)] text-2xl text-[var(--nl-ink-strong)] hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-sm leading-8 text-[var(--nl-ink-soft)]">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export function ChapterPage({
  locale,
  content,
  chapter,
}: PageProps & { chapter: ChapterEntry }) {
  const chapterIndex = getChapterIndex(locale, chapter.slug);
  const previousChapter =
    chapterIndex > 0 ? content.chapters.entries[chapterIndex - 1] : null;
  const nextChapter =
    chapterIndex >= 0 && chapterIndex < content.chapters.entries.length - 1
      ? content.chapters.entries[chapterIndex + 1]
      : null;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <p className="text-[11px] uppercase tracking-[0.36em] text-[var(--nl-ink-soft)]">
            {content.labels.adultOnly} • {content.labels.chapter}
          </p>
          <h1 className="font-[family-name:var(--font-editorial-serif)] text-5xl leading-none text-[var(--nl-ink-strong)] sm:text-6xl">
            {chapter.title}
          </h1>
          <p className="max-w-3xl text-base leading-8 text-[var(--nl-ink-soft)]">
            {chapter.summary}
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="h-11 rounded-full border-white/12 bg-transparent px-6 text-sm text-[var(--nl-ink-strong)] hover:bg-white/5 hover:text-[var(--nl-ink-strong)]"
        >
          <Link href="/chapters">{content.labels.backToChapters}</Link>
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {chapter.tags.map((tag) => (
          <Badge
            key={tag}
            variant="outline"
            className="rounded-full border-white/10 bg-transparent px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--nl-ink-faint)]"
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="space-y-6">
        {chapter.readerPages.map((page, index) => (
          <figure key={`${chapter.slug}-${index + 1}`} className="nl-panel overflow-hidden p-3 sm:p-4">
            <img
              src={getChapterPagePath(locale, chapter.slug, index + 1)}
              alt={`${chapter.title} page ${index + 1}`}
              className="w-full rounded-[1.6rem] border border-white/8"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <figcaption className="px-3 pb-1 pt-4 text-xs uppercase tracking-[0.24em] text-[var(--nl-ink-faint)]">
              {page.footer}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="nl-panel p-5">
          {previousChapter ? (
            <>
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-soft)]">
                {content.labels.previous}
              </p>
              <Link
                href={`/chapters/${previousChapter.slug}`}
                className="mt-2 block font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)] transition-colors hover:text-[var(--nl-accent)]"
              >
                {previousChapter.title}
              </Link>
            </>
          ) : (
            <p className="text-sm text-[var(--nl-ink-faint)]">{content.labels.backToChapters}</p>
          )}
        </div>
        <div className="nl-panel p-5 text-right">
          {nextChapter ? (
            <>
              <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--nl-ink-soft)]">
                {content.labels.next}
              </p>
              <Link
                href={`/chapters/${nextChapter.slug}`}
                className="mt-2 block font-[family-name:var(--font-editorial-serif)] text-3xl text-[var(--nl-ink-strong)] transition-colors hover:text-[var(--nl-accent)]"
              >
                {nextChapter.title}
              </Link>
            </>
          ) : (
            <p className="text-sm text-[var(--nl-ink-faint)]">{content.labels.noIndexLabel}</p>
          )}
        </div>
      </div>
    </div>
  );
}
