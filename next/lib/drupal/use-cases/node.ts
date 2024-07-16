import {
  GET_ENTITY_AT_DRUPAL_PATH,
  GET_STATIC_PATHS,
} from "@/lib/graphql/queries";
import { drupalClientPreviewer, drupalClientViewer } from "../drupal-client";

export async function fetchNodeQueryResult({
  path,
  locale,
  isDraftMode = false,
}: {
  path: string;
  locale: string;
  isDraftMode?: boolean;
}) {
  const variables = { path, langcode: locale };
  const drupalClient = isDraftMode ? drupalClientPreviewer : drupalClientViewer;

  try {
    const data = await drupalClient.doGraphQlRequest(
      GET_ENTITY_AT_DRUPAL_PATH,
      variables,
    );

    return data;
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    return null;
  }
}

export async function fetchNodePaths({ locale }: { locale: string }) {
  const data = await drupalClientViewer.doGraphQlRequest(GET_STATIC_PATHS, {
    // We will query for the latest 10 items of each content type:
    number: 10,
    langcode: locale,
  });

  return data;
}
