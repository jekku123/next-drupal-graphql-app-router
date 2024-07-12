import Layout from "@/components/app-router/layout";

export default function DynamicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
