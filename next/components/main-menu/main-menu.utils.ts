import { PointerEvent } from "react";

// Disable hover events so click is required - https://github.com/radix-ui/primitives/issues/1630
export const disableHoverEvents = {
  onPointerMove: (event: PointerEvent) => event.preventDefault(),
  onPointerLeave: (event: PointerEvent) => event.preventDefault(),
} as const;

export function isMenuItemActive(path: string, href: string) {
  return path === href;
}

export function generateLocalePath(locale: string, path: string) {
  // Remove locale from path if it's already there.
  // Drupal returns paths with locale for node paths but not for Next.js menu routes.
  const pathWithoutLocale = path.replace(`/${locale}`, "");
  return `/${locale}${pathWithoutLocale}`;
}
