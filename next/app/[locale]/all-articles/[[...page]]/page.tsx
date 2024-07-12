import Layout from "@/components/layout";
import { createLanguageLinksForNextOnlyPage } from "@/lib/contexts/language-links";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import AllArticlesListing from "./_components/listing";

type AllArticlesPageParams = {
  params: { page?: string[]; locale: string };
};

export async function generateStaticParams({ params }: AllArticlesPageParams) {
  return [{ params: { page: ["1"] } }];
}

// TODO: Check if calling the other thingy with empty metadat aactually returns something getMetaData()
export async function generateMetadata({
  params: { locale },
}: AllArticlesPageParams): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("all-articles"),
  };
}

export const revalidate = 60;

export default async function AllArticlesPage({
  params: { page, locale },
}: AllArticlesPageParams) {
  unstable_setRequestLocale(locale);

  // Get the page parameter:
  const currentPage = parseInt(Array.isArray(page) ? page[0] : page || "1");

  // This has to match one of the allowed values in the article listing view
  // in Drupal.
  const PAGE_SIZE = 5;

  const { totalPages, articles } = await getLatestArticlesItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
  });

  // Create pagination props.
  const prevEnabled = currentPage > 1;
  const nextEnabled = currentPage < totalPages;

  // Create links for prev/next pages.
  const pageRoot = "/all-articles";
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const prevPageHref =
    currentPage === 2
      ? pageRoot
      : prevEnabled && [pageRoot, prevPage].join("/");
  const nextPageHref = nextEnabled && [pageRoot, nextPage].join("/");

  // Create language links for this page.
  // Note: the links will always point to the first page, because we cannot guarantee that
  // the other pages will exist in all languages.
  const languageLinks = createLanguageLinksForNextOnlyPage(pageRoot);

  const paginationProps = {
    currentPage,
    totalPages,
    prevEnabled,
    nextEnabled,
    prevPageHref,
    nextPageHref,
  };

  return (
    <Layout languageLinks={languageLinks}>
      <AllArticlesListing
        articles={articles}
        paginationProps={paginationProps}
      />
    </Layout>
  );
}
