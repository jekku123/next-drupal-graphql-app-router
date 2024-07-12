import Layout from "@/components/app-router/layout";

export default function StaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
