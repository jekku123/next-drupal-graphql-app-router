import { createSubmission } from "../data-access/submissions";

export async function createSubmissionUseCase({
  webformId,
  locale,
  accessToken,
  values,
}: {
  webformId: string;
  locale: string;
  accessToken: string;
  values: Record<string, any>;
}) {
  if (!accessToken) {
    throw new Error("Access token is required");
  }

  try {
    const result = await createSubmission({
      webformId,
      locale,
      accessToken: accessToken as string,
      values,
    });

    return result;
  } catch (error) {
    throw error;
  }
}
{
}
