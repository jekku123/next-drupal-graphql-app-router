"use server";

import { auth } from "@/auth";
import { drupalClientViewer } from "@/lib/drupal/drupal-client";
import { ContactForm, ContactFormSchema } from "@/lib/zod/contact-form";
import { getLocale } from "next-intl/server";

export async function contactAction(values: ContactForm) {
  // Validate the form fields:
  const validatedFields = ContactFormSchema.safeParse(values);

  // If the fields are not valid, return the errors:
  if (!validatedFields.success) {
    const errors = validatedFields.error.flatten().fieldErrors;

    return {
      success: false,
      error: { type: "ValidationError", message: "Validation error" },
      formErrors: {
        name: errors.name?.[0] ?? "",
        email: errors.email?.[0] ?? "",
        subject: errors.subject?.[0] ?? "",
        message: errors.message?.[0] ?? "",
      },
    };
  }

  // Because we want to allow only registered users to submit
  // to the contact webform, let's get the session:
  const session = await auth();

  // if there is no session, return 401:
  if (!session) {
    return {
      success: false,
      error: {
        type: "AuthorizationError",
        message: "Unauthorized",
      },
    };
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
        ...values,
      }),
      headers: {
        "Content-Type": "application/json",
        // Pass the token to authenticate the request:
        Authorization: `Bearer ${session.accessToken}`, // eslint-disable-line @typescript-eslint/no-base-to-string
      },
    });

    if (!result.ok) {
      console.error("Submission error:", JSON.stringify(result, null, 2));
      return {
        success: false,
        error: {
          type: "SubmissionError",
          message: "Submission error",
        },
      };
    }
  } catch (error) {
    console.error(error.message);

    return {
      success: false,
      error: {
        type: "SubmissionError",
        message: error.message,
      },
    };
  }
}
