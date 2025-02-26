import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const API_KEY = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: API_KEY });

export async function POST(request: Request) {
  const { message } = await request.json();

  try {
    const chatResponse = await client.chat.complete({
      model: "mistral-large-latest",
      messages: [{ role: "user", content: message }],
    });

    if (!chatResponse.choices?.[0]?.message?.content) {
      return NextResponse.json({ error: "Invalid response from Mistral API" }, { status: 500 });
    }

    return NextResponse.json({ reply: chatResponse.choices[0].message.content });
  } catch (error) {
    console.error("Error calling Mistral API", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
