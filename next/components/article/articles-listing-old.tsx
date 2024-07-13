"use client";

import { useQuery } from "@tanstack/react-query";

import { LoadingSpinner } from "@/components/loading-spinner";
import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { useLocale, useTranslations } from "next-intl";
import { ArticleTeaser } from "./article-teaser";

export function ArticlesListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const locale = useLocale();
  const t = useTranslations();

  const { data, isLoading } = useQuery({
    queryKey: [`articles-${locale}-${listingId}`],
    queryFn: async () => {
      const response = await fetch(
        `/api/articles-listing/${locale}?limit=${limit}`,
        {
          headers: {
            "accept-language": locale,
          },
        },
      );

      return await response.json();
    },
  });

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <ul className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
        {!isLoading &&
          data?.map((article: FragmentArticleTeaserFragment) => (
            <li key={article.id}>
              <ArticleTeaser article={article} />
            </li>
          ))}
      </ul>
      {!data?.length && !isLoading && (
        <p className="py-4">{t("no-content-found")}</p>
      )}
    </>
  );
}
