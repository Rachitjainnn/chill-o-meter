import { handleStreamChunk } from "@/utils/handleStreamChunk";
import { getFromCache, saveToCache } from "@/utils/cache";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 15,
  duration: 60,
});

export async function POST(request) {
  const data = await request.json();
  const cacheKey = `${data.content}-${data.tone}`;
  const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";

  const cached = getFromCache(cacheKey);
  if (cached) {
    return new Response(
      JSON.stringify({ message: "From cache", responseBody: cached }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    await rateLimiter.consume(ip);

    let response;
    try {
      response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistral",
          prompt: `Rephrase the following message to match a tone level from 0 to 10:
          - 0–3: Casual
          - 4–6: Neutral
          - 7–10: Formal
          one level: ${data.tone}
          Message: "${data.content}"
          Only return one rephrased version of the message. Keep it as a normal message—not an email or letter. Do not include names or extra explanations.`,
        }),
      });
    } catch (fetchError) {
      console.error("Failed to connect to Mistral:", fetchError.message);
      return new Response(
        JSON.stringify({
          message: "Failed to connect to Mistral",
          error: fetchError.message,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Mistral error:", errorText);
      return new Response(
        JSON.stringify({
          message: "Mistral API Error",
          error: errorText || "Unknown error from generate API",
        }),
        { status: response.status, headers: { "Content-Type": "application/json" } }
      );
    }

    const responseBody = await handleStreamChunk(response);
    saveToCache(cacheKey, responseBody);

    return new Response(
      JSON.stringify({ message: "Success", responseBody }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
