import "@/app/globals.css";

import {
  Cormorant_Garamond,
  Manrope,
  Noto_Sans_SC,
  Noto_Serif_SC,
} from "next/font/google";
import { getLocale, setRequestLocale } from "next-intl/server";

const editorialSerif = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-editorial-serif",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const editorialSans = Manrope({
  subsets: ["latin"],
  variable: "--font-editorial-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const editorialSansZh = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-editorial-sans-zh",
  display: "swap",
  weight: ["400", "500", "700"],
});

const editorialSerifZh = Noto_Serif_SC({
  subsets: ["latin"],
  variable: "--font-editorial-serif-zh",
  display: "swap",
  weight: ["400", "500", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  setRequestLocale(locale);

  const googleAdsenseCode = process.env.NEXT_PUBLIC_GOOGLE_ADCODE || "";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {googleAdsenseCode && (
          <meta name="google-adsense-account" content={googleAdsenseCode} />
        )}

        {/* Resource hints for faster third-party connections */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://clarity.ms" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body
        className={`${editorialSerif.variable} ${editorialSans.variable} ${editorialSansZh.variable} ${editorialSerifZh.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
