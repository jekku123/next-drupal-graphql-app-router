import { GetStaticPropsContext } from "next";

import { drupalClientViewer } from "@/lib/drupal/drupal-client-viewer";

import { MenuAvailable } from "../gql/graphql";
import { GET_MENU } from "../graphql/queries";

export async function getMenus({ locale }: GetStaticPropsContext) {
  const [main, footer] = await Promise.all(
    ["MAIN", "FOOTER"].map((menu) =>
      drupalClientViewer.doGraphQlRequest(GET_MENU, {
        name: menu as MenuAvailable,
        langcode: locale,
      }),
    ),
  );

  return {
    main: main.menu,
    footer: footer.menu,
  };
}

export async function getMenu(menu: MenuAvailable, locale: string) {
  const menus = await drupalClientViewer.doGraphQlRequest(GET_MENU, {
    name: menu,
    langcode: locale,
  });

  return menus.menu;
}
