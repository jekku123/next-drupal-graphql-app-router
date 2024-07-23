import { drupalClientViewer } from "@/lib/drupal/drupal-client-viewer";
import siteConfig from "@/site.config";
import { LISTING_ARTICLES } from "../graphql/queries";

type GetArticlesArgs = {
  limit?: number;
  offset?: number;
  locale?: string;
  query?: string;
};

export const getArticlesTotalPages = async ({
  limit = 5,
  offset = 0,
  locale = siteConfig.defaultLocale,
  query,
}: GetArticlesArgs): Promise<number> => {
  let totalPages = 1;

  try {
    const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
      LISTING_ARTICLES,
      {
        langcode: locale,
        page: 0,
        pageSize: limit,
        offset: offset,
        query: query,
      },
    );

    if (articlesQueryResult) {
      // To get to the total number of pages, we need to add the offset
      // to the "total" property, that is to be considered as the total "remaining"
      // articles to be displayed.
      totalPages = Math.ceil(
        (articlesQueryResult.articlesView.pageInfo.total + offset) / limit,
      );
    }
  } catch (error) {
    console.error(error);
  }

  return totalPages;
};
