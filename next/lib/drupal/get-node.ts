import { GET_ENTITY_AT_DRUPAL_PATH } from "../graphql/queries";
import { drupalClientViewer } from "./drupal-client";

export async function getNode({
  locale,
  slug,
}: {
  locale: string;
  slug: string[] | string;
}) {
  const path = Array.isArray(slug) ? `/${slug?.join("/")}` : slug;

  const variables = {
    path: path,
    langcode: locale,
  };

  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
  );

  return data;
}
