import { ArticleTeasers } from "@/components/article/article-teasers";
import { ContactList } from "@/components/contact-list";
import { ContactForm } from "@/components/forms/contact-form";
import Layout from "@/components/layout";
import { LogoStrip } from "@/components/logo-strip";
import { Node } from "@/components/node";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { getNode } from "@/lib/drupal/get-node";
import {
  FragmentArticleTeaserFragment,
  FragmentMetaTagFragment,
} from "@/lib/gql/graphql";
import { LISTING_ARTICLES } from "@/lib/graphql/queries";
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
  const data = await getNode({
    locale,
    slug: `frontpage-${locale}`,
  });

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

  // const variables = {
  //   // This works because it matches the pathauto pattern for the Frontpage content type defined in Drupal:
  //   path: `frontpage-${locale}`,
  //   langcode: locale,
  // };

  // const data = await drupalClientViewer.doGraphQlRequest(
  //   GET_ENTITY_AT_DRUPAL_PATH,
  //   variables,
  // );

  const t = await getTranslations();

  const data = await getNode({
    locale,
    slug: `frontpage-${locale}`,
  });

  const frontpage = extractEntityFromRouteQueryResult(data);

  if (!frontpage || !(frontpage.__typename === "NodeFrontpage")) {
    return notFound();
  }

  const { isEnabled } = draftMode();

  // Unless we are in preview, return 404 if the node is set to unpublished:
  if (!isEnabled && frontpage.status !== true) {
    notFound();
  }

  // Get the last 3 sticky articles in the current language:
  const stickyArticleTeasers = await drupalClientViewer.doGraphQlRequest(
    LISTING_ARTICLES,
    {
      langcode: locale,
      sticky: true,
      page: 0,
      pageSize: 3,
    },
  );

  // We cast the results as the ListingArticle type to get type safety:
  const articles =
    (stickyArticleTeasers.articlesView
      ?.results as FragmentArticleTeaserFragment[]) ?? [];

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
