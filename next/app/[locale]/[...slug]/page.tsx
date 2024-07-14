import Layout from "@/components/layout";
import { Node } from "@/components/node";
import {
  createLanguageLinks,
  getStandardLanguageLinks,
} from "@/lib/contexts/language-links";
import {
  drupalClientPreviewer,
  drupalClientViewer,
} from "@/lib/drupal/drupal-client";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  GET_ENTITY_AT_DRUPAL_PATH,
  GET_STATIC_PATHS,
} from "@/lib/graphql/queries";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "@/lib/graphql/utils";
import { extractMetaDataFromNodeEntity } from "@/lib/metadata";
import { Metadata, ResolvingMetadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";

// TODO: LOCALE
type PageParams = {
  params: { slug: string[]; locale: string };
};

export async function generateMetadata(
  { params: { locale, slug } }: PageParams,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const path = Array.isArray(slug) ? `/${slug?.join("/")}` : slug;

  const variables = {
    path: path,
    langcode: locale,
  };

  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
  );

  let nodeEntity = extractEntityFromRouteQueryResult(data);

  const metadata = await extractMetaDataFromNodeEntity({
    title: nodeEntity.title,
    metatags: nodeEntity.metatag as FragmentMetaTagFragment[],
  });

  return metadata;
}

// TODO: MAybe not working like so with app router, check!
export async function generateStaticParams({ params: { locale } }: PageParams) {
  const staticPaths: ReturnType<
    typeof drupalClientViewer.buildStaticPathsParamsFromPaths
  > = [];

  // Get the defined paths via graphql for the current locale:
  const data = await drupalClientViewer.doGraphQlRequest(GET_STATIC_PATHS, {
    // We will query for the latest 10 items of each content type:
    number: 10,
    langcode: locale,
  });

  // Get all paths from the response:
  const pathArray = [
    ...(data?.nodePages?.nodes || []),
    ...(data?.nodeArticles?.nodes || []),
  ].map(({ path }) => path);

  // Build static paths for the current locale.
  const localePaths = drupalClientViewer.buildStaticPathsParamsFromPaths(
    pathArray,
    {
      locale,
      // Because graphql returns the path with the language prefix, we strip it using the pathPrefix option:
      pathPrefix: `/${locale}`,
    },
  );

  // Add the paths to the static paths array:
  staticPaths.push(...localePaths);

  return staticPaths;
}

export default async function CustomPage({
  params: { locale, slug },
}: PageParams) {
  unstable_setRequestLocale(locale);
  const path = Array.isArray(slug) ? `/${slug?.join("/")}` : slug;

  // Are we in Next.js preview mode?
  // TODO: FIX WITH APP ROUTER AND USE PROPER CLIENT WHEN FETCHING

  const isDraftMode = draftMode().isEnabled || false;

  // Get the page data with Graphql.
  // We want to use a different client if we are in preview mode:
  const drupalClient = isDraftMode ? drupalClientPreviewer : drupalClientViewer;

  const variables = {
    path: path,
    langcode: locale,
  };

  const data = await drupalClient.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
  );

  // If the data contains a RedirectResponse, we redirect to the path:
  const redirectData = extractRedirectFromRouteQueryResult(data);

  if (redirectData) {
    redirect(redirectData.url);
  }

  // Get the entity from the response:
  let nodeEntity = extractEntityFromRouteQueryResult(data);

  // If there's no node, return 404:
  if (!nodeEntity) {
    notFound();
  }

  // If node is a frontpage, redirect to / for the current locale:
  if (nodeEntity.__typename === "NodeFrontpage") {
    permanentRedirect(locale);
  }

  // // When in preview, we could be requesting a specific revision.
  // // In this case, the previewData will contain the resourceVersion property,
  // // we can use that in combination with the node id to fetch the correct revision
  // // This means that we will need to do a second request to Drupal.
  // const { previewData } = context as {
  //   previewData: PreviewData & { resourceVersion?: string };
  // };
  // if (
  //   isDraftMode &&
  //   previewData &&
  //   typeof previewData === "object" &&
  //   previewData.resourceVersion &&
  //   // If the resourceVersion is "rel:latest-version", we don't need to fetch the revision:
  //   previewData.resourceVersion !== "rel:latest-version"
  // ) {
  //   // Get the node id from the entity we already have:
  //   const nodeId = nodeEntity.id;
  //   // the revision will be in the format "id:[id]":
  //   const revisionId = previewData.resourceVersion.split(":").slice(1);
  //   // To fetch the entity at a specific revision, we need to call a specific path:
  //   const revisionPath = `/node/${nodeId}/revisions/${revisionId}/view`;

  //   // Get the node at the specific data with Graphql:
  //   const revisionRoutedata = await drupalClient.doGraphQlRequest(
  //     GET_ENTITY_AT_DRUPAL_PATH,
  //     { path: revisionPath, langcode: locale },
  //   );

  //   // Instead of the entity at the current revision, we want now to
  //   // display the entity at the requested revision:
  //   nodeEntity = extractEntityFromRouteQueryResult(revisionRoutedata);
  //   if (!nodeEntity) {
  //     notFound();
  //   }
  // }

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!isDraftMode && nodeEntity.status !== true) {
    notFound();
  }

  // Add information about possible other language versions of this node.

  // Get the entity from the response:

  // Add information about possible other language versions of this node.
  let languageLinks;
  // Not all node types necessarily have translations enabled,
  // if so, only show the standard language links.
  if ("translations" in nodeEntity) {
    languageLinks = createLanguageLinks(nodeEntity.translations);
  } else {
    languageLinks = getStandardLanguageLinks();
  }

  return (
    <Layout languageLinks={languageLinks}>
      <Node node={nodeEntity} />
    </Layout>
  );
}
