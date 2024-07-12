import clsx from "clsx";
import Link from "next/link";

import { FormattedText } from "@/components/formatted-text";
import type { FragmentParagraphCallToActionFragment } from "@/lib/gql/graphql";

import { buttonVariants } from "@/ui/button";
import { Icons } from "../icons";

export function ParagraphCallToAction({
  paragraph,
}: {
  paragraph: FragmentParagraphCallToActionFragment;
}) {
  return (
    <section id="call-to-action" className="bg-secondary-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="px-8 py-8 mr-auto place-self-center lg:py-16">
          {paragraph.paragraphCtaHeading && (
            <h1 className="max-w-2xl mb-4 font-bold leading-none tracking-tight text-left text-heading-md text-primary-600 md:text-heading-lg">
              {paragraph.paragraphCtaHeading}
            </h1>
          )}
          <FormattedText
            html={paragraph.formattedText.processed}
            className={clsx(
              "mb-6 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-8 lg:text-xl",
              paragraph.formattedText && "mt-4",
            )}
          />
          <div className="gap-4 sm:text-left">
            {paragraph.link && (
              <Link
                href={paragraph.link.url}
                className={clsx(
                  buttonVariants({ variant: "primary" }),
                  "text-base mr-4 inline-flex px-5 py-3",
                )}
              >
                {paragraph.link.title}
                <Icons.arrowIcon
                  aria-hidden
                  className="w-6 h-6 ml-3 -rotate-90"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
