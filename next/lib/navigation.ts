import { createSharedPathnamesNavigation } from "next-intl/navigation";

import { locales } from "@/i18n";

export const {
  Link: LinkWithLocale,
  redirect: redirectWithLocale,
  permanentRedirect: permanentRedirectWithLocale,
  usePathname: usePathNameWithoutLocale,
  useRouter: useRouterWithoutLocale,
} = createSharedPathnamesNavigation({ locales /* ... */ });
