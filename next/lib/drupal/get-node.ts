import { drupalClientViewer } from "@/lib/drupal/drupal-client-viewer";
import { cache } from "react";
import { GET_ENTITY_AT_DRUPAL_PATH } from "../graphql/queries";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "../graphql/utils";
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

export async function getNodeEntity(
  path: string,
  locale: string,
  isDraftMode: boolean = false,
) {
  const data = await getNodeQueryResult(path, locale, isDraftMode);
  return extractEntityFromRouteQueryResult(data);
}

export async function getNodeResult(
  path: string,
  locale: string,
  isDraftMode: boolean = false,
) {
  const data = await getNodeQueryResult(path, locale, isDraftMode);
  const nodeEntity = extractEntityFromRouteQueryResult(data) || null;
  const redirectResult = extractRedirectFromRouteQueryResult(data) || null;

  return {
    nodeEntity,
    redirectResult,
  };
}
