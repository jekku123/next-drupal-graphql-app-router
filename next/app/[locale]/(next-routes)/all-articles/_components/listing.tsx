import { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

import { ArticleListItem } from "./list-item";

type PaginationListingProps = {
  articles: FragmentArticleTeaserFragment[];
};

export default function PaginationListing({
  articles,
}: PaginationListingProps) {
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
