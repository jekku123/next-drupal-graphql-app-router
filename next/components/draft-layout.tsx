import { SkipToContentLink } from "@/ui/skip-to-content-link";
import clsx from "clsx";
import { getTranslations } from "next-intl/server";
import { draftMode } from "next/headers";
import { DraftBanner } from "./draft-banner";

type DraftLayoutProps = {
  children: React.ReactNode;
};

export default async function DraftLayout({ children }: DraftLayoutProps) {
  const { isEnabled } = draftMode();
  const t = await getTranslations();

  return (
    <>
      <div className={clsx("flex min-h-screen flex-col", isEnabled && "mt-10")}>
        <SkipToContentLink href="#main-content">
          {t("skip-to-main-content")}
        </SkipToContentLink>
        {children}
      </div>
      <DraftBanner isVisible={isEnabled} />
    </>
  );
}
