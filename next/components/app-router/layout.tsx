import { Header } from "@/components/app-router/header/header";
import { LanguageLinks } from "@/lib/contexts/language-links";
import { LanguageLinksProvider } from "@/lib/contexts/language-links-context";
import { getMenus } from "@/lib/drupal/get-menus";
import { getLocale } from "next-intl/server";

export default async function Layout({
  children,
  languageLinks,
}: {
  children: React.ReactNode;
  languageLinks?: LanguageLinks;
}) {
  const locale = await getLocale();
  const menus = await getMenus({ locale });

  return (
    <LanguageLinksProvider languageLinks={languageLinks}>
      <Header menu={menus.main} />
      <main className="grow bg-mischka" id="main-content">
        <div className="max-w-6xl px-6 py-8 mx-auto">{children}</div>
      </main>
    </LanguageLinksProvider>
  );
}
