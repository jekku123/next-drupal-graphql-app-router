import { locales, pathnames /* ... */ } from "@/i18n";
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const {
  Link: LinkWithLocale,
  redirect: redirectWithLocale,
  permanentRedirect: permanentRedirectWithLocale,
  usePathname: usePathnameWithoutLocale,
  useRouter: useRouterWithoutLocale,
  getPathname,
} = createLocalizedPathnamesNavigation({
  locales,
  pathnames: pathnames as typeof pathnames & Record<string & {}, string>,
});
