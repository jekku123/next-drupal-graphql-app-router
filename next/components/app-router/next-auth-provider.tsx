"use client";

import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// TODO: Move this to server component after updgarding to auth.js v5
export default function NextAuthProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
