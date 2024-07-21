import { cache } from "react";
import { GET_ENTITY_AT_DRUPAL_PATH } from "../graphql/queries";
import { drupalClientPreviewer, drupalClientViewer } from "./drupal-client";

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
