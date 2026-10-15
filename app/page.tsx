"use client";

import { useState } from "react";
import { Loader2, Leaf, Sparkles, Shield } from "lucide-react";
import ImageUploader from "@/components/ImageUploader";
import ReasoningDrawer from "@/components/ReasoningDrawer";
import PrescriptionCard from "@/components/PrescriptionCard";
import ChatPanel from "@/components/ChatPanel";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/i18n";
import type { Prescription } from "@/lib/schemas";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.93 10.93 0 0 1 5.73 0c2.18-1.49 3.14-1.18 3.14-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.26 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
    </svg>
  );
}

export default function Home() {
  const { language } = useLanguage();
  const strings = t(language);
  const [image, setImage] = useState<{ base64: string; mime: string } | null>(
    null
  );
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Prescription | null>(null);
  const [error, setError] = useState<string | null>(null);

  const diagnose = async () => {
    if (!image) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: image.base64,
          mimeType: image.mime,
          userNote: note || undefined,
          language,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Diagnosis failed");
      setResult(data.prescription);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/90 backdrop-blur sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Leaf className="w-5 h-5 text-white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base font-bold text-slate-900 leading-tight">
              {strings.brand}
            </h1>
            <p className="text-xs text-slate-500 leading-tight">
              {strings.tagline}
            </p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="https://github.com/AzureX-15289/agriAegis"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-slate-100 transition"
              aria-label="GitHub repository"
            >
              <GithubIcon className="w-5 h-5 text-slate-700" />
            </a>
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-10 pb-6">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
          {strings.heroTitle}
        </h2>
        <p className="mt-3 text-slate-600 max-w-2xl">{strings.heroSubtitle}</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-10 grid lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {strings.step1}
            </h3>
            <ImageUploader
              onImageReady={(base64, mime) => setImage({ base64, mime })}
              onClear={() => setImage(null)}
            />
          </div>

          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              {strings.step2}
            </h3>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={strings.notesPlaceholder}
              rows={3}
              className="w-full rounded-xl border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 outline-none resize-none"
            />
          </div>

          <button
            onClick={diagnose}
            disabled={!image || loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition flex items-center justify-center gap-2 shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {strings.analyzing}
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                {strings.diagnose}
              </>
            )}
          </button>

          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 rounded-xl p-3 text-sm">
              {error}
            </div>
          )}
        </div>

        <div className="space-y-4">
          {loading && <LoadingSkeleton />}
          {!loading && !result && (
            <EmptyState
              title={strings.emptyTitle}
              subtitle={strings.emptySubtitle}
            />
          )}
          {!loading && result && (
            <>
              <ReasoningDrawer steps={result.reasoningSteps} />
              <PrescriptionCard p={result} />
            </>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16">
        <ChatPanel />
      </section>

      <footer className="border-t border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" />
            {strings.footerDisclaimer}
          </div>
          <div>{strings.footerLicense}</div>
        </div>
      </footer>
    </main>
  );
}

function EmptyState({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 flex flex-col items-center justify-center text-center min-h-[300px]">
      <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center mb-3">
        <Leaf className="w-6 h-6 text-emerald-600" />
      </div>
      <p className="text-sm font-medium text-slate-700">{title}</p>
      <p className="text-xs text-slate-500 mt-1 max-w-xs">{subtitle}</p>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl bg-slate-900 h-14 animate-pulse" />
      <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-3">
        <div className="h-6 w-2/3 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 w-1/3 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-5 space-y-2">
        <div className="h-4 w-1/3 bg-emerald-200 rounded animate-pulse" />
        <div className="h-3 w-full bg-emerald-200/70 rounded animate-pulse" />
      </div>
    </div>
  );
}