import { redirect } from "next/navigation";

export function redirectExpiredSessionToLoginPage(
  locale: string,
  callbackUrl: string,
) {
  redirect(
    `/${locale}/auth/login?logout=true&callbackUrl=${encodeURIComponent(
      callbackUrl,
    )}`,
  );
}
