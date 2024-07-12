import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import siteConfig from "./site.config";

// Can be imported from a shared config

export const locales = Object.values(siteConfig.locales).map(
  (locale) => locale.langcode,
);

export const defaultLocale = siteConfig.defaultLocale;

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
