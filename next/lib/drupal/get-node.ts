import { cache } from "react";

import { drupalClientViewer } from "@/lib/drupal/drupal-client-viewer";

import {
  GET_ENTITY_AT_DRUPAL_PATH,
  GET_STATIC_PATHS,
} from "../graphql/queries";
import { extractEntityFromRouteQueryResult } from "../graphql/utils";

import { drupalClientPreviewer } from "./drupal-client-previewer";

export const getNodeQueryResult = cache(
  async (path: string, locale: string, isDraftMode: boolean = false) => {
    const drupalClient = isDraftMode
      ? drupalClientPreviewer
      : drupalClientViewer;

    const data = await drupalClient.doGraphQlRequest(
      GET_ENTITY_AT_DRUPAL_PATH,
      {
        path,
        langcode: locale,
      },
    );

    return data;
  },
);

export async function getNodeStaticPaths({
  limit,
  locale,
}: {
  limit: number;
  locale: string;
}) {
  const paths = await drupalClientViewer.doGraphQlRequest(GET_STATIC_PATHS, {
    number: limit,
    langcode: locale,
  });

  return paths;
}

export async function getNodeEntity(
  path: string,
  locale: string,
  isDraftMode: boolean = false,
) {
  const data = await getNodeQueryResult(path, locale, isDraftMode);
  return extractEntityFromRouteQueryResult(data);
}
