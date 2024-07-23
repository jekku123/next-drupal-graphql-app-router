import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";
import { defaultLocale, locales } from "./i18n";

// List of protected pages, which require authentication
// Add more pages as needed
const PROTECTED_ROUTES = ["/dashboard"];
const AUTH_ROUTES = ["/auth/login", "/auth/register"];
const DEFAULT_LOGIN_REDIRECT = "/";

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales,
  // Used when no locale matches
  defaultLocale,
  localePrefix: "as-needed",
});

// const authMiddleware = withAuth(
//   // Note that this callback is only invoked if
//   // the `authorized` callback has returned `true`
//   // and not for pages listed in `pages`.
//   function onSuccess(req) {
//     return intlMiddleware(req);
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => token != null,
//     },
//   },
// );

export default function middleware(req: NextRequest) {
  const isProtected = PROTECTED_ROUTES.some((page) =>
    req.nextUrl.pathname.startsWith(page),
  );

  // if (!isProtected) {
  return intlMiddleware(req);
  // } else {
  //   return (authMiddleware as any)(req);
  // }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
