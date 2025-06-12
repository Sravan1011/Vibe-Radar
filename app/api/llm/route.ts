import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // or "gemini-1.5-pro"
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    return NextResponse.json({ success: true, reply: text });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ success: false, error: "Failed to generate content" }, { status: 500 });
  }
}
