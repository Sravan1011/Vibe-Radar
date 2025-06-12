// lib/gemini-client.ts
export async function getGeminiResponse(prompt: string) {
  const res = await fetch("/api/llm", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  return data.reply;
}
