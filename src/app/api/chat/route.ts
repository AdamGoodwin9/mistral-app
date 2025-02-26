import { NextResponse } from "next/server";
import { Mistral } from "@mistralai/mistralai";

const API_KEY = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey: API_KEY });

export async function POST(request: Request) {
  const { messages, model } = await request.json();

  try {
    const stream = await client.chat.stream({
      model: model || "mistral-large-latest",
      messages: messages.map((msg: { role: string; text: string }) => ({
        role: msg.role === "bot" ? "assistant" : "user",
        content: msg.text
      }))
    });

    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.data.choices[0]?.delta?.content || "";
          if (text) {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text })}\n\n`));
          }
        }
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    });

    return new Response(customStream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error("Error calling Mistral API", error);
    return NextResponse.json({ error: "Failed to fetch response" }, { status: 500 });
  }
}
