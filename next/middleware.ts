import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { auth } from "./auth";
import { i18nConfig } from "./i18n";

// Auth routes & protected routes
// Add more routes as needed.
// For now need to add the internationalized routes too 😁
const AUTH_ROUTES = [
  "/login",
  "/register",
  "/fi/kirjaudu",
  "/fi/rekisteröidy",
  "/sv/logga-in",
  "/sv/registrera",
];

const PROTECTED_ROUTES = [
  "/dashboard",
  "/fi/hallintapaneeli",
  "/sv/instrumentpanel",
];
const DEFAULT_LOGIN_REDIRECT = "/";
const DEFAULT_LOGIN_URL = "/auth/login";

interface AppRouteHandlerFnContext {
  params?: Record<string, string | string[]>;
}

const intlMiddleware = createMiddleware(i18nConfig);

const authMiddleware = (request: NextRequest, ctx: AppRouteHandlerFnContext) =>
  auth((req) => {
    const isLoggedIn = req.auth?.user;
    const isAuthRoute = AUTH_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );

    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
      req.nextUrl.pathname.startsWith(route),
    );

    if (isProtectedRoute) {
      if (!isLoggedIn) {
        return NextResponse.redirect(
          new URL(
            `${DEFAULT_LOGIN_URL}?logout=true&callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`,
            req.nextUrl,
          ),
        );
      }
    }

    if (isAuthRoute) {
      if (isLoggedIn) {
        return NextResponse.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl),
        );
      }
    }

    return intlMiddleware(request);
  })(request, ctx);

export const middleware = (
  request: NextRequest,
  ctx: AppRouteHandlerFnContext,
): NextResponse => {
  return authMiddleware(request, ctx) as NextResponse;
};

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
