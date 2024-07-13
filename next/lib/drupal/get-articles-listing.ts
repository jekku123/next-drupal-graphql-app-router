import { LISTING_ARTICLES } from "../graphql/queries";
import { drupalClientViewer } from "./drupal-client";

export async function getArticlesListing({
  limit = 10,
  locale,
}: {
  limit: number;
  locale: string;
}) {
  try {
    const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
      LISTING_ARTICLES,
      {
        langcode: locale,
        page: 0,
        pageSize: limit,
      },
    );

    return articlesQueryResult.articlesView?.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// import { drupalClientViewer } from "@/lib/drupal/drupal-client";
// import { LISTING_ARTICLES } from "@/lib/graphql/queries";

// import siteConfig from "@/site.config";
// import { NextRequest, NextResponse } from "next/server";

// // TODO: Fix this
// export async function GET(req: NextRequest, res: NextResponse) {
//   const languagePrefix =
//     req.headers["accept-language"] || siteConfig.defaultLocale;

//   const searchParams = req.nextUrl.searchParams;

//   const limit = searchParams.get("limit") || 10;

//   const articlesQueryResult = await drupalClientViewer.doGraphQlRequest(
//     LISTING_ARTICLES,
//     {
//       langcode: languagePrefix,
//       page: 0,
//       pageSize: limit,
//     },
//   );

//   return new Response(
//     JSON.stringify(articlesQueryResult.articlesView?.results),
//     {
//       status: 200,
//       headers: {
//         "Content-Type": "application/json",
//         "Cache-Control": "s-maxage=60, stale-while-revalidate",
//       },
//     },
//   );
// }
