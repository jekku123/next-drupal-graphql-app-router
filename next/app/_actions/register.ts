"use server";

import { createUserUseCase } from "@/lib/drupal/use-cases/user";
import { getLocale } from "next-intl/server";

export async function registerAction(values: { name: string; email: string }) {
  const locale = await getLocale();

  const { name, email } = values;

  if (!name || !email) {
    return { error: "Name and mail are required" };
  }

  try {
    await createUserUseCase({ name, email }, locale);

    return { success: true };
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    return { error: error.message };
  }
}
