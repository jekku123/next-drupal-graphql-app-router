"use server";

import { drupalClientViewer } from "@/lib/drupal/drupal-client";

import { auth } from "@/auth";
import { getLocale } from "next-intl/server";

export async function contactAction(values: {
  name: string;
  email: string;
  message: string;
  subject: string;
}) {
  const { name, email, message, subject } = values;

  if (!name || !email || !message || !subject) {
    return { error: "All fields are required" };
  }

  // Because we want to allow only registered users to submit
  // to the contact webform, let's get the session:
  const session = await auth();

  // if there is no session, return 401:
  if (!session) {
    return { error: "Unauthorized" };
  }

  // Get the locale with next-intl:
  const locale = await getLocale();

  try {
    const url = drupalClientViewer.buildUrl(`/${locale}/webform_rest/submit`);

    // Submit to Drupal.
    const result = await drupalClientViewer.fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify({
        webform_id: "contact",
        name: name,
        email: email,
        message: message,
        subject: subject,
      }),
      headers: {
        "Content-Type": "application/json",
        // Pass the token to authenticate the request:
        Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
      },
    });

    if (!result.ok) {
      return { error: "Error" };
    }

    return { success: true };
  } catch (error) {
    console.error(error.message);

    return {
      error: "Something went wrong",
    };
  }
}
