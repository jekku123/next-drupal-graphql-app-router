import { notFound } from "next/navigation";
import { LocalePrefix, Pathnames } from "next-intl/routing";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["en", "fi", "sv"];
export const defaultLocale = "en";

export const pathnames = {
  // If locales use different paths, you can
  // specify each external path per locale
  "/all-articles": {
    en: "/articles",
    fi: "/artikkelit",
    sv: "/artiklar",
  },

  "/auth/login": {
    en: "/login",
    fi: "/kirjaudu",
    sv: "/logga-in",
  },

  "/auth/register": {
    en: "/register",
    fi: "/rekisteröidy",
    sv: "/registrera",
  },

  "/dashboard": {
    en: "/dashboard",
    fi: "/hallintapaneeli",
    sv: "/instrumentpanel",
  },

  "/dashboard/webforms/[webformName]/[webformSubmissionUuid]": {
    en: "/dashboard/webforms/[webformName]/[webformSubmissionUuid]",
    fi: "/hallintapaneeli/lomakkeet/[webformName]/[webformSubmissionUuid]",
    sv: "/instrumentpanel/formulär/[webformName]/[webformSubmissionUuid]",
  },
} satisfies Pathnames<typeof locales>;

export const i18nConfig = {
  locales,
  defaultLocale,
  localePrefix: "as-needed" as LocalePrefix<string[]>,
  alternateLinks: false,
  pathnames,
};

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
