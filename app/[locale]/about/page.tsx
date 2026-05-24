import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Toolup — Free Online Tools",
  description: "Learn about Toolup — our mission to provide free, private, and fast online tools that work locally in your browser.",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">About Toolup</h1>
      <p className="text-lg text-muted mb-10">A collection of free, private, and fast tools for everyone.</p>

      <div className="space-y-8">
        <section className="card">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">What is Toolup?</h2>
          <p className="text-muted leading-relaxed">
            Toolup is a free online toolbox that lets you compress images, resize photos, add watermarks, count words,
            format JSON, generate QR codes, and create strong passwords — all without registering or uploading your files anywhere.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Our Mission</h2>
          <p className="text-muted leading-relaxed">
            We believe that useful tools should be free, fast, and private. Most online tools require you to upload your files
            to remote servers, creating privacy risks and slow processing times. Toolup processes everything locally in your
            browser — your data never leaves your device.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Why We Built It</h2>
          <p className="text-muted leading-relaxed">
            We were tired of paying for simple tools, waiting for files to upload, and wondering where our data was being stored.
            So we built Toolup: a clean, fast, ad-free experience where every tool works instantly, privately, and for free.
          </p>
        </section>

        <section className="card">
          <h2 className="text-xl font-bold text-[var(--foreground)] mb-3">Contact Us</h2>
          <p className="text-muted leading-relaxed">
            Have a suggestion or found a bug? We would love to hear from you.
          </p>
          <a href="mailto:toolup.support@gmail.com" className="text-[#8b0000] hover:underline font-medium mt-2 inline-block">
            toolup.support@gmail.com
          </a>
        </section>
      </div>
    </div>
  );
}
