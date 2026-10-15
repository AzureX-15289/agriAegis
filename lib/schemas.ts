import { z } from "zod";

export const SeverityEnum = z.enum(["Low", "Moderate", "Critical"]);
export type Severity = z.infer<typeof SeverityEnum>;

export const PrescriptionSchema = z.object({
  diagnosis: z.string().describe("Name of the pest, disease, or deficiency"),
  scientificName: z.string().optional(),
  severity: SeverityEnum,
  confidence: z.number().min(0).max(1),
  reasoningSteps: z
    .array(z.string())
    .min(3)
    .max(8)
    .describe("How the AI reached this diagnosis"),
  organicRemedy: z.object({
    treatment: z.string(),
    dosagePerBigha: z.string(),
    applicationMethod: z.string(),
  }),
  chemicalRemedy: z.object({
    treatment: z.string(),
    dosagePerBigha: z.string(),
    safetyIntervalDays: z.number(),
  }),
  preventiveMeasures: z.array(z.string()).min(2).max(5),
  localizedAdvice: z.object({
    season: z.string(),
    region: z.string().default("Uttar Pradesh"),
    language: z.string().default("Hindi/Awadhi"),
  }),
  ocrText: z
    .string()
    .optional()
    .describe("Any extracted or translated text from the uploaded image"),
  complianceNotice: z.string(),
});

export type Prescription = z.infer<typeof PrescriptionSchema>;

export const DiagnoseRequestSchema = z.object({
  imageBase64: z.string().min(50),
  mimeType: z.string().default("image/jpeg"),
  userNote: z.string().max(500).optional(),
  language: z.enum(["en", "hi", "awa"]).default("hi"),
});

export const ChatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string().max(2000),
      })
    )
    .min(1),
  language: z.enum(["en", "hi", "awa"]).default("hi"),
});