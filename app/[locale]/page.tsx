import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import ToolCard from "@/components/ui/ToolCard";
import HomeSearch from "@/components/ui/HomeSearch";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: "hero" });
  return {
    title: "Toolup — Free Online Tools",
    description: t("subtitle"),
  };
}

const toolIcons: Record<string, React.ReactNode> = {
  imageCompressor: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2" /><path d="m9 9 6 6M15 9l-6 6" />
    </svg>
  ),
  imageResizer: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
    </svg>
  ),
  watermarkAdder: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
    </svg>
  ),
  wordCounter: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 7V4h16v3M9 20h6M12 4v16" />
    </svg>
  ),
  jsonFormatter: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  ),
  qrGenerator: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="5" height="5" x="3" y="3" rx="1" /><rect width="5" height="5" x="16" y="3" rx="1" /><rect width="5" height="5" x="3" y="16" rx="1" /><path d="M21 16h-3a2 2 0 0 0-2 2v3M21 21v.01M12 7v3a2 2 0 0 1-2 2H7M3 12h.01M12 3h.01M12 16v.01M16 12h1M21 12v.01M12 21v-1" />
    </svg>
  ),
  passwordGenerator: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
};

export default function HomePage({ params }: { params: { locale: string } }) {
  const t = useTranslations();
  const locale = params.locale;

  const tools = [
    { key: "imageCompressor", path: "image-compressor" },
    { key: "imageResizer", path: "image-resizer" },
    { key: "watermarkAdder", path: "watermark-adder" },
    { key: "wordCounter", path: "word-counter" },
    { key: "jsonFormatter", path: "json-formatter" },
    { key: "qrGenerator", path: "qr-generator" },
    { key: "passwordGenerator", path: "password-generator" },
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8b0000]/10 text-[#8b0000] text-xs font-semibold mb-6">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          Free forever. No account required.
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--foreground)] mb-5 text-balance">
          {t("hero.title")}
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto mb-8 text-balance">
          {t("hero.subtitle")}
        </p>
        <HomeSearch
          placeholder={t("hero.searchPlaceholder")}
          tools={tools.map((tool) => ({
            key: tool.key,
            name: t(`tools.${tool.key}.name`),
            description: t(`tools.${tool.key}.description`),
            href: `/${locale}/tools/${tool.path}`,
          }))}
        />
      </section>

      {/* Tools Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-2xl font-bold mb-6 text-[var(--foreground)]">{t("tools.title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard
              key={tool.key}
              name={t(`tools.${tool.key}.name`)}
              description={t(`tools.${tool.key}.description`)}
              href={`/${locale}/tools/${tool.path}`}
              icon={toolIcons[tool.key]}
              ctaLabel={t("tools.useTool")}
              badge={tool.key === "imageCompressor" ? "No Limits" : undefined}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="border-t border-[var(--border)] bg-[var(--surface)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            {
              key: "free",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              ),
            },
            {
              key: "local",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="14" x="2" y="3" rx="2" /><path d="M8 21h8M12 17v4" />
                </svg>
              ),
            },
            {
              key: "noReg",
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                </svg>
              ),
            },
          ].map(({ key, icon }) => (
            <div key={key} className="flex flex-col items-center text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[#8b0000]/10 flex items-center justify-center text-[#8b0000]">
                {icon}
              </div>
              <h3 className="text-lg font-bold text-[var(--foreground)]">
                {t(`features.${key}.title`)}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {t(`features.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
