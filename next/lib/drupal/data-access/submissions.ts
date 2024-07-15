import "server-only";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";

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
