export const SITE_LOCALES = ["en", "zh"] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

export type ReaderPage = {
  eyebrow: string;
  title: string;
  lines: string[];
  footer: string;
  accent: string;
};

export type CharacterEntry = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  tags: string[];
};

export type ChapterEntry = {
  slug: string;
  number: number;
  title: string;
  summary: string;
  releaseLabel: string;
  pageCount: number;
  tags: string[];
  readerPages: ReaderPage[];
};

export type GuideSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  sections: GuideSection[];
};

export type FaqEntry = {
  question: string;
  answer: string;
};

export type SiteContent = {
  locale: SiteLocale;
  languageLabel: string;
  brandName: string;
  brandShort: string;
  supportEmail: string;
  rightsEmail: string;
  domain: string;
  defaultTitle: string;
  defaultDescription: string;
  defaultKeywords: string;
  nav: Array<{ href: string; label: string }>;
  home: {
    eyebrow: string;
    title: string;
    subtitle: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    chipLabels: string[];
    sectionTitle: string;
    sectionDescription: string;
    officialLinksTitle: string;
    officialLinksIntro: string;
  };
  story: {
    title: string;
    description: string;
    synopsisTitle: string;
    synopsis: string[];
    quickFactsTitle: string;
    quickFacts: Array<{ label: string; value: string }>;
    notesTitle: string;
    notes: string[];
  };
  characters: {
    title: string;
    description: string;
    entries: CharacterEntry[];
  };
  chapters: {
    title: string;
    description: string;
    ageGateNotice: string;
    listIntro: string;
    entries: ChapterEntry[];
  };
  guides: {
    title: string;
    description: string;
    entries: GuideEntry[];
  };
  faq: {
    title: string;
    description: string;
    entries: FaqEntry[];
  };
  ageGate: {
    title: string;
    description: string;
    detail: string;
    confirm: string;
    decline: string;
    remember: string;
  };
  footer: {
    navTitle: string;
    contactTitle: string;
    disclaimerTitle: string;
    disclaimer: string;
    rightsNotice: string;
    contactLabel: string;
    rightsLabel: string;
    copyright: string;
  };
  labels: {
    latest: string;
    readNow: string;
    browseGuides: string;
    chapter: string;
    chapterList: string;
    guideList: string;
    readGuide: string;
    backToChapters: string;
    previous: string;
    next: string;
    officialSource: string;
    noIndexLabel: string;
    adultOnly: string;
    bilingual: string;
    storyPulse: string;
    profiles: string;
    cast: string;
    synopsis: string;
    questions: string;
  };
  officialLinks: Array<{ label: string; href: string }>;
};

