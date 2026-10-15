import { google } from "@ai-sdk/google";

/**
 * Model resolution strategy:
 * 1. Use env var GEMMA_MODEL if set.
 * 2. Otherwise default to the primary multimodal model.
 * 3. Fallback list is used at runtime if the primary throws.
 */
export const PRIMARY_MODEL = process.env.GEMMA_MODEL ?? "gemma-4-it";

export const FALLBACK_MODELS = [
  "gemma-3-27b-it",
  "gemma-2-27b-it",
];

export function resolveModel(name: string = PRIMARY_MODEL) {
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