import { generateObject } from "ai";
import { NextRequest } from "next/server";
import { PrescriptionSchema, DiagnoseRequestSchema } from "@/lib/schemas";
import { AGRI_SYSTEM_PROMPT } from "@/lib/prompts";
import { withModelFallback, resolveModel } from "@/lib/model";

export const maxDuration = 90;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = DiagnoseRequestSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: "Invalid input", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { imageBase64, mimeType, userNote, language } = parsed.data;

    const object = await withModelFallback(async (modelName) => {
      console.log(`[AgriAegis /diagnose] model=${modelName} lang=${language}`);
      const { object } = await generateObject({
        model: resolveModel(modelName),
        schema: PrescriptionSchema,
        system: AGRI_SYSTEM_PROMPT(language),
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: `Analyze this crop image and return a structured prescription.\nUser note: ${userNote ?? "None."}`,
              },
              {
                type: "image",
                image: imageBase64,
                mediaType: mimeType,
              },
            ],
          },
        ],
      });
      return object;
    });

    return Response.json({ ok: true, prescription: object });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Diagnosis failed";
    console.error("[AgriAegis /diagnose] FULL ERROR:", message);
    return Response.json({ error: message }, { status: 500 });
  }
}