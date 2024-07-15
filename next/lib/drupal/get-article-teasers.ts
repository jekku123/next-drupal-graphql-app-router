import siteConfig from "@/site.config";
import { FragmentArticleTeaserFragment } from "../gql/graphql";
import { fetchArticlesView } from "./data-access/articles";

export async function getArticleTeasers({
  limit = 10,
  locale = siteConfig.defaultLocale,
  sticky = false,
}: {
  limit: number;
  locale: string;
  sticky?: boolean;
}) {
  try {
    const articlesView = await fetchArticlesView({
      langcode: locale,
      page: 0,
      pageSize: limit,
      sticky,
    });

    return (articlesView.results as FragmentArticleTeaserFragment[]) ?? [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
