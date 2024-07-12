"use client"; // Error components must be Client Components

import { HeadingPage } from "@/components/heading--page";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useEffect } from "react";

{
  /* <Meta title={t("Error")} metatags={[]} /> */
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
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
        {t("There was an error.")}{" "}
        <Link href="/" className="underline hyperlink">
          {t("Go back to the homepage?")}
        </Link>
      </p>
    </>
  );
}
