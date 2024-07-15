import { FragmentMetaTagFragment } from "@/lib/gql/graphql";

import { env } from "@/env";
import { defaultLocale } from "@/i18n";
import { getLocale, getTranslations } from "next-intl/server";

interface MetaProps {
  title?: string;
  path?: string;
  metatags?: FragmentMetaTagFragment[];
}

type AttributeKey = keyof NonNullable<FragmentMetaTagFragment>["attributes"];

// todo: this should handle more meta tags, e.g. location, keywords, etc (and maybe generally arbitrary meta tags?)
export async function extractMetaDataFromNodeEntity({
  title,
  metatags,
}: MetaProps) {
  const getTag = (str: string, key: AttributeKey = "name") => {
    const result = metatags?.find((tag) => tag.attributes?.[key] === str);
    return result?.attributes;
  };

  const t = await getTranslations();
  const locale = await getLocale();

  // TODO: THIS IS NOT WORKING in app router, fix the asPath thingy
  const router: any = {};

  // We want to determine if we need to add the language path
  // to create the canonical link for this page:
  const languagePathFragment = locale === defaultLocale ? "" : `/${locale}`;

  const data = {
    title: getTag("title")?.content ?? title,
    description: getTag("description")?.content ?? t("meta-site-description"),
    canonical: `${env.NEXT_PUBLIC_FRONTEND_URL}${languagePathFragment}${
      router.asPath !== "/" ? router.asPath : ""
    }`,
    // imageSrc:
    //   getTag("image_src", "rel")?.href ||
    //   `${env.NEXT_PUBLIC_FRONTEND_URL}/metatags_default_image.png`,
  };

  const computedTitle = data.title
    ? data.title.concat(` | ${t("meta-site-name")}`)
    : t("meta-site-name");

  const metadata = {
    title: computedTitle,
    description: data.description,
    canonical: data.canonical,
    openGraph: {
      title: computedTitle,
      description: data.description,
      type: "website",
      url: data.canonical,
      //   images: [
      //     {
      //       url: data.imageSrc ?? "",
      //       alt: computedTitle,
      //     },
      //   ]
    },
    additionalMetaTags: [
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
    ],
  };

  return metadata;
}
