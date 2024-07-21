import { env } from "@/env";
import { createGraphQlDrupalClient } from "./drupal-client";

// This instance of the client will connect to the Drupal API using a consumer that
// is associated with a role with "regular" permissions. It should be used by default.
export const drupalClientViewer = createGraphQlDrupalClient(
  env.DRUPAL_CLIENT_VIEWER_ID,
  env.DRUPAL_CLIENT_VIEWER_SECRET,
);
