import { env } from "@/env";
import { createGraphQlDrupalClient } from "./drupal-client";

// This instance of the client will connect to the Drupal API using a consumer
// which is associated with a role with additional permissions. Use this instance
// when you need to get data for unpublished nodes, like in previews.
export const drupalClientPreviewer = createGraphQlDrupalClient(
  env.DRUPAL_CLIENT_ID,
  env.DRUPAL_CLIENT_SECRET,
);
