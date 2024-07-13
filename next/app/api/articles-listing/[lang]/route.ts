import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { LISTING_ARTICLES } from "@/lib/graphql/queries";

import siteConfig from "@/site.config";
import { NextRequest, NextResponse } from "next/server";

// TODO: Fix this
export async function GET(req: NextRequest, res: NextResponse) {
  const languagePrefix =
    req.headers["accept-language"] || siteConfig.defaultLocale;

  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit") || 10;

  const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
    LISTING_ARTICLES,
    {
      langcode: languagePrefix,
      page: 0,
      pageSize: limit,
    },
  );

  return new NextResponse(
    JSON.stringify(articlesQueryResult.articlesView?.results),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "s-maxage=60, stale-while-revalidate",
      },
    },
  );
}
