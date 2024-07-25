import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

import { Pathnames } from "next-intl/routing";

// Can be imported from a shared config
export const locales = ["en", "fi", "sv"];
export const defaultLocale = "en";

export const pathnames = {
  // If locales use different paths, you can
  // specify each external path per locale
  "/all-articles": {
    en: "/all-articles",
    fi: "/kaikki-artikkelit",
    sv: "/alla-artiklar",
  },

  // Dynamic params are supported via square brackets
  "/dashboard": {
    en: "/dashboard",
    fi: "/hallintapaneeli",
    sv: "/instrumentpanel",
  },

  // Dynamic params are supported via square brackets
  // "/dashboard/webforms/[webformName]/[webformSubmissionUuid]": {
  //   en: "/dashboard/webforms/[webformName]/[webformSubmissionUuid]",
  //   fi: "/hallintapaneeli/lomakkeet/[webformName]/[webformSubmissionUuid]",
  //   sv: "/instrumentpanel/formulär/[webformName]/[webformSubmissionUuid]",
  // },
} satisfies Pathnames<typeof locales>;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
