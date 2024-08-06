import { draftMode } from "next/headers";
import { unstable_setRequestLocale } from "next-intl/server";

import PageLayout from "@/components/page-layout";
import {
  createLanguageLinks,
  getStandardLanguageLinks,
} from "@/lib/contexts/language-links";
import { getNodeQueryResult } from "@/lib/drupal/get-node";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";

export default async function DynamicLayout({
  children,
  params: { locale, slug },
}: {
  children: React.ReactNode;
  params: { locale: string; slug: string[] };
}) {
  unstable_setRequestLocale(locale);

  const path = Array.isArray(slug) ? `/${slug?.join("/")}` : slug;
  const isDraftMode = draftMode().isEnabled;

  // Here we need to pass false as the third argument to getNodeQueryResult(),
  // to match the parameters sent to the function in the page.tsx
  // This ensures the react cache() is used and only one request is made for
  // the node across the page and layout components.
  const data = await getNodeQueryResult(path, locale, isDraftMode);
  const nodeEntity = extractEntityFromRouteQueryResult(data);

  // Add information about possible other language versions of this node.
  // Not all node types necessarily have translations enabled,
  // if so, only show the standard language links.
  const languageLinks =
    nodeEntity && "translations" in nodeEntity
      ? createLanguageLinks(nodeEntity.translations)
      : getStandardLanguageLinks();

  return <PageLayout languageLinks={languageLinks}>{children}</PageLayout>;
}
