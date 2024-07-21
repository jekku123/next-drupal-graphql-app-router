import Link from "next/link";

import { auth } from "@/auth";
import { HeadingPage } from "@/components/heading--page";
import { redirectExpiredSessionToLoginPage } from "@/lib/auth/redirect-expired-login";
import { drupalClientViewer } from "@/lib/drupal/drupal-client-viewer";
import { formatDate } from "@/lib/utils";
import {
  isWebformSubmissionsListEmpty,
  validateAndCleanupWebformSubmissionList,
  WebformSubmissionsListEmpty,
  WebformSubmissionsListItem,
} from "@/lib/zod/webform-submission-list";
import { Metadata } from "next";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("user-dashboard"),
  };
}

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  const t = await getTranslations();

  // This is not needed as middleware handles, so maybe make a function to
  // fetch the submission and check the session in the function
  const session = await auth();

  if (!session) {
    return redirectExpiredSessionToLoginPage(locale, "/dashboard");
  }

  const url = drupalClientViewer.buildUrl(
    `/${locale}/rest/my-webform-submissions?_format=json`,
  );

  const result = await drupalClientViewer.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
    },
  });

  const submissionsViewResult = (await result.json()) as
    | WebformSubmissionsListEmpty
    | WebformSubmissionsListItem[];

  const submissions = isWebformSubmissionsListEmpty(submissionsViewResult)
    ? []
    : validateAndCleanupWebformSubmissionList(submissionsViewResult);
  return (
    <>
      <HeadingPage>{t("user-dashboard")}</HeadingPage>
      <p className="my-6 text-justify text-md/xl text-scapaflow sm:text-lg">
        {t("user-dashboard-intro-greeting", { username: session.user.name })}
      </p>
      <table className="w-full text-left border-collapse">
        <thead className="font-bold text-white border border-primary-700 bg-primary-700 text-heading-xs">
          <tr>
            <th className="px-3 py-4">{t("form")}</th>
            <th className="px-3 py-4">{t("date")}</th>
            <th className="px-3 py-4">{t("more-details")}</th>
          </tr>
        </thead>
        <tbody className="text-sm bg-white text-steelgray">
          {submissions.map((submission) => (
            <tr
              key={submission.uuid[0]["value"]}
              className="border border-graysuit"
            >
              <td className="p-3">{submission.webform_id[0]["target_id"]}</td>
              <td className="p-3">
                {formatDate(submission.completed[0]["value"], locale)}
              </td>
              <td className="p-3">
                <Link
                  href={`/dashboard/webforms/${submission.webform_id[0]["target_id"]}/${submission.uuid[0]["value"]}`}
                  className="hyperlink"
                >
                  {t("see-more")}
                </Link>
              </td>
            </tr>
          ))}

          {submissions.length === 0 && (
            <tr className="border border-graysuit">
              <td colSpan={3} className="p-3">
                {t("no-submissions-yet")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}