const SITE_CONTENT: Record<SiteLocale, SiteContent> = {
  en: {
    locale: "en",
    languageLabel: "EN",
    brandName: "Nylon Legs",
    brandShort: "NL",
    supportEmail: "hello@nylon-legs-manhua.lol",
    rightsEmail: "rights@nylon-legs-manhua.lol",
    domain: "nylon-legs-manhua.lol",
    defaultTitle: "Nylon Legs | Bilingual 19+ Manhwa Reader and Story Guide",
    defaultDescription:
      "Nylon Legs is a bilingual editorial hub for the 19+ Korean webtoon by ARROZ. Browse story notes, character pages, chapter access, and legal reading guidance in English and Chinese.",
    defaultKeywords:
      "nylon legs, nylon legs manhwa, nylon legs manga, nylon legs comic, nylon legs webtoon, ARROZ, Park Gun, Lee Kyungi, 19+ manhwa",
    nav: [
      { href: "/story", label: "Story" },
      { href: "/characters", label: "Characters" },
      { href: "/chapters", label: "Chapters" },
      { href: "/guides", label: "Guides" },
      { href: "/faq", label: "FAQ" },
    ],
    home: {
      eyebrow: "Licensed editorial reader",
      title: "Nylon Legs",
      subtitle: "A 19+ Korean webtoon by ARROZ",
      description:
        "Built for readers who want a clean, bilingual entry point into Nylon Legs: story context, character notes, chapter access, and rights-aware reading guidance in one place.",
      primaryCta: "Read Chapter 1",
      secondaryCta: "Browse Guides",
      chipLabels: [
        "19+ Korean edition",
        "ARROZ",
        "2023 release",
        "Full-color webtoon",
        "6 episodes",
        "English + Chinese",
      ],
      sectionTitle: "The office secret at the center of Nylon Legs",
      sectionDescription:
        "Public source summaries frame Nylon Legs around Park Gun, a professional who knows work and romance should stay apart, and Lee Kyungi, the colleague who makes that boundary impossible to maintain.",
      officialLinksTitle: "Official source map",
      officialLinksIntro:
        "The Korean release is listed as a 19+ title. This site keeps that rating visible and points readers to the official publication trail.",
    },
    story: {
      title: "Story",
      description:
        "Synopsis, release context, and format notes for Nylon Legs.",
      synopsisTitle: "Synopsis",
      synopsis: [
        "Nylon Legs is a full-color vertical webtoon centered on Park Gun and the private tension he cannot keep separate from office routine.",
        "Anime-Planet's public listing describes Park Gun as someone who knows work and romance should remain separate, yet finds himself unable to stop wanting his colleague Lee Kyungi.",
        "This site treats that summary as the public-facing story spine and keeps additional detail behind the licensed reading flow.",
      ],
      quickFactsTitle: "Quick facts",
      quickFacts: [
        { label: "Creator", value: "ARROZ" },
        { label: "Format", value: "Full-color vertical webtoon" },
        { label: "Original language", value: "Korean" },
        { label: "Rating", value: "19+ / adults only" },
        { label: "Known release footprint", value: "Official Korean listing shows 6 episodes" },
        { label: "Reader mode here", value: "English and Simplified Chinese" },
      ],
      notesTitle: "Editorial notes",
      notes: [
        "The workspace did not include chapter image assets, so the reader uses structured placeholders that are ready to be swapped for licensed pages.",
        "Story claims on this site stay close to public catalog descriptions unless the licensed source material is available in-repo.",
      ],
    },
    characters: {
      title: "Characters",
      description:
        "Character notes based on public catalog information and the framing used on this site.",
      entries: [
        {
          slug: "park-gun",
          name: "Park Gun",
          initials: "PG",
          role: "Lead / office professional",
          bio: "Park Gun is the emotional hinge of the public synopsis: a person trying to keep work disciplined while desire starts rewriting the rules.",
          tags: ["office tension", "self-control", "secret desire"],
        },
        {
          slug: "lee-kyungi",
          name: "Lee Kyungi",
          initials: "LK",
          role: "Coworker / magnetic counterpart",
          bio: "Lee Kyungi is the colleague Park Gun cannot cleanly file away. Even in public summaries, his presence is the pressure point that breaks professional distance.",
          tags: ["coworker", "magnetism", "private spark"],
        },
      ],
    },
    chapters: {
      title: "Chapters",
      description:
        "Licensed reading starts here. Chapter list and reader pages stay behind the 18+ gate.",
      ageGateNotice:
        "Adults-only material. Confirm your age before opening chapter pages.",
      listIntro:
        "Each chapter card opens a bilingual reading view. The current build uses designed reader placeholders until licensed page assets are imported into the workspace.",
      entries: [
        {
          slug: "episode-1",
          number: 1,
          title: "Episode 1",
          summary:
            "The first chapter establishes the split between public composure and private want.",
          releaseLabel: "Episode 1",
          pageCount: 2,
          tags: ["setup", "office", "19+"],
          readerPages: [
            {
              eyebrow: "Episode 1",
              title: "Work first. Desire second. Until it is not.",
              lines: [
                "Park Gun arranges his life like a clean desk: lines straight, categories sealed.",
                "Nylon Legs opens by exposing how fragile that order already is.",
                "This slot is ready for licensed English page art.",
              ],
              footer: "Editorial reader placeholder",
              accent: "#c9a56a",
            },
            {
              eyebrow: "Episode 1",
              title: "Lee Kyungi becomes the detail that refuses to stay small.",
              lines: [
                "A colleague moves from background presence to private fixation.",
                "The chapter converts routine into pressure without needing noise.",
                "Replace this designed page with licensed chapter assets when available.",
              ],
              footer: "Bilingual chapter pipeline active",
              accent: "#9d5c4f",
            },
          ],
        },
        {
          slug: "episode-2",
          number: 2,
          title: "Episode 2",
          summary:
            "Distance starts to feel less like a rule and more like a performance.",
          releaseLabel: "Episode 2",
          pageCount: 2,
          tags: ["proximity", "tension", "after-hours"],
          readerPages: [
            {
              eyebrow: "Episode 2",
              title: "Routine turns into ritual.",
              lines: [
                "The second movement keeps the setting ordinary while the emotional current sharpens.",
                "What looked manageable in chapter one begins to demand attention.",
                "Licensed image pages can be dropped into this reader without changing route structure.",
              ],
              footer: "Import-ready page frame",
              accent: "#cf7a5a",
            },
            {
              eyebrow: "Episode 2",
              title: "Every small office gesture starts carrying weight.",
              lines: [
                "The editorial read of Episode 2 is all about accumulation.",
                "Looks linger. Timing matters. Professional rhythm stops feeling neutral.",
                "This placeholder preserves layout, SEO, and browser test coverage.",
              ],
              footer: "Adult reading flow preserved",
              accent: "#7f5b71",
            },
          ],
        },
        {
          slug: "episode-3",
          number: 3,
          title: "Episode 3",
          summary:
            "The push-pull between restraint and invitation becomes explicit.",
          releaseLabel: "Episode 3",
          pageCount: 2,
          tags: ["restraint", "chemistry", "escalation"],
          readerPages: [
            {
              eyebrow: "Episode 3",
              title: "Restraint now has to be performed, not merely felt.",
              lines: [
                "By the third chapter, secrecy stops being passive.",
                "Every decision feels staged against the possibility of being seen.",
                "Reader placeholders follow the same layout as final imported pages.",
              ],
              footer: "Structured SVG reader page",
              accent: "#a96c52",
            },
            {
              eyebrow: "Episode 3",
              title: "Nylon Legs makes silence do the heavy work.",
              lines: [
                "This chapter is best described as compression.",
                "The unsaid becomes as present as anything spoken aloud.",
                "Use the same slugs to swap in licensed EN and ZH image files later.",
              ],
              footer: "Swap assets without route changes",
              accent: "#b9a693",
            },
          ],
        },
        {
          slug: "episode-4",
          number: 4,
          title: "Episode 4",
          summary:
            "Private tension begins to dictate the public pace of the story.",
          releaseLabel: "Episode 4",
          pageCount: 2,
          tags: ["turning point", "pressure", "signal"],
          readerPages: [
            {
              eyebrow: "Episode 4",
              title: "What was hidden starts shaping everything visible.",
              lines: [
                "Episode 4 reads like a point of no clean return.",
                "The office remains the frame, but the emotional hierarchy has changed.",
                "Designed placeholders keep the reading route production-safe before import.",
              ],
              footer: "Route-safe placeholder art",
              accent: "#8d4f45",
            },
            {
              eyebrow: "Episode 4",
              title: "The atmosphere shifts before the characters admit it.",
              lines: [
                "Nylon Legs works by changing texture as much as plot.",
                "The professional shell becomes thinner, sharper, easier to puncture.",
                "Asset import remains a content operation, not an engineering rewrite.",
              ],
              footer: "Content-first architecture",
              accent: "#d3af7c",
            },
          ],
        },
        {
          slug: "episode-5",
          number: 5,
          title: "Episode 5",
          summary:
            "The story leans fully into consequences and emotional exposure.",
          releaseLabel: "Episode 5",
          pageCount: 2,
          tags: ["consequence", "reveal", "heat"],
          readerPages: [
            {
              eyebrow: "Episode 5",
              title: "Desire is no longer abstract.",
              lines: [
                "The fifth chapter reads as consequence rather than prelude.",
                "What earlier chapters staged in glances starts demanding a decision.",
                "This page shell is intentionally image-led and easy to replace.",
              ],
              footer: "Licensed replacement slot",
              accent: "#cb8668",
            },
            {
              eyebrow: "Episode 5",
              title: "The cost of secrecy finally has shape.",
              lines: [
                "Even a placeholder can preserve pacing, sequence, and chapter identity.",
                "That keeps QA, SEO, and navigation stable while content is finalized.",
                "Once real pages arrive, routes and metadata stay intact.",
              ],
              footer: "Stable identifiers for imports",
              accent: "#70525d",
            },
          ],
        },
        {
          slug: "episode-6",
          number: 6,
          title: "Episode 6",
          summary:
            "The current official Korean footprint closes on a fully adult note.",
          releaseLabel: "Episode 6",
          pageCount: 2,
          tags: ["finale", "adult", "closure"],
          readerPages: [
            {
              eyebrow: "Episode 6",
              title: "The final beat lands with adult certainty.",
              lines: [
                "Public catalog data points to a six-episode Korean release footprint.",
                "This final chapter slot is prepared for the licensed bilingual close.",
                "The reader flow remains constant from first episode to last.",
              ],
              footer: "Final chapter placeholder",
              accent: "#c29b52",
            },
            {
              eyebrow: "Episode 6",
              title: "End of current release set.",
              lines: [
                "Use this page as the import boundary for chapter-end navigation.",
                "The surrounding site remains indexable while the reading layer stays gated.",
                "That split is deliberate for adult-content handling.",
              ],
              footer: "Adults-only content boundary",
              accent: "#9b6653",
            },
          ],
        },
      ],
    },
    guides: {
      title: "Guides",
      description:
        "Reader-facing notes for format, legal access, and what the current build includes.",
      entries: [
        {
          slug: "where-to-read-legally",
          title: "Where to read Nylon Legs legally",
          description:
            "A short map of public listings and official Korean release endpoints.",
          eyebrow: "Reader guide",
          sections: [
            {
              title: "Start with the Korean source trail",
              paragraphs: [
                "Public listings point to Nylon Legs as a Korean release. KakaoPage and RIDI both surface the title in adult-only contexts, and Anime-Planet links it as a manhwa by ARROZ.",
                "If you are verifying catalog facts before importing chapter assets, use those official listings first and treat third-party summaries as secondary context.",
              ],
              bullets: [
                "KakaoPage listing: adult-only Korean release",
                "RIDI listing: official Korean storefront with six-episode footprint",
                "Anime-Planet: public synopsis and creator attribution",
              ],
            },
            {
              title: "How this site handles legal reading",
              paragraphs: [
                "This build is architected as a licensed reader. Chapter routes, metadata, age gate, and bilingual structure are production-ready, but image import is intentionally isolated so licensed assets can be swapped in without changing the UI code.",
                "That keeps rights handling operationally separate from the frontend shell.",
              ],
            },
          ],
        },
        {
          slug: "before-you-start",
          title: "Before you start: rating, format, and reading flow",
          description:
            "What the 19+ label means for this site, and how the bilingual reader is structured.",
          eyebrow: "Reading note",
          sections: [
            {
              title: "Adults-only boundary",
              paragraphs: [
                "Nylon Legs is surfaced publicly as a 19+ title. This site mirrors that boundary with an age gate before chapter access.",
                "Indexable pages such as story notes and guides remain open, while the reading layer stays intentionally gated.",
              ],
            },
            {
              title: "Bilingual structure",
              paragraphs: [
                "The public shell ships in English and Simplified Chinese. Chapter routes preserve the same slugs across both languages so imported image assets and QA coverage stay aligned.",
                "This matters because content updates should be a publishing task, not a routing rewrite.",
              ],
              bullets: [
                "Home, story, characters, guides, and FAQ are public",
                "Chapters require age confirmation",
                "Reader placeholders can be replaced without changing URLs",
              ],
            },
          ],
        },
      ],
    },
    faq: {
      title: "FAQ",
      description:
        "Common questions about release format, languages, and content access.",
      entries: [
        {
          question: "What is Nylon Legs?",
          answer:
            "Nylon Legs is a 19+ Korean webtoon publicly attributed to ARROZ. This site packages story context, chapter routing, and bilingual reading infrastructure around that release.",
        },
        {
          question: "Why is there an age gate?",
          answer:
            "Public Korean listings present the title as adults-only. The site keeps that rating explicit and requires confirmation before chapter access.",
        },
        {
          question: "Which languages does this build support?",
          answer:
            "English and Simplified Chinese. Both locales use the same chapter slugs so imports and navigation stay consistent.",
        },
        {
          question: "Are the chapter pages final?",
          answer:
            "The current workspace build uses designed placeholder pages because licensed chapter images were not present locally. The routing and reader shell are ready for direct asset replacement.",
        },
        {
          question: "Where do the catalog facts come from?",
          answer:
            "From public listings such as KakaoPage, RIDI, and Anime-Planet. Story detail stays intentionally conservative unless the licensed source material is available in the repo.",
        },
        {
          question: "How do I request a rights correction or takedown review?",
          answer:
            "Use the rights contact in the footer. Rights review is handled separately from general support requests.",
        },
      ],
    },
    ageGate: {
      title: "Adults-only chapter access",
      description:
        "Nylon Legs is presented here as a 19+ title. Confirm that you are 18 or older before opening chapters.",
      detail:
        "Public summary pages remain open. Chapter list and chapter reader routes require age confirmation and store a local session cookie.",
      confirm: "I am 18 or older",
      decline: "Go back to story",
      remember: "Remember this device for future chapter visits",
    },
    footer: {
      navTitle: "Navigate",
      contactTitle: "Contact",
      disclaimerTitle: "Rights and content boundary",
      disclaimer:
        "This site is designed for licensed bilingual distribution and catalog guidance. Public pages use conservative story detail; chapter access remains adults-only.",
      rightsNotice:
        "Rights holders can contact the site for review, correction, or takedown handling.",
      contactLabel: "General support",
      rightsLabel: "Rights review",
      copyright: "Nylon Legs editorial reader.",
    },
    labels: {
      latest: "Latest",
      readNow: "Read now",
      browseGuides: "Guides",
      chapter: "Chapter",
      chapterList: "Chapter list",
      guideList: "Guide list",
      readGuide: "Open guide",
      backToChapters: "Back to chapters",
      previous: "Previous chapter",
      next: "Next chapter",
      officialSource: "Official source",
      noIndexLabel: "Reader pages stay gated",
      adultOnly: "18+",
      bilingual: "EN + ZH",
      storyPulse: "Story pulse",
      profiles: "Profiles",
      cast: "Cast",
      synopsis: "Synopsis",
      questions: "Questions",
    },
    officialLinks: [
      {
        label: "KakaoPage",
        href: "https://page.kakao.com/content/65513375",
      },
      {
        label: "RIDI",
        href: "https://ridibooks.com/books/2200058582",
      },
      {
        label: "Anime-Planet",
        href: "https://www.anime-planet.com/manga/nylon-legs",
      },
    ],
  },
  zh: {
    locale: "zh",
    languageLabel: "中文",
    brandName: "Nylon Legs",
    brandShort: "NL",
    supportEmail: "hello@nylon-legs-manhua.lol",
    rightsEmail: "rights@nylon-legs-manhua.lol",
    domain: "nylon-legs-manhua.lol",
    defaultTitle: "Nylon Legs | 18+ 韩漫双语阅读站与剧情导览",
    defaultDescription:
      "Nylon Legs 是 ARROZ 创作的 19+ 韩漫。本网站提供英文与简体中文双语导览，涵盖剧情简介、角色页、章节入口与合规阅读说明。",
    defaultKeywords:
      "Nylon Legs, Nylon Legs 韩漫, Nylon Legs 漫画, ARROZ, Park Gun, Lee Kyungi, 19+ 韩漫",
    nav: [
      { href: "/story", label: "剧情" },
      { href: "/characters", label: "角色" },
      { href: "/chapters", label: "章节" },
      { href: "/guides", label: "指南" },
      { href: "/faq", label: "FAQ" },
    ],
    home: {
      eyebrow: "授权双语阅读站",
      title: "Nylon Legs",
      subtitle: "ARROZ 创作的 19+ 韩漫",
      description:
        "为想要更干净入口的读者准备：在一个页面体系里完成剧情脉络、角色说明、章节入口和版权边界说明，支持英文与简体中文。",
      primaryCta: "阅读第 1 话",
      secondaryCta: "查看指南",
      chipLabels: [
        "19+ 韩文版",
        "ARROZ",
        "2023 发布",
        "全彩条漫",
        "6 话规模",
        "英文 + 简中",
      ],
      sectionTitle: "围绕办公室秘密关系展开的故事核心",
      sectionDescription:
        "公开资料将 Nylon Legs 概括为：Park Gun 明知工作和恋爱该分开，却无法停止对同事 Lee Kyungi 的欲望与关注。",
      officialLinksTitle: "官方来源路径",
      officialLinksIntro:
        "公开韩文来源将这部作品标为 19+。本站保留这一边界，并把读者导向官方发布信息。",
    },
    story: {
      title: "剧情",
      description: "Nylon Legs 的剧情简介、发布背景与阅读形式说明。",
      synopsisTitle: "作品简介",
      synopsis: [
        "Nylon Legs 是一部全彩纵向阅读韩漫，核心 tension 落在 Park Gun 与办公室秩序之间无法分开的私人欲望上。",
        "Anime-Planet 的公开简介指出，Park Gun 原本明白工作和恋爱必须分开，但他对同事 Lee Kyungi 的渴望逐渐成为最大的秘密。",
        "本站把这条公开简介视为不剧透的故事主轴，更深入内容仍放在授权阅读层内。",
      ],
      quickFactsTitle: "快速信息",
      quickFacts: [
        { label: "作者", value: "ARROZ" },
        { label: "形式", value: "全彩纵向条漫" },
        { label: "原始语言", value: "韩语" },
        { label: "分级", value: "19+ / 成人向" },
        { label: "公开可见发行规模", value: "韩文官方页显示为 6 话" },
        { label: "本站阅读语言", value: "英文与简体中文" },
      ],
      notesTitle: "站点说明",
      notes: [
        "当前工作区没有章节图片素材，所以阅读器先用可替换的设计化占位页保证整条链路可运行。",
        "在未导入授权原稿前，站内剧情陈述会尽量收敛在公开目录信息范围内。",
      ],
    },
    characters: {
      title: "角色",
      description: "基于公开目录信息和本站导览框架整理的角色页。",
      entries: [
        {
          slug: "park-gun",
          name: "Park Gun",
          initials: "PG",
          role: "主角 / 职场一方",
          bio: "公开简介中的核心视角人物，试图维持工作秩序，却逐步被无法归档的私人欲望击穿边界。",
          tags: ["职场关系", "克制", "秘密欲望"],
        },
        {
          slug: "lee-kyungi",
          name: "Lee Kyungi",
          initials: "LK",
          role: "同事 / 关系引力中心",
          bio: "Lee Kyungi 是 Park Gun 无法再当作背景处理的人物。即使在公开摘要里，他也已经是关系失衡的关键引线。",
          tags: ["同事", "吸引力", "张力源头"],
        },
      ],
    },
    chapters: {
      title: "章节",
      description: "授权阅读入口在这里。章节列表与阅读页都放在 18+ 门槛后。",
      ageGateNotice: "成人向内容。进入章节前需要先确认年龄。",
      listIntro:
        "每张章节卡片都会进入双语阅读页。当前版本先用设计化阅读占位页承接流程，待授权图片导入后可直接替换。",
      entries: [
        {
          slug: "episode-1",
          number: 1,
          title: "第 1 话",
          summary: "首话先搭建出“表面秩序”和“私人欲望”之间的裂缝。",
          releaseLabel: "第 1 话",
          pageCount: 2,
          tags: ["开场", "职场", "19+"],
          readerPages: [
            {
              eyebrow: "第 1 话",
              title: "先是工作，再是欲望。直到顺序失效。",
              lines: [
                "Park Gun 原本把生活整理得像工位一样干净：边界明确，分类清晰。",
                "Nylon Legs 的开场就是在说明，这种秩序其实早已开始松动。",
                "这里预留给授权中文图片页导入。",
              ],
              footer: "阅读器设计占位页",
              accent: "#c9a56a",
            },
            {
              eyebrow: "第 1 话",
              title: "Lee Kyungi 从背景人物变成无法忽略的细节。",
              lines: [
                "同事关系开始带出无法继续当作公事处理的情绪压力。",
                "首话让“克制”变成一种很快就会失效的表演。",
                "后续可直接替换成授权原稿，不改 URL 结构。",
              ],
              footer: "双语章节链路已就位",
              accent: "#9d5c4f",
            },
          ],
        },
        {
          slug: "episode-2",
          number: 2,
          title: "第 2 话",
          summary: "距离开始不像规则，更像一种勉强维持的姿态。",
          releaseLabel: "第 2 话",
          pageCount: 2,
          tags: ["靠近", "张力", "下班后"],
          readerPages: [
            {
              eyebrow: "第 2 话",
              title: "日常开始变成一种仪式感很强的伪装。",
              lines: [
                "第二话仍然停留在熟悉场景里，但情绪边缘明显更锋利。",
                "第一话里看似可控的东西，此时已经开始要求回应。",
                "授权图片导入后可保持同一阅读链路。",
              ],
              footer: "可直接替换素材",
              accent: "#cf7a5a",
            },
            {
              eyebrow: "第 2 话",
              title: "每一个细小动作都开始带重量。",
              lines: [
                "第二话的重点不是事件量，而是累积感。",
                "眼神、时机、节奏都不再中性。",
                "这个占位页保留了布局、SEO 和浏览器测试链路。",
              ],
              footer: "成人向阅读流程保留",
              accent: "#7f5b71",
            },
          ],
        },
        {
          slug: "episode-3",
          number: 3,
          title: "第 3 话",
          summary: "压抑与邀请之间的来回拉扯开始变得更明确。",
          releaseLabel: "第 3 话",
          pageCount: 2,
          tags: ["克制", "化学反应", "升级"],
          readerPages: [
            {
              eyebrow: "第 3 话",
              title: "克制不再只是感觉，而是需要持续表演。",
              lines: [
                "到了第三话，秘密已经不能只是被动存在。",
                "每个动作都像在对“会不会被看见”做回应。",
                "设计化 SVG 占位页与后续正式页使用同一路径规则。",
              ],
              footer: "结构化 SVG 阅读页",
              accent: "#a96c52",
            },
            {
              eyebrow: "第 3 话",
              title: "这部作品很擅长让沉默承担叙事重量。",
              lines: [
                "这一话更像情绪压缩，而不是台词堆积。",
                "没说出口的内容，和说出口的一样有存在感。",
                "后续可按同一 slug 替换 EN/ZH 两套图片。",
              ],
              footer: "无需改路由即可换图",
              accent: "#b9a693",
            },
          ],
        },
        {
          slug: "episode-4",
          number: 4,
          title: "第 4 话",
          summary: "私人张力开始反过来主导公开关系里的节奏。",
          releaseLabel: "第 4 话",
          pageCount: 2,
          tags: ["转折", "压力", "信号"],
          readerPages: [
            {
              eyebrow: "第 4 话",
              title: "原本隐藏的东西，开始塑造一切可见之物。",
              lines: [
                "第四话像是某种无法回退的临界点。",
                "办公室仍然是外框，但情绪主次已经改写。",
                "占位页保证在导入正式图前，整条阅读链路是稳定的。",
              ],
              footer: "生产可用的占位画面",
              accent: "#8d4f45",
            },
            {
              eyebrow: "第 4 话",
              title: "人物尚未承认，气氛已经先变了。",
              lines: [
                "Nylon Legs 的变化经常先发生在质地，再发生在剧情节点上。",
                "看似职业化的外壳，在这一话里更薄、更尖锐，也更易被刺穿。",
                "后续导图应是内容导入动作，不需要重写前端。",
              ],
              footer: "内容与工程解耦",
              accent: "#d3af7c",
            },
          ],
        },
        {
          slug: "episode-5",
          number: 5,
          title: "第 5 话",
          summary: "故事开始更直接地进入后果与暴露感。",
          releaseLabel: "第 5 话",
          pageCount: 2,
          tags: ["后果", "揭露", "升温"],
          readerPages: [
            {
              eyebrow: "第 5 话",
              title: "欲望已经不再是抽象背景。",
              lines: [
                "第五话不再像铺垫，而更像后果开始显形。",
                "前几话藏在目光里的内容，此时逐渐逼近需要回应的程度。",
                "这一页保持图像主导布局，便于后续直接替换成正式页。",
              ],
              footer: "授权素材替换位",
              accent: "#cb8668",
            },
            {
              eyebrow: "第 5 话",
              title: "秘密的代价终于有了轮廓。",
              lines: [
                "即便仍是占位页，章节节奏、顺序和身份都已经固定。",
                "这能让 QA、SEO 和导航在内容终稿前保持稳定。",
                "正式页一旦到位，不需要再改 metadata 或路径。",
              ],
              footer: "稳定 slug 便于导入",
              accent: "#70525d",
            },
          ],
        },
        {
          slug: "episode-6",
          number: 6,
          title: "第 6 话",
          summary: "韩文公开发行足迹中的当前收束点，落在明确的成人向结尾上。",
          releaseLabel: "第 6 话",
          pageCount: 2,
          tags: ["完结点", "成人向", "收束"],
          readerPages: [
            {
              eyebrow: "第 6 话",
              title: "当前公开发行段落在这里落下最后一拍。",
              lines: [
                "公开目录信息显示，韩文发行规模目前可见为 6 话。",
                "这一话是双语授权终章导图的占位边界。",
                "从首话到末话，阅读器流转规则保持一致。",
              ],
              footer: "最终话占位页",
              accent: "#c29b52",
            },
            {
              eyebrow: "第 6 话",
              title: "当前发布集结束。",
              lines: [
                "这里也定义了章节末尾导航与阅读流的边界。",
                "公共内容页保持可索引，阅读层继续维持成人内容门槛。",
                "这是这个站点信息结构里刻意保留的分层。",
              ],
              footer: "成人内容边界",
              accent: "#9b6653",
            },
          ],
        },
      ],
    },
    guides: {
      title: "指南",
      description: "给读者的格式说明、合法来源提示和当前站点结构说明。",
      entries: [
        {
          slug: "where-to-read-legally",
          title: "Nylon Legs 的合法来源怎么找",
          description: "整理公开目录和官方韩文发布入口的简短导览。",
          eyebrow: "阅读指南",
          sections: [
            {
              title: "先确认韩文官方来源链路",
              paragraphs: [
                "公开目录普遍把 Nylon Legs 指向韩文发行环境。KakaoPage 和 RIDI 都以成人向上下文呈现该作，Anime-Planet 则提供了 ARROZ 和作品简介等公开索引信息。",
                "如果你在为授权导图前做事实校验，优先用这些官方目录，再把第三方站点当作补充。",
              ],
              bullets: [
                "KakaoPage：成人向韩文发布页",
                "RIDI：官方韩文商店，显示 6 话规模",
                "Anime-Planet：公开简介与作者归属",
              ],
            },
            {
              title: "本站如何处理合法阅读",
              paragraphs: [
                "这个站点是按授权镜像阅读站的结构搭的。章节路由、metadata、年龄门槛和双语体系都已经就位，但图片导入被刻意独立出来，方便后续把授权原稿替换进去。",
                "这样版权处理和前端结构可以分开推进。",
              ],
            },
          ],
        },
        {
          slug: "before-you-start",
          title: "开始前先看：分级、格式和阅读方式",
          description: "解释 19+ 标记在本站意味着什么，以及双语阅读器是如何组织的。",
          eyebrow: "阅读说明",
          sections: [
            {
              title: "成人向边界",
              paragraphs: [
                "Nylon Legs 在公开韩文目录中被标为 19+。本站因此在章节入口前保留年龄确认层。",
                "剧情简介、角色页和指南页保持公开可访问，章节列表和阅读器则继续受年龄门槛控制。",
              ],
            },
            {
              title: "双语结构",
              paragraphs: [
                "站点首发支持英文和简体中文。两种语言共用一套章节 slug，这样导入正式图片和做 QA 时都更稳定。",
                "换句话说，内容上线应该是发布动作，而不是重新改路由的工程动作。",
              ],
              bullets: [
                "首页、剧情、角色、指南、FAQ 为公开内容",
                "章节页需要年龄确认",
                "占位页可直接被正式图替换，不改 URL",
              ],
            },
          ],
        },
      ],
    },
    faq: {
      title: "FAQ",
      description: "关于作品分级、阅读语言和章节访问的常见问题。",
      entries: [
        {
          question: "Nylon Legs 是什么？",
          answer:
            "Nylon Legs 是一部公开归属为 ARROZ 的 19+ 韩漫。本站围绕这部作品搭建了双语导览、章节路由和阅读层。",
        },
        {
          question: "为什么要先过年龄门槛？",
          answer:
            "因为公开韩文目录把它标为成人向作品。本站会把这个边界明确保留下来，再开放章节访问。",
        },
        {
          question: "这个站支持哪些语言？",
          answer:
            "英文和简体中文。两种语言共用同一套章节 slug，方便后续导图和测试。",
        },
        {
          question: "现在章节页是正式版吗？",
          answer:
            "当前工作区没有授权章节图片，所以阅读器先使用设计化占位页。路由和阅读框架已经准备好，可直接替换为正式素材。",
        },
        {
          question: "站内信息来自哪里？",
          answer:
            "主要来自 KakaoPage、RIDI 和 Anime-Planet 等公开目录。正式原稿未导入仓库前，站内剧情文字会尽量保持克制。",
        },
        {
          question: "如果我要发版权纠错或下架请求怎么办？",
          answer:
            "请使用页脚里的版权联系邮箱。版权审核和普通支持请求会分开处理。",
        },
      ],
    },
    ageGate: {
      title: "成人向章节访问确认",
      description:
        "Nylon Legs 在本站按 19+ 作品处理。进入章节前，请先确认你已满 18 岁。",
      detail:
        "公开导览页可以直接访问；章节列表和阅读页需要年龄确认，并会在本地写入一次会话 cookie。",
      confirm: "我已满 18 岁",
      decline: "返回剧情页",
      remember: "在当前设备记住这次确认",
    },
    footer: {
      navTitle: "导航",
      contactTitle: "联系",
      disclaimerTitle: "版权与内容边界",
      disclaimer:
        "本站按授权双语分发与作品导览来设计。公开页面只保留克制的剧情信息，章节访问继续维持成人向门槛。",
      rightsNotice: "版权方可通过版权联系邮箱发起审核、纠错或下架处理。",
      contactLabel: "一般支持",
      rightsLabel: "版权审核",
      copyright: "Nylon Legs editorial reader.",
    },
    labels: {
      latest: "最新",
      readNow: "立即阅读",
      browseGuides: "查看指南",
      chapter: "章节",
      chapterList: "章节列表",
      guideList: "指南列表",
      readGuide: "打开指南",
      backToChapters: "返回章节列表",
      previous: "上一话",
      next: "下一话",
      officialSource: "官方来源",
      noIndexLabel: "阅读层保持门槛",
      adultOnly: "18+",
      bilingual: "EN + 中文",
      storyPulse: "剧情脉络",
      profiles: "角色关系",
      cast: "人物",
      synopsis: "剧情简介",
      questions: "常见问题",
    },
    officialLinks: [
      {
        label: "KakaoPage",
        href: "https://page.kakao.com/content/65513375",
      },
      {
        label: "RIDI",
        href: "https://ridibooks.com/books/2200058582",
      },
      {
        label: "Anime-Planet",
        href: "https://www.anime-planet.com/manga/nylon-legs",
      },
    ],
  },
};

export const getSiteContent = (locale?: string | null): SiteContent =>
  locale === "zh" ? SITE_CONTENT.zh : SITE_CONTENT.en;

export const getGuide = (
  locale: string,
  slug: string
): GuideEntry | undefined =>
  getSiteContent(locale).guides.entries.find((guide) => guide.slug === slug);

export const getChapter = (
  locale: string,
  slug: string
): ChapterEntry | undefined =>
  getSiteContent(locale).chapters.entries.find((chapter) => chapter.slug === slug);

export const getChapterIndex = (locale: string, slug: string): number =>
  getSiteContent(locale).chapters.entries.findIndex(
    (chapter) => chapter.slug === slug
  );

export const getChapterPagePath = (
  locale: string,
  chapterSlug: string,
  page: number
) => `/api/reader-page/${locale === "zh" ? "zh" : "en"}/${chapterSlug}/${page}`;

export const getAllGuideSlugs = (): string[] =>
  SITE_CONTENT.en.guides.entries.map((guide) => guide.slug);

export const getAllChapterSlugs = (): string[] =>
  SITE_CONTENT.en.chapters.entries.map((chapter) => chapter.slug);
