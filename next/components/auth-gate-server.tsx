import { auth } from "@/auth";
import { StatusMessage } from "@/ui/status-message";
import { getTranslations } from "next-intl/server";

type AuthGateServerProps = {
  children: React.ReactNode;
  text: string;
  className?: string;
};

export async function AuthGate({
  children,
  text,
  className,
}: AuthGateServerProps) {
  const t = await getTranslations();
  const session = await auth();

  if (!session) {
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
