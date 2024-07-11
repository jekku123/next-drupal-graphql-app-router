import clsx from "clsx";

import { Media } from "@/components/app-router/media";
import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import type { FragmentParagraphFileAttachmentsFragment } from "@/lib/gql/graphql";

// TODO: Translations
export function ParagraphFileAttachments({
  paragraph,
}: {
  paragraph: FragmentParagraphFileAttachmentsFragment;
}) {
  return (
    <section className="relative h-full p-4 transition-all bg-white border rounded border-finnishwinter hover:shadow-md">
      {paragraph.fileAttachmentsParagraphHeading && (
        <HeadingParagraph>
          {paragraph.fileAttachmentsParagraphHeading}
        </HeadingParagraph>
      )}
      {paragraph.fileAttachmentsParagraphFormattedText && (
        <FormattedText
          html={paragraph.fileAttachmentsParagraphFormattedText.processed}
          className={clsx(
            "text-left text-md/xl text-scapaflow sm:text-lg",
            paragraph.fileAttachmentsParagraphHeading && "mt-4",
          )}
        />
      )}

      <ul className="space-y-2 list-inside" aria-label={"downloadable-files"}>
        {paragraph.fileAttachments.map((attachment) => (
          <li
            key={attachment.id}
            className="w-full gap-1 hover:text-primary-600"
          >
            <Media media={attachment} />
          </li>
        ))}
      </ul>
    </section>
  );
}
