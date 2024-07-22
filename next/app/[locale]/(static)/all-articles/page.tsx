import { HeadingPage } from "@/components/heading--page";
import { getArticlesTotalPages } from "@/lib/drupal/get-articles-total-pages";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import PaginationListing from "./_components/listing";
import { ListingSkeleton } from "./_components/listing-skeleton";
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

export async function generateMetadata({
  params: { locale },
}: ArticlesListingPageParams): Promise<Metadata> {
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

  const variables = {
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
    query,
  };

  // Maybe fetch here the total pages and pass it into the Pagination component here
  // instead of fetching em in the Listing component so that Pagination can be shown always
  const totalPages = await getArticlesTotalPages(variables);

  return (
    <>
      <div className="flex flex-col items-start justify-between w-full gap-2 sm:flex-row sm:items-center sm:gap-0">
        <HeadingPage>{t("all-articles")}</HeadingPage>
        <Search placeholder={t("search-articles-placeholder")} />
      </div>
      <Suspense key={query + currentPage} fallback={<ListingSkeleton />}>
        <PaginationListing variables={variables} />
      </Suspense>
      <div className="flex justify-center w-full mt-5">
        <PaginationController
          pageRoot={`${locale}/all-articles`}
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      </div>
    </>
  );
}
