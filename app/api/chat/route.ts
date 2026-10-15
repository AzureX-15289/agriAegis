import { streamText } from "ai";
import { NextRequest } from "next/server";
import { ChatRequestSchema } from "@/lib/schemas";
import { CHAT_SYSTEM_PROMPT } from "@/lib/prompts";
import { resolveModel, CHAT_MODEL } from "@/lib/model";

export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = ChatRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { messages, language } = parsed.data;

    const result = streamText({
      model: resolveModel(CHAT_MODEL),
      system: CHAT_SYSTEM_PROMPT(language),
      messages,
      temperature: 0.3,
      maxOutputTokens: 1024,
    });

    return result.toTextStreamResponse();
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Chat failed";
    console.error("[AgriAegis /chat] FULL ERROR:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}