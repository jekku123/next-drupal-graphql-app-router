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

  // Do we need need to check for draft mode here?
  /* 
  const isDraftMode = draftMode().isEnabled;
  const data = await getNodeQueryResult(path, locale, isDraftMode);
  */

  const data = await getNodeQueryResult(path, locale);
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
