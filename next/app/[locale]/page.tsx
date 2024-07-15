import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import Layout from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Node } from "@/components/node";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { getArticleTeasers } from "@/lib/drupal/get-article-teasers";
import { getNodeEntity } from "@/lib/drupal/get-node";
import { FragmentMetaTagFragment } from "@/lib/gql/graphql";
import { GET_ENTITY_AT_DRUPAL_PATH } from "@/lib/graphql/queries";
import { extractEntityFromRouteQueryResult } from "@/lib/graphql/utils";
import { extractMetaDataFromNodeEntity } from "@/lib/metadata";
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
  const variables = {
    // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal:
    path: `frontpage-${locale}`,
    langcode: locale,
  };

  const data = await drupalClientViewer.doGraphQlRequest(
    GET_ENTITY_AT_DRUPAL_PATH,
    variables,
  );

  let nodeEntity = extractEntityFromRouteQueryResult(data);

  const metadata = await extractMetaDataFromNodeEntity({
    title: nodeEntity.title,
    metatags: nodeEntity.metatag as FragmentMetaTagFragment[],
  });

  return metadata;
}

export const revalidate = 10;

export default async function FrontPage({
  params: { locale },
}: FrontpageParams) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();

  const frontpage = await getNodeEntity({
    path: `frontpage-${locale}`,
    locale,
  });

  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    return notFound();
  }

  const isDraftMode = draftMode().isEnabled;

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!isDraftMode && frontpage.status !== true) {
    notFound();
  }

  const articles = await getArticleTeasers({
    limit: 3,
    locale,
    sticky: true,
  });

  return (
    <Layout>
      <Node node={frontpage} />
      <Divider className="max-w-4xl" />
      <ContactForm />
      <Divider className="max-w-4xl" />
      <ArticleTeasers heading={t("promoted-articles")} articles={articles} />
      <ContactList />
      <LogoStrip />
    </Layout>
  );
}
