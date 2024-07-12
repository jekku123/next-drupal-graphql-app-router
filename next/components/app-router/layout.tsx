import { Header } from "@/components/app-router/header/header";
import { getMenus } from "@/lib/drupal/get-menus";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const menus = await getMenus({ locale: "en" });
  return (
    <>
      <Header menu={menus.main} />
      <main className="grow bg-mischka" id="main-content">
        <div className="max-w-6xl px-6 py-8 mx-auto">{children}</div>
      </main>
    </>
  );
}
