"use client";

import { createContext, useContext } from "react";

import siteConfig from "@/site.config";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { createLanguageLinksForNextOnlyPage } from "./language-links";

export type LanguageLinks = typeof siteConfig.locales;

const LanguageLinksContext = createContext(siteConfig.locales);

/**
 * Provide the language links context.
 */
export function LanguageLinksProvider({
  languageLinks,
  children,
}: {
  languageLinks?: typeof siteConfig.locales;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const locale = useLocale();

  // If the language links are not provided, create them for the current page.
  const locales =
    languageLinks ??
    createLanguageLinksForNextOnlyPage(pathname.replace(`/${locale}`, ""));

  return (
    <LanguageLinksContext.Provider value={languageLinks || locales}>
      {children}
    </LanguageLinksContext.Provider>
  );
}

/**
 * Access the language links from the language links context.
 */
export function useLanguageLinks() {
  return useContext(LanguageLinksContext);
}
