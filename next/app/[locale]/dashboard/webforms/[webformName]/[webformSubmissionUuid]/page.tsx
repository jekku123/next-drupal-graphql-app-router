import Link from "next/link";

import { HeadingPage } from "@/components/heading--page";
import { redirectExpiredSessionToLoginPage } from "@/lib/auth/redirect-expired-login";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import {
  validateAndCleanupWebformSubmission,
  WebformSubmissionRaw,
} from "@/lib/zod/webform-submission";

import { auth } from "@/auth";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

type DashboardPageParams = {
  params: {
    locale: string;
    webformName: string;
    webformSubmissionUuid: string;
  };
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("form-submission-details"),
  };
}

export default async function DashboardPage({
  params: { locale, webformName, webformSubmissionUuid },
  searchParams,
}: DashboardPageParams) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();

  const resolvedUrl = searchParams.resolvedUrl as string;

  const session = await auth();

  if (!session) {
    return redirectExpiredSessionToLoginPage(locale, resolvedUrl);
  }

  const url = drupalClientViewer.buildUrl(
    `/${locale}/webform_rest/${webformName}/complete_submission/${webformSubmissionUuid}`,
  );

  const result = await drupalClientViewer.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
    },
  });

  if (!result.ok) {
    return notFound();
  }

  const rawSubmission = (await result.json()) as WebformSubmissionRaw;
  const submission = validateAndCleanupWebformSubmission(rawSubmission);

  return (
    <>
      <HeadingPage>{t("form-submission-details")}</HeadingPage>
      <Link href="/dashboard" className="block mt-4 hyperlink">
        {t("back-to-dashboard")}
      </Link>
      <p className="my-6 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("form-submission-intro-text", { form: submission.formTitle })}
      </p>
      <table className="w-full text-left border-collapse">
        <thead className="font-bold text-white border border-primary-700 bg-primary-700 text-heading-xs">
          <tr>
            <th className="px-3 py-4">{t("form-field")}</th>
            <th className="px-3 py-4">{t("form-value")}</th>
          </tr>
        </thead>
        <tbody className="text-sm bg-white text-steelgray">
          {submission.formData.map(([key, value]) => (
            <tr key={key} className="border border-graysuit">
              <td className="p-3">{key}</td>
              <td className="p-3">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
