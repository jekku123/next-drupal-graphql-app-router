import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import LoginForm from "./form";

// TODO: Check if calling the other thingy with empty metadat aactually returns something getMetaData()
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("log-in"),
  };
}

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <LoginForm />;
}
