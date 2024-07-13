import { drupalClientPreviewer } from "@/lib/drupal/drupal-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function preview(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  await drupalClientPreviewer.preview(request, response);
}
