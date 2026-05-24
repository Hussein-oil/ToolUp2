import Link from "next/link";
import Breadcrumb from "./Breadcrumb";

interface FAQ {
  q: string;
  a: string;
}

interface Step {
  title: string;
  description: string;
}

interface RelatedTool {
  name: string;
  href: string;
}

interface ToolPageLayoutProps {
  locale: string;
  toolName: string;
  toolDescription: string;
  children: React.ReactNode;
  steps: Step[];
  faqs: FAQ[];
  relatedTools: RelatedTool[];
}

export default function ToolPageLayout({
  locale,
  toolName,
  toolDescription,
  children,
  steps,
  faqs,
  relatedTools,
}: ToolPageLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      <Breadcrumb
        crumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Tools", href: `/${locale}` },
          { label: toolName },
        ]}
      />

      {/* Tool Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[var(--foreground)] mb-2">{toolName}</h1>
        <p className="text-muted text-lg">{toolDescription}</p>
      </div>

      {/* Tool Interface */}
      <div className="mb-12">{children}</div>

      {/* How to Use */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">How to Use</h2>
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className="w-8 h-8 rounded-full bg-[#8b0000] text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <p className="font-semibold text-[var(--foreground)]">{step.title}</p>
                <p className="text-sm text-muted mt-1">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="card">
              <h3 className="font-semibold text-[var(--foreground)] mb-2">{faq.q}</h3>
              <p className="text-sm text-muted">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6">Related Tools</h2>
        <div className="flex flex-wrap gap-3">
          {relatedTools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--foreground)] hover:text-[#8b0000] hover:border-[#8b0000]/30 transition-colors"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
