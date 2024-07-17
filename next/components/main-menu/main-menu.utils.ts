import { PointerEvent } from "react";

// Disable hover events so click is required - https://github.com/radix-ui/primitives/issues/1630
export const disableHoverEvents = {
  onPointerMove: (event: PointerEvent) => event.preventDefault(),
  onPointerLeave: (event: PointerEvent) => event.preventDefault(),
} as const;

export function isMenuItemActive(path: string, href: string) {
  console.log("path", path);
  console.log("href", href);

  return path === href;
}
