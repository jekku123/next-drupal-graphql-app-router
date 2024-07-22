import { locales } from "@/i18n";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const {
  Link: LinkWithLocale,
  redirect: redirectWithLocale,
  permanentRedirect: permanentRedirectWithLocale,
  usePathname: usePathNameWithoutLocale,
  useRouter: useRouterWithoutLocale,
} = createSharedPathnamesNavigation({ locales /* ... */ });
