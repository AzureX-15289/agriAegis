# AgriAegis

An open-source, multilingual AI advisor for smallholder farmers near Lucknow.

Snap a diseased crop, get a structured prescription in Hindi or Awadhi. Powered by Google's open-weight Gemma models.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![License: MIT](https://img.shields.io/badge/License-MIT-green)
![Powered by Gemma](https://img.shields.io/badge/Powered%20by-Gemma-4285F4)

---

Farmers near Lucknow lose crops to pests and mistimed fertiliser. Advice exists, but not in Awadhi. AgriAegis lets a farmer upload a leaf photo, get an instant diagnosis, and receive organic and chemical remedies with dosage per bigha, all in their own language.

**Stack:** Next.js 14, TypeScript, Tailwind, Vercel AI SDK, Google Gemma (multimodal), Zod.

### Run locally

```bash
git clone https://github.com/AzureX-15289/agriaegis.git
cd agriaegis
npm install
cp .env.example .env.local   # add GOOGLE_GENERATIVE_AI_API_KEY
npm run dev
```
