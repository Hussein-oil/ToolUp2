"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  function format() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function minify() {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError("");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  function validate() {
    try {
      JSON.parse(input);
      setError("");
      setOutput("Valid JSON");
    } catch (e) {
      setError((e as Error).message);
      setOutput("");
    }
  }

  async function handleCopy() {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        <Button onClick={format} size="sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
          </svg>
          Format / Prettify
        </Button>
        <Button onClick={minify} variant="secondary" size="sm">Minify</Button>
        <Button onClick={validate} variant="secondary" size="sm">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
          </svg>
          Validate
        </Button>
        {error && <Badge variant="error">Invalid JSON</Badge>}
        {output === "Valid JSON" && <Badge variant="success">Valid JSON</Badge>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-0 overflow-hidden">
          <div className="px-4 py-2 border-b border-[var(--border)] text-xs font-semibold text-muted">INPUT</div>
          <textarea
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(""); setOutput(""); }}
            placeholder='{"name": "Toolup", "type": "free"}'
            className="w-full h-72 p-4 bg-transparent text-[var(--foreground)] resize-none outline-none text-sm font-mono leading-relaxed"
            spellCheck={false}
          />
        </div>

        <div className="card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-[var(--border)]">
            <span className="text-xs font-semibold text-muted">OUTPUT</span>
            {output && output !== "Valid JSON" && (
              <button onClick={handleCopy} className="text-xs text-[#8b0000] hover:text-[#a00000] font-medium flex items-center gap-1">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
                {copied ? "Copied!" : "Copy"}
              </button>
            )}
          </div>
          <textarea
            value={error ? `Error: ${error}` : output}
            readOnly
            className={`w-full h-72 p-4 bg-transparent resize-none outline-none text-sm font-mono leading-relaxed ${error ? "text-red-500" : "text-[var(--foreground)]"}`}
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
