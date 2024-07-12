"use client";

import { ArticleListItem } from "@/components/article/article-list-item";
import { HeadingPage } from "@/components/heading--page";
import { Pagination, PaginationProps } from "@/components/pagination";
import { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { useTranslations } from "next-intl";
import { useRef } from "react";

type AllArticlesListingProps = {
  articles: FragmentArticleTeaserFragment[];
  paginationProps: PaginationProps;
};

export default function AllArticlesListing({
  articles,
  paginationProps,
}: AllArticlesListingProps) {
  const t = useTranslations();
  const focusRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div ref={focusRef} tabIndex={-1} />
      <HeadingPage>{t("all-articles")}</HeadingPage>
      <ul className="mt-4">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <Pagination
        focusRestoreRef={focusRef}
        paginationProps={paginationProps}
      />
    </>
  );
}
