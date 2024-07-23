"use client";

import { useOnClickOutside } from "@/lib/hooks/use-on-click-outside";
import { LinkWithLocale } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import AccountIcon from "@/styles/icons/account-circle.svg";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export function UserMenu() {
  const t = useTranslations();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { data, status } = useSession();

  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((o) => !o);
  const close = () => setIsOpen(false);

  const loginUrl = `/auth/login?callbackUrl=${encodeURIComponent(
    searchParams.get("callbackUrl") ||
      `${pathname}${searchParams.size ? `?${searchParams}` : ""}`,
  )}`;

  const ref = useOnClickOutside<HTMLDivElement>(close);

  if (status === "authenticated") {
    return (
      <div ref={ref}>
        <span className="sr-only">{t("user-menu")}</span>
        <button
          type="button"
          className="hover:underline"
          onClick={toggle}
          aria-expanded={isOpen}
        >
          <span className="capitalize sr-only sm:not-sr-only sm:mr-2 sm:inline">
            {data.user.name}
          </span>
          <AccountIcon className="inline-block w-6 h-6" />
        </button>
        <ul
          className={cn(
            "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
            !isOpen && "hidden",
          )}
        >
          <li>
            <LinkWithLocale
              className="block p-2 hover:bg-primary-50"
              href="/dashboard"
              onClick={close}
            >
              {t("user-dashboard")}
            </LinkWithLocale>
          </li>
          <li>
            <button
              type="button"
              className="block w-full p-2 text-left hover:bg-primary-50"
              onClick={() => void signOut()}
            >
              {t("log-out")}
            </button>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <span className="sr-only">{t("user-menu")}</span>
      <button type="button" className="hover:underline" onClick={toggle}>
        <span className="capitalize sr-only sm:not-sr-only sm:mr-2 sm:inline">
          {t("user-menu-account")}
        </span>
        <AccountIcon className="inline-block w-6 h-6" />
      </button>
      <ul
        className={cn(
          "absolute z-50 mt-1 w-fit border border-finnishwinter bg-mischka",
          !isOpen && "hidden",
        )}
      >
        <li>
          <Link
            className="block p-2 hover:bg-primary-50"
            href={loginUrl}
            onClick={close}
          >
            {t("log-in")}
          </Link>
        </li>
        <li>
          <Link
            className="block p-2 hover:bg-primary-50"
            href="/auth/register"
            onClick={close}
          >
            {t("register")}
          </Link>
        </li>
      </ul>
    </div>
  );
}
