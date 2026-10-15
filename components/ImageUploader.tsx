"use client";

import { useRef, useState } from "react";
import { Camera, X } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { t } from "@/lib/i18n";

interface Props {
  onImageReady: (base64: string, mimeType: string) => void;
  onClear: () => void;
}

export default function ImageUploader({ onImageReady, onClear }: Props) {
  const { language } = useLanguage();
  const strings = t(language);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX = 1024;
        let { width, height } = img;

        if (width > height && width > MAX) {
          height = (height * MAX) / width;
          width = MAX;
        } else if (height > MAX) {
          width = (width * MAX) / height;
          height = MAX;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL("image/jpeg", 0.75);
        const base64 = dataUrl.split(",")[1];

        setPreview(dataUrl);
        onImageReady(base64, "image/jpeg");
      };
      img.src = reader.result as string;
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
          <p className="font-semibold text-emerald-800">{strings.uploadCta}</p>
          <p className="text-xs text-emerald-600/70 mt-1">
            {strings.uploadHint}
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