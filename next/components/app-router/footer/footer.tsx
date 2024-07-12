import Link from "next/link";

import type { MenuItemType, MenuType } from "@/types/graphql";
import { useLocale } from "next-intl";
import { Icons } from "../icons";
import { SocialShare } from "./social-share";

interface FooterProps {
  menu: MenuType;
}

export function Footer({ menu }: FooterProps) {
  const locale = useLocale();
  // Only show the menu items that match the current locale:,S FOR APP ROUTER
  const filteredItems = menu?.items?.filter(
    (link) => link.langcode?.id == locale,
  );

  return (
    <footer className="border-t border-finnishwinter">
      <div className="max-w-6xl px-6 mx-auto">
        <nav className="flex flex-col items-center gap-2 py-8 text-md sm:flex-row sm:justify-between">
          <ul className="flex flex-wrap mr-4 gap-x-12 gap-y-4">
            {filteredItems?.map((link) => {
              const icon = link.attributes?.icon;
              return (
                <li key={link.id}>
                  <FooterLink href={link.url} icon={icon}>
                    {link.title}
                  </FooterLink>
                </li>
              );
            })}
          </ul>
          <SocialShare />
          <FooterLink href="https://next-drupal.org" newTab>
            Next.js for Drupal
          </FooterLink>
        </nav>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  href: MenuItemType["url"];
  icon?: MenuItemType["attributes"]["icon"];
  newTab?: boolean;
  children: React.ReactNode;
}

function FooterLink({ href, icon, newTab = false, children }: FooterLinkProps) {
  const [target, rel] = newTab ? ["_blank", "noreferrer"] : [];

  const Icon = {
    facebook: Icons.facebook,
    linkedin: Icons.linkedIn,
    twitter: Icons.twitter,
    wunder: Icons.wunderCarrot,
  }[icon];

  return (
    <Link href={href} target={target} rel={rel} className="hyperlink">
      {icon && (
        <div className="flex items-center justify-center w-6 h-6 mr-2">
          <Icon className="w-full h-auto" aria-hidden />
        </div>
      )}
      {children}
    </Link>
  );
}
