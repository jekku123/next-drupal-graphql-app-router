import { ArticleListItem } from "@/components/article/article-list-item";
import { getLatestArticlesItems } from "@/lib/drupal/get-articles";
import { getLocale } from "next-intl/server";
import { PaginationController } from "./pagination";

export default async function Listing({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const locale = await getLocale();
  const PAGE_SIZE = 3;

  const { totalPages, articles } = await getLatestArticlesItems({
    limit: PAGE_SIZE,
    offset: currentPage ? PAGE_SIZE * (currentPage - 1) : 0,
    locale,
    query,
  });

  console.log("HELLO", query);

  return (
    <>
      <ul className="mt-4">
        {articles?.map((article) => (
          <li key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
      <div className="flex justify-center w-full mt-5">
        <PaginationController
          pageRoot={"/all-articles"}
          currentPage={currentPage}
          totalPages={totalPages}
          query={query}
        />
      </div>
    </>
  );
}
