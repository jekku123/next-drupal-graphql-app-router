import { getAuth } from "@/lib/auth/get-auth";
import { SessionProvider } from "next-auth/react";

export default async function NextAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuth();
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
