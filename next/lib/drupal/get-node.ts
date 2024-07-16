import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import { TypedRouteEntity } from "@/types/graphql";
import { DraftData } from "next-drupal/draft";
import { fetchNodePaths, fetchNodeQueryResult } from "./use-cases/node";

type GetNodeParams = {
  locale: string;
  path: string;
  isDraftMode?: boolean;
};

export function generatePathFromSlug(slug: string[]) {
  return Array.isArray(slug) ? `/${slug?.join("/")}` : slug;
}

export async function getNodeRevisionQueryResult(
  nodeEntityId: TypedRouteEntity["id"],
  resourceVersion: DraftData["resourceVersion"],
  locale: string,
) {
  const revisionId = resourceVersion.split(":").slice(1);
  const revisionPath = `/node/${nodeEntityId}/revisions/${revisionId}/view`;

  const revisionData = await fetchNodeQueryResult({
    path: revisionPath,
    locale,
    isDraftMode: true,
  });

  return revisionData;
}

export async function getNodeQueryResult({
  locale,
  path,
  isDraftMode = false,
}: GetNodeParams) {
  const data = await fetchNodeQueryResult({
    path,
    locale,
    isDraftMode,
  });

  return data;
}

export async function getNodeEntity({
  locale,
  path,
  isDraftMode = false,
}: GetNodeParams) {
  const data = await fetchNodeQueryResult({
    path,
    locale,
    isDraftMode,
  });

  return extractEntityFromRouteQueryResult(data);
}

export async function getNodePaths({ locale }: { locale: string }) {
  return await fetchNodePaths({ locale });
}
