import { ArticleTeasers } from "@/components/app-router/article/article-teasers";
import { Node } from "@/components/app-router/node";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { FragmentArticleTeaserFragment } from "@/lib/gql/graphql";
import {
  GET_ENTITY_AT_DRUPAL_PATH,
  LISTING_ARTICLES,
} from "@/lib/graphql/queries";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function FrontPage() {
  const variables = {
    // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal:
    path: `frontpage-en`,
    langcode: "en",
  };

  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
  );

  const frontpage = extractEntityFromRouteQueryResult(data);

  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    return notFound();
  }

  // Unless we are in preview, return 404 if the node is set to unpublished:
  //   if (!context.preview && frontpage.status !== true) {
  //     return {
  //       notFound: true,
  //       revalidate: 10,
  //     };
  //   }

  // Get the last 3 sticky articles in the current language:
  const stickyArticleTeasers = await drupalClientViewer.doGraphQlRequest(
    LISTING_ARTICLES,
    {
      langcode: "en",
      sticky: true,
      page: 0,
      pageSize: 3,
    },
  );

  // We cast the results as the ListingArticle type to get type safety:
  const articles =
    (stickyArticleTeasers.articlesView
      ?.results as FragmentArticleTeaserFragment[]) ?? [];

  return (
    <>
      {/* <Meta
        title={frontpage?.title}
        metatags={frontpage?.metatag as FragmentMetaTagFragment[]}
      /> */}
      <Node node={frontpage} />
      <ArticleTeasers heading="Article Teasers" articles={articles} />
    </>
  );
}
