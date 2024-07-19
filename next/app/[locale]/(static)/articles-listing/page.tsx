import { HeadingPage } from "@/components/heading--page";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import Listing from "./_components/listing";
import Search from "./_components/search";

export default async function Page({
  locale,
  searchParams,
}: {
  locale: string;
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // Get the page searchParams and set the default values
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  //   const totalPages = await fetchInvoicesPages(query);

  return (
    <>
      <div className="flex items-center justify-between w-full">
        <HeadingPage>{t("all-articles")}</HeadingPage>
        <Search placeholder="Search.." />
      </div>
      <Suspense key={query + currentPage} fallback={null}>
        <Listing currentPage={currentPage} query={query} />
      </Suspense>
    </>
  );
}
