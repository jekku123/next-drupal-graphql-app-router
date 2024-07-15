import { SkipToContentLink } from "@/ui/skip-to-content-link";
import { getTranslations } from "next-intl/server";
import { draftMode } from "next/headers";
import { Suspense } from "react";
import { DraftAlertClient } from "./draft-alert-client";

export default async function DraftAlert() {
  const { isEnabled } = draftMode();
  const t = await getTranslations();

  return (
    <>
      <Suspense fallback={null}>
        <DraftAlertClient isDraftEnabled={isEnabled} />
      </Suspense>
      <SkipToContentLink href="#main-content">
        {t("skip-to-main-content")}
      </SkipToContentLink>
    </>
  );
}
