import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

import { HeadingPage } from "@/components/heading--page";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";

import PaginationListing from "./_components/listing";
import { PaginationController } from "./_components/pagination";
import Search from "./_components/search";

type ArticlesListingPageParams = {
  params: {
    locale: string;
  };
  searchParams?: {
    query?: string;
    page?: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("all-articles"),
  };
}

export const revalidate = 10;

export default async function AllArticlesPage({
  params: { locale },
  searchParams,
}: ArticlesListingPageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // Get the page searchParams and set the default values
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const PAGE_SIZE = 3;
  const PAGE_ROOT = `/all-articles`;
  const MAX_LINKS = 3;

  const variables = {
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
    query,
  };

  // Maybe fetch here the total pages and pass it into the Pagination component here
  // instead of fetching em in the Listing component so that Pagination can be always shown
  // and could show a skeleton loader while fetching the articles

  // const totalPages = await getArticlesTotalPages(variables);
  const { articles, totalPages } = await getLatestArticlesItems(variables);

  return (
    <>
      <div className="flex flex-col items-start justify-between w-full gap-2 sm:flex-row sm:items-center sm:gap-0">
        <HeadingPage>{t("all-articles")}</HeadingPage>
        <Search placeholder={t("search-articles-placeholder")} />
      </div>
      {/* <Suspense key={query + currentPage} fallback={<LoadingSpinner />}>
        <PaginationListing variables={variables} />
      </Suspense> */}
      <PaginationListing articles={articles} />
      <div className="flex justify-center w-full mt-5">
        <PaginationController
          pageRoot={PAGE_ROOT}
          linkLimit={MAX_LINKS}
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      </div>
    </>
  );
}
