import { ContactForm } from "@/lib/zod/contact-form";
import { drupalClientViewer } from "../drupal-client";
import {
  isWebformSubmissionsListEmpty,
  validateAndCleanupWebformSubmissionList,
  WebformSubmissionsListEmpty,
  WebformSubmissionsListItem,
} from "@/lib/zod/webform-submission-list";
import { auth } from "@/auth";

export async function createSubmissionUseCase({
  webformId,
  locale,
  accessToken,
  values,
}: {
  webformId: string;
  locale: string;
  accessToken: string;
  values: ContactForm;
}) {
  if (!accessToken) {
    throw new Error("Access token is required");
  }

  try {
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
  } catch (error) {
    throw error;
  }
}

export async function getSubmissionsUseCase({
  locale,
  accessToken,
}: {
  locale: string;
  accessToken: string;
}) {
  if (!accessToken) {
    throw new Error("Access token is required");
  }

  const session = await auth();

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

  return result;
}
