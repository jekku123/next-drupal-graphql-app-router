import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

import siteConfig from "@/site.config";
import { LISTING_ARTICLES_NEW } from "../graphql/queries";
import { drupalClientViewer } from "./drupal-client";

type GetArticlesArgs = {
  limit?: number;
  offset?: number;
  locale?: string;
  query?: string;
};

export const getArticles2 = async ({
  limit = 5,
  offset = 0,
  locale = siteConfig.defaultLocale,
  query,
}: GetArticlesArgs): Promise<{
  totalPages: number;
  nodes: FragmentArticleTeaserFragment[];
}> => {
  let nodes: FragmentArticleTeaserFragment[] = [];
  let totalPages = 1;

  try {
    const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
      LISTING_ARTICLES_NEW,
      {
        langcode: locale,
        page: 0,
        pageSize: limit,
        offset: offset,
        title: query,
      },
    );

    if (articlesQueryResult) {
      nodes = articlesQueryResult.articlesViewNew
        .results as FragmentArticleTeaserFragment[];
      // To get to the total number of pages, we need to add the offset
      // to the "total" property, that is to be considered as the total "remaining"
      // articles to be displayed.
      totalPages = Math.ceil(
        (articlesQueryResult.articlesViewNew.pageInfo.total + offset) / limit,
      );
    }
  } catch (error) {
    console.error(error);
  }

  return {
    totalPages,
    nodes,
  };
};

export const getLatestArticlesItems2 = async (
  args: GetArticlesArgs,
): Promise<{
  totalPages: number;
  articles: FragmentArticleTeaserFragment[];
}> => {
  const { totalPages, nodes } = await getArticles2(args);

  return {
    totalPages,
    articles: nodes,
  };
};
