import { Media } from "@/components/app-router/media";
import type { FragmentParagraphImageFragment } from "@/lib/gql/graphql";

export function ParagraphImage({
  paragraph,
}: {
  paragraph: FragmentParagraphImageFragment;
}) {
  return <Media media={paragraph.image} />;
}
