import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Toolup",
  description: "Get in touch with the Toolup team. We respond to all emails within 48 hours.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Contact Us</h1>
      <p className="text-lg text-muted mb-10">We would love to hear from you.</p>

      <div className="space-y-6">
        <div className="card">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Get in Touch</h2>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-[var(--background)]">
            <div className="w-10 h-10 rounded-full bg-[#8b0000]/10 flex items-center justify-center text-[#8b0000]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-muted">Email</p>
              <a href="mailto:toolup.support@gmail.com" className="text-[#8b0000] font-semibold hover:underline">
                toolup.support@gmail.com
              </a>
            </div>
          </div>
          <p className="text-sm text-muted mt-4">
            We typically respond within 48 hours. For bug reports, please describe the issue and your browser/OS.
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">What to Contact Us About</h2>
          <ul className="space-y-2 text-sm text-muted">
            {[
              "Bug reports and unexpected behavior",
              "Feature requests and tool suggestions",
              "Privacy or data questions",
              "Partnership and advertising inquiries",
              "General feedback",
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#8b0000] shrink-0">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
