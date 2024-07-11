"use client";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "next-i18next";

import { LoadingSpinner } from "@/components/loading-spinner";
import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { ArticleTeaser } from "./article-teaser";

export function ArticlesListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const { t } = useTranslation();

  const { data, isLoading } = useQuery({
    queryKey: [`articles-en-${listingId}`],
    queryFn: async () => {
      const response = await fetch(`/api/articles-listing/en?limit=${limit}`, {
        headers: {
          "accept-language": "en",
        },
      });

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
