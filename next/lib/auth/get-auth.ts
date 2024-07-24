import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { getServerSession } from "next-auth";
import { cache } from "react";
import { authOptions } from "./auth-options";

/**
 * Use this function to get the session of the current user.
 * It uses the cache to avoid multiple calls to the server, so we
 * can call it in multiple places during the same request and it will
 * run only once.
 */
export const auth = cache(
  (
    ...args:
      | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
      | [NextApiRequest, NextApiResponse]
      | []
  ) => {
    console.log("Checking auth");
    return getServerSession(...args, authOptions);
  },
);
