---
name: agriaegis-crop-diagnostics
description: Multimodal agricultural diagnostic skill powered by open-weight Gemma models. Identifies crop leaf diseases, pest infestations, and returns structured treatment plans in Hindi, Awadhi, or English for smallholder farmers in Uttar Pradesh.
version: 1.0.0
license: MIT
author: AgriAegis Project Maintainers
tags:
  - agriculture
  - multimodal
  - gemma
  - hindi
  - awadhi
  - crop-diagnostics
inputs:
  - name: imageBase64
    type: string
    required: true
    description: Base64-encoded crop leaf or document image.
  - name: mimeType
    type: string
    default: image/jpeg
  - name: userNote
    type: string
    required: false
  - name: language
    type: enum
    values: [en, hi, awa]
    default: hi
outputs:
  - name: prescription
    schema: PrescriptionSchema
    description: Structured diagnosis, severity, organic and chemical remedies, reasoning chain.
capabilities:
  - multimodal-vision
  - ocr
  - multilingual-translation
  - structured-json-output
  - chain-of-thought-reasoning
  - streaming-chat
guardrails:
  - Always append the compliance notice.
  - Never recommend dosages above ICAR safety thresholds.
  - Prefer organic remedies when efficacy is comparable.
  - Never inflate confidence above 0.95 without clear visual evidence.
---

# AgriAegis Crop Diagnostics Skill

## Overview

An open-source agent skill for multimodal crop health analysis, built for smallholder farmers near Lucknow, Uttar Pradesh. Powered by Google's open-weight Gemma models via the Vercel AI SDK.

## Endpoints

- `POST /api/diagnose` — image to structured prescription (JSON)
- `POST /api/chat` — conversational Q&A (streaming)

## Languages

Hindi (hi), Awadhi (awa), English (en). Extensible to Bhojpuri, Bundeli, and Braj.

## Safety

Every output ends with a mandatory agricultural compliance notice.
