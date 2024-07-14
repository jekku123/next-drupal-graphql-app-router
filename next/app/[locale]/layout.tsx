import { auth } from "@/auth";
import DraftAlert from "@/components/draft-alert";
import { Footer } from "@/components/footer/footer";
import NextAuthProvider from "@/components/next-auth-provider";
import { ReactQueryClientProvider } from "@/components/query-client-provider";
import { locales } from "@/i18n";
import { getMenus } from "@/lib/drupal/get-menus";
import { inter, overpass } from "@/styles/fonts";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";

import "styles/globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const session = await auth();
  const menus = await getMenus({ locale });
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextAuthProvider session={session}>
          <ReactQueryClientProvider>
            <NextIntlClientProvider messages={messages}>
              <Fonts>
                <DraftAlert />
                <div className="flex flex-col min-h-screen">
                  {children}
                  <Footer menu={menus.footer} />
                </div>
              </Fonts>
            </NextIntlClientProvider>
          </ReactQueryClientProvider>
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
