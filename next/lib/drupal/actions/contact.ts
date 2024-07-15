"use server";

import { auth } from "@/auth";
import { ContactForm, ContactFormSchema } from "@/lib/zod/contact-form";
import { getLocale } from "next-intl/server";
import { createSubmission } from "../data-access/submissions";

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
    await createSubmission({
      webformId: "contact",
      locale,
      accessToken: session.accessToken as string,
      values: {
        ...validatedFields.data,
      },
    });

    return { success: true };
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
