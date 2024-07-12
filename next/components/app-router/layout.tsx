import { Header } from "@/components/app-router/header/header";
import { getMenus } from "@/lib/drupal/get-menus";

export default async function Layout({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const menus = await getMenus({ locale });

  return (
    <>
      <Header menu={menus.main} />
      <main className="grow bg-mischka" id="main-content">
        <div className="max-w-6xl px-6 py-8 mx-auto">{children}</div>
      </main>
    </>
  );
}
