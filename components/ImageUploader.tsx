"use client";

import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";

interface Props {
  onImageReady: (base64: string, mimeType: string) => void;
  onClear: () => void;
}

export default function ImageUploader({ onImageReady, onClear }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      setPreview(result);
      onImageReady(base64, file.type);
    };
    reader.readAsDataURL(file);
  };

  const clear = () => {
    setPreview(null);
    onClear();
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {!preview ? (
        <div
          onClick={() => inputRef.current?.click()}
          className="border-2 border-dashed border-emerald-400/60 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-emerald-50/50 transition"
        >
          <Camera className="w-10 h-10 text-emerald-600 mb-2" />
          <p className="font-semibold text-emerald-800">
            Snap or upload a crop photo
          </p>
          <p className="text-xs text-emerald-600/70 mt-1">
            JPG, PNG, or HEIC — leaves, stems, ledgers, invoices
          </p>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Uploaded crop"
            className="w-full max-h-80 object-cover"
          />
          <button
            onClick={clear}
            className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full shadow"
            aria-label="Remove image"
          >
            <X className="w-4 h-4 text-red-600" />
          </button>
        </div>
      )}
    </div>
  );
}