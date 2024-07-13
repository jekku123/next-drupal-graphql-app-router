import { drupalClientPreviewer } from "@/lib/drupal/drupal-client";
import { enableDraftMode } from "next-drupal/draft";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest): Promise<Response | never> {
  return enableDraftMode(request, drupalClientPreviewer);
}
