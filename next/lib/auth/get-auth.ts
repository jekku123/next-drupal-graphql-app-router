import { cache } from "react";

import { auth } from "@/auth";

/**
 * Helper function to get the session of the current user without passing the authOptions
 * It uses the cache to avoid multiple calls to the server, so we
 * can call it in multiple places during the same request and it will
 * run only once.
 */
export const getAuth = cache(() => {
  return auth();
});
