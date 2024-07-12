import Layout from "@/components/app-router/layout";

type DynamicLayoutParams = {
  children: React.ReactNode;
  params: { slug: string[]; locale: string };
};

export default async function DynamicLayout({
  children,
  params: { slug, locale },
}: DynamicLayoutParams) {
  return <Layout locale={locale}>{children}</Layout>;
}
