# AgriAegis

**An open-source, multilingual AI advisor for smallholder farmers near Lucknow.**

Upload a photo of a diseased crop and get a structured prescription in Hindi, Awadhi or English, grounded in curated ICAR and UP Krishi Vigyan Kendra (KVK) guidance.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Powered by Gemma](https://img.shields.io/badge/Powered%20by-Gemma-4285F4)](https://ai.google.dev/gemma)

**Live demo:** https://agriaegis.vercel.app

<!-- TODO: add 2-3 screenshots here (upload, reasoning chain, prescription card):
![AgriAegis prescription screen](docs/screenshot-prescription.png) -->

---

## Why this exists

Farmers near Lucknow lose a significant share of each season's crop to pests, disease, mistimed fertiliser and irrigation, and missed weather warnings. Reported losses to pests and disease run as high as 30% per season. The guidance that could help is usually written in English or formal Hindi, not in Awadhi, the language many of these farmers speak at home.

AgriAegis puts that guidance behind one action: take a photo, get a prescription, in your own language.

## What it does

- **Diagnoses from a photo.** Upload a leaf image and receive a structured result.
- **Speaks three languages.** Hindi, Awadhi and English, selectable in the interface.
- **Returns a structured prescription.** Diagnosis, severity, organic remedy, chemical remedy, and dosage per bigha and per acre.
- **Shows its reasoning.** An animated chain of steps shows how the diagnosis was reached.
- **Answers follow-up questions.** A streaming chat for questions such as irrigation timing or fertiliser choice.
- **Is fully open source.** MIT licensed.

## How it works

```
Farmer (photo or question, hi / awadhi / en)
        |
        v
Next.js 14 frontend (App Router, TypeScript, Tailwind CSS)
        |
        +--> POST /api/diagnose  --> generateObject --> Zod-validated JSON prescription
        |
        +--> POST /api/chat      --> streamText     --> streaming reply
                         |
                         v
        Vercel AI SDK + Gemma (multimodal) via @ai-sdk/google
                         ^
                         |
        Curated ICAR + UP KVK guidance (knowledge base)
```

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/diagnose` | POST | Accepts an image and optional note. Returns a structured prescription using `generateObject`, validated with Zod. |
| `/api/chat` | POST | Accepts a conversation. Streams a reply using `streamText`. |

Both endpoints run on the Vercel Edge Runtime.

### Knowledge grounding

Remedies and dosages are drawn from a curated set of ICAR and UP KVK guidelines, not from open web crawling. The model's job is to match the observed symptoms to the curated guidance and explain the match; the guidance, not the model, supplies the remedy and dosage.

<!-- TODO: state where the knowledge base lives in the repo (for example lib/knowledge/),
     how many crops and conditions it covers, and the source documents for each entry. -->

### Models and fallback

AgriAegis uses Google's open-weight **Gemma** multimodal models through `@ai-sdk/google`.

<!-- TODO: fill in exactly, and keep it true:
- Primary model ID: <e.g. gemma-4-...>
- Fallback chain, in order: <model 1> -> <model 2> -> ...
- Whether any fallback is a non-Gemma model. If so, say so here and log which model answered. -->

The fallback chain exists so a live demo does not fail when a model is rate-limited or unavailable. The API response includes which model produced the answer.

> **Note on hosting.** The hosted demo calls a Gemma model through Google's API and needs an API key. Gemma's weights are open, which makes self-hosting possible, but the self-hosted path is not yet implemented or benchmarked in this repository (see Roadmap).

## Languages

| Language | Status |
|---|---|
| Hindi | Supported |
| Awadhi | Supported (see Limitations) |
| English | Supported |

Planned: Bhojpuri, Bundeli, Braj.

## Quick start

**Requirements:** Node.js 18.17 or later, and a Google AI API key.

```bash
git clone https://github.com/AzureX-15289/agriAegis.git
cd agriAegis
npm install
cp .env.example .env.local   # then set GOOGLE_GENERATIVE_AI_API_KEY
npm run dev
```

Open http://localhost:3000.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `GOOGLE_GENERATIVE_AI_API_KEY` | Yes | API key used by `@ai-sdk/google`. |

### Deploy

**Vercel (used for the live demo):** import the repository, set `GOOGLE_GENERATIVE_AI_API_KEY`, and deploy.

<!-- TODO: if you are entering the DigitalOcean track, add a tested deployment section here
(for example App Platform or a Droplet). Note that the Edge Runtime is Vercel-specific, so the
API routes may need the Node.js runtime on other hosts. Only document what you have actually run. -->

## Project structure

```
app/          Next.js App Router pages and API routes
components/   UI components
lib/          Prompts, schemas, knowledge base and model configuration
public/       Static assets
SKILL.md      Agent skill description (Agent Skill Standard)
AGENTS.md     Notes for AI coding agents working in this repository
```

## Limitations and safety

AgriAegis gives **informational guidance only**. Please read this before relying on it.

- **Not a substitute for an agronomist.** Confirm every diagnosis and dosage with a local agriculture expert or your nearest KVK before applying chemicals.
- **Bigha is not a fixed unit.** Its size varies by region and district. Check that the dosage per bigha matches your local bigha, or use the per-acre figure.
- **Photo quality matters.** Blurry, dark or off-crop photos can produce wrong or low-confidence results.
- **Coverage is limited.** The advisor only knows the crops and conditions in its curated knowledge base. <!-- TODO: list them. -->
- **Awadhi quality is unverified.** The Awadhi output has not yet been reviewed by a panel of native speakers. Treat it as a first version and report errors.
- **Accuracy is not yet measured.** <!-- TODO: add evaluation results (dataset, number of images, accuracy) or state that none exist yet. -->

## Roadmap

| When | Milestone |
|---|---|
| Now | MVP: Hindi and Awadhi text, image diagnosis, structured prescriptions |
| 3 months | Awadhi voice input, offline-capable PWA |
| 6 months | KVK integration for a live advisory feed |
| 12 months | Five more dialects |
| Open | Documented and benchmarked self-hosted Gemma deployment on low-cost hardware |

## Contributing

Contributions are welcome, especially:

- Corrections to Awadhi and Hindi wording from native speakers
- Additional ICAR and KVK-sourced entries for the knowledge base (please cite the source document)
- Evaluation images and results from real field conditions

Open an issue to discuss larger changes before sending a pull request.

## License

MIT. See [LICENSE](LICENSE).

## Acknowledgements

Built with [Next.js](https://nextjs.org), the [Vercel AI SDK](https://sdk.vercel.ai), [Zod](https://zod.dev) and Google's [Gemma](https://ai.google.dev/gemma) models. Agronomic guidance is based on publications from ICAR and Uttar Pradesh Krishi Vigyan Kendras.
