"use client";

import { useSession } from "next-auth/react";

import { StatusMessage } from "@/ui/status-message";
import { useTranslations } from "next-intl";

type AuthGateProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
};

export function AuthGate({ children, text, className }: AuthGateProps) {
  const t = useTranslations();
  const { status } = useSession();

  if (status === "authenticated") {
    return <>{children}</>;
  }

  return (
    <StatusMessage
      level="warning"
      title={t("you-are-not-logged-in")}
      className={className}
    >
      {text}
    </StatusMessage>
  );
}
