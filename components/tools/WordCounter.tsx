"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";

function countStats(text: string) {
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, "").length;
  const sentences = text === "" ? 0 : (text.match(/[^.!?]*[.!?]/g) || []).length;
  const paragraphs = text === "" ? 0 : text.split(/\n\s*\n/).filter((p) => p.trim()).length;
  const readingTime = Math.ceil(words / 200);
  return { words, chars, charsNoSpaces, sentences, paragraphs, readingTime };
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = countStats(text);

  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const statItems = [
    { label: "Words", value: stats.words },
    { label: "Characters", value: stats.chars },
    { label: "No Spaces", value: stats.charsNoSpaces },
    { label: "Sentences", value: stats.sentences },
    { label: "Paragraphs", value: stats.paragraphs },
    { label: "Reading Time", value: `${stats.readingTime} min` },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {statItems.map((item) => (
          <div key={item.label} className="card text-center py-4">
            <div className="text-2xl font-bold text-[#8b0000]">{item.value}</div>
            <div className="text-xs text-muted mt-1">{item.label}</div>
          </div>
        ))}
      </div>

      {/* Textarea */}
      <div className="card p-0 overflow-hidden">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here..."
          className="w-full h-64 p-4 bg-transparent text-[var(--foreground)] resize-none outline-none text-sm leading-relaxed"
        />
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--border)]">
          <span className="text-xs text-muted">{stats.words} words · {stats.chars} characters</span>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" onClick={handleCopy}>
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy
                </>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setText("")}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
              </svg>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
