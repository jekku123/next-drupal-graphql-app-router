import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import { LogoStrip } from "@/components/logo-strip";
import { Node } from "@/components/node";
import { getArticleTeasers } from "@/lib/drupal/get-article-teasers";
import { getNodeQueryResult } from "@/lib/drupal/get-node";

import { generateMetadataForNodeEntity } from "@/lib/generate-metadata";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import { Divider } from "@/ui/divider";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";

type FrontpageParams = {
  params: { locale: string };
};

export async function generateMetadata({
  params: { locale },
}: FrontpageParams): Promise<Metadata> {
  const path = `/frontpage-${locale}`;

  const data = await getNodeQueryResult(path, locale);
  let nodeEntity = extractEntityFromRouteQueryResult(data);

  const metadata = await generateMetadataForNodeEntity({
    title: nodeEntity.title,
    metatags: nodeEntity.metatag as FragmentMetaTagFragment[],
    context: {
      path,
      locale,
    },
  });

  return metadata;
}

export const revalidate = 10;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal
  const path = `/frontpage-${locale}`;

  // Fetch the node and the article teasers in parallel to save time
  const [node, articleTeasers] = await Promise.all([
    getNodeQueryResult(path, locale),
    getArticleTeasers({ limit: 3, locale, sticky: true }),
  ]);

  // Extract the frontpage node from the query result
  const frontpage = extractEntityFromRouteQueryResult(node);

  // If the node does not exist or is not a frontpage, return 404
  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    return notFound();
  }

  // Unless we are in draftMode, return 404 if the node is set to unpublished:
  if (!draftMode().isEnabled && frontpage.status !== true) {
    notFound();
  }

  return (
    <>
      <Node node={frontpage} />
      <Divider className="max-w-4xl" />
      <ContactForm />
      <Divider className="max-w-4xl" />
      <ArticleTeasers
        heading={t("promoted-articles")}
        articles={articleTeasers}
      />
      <ContactList />
      <LogoStrip />
    </>
  );
}
