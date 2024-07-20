import { unstable_setRequestLocale } from "next-intl/server";

export default async function StaticLayout({
  children,
  params: { locale, slug },
}: {
  children: React.ReactNode;
  params: { locale: string; slug: string[] };
}) {
  unstable_setRequestLocale(locale);

  //   const path = Array.isArray(slug) ? `/${slug?.join("/")}` : slug;

  //   const keke = await getNode(path, locale);

  return children;
}
