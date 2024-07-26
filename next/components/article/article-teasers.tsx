import { useTranslations } from "next-intl";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { cn } from "@/lib/utils";
import ArrowIcon from "@/styles/icons/arrow-down.svg";

import { ArticleTeaser } from "./article-teaser";

import { LinkWithLocale } from "@/navigation";
import { buttonVariants } from "@/ui/button";

interface LatestArticlesProps {
  articles?: FragmentArticleTeaserFragment[];
  heading: string;
}

export function ArticleTeasers({ articles, heading }: LatestArticlesProps) {
  const t = useTranslations();

  return (
    <>
      <h2 className="font-bold text-heading-sm md:text-heading-md">
        {heading}
      </h2>
      <ul className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-center">
        {!articles?.length && <p className="py-4">{t("no-content-found")}</p>}
        {articles?.length && (
          <LinkWithLocale
            href="/all-articles"
            className={cn(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("all-articles")}

            <ArrowIcon className="w-6 h-6 ml-3 -rotate-90" aria-hidden />
          </LinkWithLocale>
        )}
      </div>
    </>
  );
}
