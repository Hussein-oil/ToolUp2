import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Toolup Works — Privacy-First Online Tools",
  description: "Learn how Toolup's browser-based tools work locally on your device. No uploads, no tracking — your files never leave your browser.",
};

export default function HowItWorksPage() {
  const steps = [
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="14" x="2" y="3" rx="2" /><path d="M8 21h8M12 17v4" />
        </svg>
      ),
      title: "Open a Tool",
      description: "Navigate to any tool on Toolup. No account, login, or sign-up required. Just open the page and start.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />
        </svg>
      ),
      title: "Add Your File or Data",
      description: "Upload an image, paste text, or enter data directly. Your input stays in your browser — nothing is sent to a server.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
      title: "Processing Happens Locally",
      description: "All operations use browser APIs: Canvas API for images, JavaScript for text and JSON, Web Crypto for passwords. Fast and private.",
    },
    {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      ),
      title: "Download Your Result",
      description: "Download your processed file or copy the output directly. No waiting for server responses — results are instant.",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">How Toolup Works</h1>
      <p className="text-lg text-muted mb-12">
        Every Toolup tool runs entirely in your browser. No server processing, no file uploads, no privacy risks.
      </p>

      <div className="space-y-6 mb-12">
        {steps.map((step, i) => (
          <div key={i} className="card flex gap-5">
            <div className="w-14 h-14 rounded-xl bg-[#8b0000]/10 text-[#8b0000] flex items-center justify-center shrink-0">
              {step.icon}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#8b0000] uppercase tracking-wider">Step {i + 1}</span>
              </div>
              <h2 className="text-lg font-bold text-[var(--foreground)] mb-1">{step.title}</h2>
              <p className="text-muted text-sm leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card bg-[#8b0000]/5 border-[#8b0000]/20">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why Browser-Based Processing?</h2>
        <div className="space-y-3 text-sm text-muted">
          <p><strong className="text-[var(--foreground)]">Privacy:</strong> Your files and data never leave your device. There is no server that could be hacked, leaked, or monetized.</p>
          <p><strong className="text-[var(--foreground)]">Speed:</strong> Local processing eliminates upload/download time and server queue delays. Results are often instant.</p>
          <p><strong className="text-[var(--foreground)]">Free:</strong> Server processing costs money. By using your device, we eliminate server costs and can offer all tools completely free.</p>
          <p><strong className="text-[var(--foreground)]">Offline:</strong> Many tools work even without an internet connection once the page is loaded.</p>
        </div>
      </div>
    </div>
  );
}
