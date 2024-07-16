import { createUser } from "../data-access/user";

export async function createUserUseCase(
  values: {
    name: string;
    email: string;
  },
  locale: string,
) {
  const { name, email } = values;

  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  await createUser(
    {
      name,
      email,
    },
    locale,
  );

  return true;
}
