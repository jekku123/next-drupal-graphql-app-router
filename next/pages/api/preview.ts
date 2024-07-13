import { NextApiRequest, NextApiResponse } from "next";

import { drupalClientPreviewer } from "@/lib/drupal/drupal-client";

export default async function draft(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  await drupalClientPreviewer.preview(request, response, { enable: true });
}
