"use client";

import { useState } from "react";
import Link from "next/link";

interface Tool {
  key: string;
  name: string;
  description: string;
  href: string;
}

export default function HomeSearch({
  placeholder,
  tools,
}: {
  placeholder: string;
  tools: Tool[];
}) {
  const [query, setQuery] = useState("");

  const results = query.trim()
    ? tools.filter(
        (t) =>
          t.name.toLowerCase().includes(query.toLowerCase()) ||
          t.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-[#8b0000] focus-within:border-transparent transition">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted shrink-0">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-[var(--foreground)] placeholder:text-muted text-sm"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-muted hover:text-[var(--foreground)] transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {results.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-[var(--surface)] border border-[var(--border)] rounded-xl shadow-xl overflow-hidden z-30 animate-fade-in">
          {results.map((tool) => (
            <Link
              key={tool.key}
              href={tool.href}
              onClick={() => setQuery("")}
              className="flex flex-col px-4 py-3 hover:bg-[var(--background)] transition-colors border-b border-[var(--border)] last:border-0"
            >
              <span className="text-sm font-semibold text-[var(--foreground)]">{tool.name}</span>
              <span className="text-xs text-muted">{tool.description}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
