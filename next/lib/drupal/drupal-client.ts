import "server-only";

import { type TypedDocumentNode } from "@graphql-typed-document-node/core";
import { request, type RequestDocument, type Variables } from "graphql-request";
import { NextDrupalBase } from "next-drupal";
import pRetry, { type Options } from "p-retry";

import { env } from "@/env";

export interface IGraphQlDrupalClient extends NextDrupalBase {
  doGraphQlRequest<T>(
    query: TypedDocumentNode<T> | RequestDocument,
    variables?: Variables,
  ): Promise<ReturnType<typeof request<T, Variables>>>;
}

const RETRY_OPTIONS: Options = {
  retries: env.NODE_ENV === "development" ? 1 : 5,
  onFailedAttempt: ({ attemptNumber, retriesLeft }) => {
    console.log(
      `Fetch ${attemptNumber} failed (${retriesLeft} retries remaining)`,
    );
  },
} as const;

export const createGraphQlDrupalClient = (
  clientId: string,
  clientSecret: string,
) => {
  class GraphQlDrupalClient
    extends NextDrupalBase
    implements IGraphQlDrupalClient
  {
    async doGraphQlRequest<T>(
      query: TypedDocumentNode<T> | RequestDocument,
      variables?: Variables,
    ): Promise<ReturnType<typeof request<T, Variables>>> {
      const url = this.buildUrl("/graphql").toString();

      const headers = {
        authorization: `Bearer ${(await this.getAccessToken()).access_token}`,
      };

      return pRetry(
        () => request(url, query, variables, headers),
        RETRY_OPTIONS,
      );
    }
  }

  return new GraphQlDrupalClient(env.NEXT_PUBLIC_DRUPAL_BASE_URL, {
    fetcher: (input, init) => pRetry(() => fetch(input, init), RETRY_OPTIONS),
    auth: {
      clientId,
      clientSecret,
    },
  });
};
