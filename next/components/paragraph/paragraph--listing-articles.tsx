import { HeadingParagraph } from "@/components/heading--paragraph";
import type { FragmentParagraphListingArticleFragment } from "@/lib/gql/graphql";
import { Suspense } from "react";
import { ArticleListingSkeleton } from "../article/article-listing-skeleton";
import { ArticlesListing } from "../article/articles-listing";

export function ParagraphListingArticles({
  paragraph,
}: {
  paragraph: FragmentParagraphListingArticleFragment;
}) {
  return (
    <>
      {paragraph.paragraphListingArticleHeading && (
        <HeadingParagraph>
          {paragraph.paragraphListingArticleHeading}
        </HeadingParagraph>
      )}
      <Suspense fallback={<ArticleListingSkeleton />}>
        <ArticlesListing key={paragraph.id} limit={paragraph.limit} />
      </Suspense>
    </>
  );
}
