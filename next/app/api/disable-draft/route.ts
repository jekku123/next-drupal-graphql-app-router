import { disableDraftMode } from "next-drupal/draft";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

// disable draft mode and redirect to the callback path from the query parameter
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const callbackPath = searchParams.get("callbackPath");

  disableDraftMode();
  redirect(callbackPath ?? "/");
}
