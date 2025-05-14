import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(data) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: `Rephrase the following message to match a tone level from 0 to 10:
           - 0–3: Casual
           - 4–6: Neutral
           - 7–10: Formal
           one level: ${data.tone}
           Message: "${data.content}"
           Only return one rephrased version of the message. Keep it as a normal message—not an email or letter. Do not include names or extra explanations.`,
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
