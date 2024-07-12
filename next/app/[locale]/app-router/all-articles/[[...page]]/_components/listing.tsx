"use client";

import { ArticleListItem } from "@/components/app-router/article/article-list-item";
import {
  Pagination,
  PaginationProps,
} from "@/components/app-router/pagination";
import { HeadingPage } from "@/components/heading--page";
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
