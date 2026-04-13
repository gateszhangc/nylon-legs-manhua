import "@/app/globals.css";

import { MdOutlineHome } from "react-icons/md";
import { Metadata } from "next";
import React from "react";
import GoogleAnalytics from "@/components/analytics/google-analytics";
import ClarityAnalytics from "@/components/analytics/clarity";
import GaRouteTracker from "@/components/analytics/ga-route-tracker";
import { getSiteContent } from "@/content/nylon-legs/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const content = getSiteContent("en");

  return {
    title: {
      template: `%s | ${content.brandName}`,
      default: content.brandName,
    },
    description: content.defaultDescription,
    keywords: content.defaultKeywords,
  };
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <GoogleAnalytics />
      <ClarityAnalytics />
      <GaRouteTracker />
      <a
        className="text-base-content cursor-pointer hover:opacity-80 transition-opacity"
        href="/"
      >
        <MdOutlineHome className="text-2xl mx-8 my-8" />
        {/* <img className="w-10 h-10 mx-4 my-4" src="/imgs/logos/logo.png" /> */}
      </a>
      <div className="text-md max-w-3xl mx-auto leading-loose pt-4 pb-8 px-8 prose prose-slate dark:prose-invert prose-headings:font-semibold prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-base-content prose-code:text-base-content prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md">
        {children}
      </div>
    </div>
  );
}
