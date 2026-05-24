"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Button from "@/components/ui/Button";

interface CompressedFile {
  name: string;
  originalSize: number;
  compressedSize: number;
  originalUrl: string;
  compressedUrl: string;
  savings: number;
}

interface Progress {
  done: number;
  total: number;
}

const BATCH_SIZE = 10;
const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];

function formatBytes(bytes: number) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function yieldToMain(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function compressImage(file: File, q: number): Promise<CompressedFile> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0);
      canvas.toBlob(
        (blob) => {
          resolve({
            name: file.name,
            originalSize: file.size,
            compressedSize: blob!.size,
            originalUrl: url,
            compressedUrl: URL.createObjectURL(blob!),
            savings: Math.round((1 - blob!.size / file.size) * 100),
          });
        },
        "image/jpeg",
        q / 100
      );
    };
    img.src = url;
  });
}

export default function ImageCompressor() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState(75);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [dragging, setDragging] = useState(false);
  const [folderInfo, setFolderInfo] = useState<string | null>(null);

  const filesInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  // webkitdirectory is not in React's type definitions — set it via ref after mount
  useEffect(() => {
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute("webkitdirectory", "");
    }
  }, []);

  const processFiles = useCallback(
    async (fileList: FileList) => {
      const imageFiles = Array.from(fileList).filter((f) =>
        ACCEPTED.includes(f.type)
      );
      if (imageFiles.length === 0) return;

      const total = imageFiles.length;
      setProgress({ done: 0, total });
      setFolderInfo(null);

      for (let i = 0; i < imageFiles.length; i += BATCH_SIZE) {
        const batch = imageFiles.slice(i, i + BATCH_SIZE);
        const results = await Promise.all(batch.map((f) => compressImage(f, quality)));
        setFiles((prev) => [...prev, ...results]);
        setProgress({ done: Math.min(i + BATCH_SIZE, total), total });
        await yieldToMain();
      }

      setProgress(null);
    },
    [quality]
  );

  const handleFolderChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return;
      const imageFiles = Array.from(e.target.files).filter((f) =>
        ACCEPTED.includes(f.type)
      );
      setFolderInfo(`Found ${imageFiles.length} image${imageFiles.length !== 1 ? "s" : ""} in folder`);
      processFiles(e.target.files);
    },
    [processFiles]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      setFolderInfo(null);
      processFiles(e.dataTransfer.files);
    },
    [processFiles]
  );

  async function downloadAll() {
    const { default: JSZip } = await import("jszip");
    const zip = new JSZip();
    for (const f of files) {
      const res = await fetch(f.compressedUrl);
      const blob = await res.blob();
      zip.file(`compressed_${f.name}`, blob);
    }
    const zipBlob = await zip.generateAsync({ type: "blob" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(zipBlob);
    a.download = "compressed_images.zip";
    a.click();
  }

  const isProcessing = progress !== null;
  const pct = progress ? Math.round((progress.done / progress.total) * 100) : 0;
  const remaining = progress ? progress.total - progress.done : 0;

  return (
    <div className="space-y-6">
      {/* Quality Slider */}
      <div className="card">
        <label className="label-base">
          Compression Quality: <strong>{quality}%</strong>
        </label>
        <input
          type="range"
          min={1}
          max={100}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full accent-[#8b0000] mt-2"
          disabled={isProcessing}
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>Smallest file</span>
          <span>Best quality</span>
        </div>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={`card border-2 border-dashed flex flex-col items-center justify-center py-10 gap-4 transition-colors ${
          isProcessing ? "opacity-60" : ""
        } ${dragging ? "border-[#8b0000] bg-[#8b0000]/5" : "border-[var(--border)]"}`}
      >
        {/* Upload icon */}
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" x2="12" y1="3" y2="15" />
        </svg>

        {/* Marketing headline */}
        <p className="text-sm font-bold text-[var(--foreground)] text-center">
          No limits — Upload up to 5,000 images at once
        </p>

        <p className="text-xs text-muted text-center -mt-2">
          Drag & drop images here, or use the buttons below · JPG, PNG, WEBP
        </p>

        {/* Upload buttons */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          <button
            type="button"
            disabled={isProcessing}
            onClick={() => filesInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#8b0000] hover:bg-[#a00000] text-white text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <circle cx="9" cy="9" r="2" />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
            Upload Images
          </button>

          <button
            type="button"
            disabled={isProcessing}
            onClick={() => folderInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--background)] text-[var(--foreground)] text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
            </svg>
            Upload Folder
          </button>
        </div>

        {/* Folder scan result message */}
        {folderInfo && !isProcessing && (
          <p className="text-xs font-semibold text-[#8b0000] flex items-center gap-1.5">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {folderInfo}
          </p>
        )}

        {/* Hidden file inputs */}
        <input
          ref={filesInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              setFolderInfo(null);
              processFiles(e.target.files);
            }
          }}
        />
        {/* webkitdirectory set via useEffect ref — not a valid React prop */}
        <input
          ref={folderInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="hidden"
          onChange={handleFolderChange}
        />
      </div>

      {/* Progress Bar */}
      {isProcessing && progress && (
        <div className="card space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-[var(--foreground)]">
              Processing {progress.done} of {progress.total}…
            </span>
            <span className="text-muted">{remaining} remaining</span>
          </div>
          <div className="w-full h-2.5 bg-[var(--border)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#8b0000] rounded-full transition-all duration-200"
              style={{ width: `${pct}%` }}
            />
          </div>
          <p className="text-xs text-muted">
            {pct}% complete · Results appear below as each batch finishes
          </p>
        </div>
      )}

      {/* Results */}
      {files.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-[var(--foreground)]">
              {files.length} image{files.length !== 1 ? "s" : ""} compressed
              {isProcessing && (
                <span className="text-muted font-normal text-sm ml-2">(more coming…)</span>
              )}
            </h3>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => { setFiles([]); setFolderInfo(null); }}
                disabled={isProcessing}
              >
                Clear all
              </Button>
              <Button size="sm" onClick={downloadAll} disabled={isProcessing}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download All (ZIP)
              </Button>
            </div>
          </div>

          {files.map((file, i) => (
            <div key={i} className="card flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <img
                src={file.compressedUrl}
                alt={file.name}
                className="w-16 h-16 object-cover rounded-lg border border-[var(--border)]"
              />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-[var(--foreground)] truncate">{file.name}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs text-muted">
                  <span>Original: {formatBytes(file.originalSize)}</span>
                  <span>Compressed: {formatBytes(file.compressedSize)}</span>
                  <span className="text-green-600 font-semibold">{file.savings}% saved</span>
                </div>
              </div>
              <a
                href={file.compressedUrl}
                download={`compressed_${file.name}`}
                className="btn-primary text-sm"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
                Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
