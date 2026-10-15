"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Brain } from "lucide-react";

export default function ReasoningDrawer({ steps }: { steps: string[] }) {
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!open) return;
    setVisibleCount(0);
    const timers = steps.map((_, i) =>
      setTimeout(() => setVisibleCount(i + 1), i * 350)
    );
    return () => timers.forEach(clearTimeout);
  }, [open, steps]);

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl overflow-hidden shadow-xl">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-800 transition"
      >
        <span className="flex items-center gap-2 font-semibold">
          <Brain className="w-5 h-5 text-emerald-400" />
          Reasoning Chain ({steps.length} steps)
        </span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ol className="px-6 pb-5 space-y-3 text-sm">
          {steps.slice(0, visibleCount).map((step, i) => (
            <li
              key={i}
              className="flex gap-3 animate-fadeIn"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold">
                {i + 1}
              </span>
              <span className="text-slate-200 leading-relaxed">{step}</span>
            </li>
          ))}
          {visibleCount < steps.length && (
            <li className="flex items-center gap-2 text-emerald-400 text-xs pl-9">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Analyzing…
            </li>
          )}
        </ol>
      )}
    </div>
  );
}