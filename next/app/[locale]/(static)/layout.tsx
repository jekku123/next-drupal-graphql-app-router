import PageLayout from "@/components/page-layout";
import { unstable_setRequestLocale } from "next-intl/server";

export default function StaticLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <PageLayout>{children}</PageLayout>;
}
