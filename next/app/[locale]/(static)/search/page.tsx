import { HeadingPage } from "@/components/heading--page";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function SearchPage({ params: { locale } }) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <>
      <HeadingPage>{t("search")}</HeadingPage>
      <p>{t("under-construction")}</p>
    </>
  );
}
