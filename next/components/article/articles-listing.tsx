import { getArticlesListing } from "@/lib/drupal/get-articles-listing";
import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import { getLocale, getTranslations } from "next-intl/server";
import { ArticleTeaser } from "./article-teaser";

export async function ArticlesListing({
  listingId,
  limit,
}: {
  listingId: string;
  limit: number;
}) {
  const locale = await getLocale();
  const t = await getTranslations();

  const data = await getArticlesListing({ limit, locale });

  return (
    <>
      <ul className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2 md:grid-cols-3">
        {data?.map((article: FragmentArticleTeaserFragment) => (
          <li key={article.id}>
            <ArticleTeaser article={article} />
          </li>
        ))}
      </ul>
      {!data?.at(0) && <p className="py-4">{t("no-content-found")}</p>}
    </>
  );
}
