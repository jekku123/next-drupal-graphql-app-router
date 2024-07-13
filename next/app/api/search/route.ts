import { drupalClientViewer } from "@/lib/drupal/drupal-client";

import { env } from "@/env";

/**
 * Example backend proxy for Elasticsearch Search-UI frontend client.
 */

export async function GET(req: Request) {
  const languagePrefix = req.headers["accept-language"];

  // Create the url to call in drupal:
  const ProxyUrl = `${env.NEXT_PUBLIC_DRUPAL_BASE_URL}/${languagePrefix}/wunder_search/proxy`;

  try {
    const result = await drupalClientViewer.fetch(ProxyUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(req.body),
    });

    if (!result.ok) {
      const message = `Error performing search: ${result.status}: ${result.statusText}`;
      console.error("Fetch error:", JSON.stringify(message, null, 2));

      return new Response(JSON.stringify({ error: result.statusText }), {
        status: result.status,
      });
    }

    return new Response(await result.json(), { status: result.status });
  } catch (error) {
    console.error("Fetch error:", JSON.stringify(error.message, null, 2));
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
