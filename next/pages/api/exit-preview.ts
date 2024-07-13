import { drupalClientPreviewer } from "@/lib/drupal/drupal-client";

import type { NextApiRequest } from "next";
import { NextApiResponse } from "next";

export default async function exit(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  await drupalClientPreviewer.previewDisable(request, response);
}
