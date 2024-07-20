import { FormattedText } from "@/components/formatted-text";
import { MediaImage } from "@/components/media/media--image";
import type {
  FragmentMediaImageFragment,
  FragmentParagraphHeroFragment,
} from "@/lib/gql/graphql";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/ui/button";
import { Icons } from "../icons";

export function ParagraphHero({
  paragraph,
}: {
  paragraph: FragmentParagraphHeroFragment;
}) {
  return (
    <section id="hero" className="bg-secondary-50">
      <div className="grid max-w-screen-xl mx-auto lg:grid-cols-12">
        <div className="px-8 py-8 mr-auto place-self-center lg:col-span-6 lg:py-16">
          {paragraph.paragraphHeroHeading && (
            <h1 className="max-w-2xl mb-4 font-bold leading-none tracking-tight text-left text-heading-md text-primary-600 md:text-heading-lg">
              {paragraph.paragraphHeroHeading}
            </h1>
          )}
          <FormattedText
            html={paragraph.formattedText.processed}
            className={cn(
              "mb-6 max-w-2xl text-left text-md/xl text-primary-600 sm:text-lg md:text-lg lg:mb-8 lg:text-xl",
              paragraph.formattedText && "mt-4",
            )}
          />
          <div className="gap-4 sm:text-left">
            {paragraph.primaryLink && (
              <Link
                href={paragraph.primaryLink.url}
                className={cn(
                  buttonVariants({ variant: "primary" }),
                  "text-base mr-4 inline-flex px-5 py-3",
                )}
              >
                {paragraph.primaryLink.title}
                <Icons.arrowIcon
                  aria-hidden
                  className="w-6 h-6 ml-3 -rotate-90"
                />
              </Link>
            )}

            {paragraph.secondaryLink && (
              <Link
                href={paragraph.secondaryLink.url}
                className={cn(
                  buttonVariants({ variant: "secondary" }),
                  "text-base mt-3 inline-flex px-5 py-3 sm:mt-0",
                )}
              >
                {paragraph.secondaryLink.title}
                <Icons.arrowIcon
                  aria-hidden
                  className="w-6 h-6 ml-3 -rotate-90"
                />
              </Link>
            )}
          </div>
        </div>
        <div className="hidden lg:col-span-6 lg:mt-0 lg:flex">
          <MediaImage media={paragraph.image as FragmentMediaImageFragment} />
        </div>
      </div>
    </section>
  );
}
