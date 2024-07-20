import { FormattedText } from "@/components/formatted-text";
import { HeadingParagraph } from "@/components/heading--paragraph";
import { Paragraph } from "@/components/paragraph";
import {
  FragmentParagraphAccordionFragment,
  FragmentParagraphAccordionItemFragment,
  FragmentParagraphUnionFragment,
} from "@/lib/gql/graphql";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Accordion } from "@/ui/accordion";
import { buttonVariants } from "@/ui/button";
import { Icons } from "../icons";

export function ParagraphAccordionOneColumn({
  paragraph,
}: {
  paragraph: FragmentParagraphAccordionFragment;
}) {
  return (
    <>
      {paragraph.heading && (
        <HeadingParagraph>{paragraph.heading}</HeadingParagraph>
      )}

      {paragraph.accordionFormattedText && (
        <FormattedText
          html={paragraph.accordionFormattedText.processed}
          className={cn(
            "text-left text-md/xl text-scapaflow sm:text-lg",
            paragraph.heading && "mt-4",
          )}
        />
      )}
      {paragraph.primaryLink && (
        <Link
          href={paragraph.primaryLink.url}
          className={cn(
            buttonVariants({ variant: "primary" }),
            "text-base mr-4 inline-flex max-w-sm px-5 py-3",
          )}
        >
          {paragraph.primaryLink.title}
          <Icons.arrowIcon aria-hidden className="w-6 h-6 ml-3 -rotate-90" />
        </Link>
      )}

      <Accordion
        items={paragraph.accordionItems?.map(
          (item: FragmentParagraphAccordionItemFragment) => ({
            id: item.id,
            heading: item.accordionItemHeading,
            content: (
              <div className="grid gap-4">
                {item.contentElements?.map(
                  (paragraph: FragmentParagraphUnionFragment) => (
                    <Paragraph key={paragraph.id} paragraph={paragraph} />
                  ),
                )}
              </div>
            ),
          }),
        )}
      />
    </>
  );
}
