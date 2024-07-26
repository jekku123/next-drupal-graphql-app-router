"use client"; // Error components must be Client Components

import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { HeadingPage } from "@/components/heading--page";

import { LinkWithLocale } from "@/navigation";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const t = useTranslations();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <>
      <HeadingPage>{t("Error")}</HeadingPage>
      <p className="mt-8 text-lg">
        {t("there-was-an-error")}{" "}
        <LinkWithLocale href="/" className="underline hyperlink">
          {t("Go back to the homepage?")}
        </LinkWithLocale>
      </p>
    </>
  );
}
