import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: t("search"),
  };
}

export const revalidate = 60;

export default function SearchPage() {
  return <h1>Under construction</h1>;
}
