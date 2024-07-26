import { useTranslations } from "next-intl";

import { HeadingPage } from "@/components/heading--page";
import PageLayout from "@/components/page-layout";
import { LinkWithLocale } from "@/lib/navigation";

export default function NotFound() {
  const t = useTranslations();

  return (
    <>
      <PageLayout>
        <HeadingPage>{t("Page not found")}</HeadingPage>
        <p className="mt-8 text-lg">
          {t("The page you are looking for does not exist")}{" "}
          <LinkWithLocale href="/" className="underline hyperlink">
            {t("Go back to the homepage?")}
          </LinkWithLocale>
        </p>
      </PageLayout>
    </>
  );
}
