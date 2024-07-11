"use client";

import clsx from "clsx";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useLanguageLinks } from "@/lib/contexts/language-links-context";
import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import LanguageIcon from "@/styles/icons/language.svg";

// TODO: LOCALE HANDLING FOR APP ROUTER
export function LanguageSwitcher() {
  const languageLinks = useLanguageLinks();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  // Close on locale change add locale for app router to whereever see "en"
  useEffect(close, ["en"]);

  // Close on click outside
  const ref = useOnClickOutside<HTMLDivElement>(close);
  const { t } = useTranslation();

  return (
    <div ref={ref}>
      <span className="sr-only">{t("language-switcher")}</span>
      <button
        type="button"
        className="hover:underline"
        onClick={toggle}
        aria-expanded={isOpen}
      >
        <span className="sr-only sm:not-sr-only sm:mr-2 sm:inline">
          {languageLinks["en"].name}
        </span>
        <LanguageIcon className="inline-block w-6 h-6" aria-hidden="true" />
      </button>
      <ul
        className={clsx(
          "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
          !isOpen && "hidden",
        )}
      >
        {/* get locales from somewhere for app router */}
        {["en", "fi", "sv"]
          .filter((l) => l !== "en")
          .map((l) => {
            const { name, path } = languageLinks[l];
            return (
              <li key={l}>
                <Link
                  className="block p-2 hover:bg-primary-50"
                  locale={l}
                  href={path}
                >
                  {name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
