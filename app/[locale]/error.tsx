"use client";

import { useEffect } from "react";
import Button from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4 text-center">
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-muted">
        <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
      </svg>
      <div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Something went wrong</h2>
        <p className="text-muted text-sm">An unexpected error occurred. Please try again.</p>
      </div>
      <Button onClick={reset}>Try Again</Button>
    </div>
  );
}
