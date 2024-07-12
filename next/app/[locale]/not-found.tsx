import { HeadingPage } from "@/components/heading--page";
import Layout from "@/components/layout";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

{
  /* <Meta title={t("Page not found")} metatags={[]} /> */
}

export default async function NotFound() {
  const t = await getTranslations();

  return (
    <>
      <Layout>
        <HeadingPage>{t("Page not found")}</HeadingPage>
        <p className="mt-8 text-lg">
          {t("The page you are looking for does not exist")}{" "}
          <Link href="/" className="underline hyperlink">
            {t("Go back to the homepage?")}
          </Link>
        </p>
      </Layout>
    </>
  );
}
