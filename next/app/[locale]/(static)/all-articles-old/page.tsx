import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import ArticlesPagination from "./_components/articles-pagination";

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

  const PAGE_SIZE = 5;

  const variables = {
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
    query,
  };

  const { articles, totalPages } = await getLatestArticlesItems(variables);

  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  const pageRoot = `${locale}/all-articles-old`;

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    prevEnabled &&
    `${pageRoot}?page=${prevPage}` + (query && `&query=${query}`);
  const nextPageHref =
    nextEnabled &&
    `${pageRoot}?page=${nextPage}` + (query && `&query=${query}`);

  const paginationProps = {
    currentPage,
    totalPages,
    prevEnabled,
    nextEnabled,
    prevPageHref,
    nextPageHref,
  };

  return (
    <ArticlesPagination articles={articles} paginationProps={paginationProps} />
  );
}
