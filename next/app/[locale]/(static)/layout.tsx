import Layout from "@/components/layout";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function StaticLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <Layout>{children}</Layout>;
}
