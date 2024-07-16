import Layout from "@/components/layout";
import { Node } from "@/components/node";
import {
  createLanguageLinks,
  getStandardLanguageLinks,
} from "@/lib/contexts/language-links";
import {
  generatePathFromSlug,
  getNodeEntity,
  getNodePaths,
  getNodeQueryResult,
  getNodeRevisionQueryResult,
} from "@/lib/drupal/get-node";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "@/lib/graphql/utils";
import { extractMetaDataFromNodeEntity } from "@/lib/metadata";
import { Metadata, ResolvingMetadata } from "next";
import { getDraftData } from "next-drupal/draft";
import { unstable_setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { notFound, permanentRedirect, redirect } from "next/navigation";

type PageParams = {
  params: { slug: string[]; locale: string };
};

export async function generateMetadata(
  { params: { locale, slug } }: PageParams,
  _parent: ResolvingMetadata,
): Promise<Metadata> {
  const path = generatePathFromSlug(slug);
  // Fetch the node entity for the current page.
  const nodeEntity = await getNodeEntity({ locale, path });

  // Extract metadata from the node entity:
  const metadata = await extractMetaDataFromNodeEntity({
    title: nodeEntity.title,
    metatags: nodeEntity.metatag as FragmentMetaTagFragment[],
  });

  return metadata;
}

export async function generateStaticParams({ params: { locale } }) {
  // Get all the paths for the different node types.
  const paths = await getNodePaths({ locale });

  // Combine all the paths into a single array.
  // When adding more node types, make sure to add them here!
  const pathsArray = [
    ...(paths?.nodePages?.nodes || []),
    ...(paths?.nodeArticles?.nodes || []),
    ...(paths?.nodeProducts?.nodes || []),
  ];

  // To create the params object for each path, we need to remove the locale prefix from the path: /en/path -> path
  // and split the path into an array of slugs.
  // Example: /en/articles/article-1 -> { slug: ["articles", "article-1"] }

  return pathsArray.map(({ path }) => ({
    slug: path.replace(`/${locale}/`, "").split("/").filter(Boolean),
  }));
}

export default async function CustomPage({
  params: { locale, slug },
}: PageParams) {
  unstable_setRequestLocale(locale);
  const path = generatePathFromSlug(slug);

  // Are we in Next.js draft mode?
  const isDraftMode = draftMode().isEnabled;

  // Get the node entity from Drupal.
  let data = await getNodeQueryResult({ locale, path, isDraftMode });

  // If the data contains a RedirectResponse, we redirect to the path:
  const redirectResult = extractRedirectFromRouteQueryResult(data);

  if (redirectResult) {
    // Set to temporary redirect for 302 and 307 status codes,
    // and permanent for all others.
    if (redirectResult.status === 307 || redirectResult.status === 302) {
      redirect(redirectResult.url);
    } else {
      permanentRedirect(redirectResult.url);
    }
  }

  // Get the entity from the response:
  let nodeEntity = extractEntityFromRouteQueryResult(data);

  // If there's no node, return 404:
  if (!nodeEntity) {
    notFound();
  }

  // If node is a frontpage, redirect to / for the current locale:
  if (nodeEntity.__typename === "NodeFrontpage") {
    redirect(locale);
  }

  // When in draft mode, we could be requesting a specific revision.
  // In this case, the draftData will contain the resourceVersion property,
  // we can use that in combination with the node id to fetch the correct revision
  // This means that we will need to do a second request to Drupal.
  const draftData = getDraftData();

  if (
    isDraftMode &&
    draftData &&
    typeof draftData === "object" &&
    draftData.resourceVersion &&
    // If the resourceVersion is "rel:latest-version", we don't need to fetch the revision:
    draftData.resourceVersion !== "rel:latest-version"
  ) {
    // Get the node id from the entity we already have:
    const revisionRouteQueryResult = await getNodeRevisionQueryResult(
      nodeEntity.id,
      draftData.resourceVersion,
      locale,
    );

    const revisedNodeEntity = extractEntityFromRouteQueryResult(
      revisionRouteQueryResult,
    );

    // If we can't find the revision, return 404:
    if (!revisedNodeEntity) {
      notFound();
    }

    // Use the revised node entity for the rest of the page:
    nodeEntity = revisedNodeEntity;
  }

  // Unless we are in draft mode, return 404 if the node is set to unpublished:
  if (!isDraftMode && nodeEntity.status !== true) {
    notFound();
  }

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
