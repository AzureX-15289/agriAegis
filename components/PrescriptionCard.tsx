"use client";

import { AlertTriangle, Leaf, FlaskConical } from "lucide-react";
import type { Prescription } from "@/lib/schemas";

const severityStyles: Record<string, string> = {
  Low: "bg-emerald-100 text-emerald-800 border-emerald-300",
  Moderate: "bg-amber-100 text-amber-800 border-amber-300",
  Critical: "bg-red-100 text-red-800 border-red-300",
};

export default function PrescriptionCard({ p }: { p: Prescription }) {
  return (
    <div className="space-y-4">
      {/* Diagnosis header */}
      <div className="bg-white rounded-2xl p-5 shadow border border-slate-200">
        <div className="flex items-start justify-between gap-3 flex-wrap">
          <div>
            <h2 className="text-xl font-bold text-slate-900">{p.diagnosis}</h2>
            {p.scientificName && (
              <p className="text-sm italic text-slate-500">
                {p.scientificName}
              </p>
            )}
          </div>
          <span
            className={`text-xs font-bold px-3 py-1 rounded-full border ${
              severityStyles[p.severity] ?? severityStyles.Low
            }`}
          >
            {p.severity}
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Confidence: {(p.confidence * 100).toFixed(0)}% · Region:{" "}
          {p.localizedAdvice.region}
        </div>
        {p.ocrText && (
          <div className="mt-3 p-3 bg-slate-50 rounded-lg text-sm text-slate-700">
            <p className="font-semibold mb-1">Extracted Text</p>
            <p className="whitespace-pre-wrap">{p.ocrText}</p>
          </div>
        )}
      </div>

      {/* Organic */}
      <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
        <h3 className="flex items-center gap-2 font-bold text-emerald-900 mb-2">
          <Leaf className="w-5 h-5" /> Organic Remedy
        </h3>
        <p className="text-sm text-emerald-900">{p.organicRemedy.treatment}</p>
        <p className="text-xs text-emerald-700 mt-2">
          <strong>Dosage:</strong> {p.organicRemedy.dosagePerBigha}
        </p>
        <p className="text-xs text-emerald-700">
          <strong>Application:</strong> {p.organicRemedy.applicationMethod}
        </p>
      </div>

      {/* Chemical */}
      <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
        <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-2">
          <FlaskConical className="w-5 h-5" /> Chemical Remedy
        </h3>
        <p className="text-sm text-blue-900">{p.chemicalRemedy.treatment}</p>
        <p className="text-xs text-blue-700 mt-2">
          <strong>Dosage:</strong> {p.chemicalRemedy.dosagePerBigha}
        </p>
        <p className="text-xs text-blue-700">
          <strong>Safety interval:</strong>{" "}
          {p.chemicalRemedy.safetyIntervalDays} days
        </p>
      </div>

      {/* Prevention */}
      <div className="bg-white rounded-2xl p-5 shadow border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-2">
          Preventive Measures
        </h3>
        <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
          {p.preventiveMeasures.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
      </div>

      {/* Compliance notice */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-300 rounded-xl p-3">
        <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
        <p className="text-xs text-amber-900">{p.complianceNotice}</p>
      </div>
    </div>
  );
}
