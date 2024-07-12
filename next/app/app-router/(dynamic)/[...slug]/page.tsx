import { Node } from "@/components/app-router/node";
import { extractMetaDataFromNodeEntity } from "@/lib/contexts/metadata";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { GET_ENTITY_AT_DRUPAL_PATH } from "@/lib/graphql/queries";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "@/lib/graphql/utils";
import { Metadata, ResolvingMetadata } from "next";
import { notFound, permanentRedirect, redirect } from "next/navigation";

// TODO: LOCALE
type PageParams = {
  params: { slug: string[]; locale: string };
};

export async function generateMetadata(
  { params }: PageParams,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const path = Array.isArray(params.slug)
    ? `/${params.slug?.join("/")}`
    : params.slug;

  const variables = {
    path: path,
    langcode: "en",
  };

  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
  );

  let nodeEntity = extractEntityFromRouteQueryResult(data);
  const metadata = extractMetaDataFromNodeEntity({
    title: nodeEntity.title,
    metatags: nodeEntity.metatag as FragmentMetaTagFragment[],
  });

  return metadata;
}

export default async function CustomPage({ params }: PageParams) {
  const path = Array.isArray(params.slug)
    ? `/${params.slug?.join("/")}`
    : params.slug;

  const variables = {
    path: path,
    langcode: "en",
  };

  // Are we in Next.js preview mode?
  // TODO: FIX WITH APP ROUTER AND USE PROPER CLIENT WHEN FETCHING
  // const isPreview = context.preview || false;
  // const drupalClient = isPreview ? drupalClientPreviewer : drupalClientViewer;

  // Get the page data with Graphql.
  // We want to use a different client if we are in preview mode:
  const data = await drupalClientViewer.doGraphQlRequest(
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
    return notFound();
  }

  // If node is a frontpage, redirect to / for the current locale:
  if (nodeEntity.__typename === "NodeFrontpage") {
    permanentRedirect(`/en`);
  }

  // // When in preview, we could be requesting a specific revision.
  // // In this case, the previewData will contain the resourceVersion property,
  // // we can use that in combination with the node id to fetch the correct revision
  // // This means that we will need to do a second request to Drupal.
  // const { previewData } = context as {
  //   previewData: PreviewData & { resourceVersion?: string };
  // };
  // if (
  //   isPreview &&
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
  //     { path: revisionPath, langcode: context.locale },
  //   );

  //   // Instead of the entity at the current revision, we want now to
  //   // display the entity at the requested revision:
  //   nodeEntity = extractEntityFromRouteQueryResult(revisionRoutedata);
  //   if (!nodeEntity) {
  //     return {
  //       notFound: true,
  //       revalidate: 60,
  //     };
  //   }
  // }

  // // Unless we are in preview, return 404 if the node is set to unpublished:
  // if (!isPreview && nodeEntity.status !== true) {
  //   return {
  //     notFound: true,
  //     revalidate: 60,
  //   };
  // }

  // // Add information about possible other language versions of this node.
  // let languageLinks;
  // // Not all node types necessarily have translations enabled,
  // // if so, only show the standard language links.
  // if ("translations" in nodeEntity) {
  //   languageLinks = createLanguageLinks(nodeEntity.translations);
  // } else {
  //   languageLinks = getStandardLanguageLinks();
  // }

  return <Node node={nodeEntity} />;
}
