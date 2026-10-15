"use client";

import { Globe } from "lucide-react";
import { useLanguage, type Language } from "@/lib/LanguageContext";

const options: { value: Language; label: string }[] = [
  { value: "hi", label: "हिन्दी" },
  { value: "awa", label: "अवधी" },
  { value: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
      <Globe className="w-4 h-4 text-slate-500 ml-1" />
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLanguage(opt.value)}
          className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
            language === opt.value
              ? "bg-emerald-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}