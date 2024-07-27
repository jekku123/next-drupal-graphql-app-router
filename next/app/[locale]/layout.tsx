import "styles/globals.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import DraftAlert from "@/components/draft-alert";
import { Footer } from "@/components/footer/footer";
import NextAuthProvider from "@/components/next-auth-provider";
import ReactQueryClientProvider from "@/components/query-client-provider";
import { getMenu } from "@/lib/drupal/get-menus";
import { MenuAvailable } from "@/lib/gql/graphql";
import { inter, overpass } from "@/styles/fonts";

import { locales } from "@/i18n";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const viewport: Viewport = {
  width: "device-width, shrink-to-fit=no",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "cyan" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const menu = await getMenu(MenuAvailable.Footer, locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextAuthProvider>
          <NextIntlClientProvider messages={messages}>
            <ReactQueryClientProvider>
              <Fonts>
                <DraftAlert />
                <div className="flex flex-col min-h-screen">
                  {children}
                  <Footer menu={menu} />
                </div>
              </Fonts>
              <ReactQueryDevtools />
            </ReactQueryClientProvider>
          </NextIntlClientProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}

function Fonts({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} ${overpass.variable} font-overpass antialiased`}
    >
      {children}
    </div>
  );
}
