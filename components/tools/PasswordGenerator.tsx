"use client";

import { useState, useCallback } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const CHARS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{}|;:,.<>?",
};

function getStrength(password: string): { label: string; level: number; variant: "error" | "warning" | "success" | "default" } {
  let score = 0;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { label: "Weak", level: 1, variant: "error" };
  if (score <= 3) return { label: "Fair", level: 2, variant: "warning" };
  if (score <= 4) return { label: "Strong", level: 3, variant: "success" };
  return { label: "Very Strong", level: 4, variant: "success" };
}

function generatePassword(length: number, options: Record<string, boolean>) {
  let pool = "";
  if (options.upper) pool += CHARS.upper;
  if (options.lower) pool += CHARS.lower;
  if (options.numbers) pool += CHARS.numbers;
  if (options.symbols) pool += CHARS.symbols;
  if (!pool) pool = CHARS.lower;

  let pw = "";
  const arr = new Uint32Array(length);
  crypto.getRandomValues(arr);
  for (let i = 0; i < length; i++) {
    pw += pool[arr[i] % pool.length];
  }
  return pw;
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ upper: true, lower: true, numbers: true, symbols: false });
  const [passwords, setPasswords] = useState<string[]>([generatePassword(16, { upper: true, lower: true, numbers: true, symbols: false })]);
  const [count, setCount] = useState(1);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = useCallback(() => {
    const pws = Array.from({ length: count }, () => generatePassword(length, options));
    setPasswords(pws);
  }, [length, options, count]);

  async function handleCopy(pw: string, i: number) {
    await navigator.clipboard.writeText(pw);
    setCopied(i);
    setTimeout(() => setCopied(null), 2000);
  }

  const strength = passwords[0] ? getStrength(passwords[0]) : null;

  return (
    <div className="space-y-6">
      <div className="card space-y-5">
        <div>
          <label className="label-base">Password Length: <strong>{length}</strong></label>
          <input type="range" min={4} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} className="w-full accent-[#8b0000] mt-2" />
          <div className="flex justify-between text-xs text-muted mt-1"><span>4</span><span>64</span></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { key: "upper", label: "Uppercase (A-Z)" },
            { key: "lower", label: "Lowercase (a-z)" },
            { key: "numbers", label: "Numbers (0-9)" },
            { key: "symbols", label: "Symbols (!@#)" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer p-3 rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors">
              <input
                type="checkbox"
                checked={options[key as keyof typeof options]}
                onChange={(e) => setOptions((prev) => ({ ...prev, [key]: e.target.checked }))}
                className="accent-[#8b0000]"
              />
              <span className="text-xs text-[var(--foreground)]">{label}</span>
            </label>
          ))}
        </div>

        <div>
          <label className="label-base">Generate multiple passwords: <strong>{count}</strong></label>
          <input type="range" min={1} max={10} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-[#8b0000] mt-1" />
        </div>

        <Button onClick={generate} className="w-full" size="lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />
          </svg>
          Generate
        </Button>
      </div>

      {/* Password List */}
      <div className="space-y-3">
        {passwords.map((pw, i) => {
          const s = getStrength(pw);
          return (
            <div key={i} className="card flex items-center gap-3">
              <code className="flex-1 text-sm font-mono text-[var(--foreground)] break-all">{pw}</code>
              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={s.variant}>{s.label}</Badge>
                <button
                  onClick={() => handleCopy(pw, i)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-[var(--border)] hover:bg-[var(--background)] transition-colors text-[var(--foreground)]"
                  title="Copy"
                >
                  {copied === i ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
