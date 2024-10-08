import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

import { locales, pathnames /* ... */ } from "@/i18n";

export const {
  Link: LinkWithLocale,
  redirect: redirectWithLocale,
  permanentRedirect: permanentRedirectWithLocale,
  usePathname: usePathnameWithoutLocale,
  useRouter: useRouterWithoutLocale,
  getPathname,
} = createLocalizedPathnamesNavigation({
  locales,
  // eslint-disable-next-line
  pathnames: pathnames as typeof pathnames & Record<string & {}, string>,
});
