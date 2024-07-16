import { LISTING_ARTICLES } from "@/lib/graphql/queries";
import { Variables } from "graphql-request";
import { drupalClientViewer } from "../drupal-client";

export async function fetchArticlesView(variables: Variables) {
  try {
    const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
      LISTING_ARTICLES,
      variables,
    );

    return articlesQueryResult.articlesView ?? null;
  } catch (error) {
    console.error(error);
  }
}
