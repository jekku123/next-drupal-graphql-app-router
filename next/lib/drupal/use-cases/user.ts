import { drupalClientViewer } from "@/lib/drupal/drupal-client";

export async function createUserUseCase(
  values: {
    name: string;
    email: string;
  },
  locale: string,
) {
  const { name, email } = values;

  try {
    const url = drupalClientViewer.buildUrl("/user/register?_format=json");

    // Do a call to drupal to register the user:
    const result = await drupalClientViewer.fetch(url.toString(), {
      method: "POST",
      body: JSON.stringify({
        name: [{ value: name }],
        mail: [{ value: email }],
        preferred_langcode: [
          {
            value: locale,
          },
        ],
      }),
      headers: {
        "Content-Type": "application/json",
      },
      // Make sure we are doing this call as
      // anonymous user:
      withAuth: false,
    });

    if (!result.ok) {
      throw new Error(result.statusText);
    }

    return true;
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    throw error;
  }
}
