import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import {
  isWebformSubmissionsListEmpty,
  WebformSubmissionsListEmpty,
  WebformSubmissionsListItem,
} from "@/lib/zod/webform-submission-list";

export async function createSubmission({
  webformId,
  locale,
  accessToken,
  values,
}: {
  webformId: string;
  locale: string;
  accessToken: string;
  values: Record<string, string>;
}) {
  const url = drupalClientViewer.buildUrl(`/${locale}/webform_rest/submit`);

  // Submit to Drupal.
  const result = await drupalClientViewer.fetch(url.toString(), {
    method: "POST",
    body: JSON.stringify({
      webform_id: webformId,
      ...values,
    }),
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
    },
  });

  if (!result.ok) {
    console.error("Submission error:", JSON.stringify(result, null, 2));
    throw new Error("Submission error");
  }

  return result;
}

export async function getSubmissions({
  locale,
  accessToken,
}: {
  locale: string;
  accessToken: string;
}) {
  const url = drupalClientViewer.buildUrl(
    `/${locale}/rest/my-webform-submissions?_format=json`,
  );

  const result = await drupalClientViewer.fetch(url.toString(), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // Pass the token to authenticate the request:
      Authorization: `Bearer ${accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
    },
  });

  const submissionsViewResult = (await result.json()) as
    | WebformSubmissionsListEmpty
    | WebformSubmissionsListItem[];

  const submissions = isWebformSubmissionsListEmpty(submissionsViewResult)
    ? []
    : submissionsViewResult;

  return submissions;
}
