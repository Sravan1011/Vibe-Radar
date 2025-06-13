import { NextRequest, NextResponse } from "next/server";
import { getOpenAIResponse } from "../../../lib/openai";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Missing or invalid prompt" }, { status: 400 });
    }
    const reply = await getOpenAIResponse(prompt);
    return NextResponse.json({ success: true, reply });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "Internal error" }, { status: 500 });
  }
} 