import { google } from "@ai-sdk/google";

export const PRIMARY_MODEL = process.env.GEMMA_MODEL ?? "gemma-4-31b-it";

export const CHAT_MODEL = process.env.CHAT_MODEL ?? "gemma-4-26b-a4b-it";

export const FALLBACK_MODELS = [
  "gemma-4-26b-a4b-it",
  "gemma-4-31b-it",
];

export function resolveModel(name: string = PRIMARY_MODEL) {
  console.log(`[AgriAegis] Using model: ${name}`);
  return google(name);
}

export async function withModelFallback<T>(
  fn: (modelName: string) => Promise<T>
): Promise<T> {
  const candidates = [PRIMARY_MODEL, ...FALLBACK_MODELS];
  let lastErr: unknown;

  for (const name of candidates) {
    try {
      return await fn(name);
    } catch (err: unknown) {
      lastErr = err;
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[AgriAegis] Model "${name}" failed, trying next: ${msg}`);
      continue;
    }
  }

  throw lastErr;
}