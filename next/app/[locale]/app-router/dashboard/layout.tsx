import Layout from "@/components/app-router/layout";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function DashboardLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <Layout>{children}</Layout>;
}
