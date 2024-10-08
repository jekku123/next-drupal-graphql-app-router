import { MetadataRoute } from "next";

import { drupalClientViewer } from "@/lib/drupal/drupal-client-viewer";
import { GET_SITEMAP_NODES } from "@/lib/graphql/queries";
import {
  addSitemapLanguageVersionsOfFrontpage,
  addSitemapLanguageVersionsOfNode,
  makePathAbsolute,
} from "@/lib/utils";

import { env } from "@/env";
import { pathnames } from "@/i18n";
import { getPathname } from "@/navigation";
import siteConfig from "@/site.config";

const DEFAULT_SITEMAP_PRIORITY = 0.7;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Get all languages from site config:
  const languages = Object.keys(siteConfig.locales);
  // Initialize the sitemap:
  let sitemap: MetadataRoute.Sitemap = [];

  // For each language, start fetching the nodes for the sitemap:
  for (const lang of languages) {
    let page = 0;
    let totalItems = 0;
    // Initialize the page size to 0, we will get the actual value from the first request:
    let pageSize = 0;

    do {
      const data = await drupalClientViewer.doGraphQlRequest(
        GET_SITEMAP_NODES,
        {
          page: page,
          langcode: lang,
        },
      );

      // Get the total number of items and the page size that is set for the view:
      if (page === 0) {
        totalItems = data.sitemapNodes?.pageInfo?.total;
        pageSize = data.sitemapNodes?.pageInfo?.pageSize;
      }

      // Prepare the nodes for the sitemap:
      const nodes = data.sitemapNodes?.results?.map((node) => ({
        url:
          // Special case for the frontpage: instead of the node path, use the language path.
          node.__typename === "NodeFrontpage"
            ? makePathAbsolute(`/${node.langcode.id}`)
            : makePathAbsolute(node.path),
        lastModified: new Date(node.changed.timestamp * 1000),
        alternates: {
          languages:
            node.__typename === "NodeFrontpage"
              ? addSitemapLanguageVersionsOfFrontpage(node.translations)
              : addSitemapLanguageVersionsOfNode(node.translations),
        },
        priority:
          node.__typename === "NodeFrontpage" ? 1 : DEFAULT_SITEMAP_PRIORITY,
      }));

      // Add the nodes to the sitemap:
      sitemap = [...sitemap, ...nodes];
      // Increment the page number:
      page++;
    } while (page * pageSize < totalItems);
  }

  // Add next only routes to the sitemap, get the keys from the pathnames object:
  const keys = Object.keys(pathnames).filter(
    (key) =>
      // Exclude the dynamic route: as we don want to add it to the sitemap:
      key !== "/dashboard/webforms/[webformName]/[webformSubmissionUuid]",
  ) as Array<keyof typeof pathnames>;

  // Helper function to get the URL for a given key and locale:
  function getUrl(
    key: keyof typeof pathnames,
    locale: (typeof languages)[number],
  ) {
    const pathname = getPathname({ locale, href: key });
    return `${env.NEXT_PUBLIC_FRONTEND_URL}/${locale}${pathname === "/" ? "" : pathname}`;
  }

  // Create the next only routes:
  const nextOnlyRoutes = keys.map((key) => ({
    url: getUrl(key, siteConfig.defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        languages.map((locale) => [locale, getUrl(key, locale)]),
      ),
    },
  }));

  // Add the next only routes to the sitemap:
  sitemap = [...sitemap, ...nextOnlyRoutes];

  return sitemap;
}

export const revalidate = 3600; // Revalidate the sitemap every hour.

export const fetchCache = "force-no-store";
