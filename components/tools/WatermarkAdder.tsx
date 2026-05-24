"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Button from "@/components/ui/Button";

type Position =
  | "top-left" | "top-center" | "top-right"
  | "middle-left" | "middle-center" | "middle-right"
  | "bottom-left" | "bottom-center" | "bottom-right";

const positions: Position[] = [
  "top-left", "top-center", "top-right",
  "middle-left", "middle-center", "middle-right",
  "bottom-left", "bottom-center", "bottom-right",
];

export default function WatermarkAdder() {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("© Toolup");
  const [position, setPosition] = useState<Position>("bottom-right");
  const [fontSize, setFontSize] = useState(32);
  const [opacity, setOpacity] = useState(70);
  const [color, setColor] = useState("#ffffff");
  const [previewUrl, setPreviewUrl] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const drawWatermark = useCallback(() => {
    if (!imgRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0);

    ctx.globalAlpha = opacity / 100;
    ctx.fillStyle = color;
    ctx.font = `bold ${fontSize}px Arial, sans-serif`;
    ctx.textBaseline = "middle";

    const padding = 20;
    const textWidth = ctx.measureText(text).width;

    let x = 0;
    let y = 0;
    const [vp, hp] = position.split("-");

    if (vp === "top") y = padding + fontSize / 2;
    else if (vp === "middle") y = canvas.height / 2;
    else y = canvas.height - padding - fontSize / 2;

    if (hp === "left") { x = padding; ctx.textAlign = "left"; }
    else if (hp === "center") { x = canvas.width / 2; ctx.textAlign = "center"; }
    else { x = canvas.width - padding; ctx.textAlign = "right"; }

    ctx.fillText(text, x, y);
    ctx.globalAlpha = 1;

    const url = canvas.toDataURL("image/jpeg", 0.92);
    setPreviewUrl(url);
    setResultUrl(url);
  }, [text, position, fontSize, opacity, color]);

  useEffect(() => {
    if (imgRef.current?.complete) drawWatermark();
  }, [drawWatermark]);

  function handleFileChange(f: File) {
    setFile(f);
    const url = URL.createObjectURL(f);
    const img = new Image();
    img.onload = () => {
      imgRef.current = img;
      drawWatermark();
    };
    img.src = url;
  }

  return (
    <div className="space-y-6">
      <canvas ref={canvasRef} className="hidden" />

      {/* Upload */}
      <div
        onClick={() => inputRef.current?.click()}
        className="card border-2 border-dashed cursor-pointer flex flex-col items-center justify-center py-10 gap-3 hover:border-[#8b0000]/50 transition-colors"
      >
        {previewUrl ? (
          <img src={previewUrl} alt="preview with watermark" className="max-h-56 rounded-lg object-contain" />
        ) : (
          <>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
              <rect width="18" height="18" x="3" y="3" rx="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            <p className="text-sm text-muted">Click to upload an image</p>
          </>
        )}
        <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])} />
      </div>

      {file && (
        <div className="card space-y-5">
          <div>
            <label className="label-base">Watermark Text</label>
            <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="input-base" placeholder="Enter watermark text..." />
          </div>

          <div>
            <label className="label-base">Position</label>
            <div className="grid grid-cols-3 gap-2 w-fit">
              {positions.map((pos) => (
                <button
                  key={pos}
                  onClick={() => setPosition(pos)}
                  className={`w-10 h-10 rounded border-2 transition-colors ${pos === position ? "border-[#8b0000] bg-[#8b0000]/10" : "border-[var(--border)]"}`}
                  title={pos}
                />
              ))}
            </div>
            <p className="text-xs text-muted mt-1">Selected: {position.replace("-", " ")}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="label-base">Font Size: {fontSize}px</label>
              <input type="range" min={12} max={120} value={fontSize} onChange={(e) => setFontSize(Number(e.target.value))} className="w-full accent-[#8b0000]" />
            </div>
            <div>
              <label className="label-base">Opacity: {opacity}%</label>
              <input type="range" min={10} max={100} value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} className="w-full accent-[#8b0000]" />
            </div>
            <div>
              <label className="label-base">Color</label>
              <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 rounded cursor-pointer border border-[var(--border)]" />
            </div>
          </div>

          <Button onClick={drawWatermark} className="w-full" size="lg">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            Apply Watermark
          </Button>

          {resultUrl && (
            <a href={resultUrl} download={`watermarked_${file.name}`} className="btn-primary justify-center w-full">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Download with Watermark
            </a>
          )}
        </div>
      )}
    </div>
  );
}
