"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";

export default function QrGenerator() {
  const [text, setText] = useState("https://toolup.com");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrUrl, setQrUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  async function generateQr() {
    if (!text.trim() || !canvasRef.current) return;
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      await QRCode.toCanvas(canvasRef.current, text, {
        width: size,
        color: { dark: fgColor, light: bgColor },
        margin: 2,
      });
      setQrUrl(canvasRef.current.toDataURL("image/png"));
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  }

  useEffect(() => { generateQr(); }, []);

  return (
    <div className="space-y-6">
      <div className="card space-y-5">
        <div>
          <label className="label-base">Text or URL</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="input-base"
            placeholder="https://example.com or any text"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label-base">Size</label>
            <select value={size} onChange={(e) => setSize(Number(e.target.value))} className="input-base">
              <option value={128}>128 × 128</option>
              <option value={256}>256 × 256</option>
              <option value={384}>384 × 384</option>
              <option value={512}>512 × 512</option>
            </select>
          </div>
          <div>
            <label className="label-base">Foreground</label>
            <input type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="w-full h-10 rounded border border-[var(--border)] cursor-pointer" />
          </div>
          <div>
            <label className="label-base">Background</label>
            <input type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 rounded border border-[var(--border)] cursor-pointer" />
          </div>
        </div>

        <Button onClick={generateQr} loading={loading} className="w-full" size="lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3" />
          </svg>
          Generate QR Code
        </Button>
      </div>

      {/* QR Preview */}
      <div className="card flex flex-col items-center gap-4">
        <canvas ref={canvasRef} width={size} height={size} className="rounded-lg border border-[var(--border)]" />
        {qrUrl && (
          <a href={qrUrl} download="qrcode.png" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            Download PNG
          </a>
        )}
      </div>
    </div>
  );
}
