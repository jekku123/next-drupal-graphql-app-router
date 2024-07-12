import Layout from "@/components/app-router/layout";

type StaticLayoutParams = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function StaticLayout({
  children,
  params: { locale },
}: StaticLayoutParams) {
  return <Layout locale={locale}>{children}</Layout>;
}
