"use client";

import { useState, useRef } from "react";
import Button from "@/components/ui/Button";

export default function ImageResizer() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [originalW, setOriginalW] = useState(0);
  const [originalH, setOriginalH] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [lockAspect, setLockAspect] = useState(true);
  const [resultUrl, setResultUrl] = useState("");
  const [processing, setProcessing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileChange(f: File) {
    setFile(f);
    setResultUrl("");
    const url = URL.createObjectURL(f);
    setPreview(url);
    const img = new Image();
    img.onload = () => {
      setOriginalW(img.width);
      setOriginalH(img.height);
      setWidth(img.width);
      setHeight(img.height);
    };
    img.src = url;
  }

  function handleWidthChange(v: number) {
    setWidth(v);
    if (lockAspect && originalW > 0) {
      setHeight(Math.round((v / originalW) * originalH));
    }
  }

  function handleHeightChange(v: number) {
    setHeight(v);
    if (lockAspect && originalH > 0) {
      setWidth(Math.round((v / originalH) * originalW));
    }
  }

  function resizeImage() {
    if (!file || !width || !height) return;
    setProcessing(true);
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, width, height);
      canvas.toBlob((blob) => {
        setResultUrl(URL.createObjectURL(blob!));
        setProcessing(false);
      }, file.type || "image/jpeg");
    };
    img.src = preview;
  }

  return (
    <div className="space-y-6">
      {/* Upload */}
      <div
        onClick={() => inputRef.current?.click()}
        className="card border-2 border-dashed cursor-pointer flex flex-col items-center justify-center py-10 gap-3 hover:border-[#8b0000]/50 transition-colors"
      >
        {preview ? (
          <img src={preview} alt="preview" className="max-h-40 rounded-lg object-contain" />
        ) : (
          <>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
              <rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <p className="text-sm text-muted">Click to upload an image</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
        />
      </div>

      {file && (
        <>
          <div className="card space-y-4">
            <p className="text-xs text-muted">Original: {originalW} × {originalH}px</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-base">Width (px)</label>
                <input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(Number(e.target.value))}
                  className="input-base"
                  min={1}
                />
              </div>
              <div>
                <label className="label-base">Height (px)</label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(Number(e.target.value))}
                  className="input-base"
                  min={1}
                />
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={lockAspect}
                onChange={(e) => setLockAspect(e.target.checked)}
                className="accent-[#8b0000]"
              />
              <span className="text-[var(--foreground)]">Lock aspect ratio</span>
            </label>

            <Button onClick={resizeImage} loading={processing} className="w-full" size="lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
              </svg>
              Resize Image
            </Button>
          </div>

          {resultUrl && (
            <div className="card flex flex-col items-center gap-4">
              <img src={resultUrl} alt="resized" className="max-h-48 rounded-lg object-contain border border-[var(--border)]" />
              <p className="text-sm text-muted">
                Result: {width} × {height}px
              </p>
              <a href={resultUrl} download={`resized_${file.name}`} className="btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download Resized Image
              </a>
            </div>
          )}
        </>
      )}
    </div>
  );
}
