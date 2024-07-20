import { HeadingPage } from "@/components/heading--page";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Listing from "./_components/listing";
import { ListingSkeleton } from "./_components/listing-skeleton";
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

export default async function AllArticlesPage({
  params: { locale },
  searchParams,
}: ArticlesListingPageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // Get the page searchParams and set the default values
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // Maybe fetch here the total pages and pass it into the Pagination component here
  // instead of fetching em in the Listing component so that Pagination can be shown always

  console.log({ searchParams });
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <HeadingPage>{t("all-articles")}</HeadingPage>
        <Search placeholder="Search.." />
      </div>
      <Suspense key={query + currentPage} fallback={<ListingSkeleton />}>
        <Listing currentPage={currentPage} query={query} />
      </Suspense>
    </>
  );
}
