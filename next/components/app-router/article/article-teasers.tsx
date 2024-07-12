import clsx from "clsx";
import Link from "next/link";

import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

import { buttonVariants } from "@/ui/button";
import { getTranslations } from "next-intl/server";
import { Icons } from "../icons";
import { ArticleTeaser } from "./article-teaser";

interface LatestArticlesProps {
  articles?: FragmentArticleTeaserFragment[];
  heading: string;
}

export async function ArticleTeasers({
  articles,
  heading,
}: LatestArticlesProps) {
  const t = await getTranslations();

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
          <Link
            href="/all-articles"
            className={clsx(
              buttonVariants({ variant: "primary" }),
              "text-base mr-4 mt-4 inline-flex px-5 py-3",
            )}
          >
            {t("all-articles")}
            <Icons.arrowIcon aria-hidden className="w-6 h-6 ml-3 -rotate-90" />
          </Link>
        )}
      </div>
    </>
  );
}
