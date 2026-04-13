import { getChapter, getSiteContent } from "@/content/nylon-legs/site-content";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

export async function GET(
  _request: Request,
  {
    params,
  }: {
    params: Promise<{ locale: string; chapterSlug: string; page: string }>;
  }
) {
  const { locale, chapterSlug, page } = await params;
  const content = getSiteContent(locale);
  const chapter = getChapter(locale, chapterSlug);
  const pageIndex = Math.max(0, Number(page) - 1);
  const pageContent = chapter?.readerPages[pageIndex];

  if (!chapter || !pageContent) {
    return new Response("Not found", { status: 404 });
  }

  const lines = pageContent.lines
    .map(
      (line, index) =>
        `<text x="112" y="${580 + index * 74}" fill="#F5E3CF" font-size="42" font-family="Georgia, serif">${escapeXml(
          line
        )}</text>`
    )
    .join("");

  const svg = `
    <svg width="1200" height="1680" viewBox="0 0 1200 1680" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="1680" rx="72" fill="#140D0C"/>
      <rect x="36" y="36" width="1128" height="1608" rx="48" stroke="#FFF4E8" stroke-opacity="0.12" stroke-width="2"/>
      <circle cx="942" cy="226" r="240" fill="${pageContent.accent}" fill-opacity="0.24"/>
      <circle cx="282" cy="1428" r="280" fill="#6F4A44" fill-opacity="0.18"/>
      <path d="M112 132H172V452C172 532.185 218.815 576 286 576H320V636H274C164.403 636 112 583.709 112 470V132Z" fill="#FFF4E8"/>
      <path d="M398 132H478V192H398V132Z" fill="#D9AA63"/>
      <path d="M398 220H478V636H430C412.327 636 398 621.673 398 604V220Z" fill="#FFF4E8"/>
      <path d="M480 132C480 165.137 453.137 192 420 192V132H480Z" fill="#B56C52"/>
      <text x="112" y="820" fill="#C7B39E" font-size="26" letter-spacing="10" font-family="Arial, sans-serif">${escapeXml(
        pageContent.eyebrow.toUpperCase()
      )}</text>
      <text x="112" y="920" fill="#FFF4E8" font-size="92" font-family="Georgia, serif">${escapeXml(
        pageContent.title
      )}</text>
      ${lines}
      <rect x="112" y="1324" width="976" height="192" rx="32" fill="#FFFFFF" fill-opacity="0.03" stroke="#FFF4E8" stroke-opacity="0.08"/>
      <text x="164" y="1416" fill="#D9AA63" font-size="24" letter-spacing="8" font-family="Arial, sans-serif">${escapeXml(
        content.brandName.toUpperCase()
      )}</text>
      <text x="164" y="1488" fill="#C7B39E" font-size="36" font-family="Georgia, serif">${escapeXml(
        pageContent.footer
      )}</text>
      <text x="112" y="1598" fill="#8F7B6D" font-size="22" letter-spacing="7" font-family="Arial, sans-serif">${escapeXml(
        `${chapter.title} • ${pageIndex + 1}/${chapter.pageCount}`
      )}</text>
    </svg>
  `;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
