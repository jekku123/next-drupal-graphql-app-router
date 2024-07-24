import { getLatestArticlesItems } from "@/lib/drupal/get-articles";

import { ArticleListItem } from "./list-item";

type PaginationListingProps = {
  variables: { limit: number; offset: number; locale: string; query?: string };
};

export default async function PaginationListing({
  variables,
}: PaginationListingProps) {
  const { articles } = await getLatestArticlesItems(variables);

  return (
    <ul className="mt-4">
      {articles?.map((article) => (
        <li key={article.id}>
          <ArticleListItem article={article} />
        </li>
      ))}
    </ul>
  );
}
