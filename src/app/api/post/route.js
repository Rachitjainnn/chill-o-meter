import { getGroqChatCompletion } from "@/utils/groqCompletion";
import { getFromCache, saveToCache } from "@/utils/cache";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 25,
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
    const chatCompletion = await getGroqChatCompletion(data);
    let responseBody = chatCompletion.choices[0]?.message?.content || ""
    saveToCache(cacheKey, responseBody);
    return new Response(
      JSON.stringify({ message: "Success", responseBody }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return new Response(
      JSON.stringify({ message: "Internal server error", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

}

