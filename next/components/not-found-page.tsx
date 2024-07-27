import { HeadingPage } from "@/components/heading--page";
import { LinkWithLocale } from "@/navigation";
import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("Not-Found");

  return (
    <>
      <HeadingPage>{t("title")}</HeadingPage>
      <p className="mt-8 text-lg">
        {t("content")}{" "}
        <LinkWithLocale href="/" className="underline hyperlink">
          {t("back-to-homepage")}
        </LinkWithLocale>
      </p>
    </>
  );
}
