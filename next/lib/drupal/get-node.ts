import { getDraftData } from "next-drupal/draft";
import { notFound, permanentRedirect, redirect } from "next/navigation";
import { cache } from "react";
import { GET_ENTITY_AT_DRUPAL_PATH } from "../graphql/queries";
import {
  extractEntityFromRouteQueryResult,
  extractRedirectFromRouteQueryResult,
} from "../graphql/utils";
import { drupalClientPreviewer, drupalClientViewer } from "./drupal-client";

export const getNode = cache(
  async (path: string, locale: string, isDraftMode: boolean = false) => {
    const variables = { path, langcode: locale };

    // Get the node entity from Drupal.
    const drupalClient = isDraftMode
      ? drupalClientPreviewer
      : drupalClientViewer;

    const data = await drupalClient.doGraphQlRequest(
      GET_ENTITY_AT_DRUPAL_PATH,
      variables,
    );
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
    if (isDraftMode) {
      const draftData = getDraftData();

      if (
        draftData &&
        typeof draftData === "object" &&
        draftData.resourceVersion &&
        // If the resourceVersion is "rel:latest-version", we don't need to fetch the revision:
        draftData.resourceVersion !== "rel:latest-version"
      ) {
        // Get the node id from the entity we already have:
        const revisionId = draftData.resourceVersion.split(":").slice(1);
        const revisionPath = `/node/${nodeEntity.id}/revisions/${revisionId}/view`;
        const revisionRouteQueryResult = await drupalClient.doGraphQlRequest(
          GET_ENTITY_AT_DRUPAL_PATH,

          {
            path: revisionPath,
            langcode: locale,
          },
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
    }

    return nodeEntity;
  },
);
