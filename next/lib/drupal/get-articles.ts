import type { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";

import siteConfig from "@/site.config";
import { fetchArticlesView } from "./data-access/articles";

type GetArticlesArgs = {
  limit?: number;
  offset?: number;
  locale?: string;
};

export const getArticles = async ({
  limit = 5,
  offset = 0,
  locale = siteConfig.defaultLocale,
}: GetArticlesArgs): Promise<{
  totalPages: number;
  nodes: FragmentArticleTeaserFragment[];
}> => {
  let nodes: FragmentArticleTeaserFragment[] = [];
  let totalPages = 1;

  try {
    const articlesViewResult = await fetchArticlesView({
      langcode: locale,
      page: 0,
      pageSize: limit,
      offset: offset,
    });

    if (articlesViewResult) {
      nodes = articlesViewResult.results as FragmentArticleTeaserFragment[];
      // To get to the total number of pages, we need to add the offset
      // to the "total" property, that is to be considered as the total "remaining"
      // articles to be displayed.
      totalPages = Math.ceil(
        (articlesViewResult.pageInfo.total + offset) / limit,
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

export const getLatestArticlesItems = async (
  args: GetArticlesArgs,
): Promise<{
  totalPages: number;
  articles: FragmentArticleTeaserFragment[];
}> => {
  const { totalPages, nodes } = await getArticles(args);

  return {
    totalPages,
    articles: nodes,
  };
};
