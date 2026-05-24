import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog | Toolup — Tips, Guides & Privacy News",
  description: "Toolup blog — tips for using free online tools, privacy guides, and productivity articles.",
};

const articles = [
  {
    slug: "why-browser-tools-are-more-private",
    title: "Why Browser-Based Tools Are More Private Than Cloud Services",
    date: "January 15, 2025",
    readTime: "5 min read",
    excerpt:
      "When you use an online tool that processes your files on a server, you are trusting a third party with your data. Here is why local, browser-based tools are safer and what to look for.",
    tag: "Privacy",
  },
  {
    slug: "image-compression-guide-2025",
    title: "The Complete Guide to Image Compression for the Web in 2025",
    date: "January 8, 2025",
    readTime: "7 min read",
    excerpt:
      "Large images are one of the biggest causes of slow websites. Learn what image compression is, which formats to use, and how to find the right quality-to-size balance for your needs.",
    tag: "Image Tools",
  },
];

export default function BlogPage({ params }: { params: { locale: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-4">Blog</h1>
      <p className="text-lg text-muted mb-10">
        Tips, guides, and insights about privacy, tools, and productivity.
      </p>

      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.slug} className="card hover:scale-[1.01] hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#8b0000]/10 text-[#8b0000]">
                {article.tag}
              </span>
              <span className="text-xs text-muted">{article.date}</span>
              <span className="text-xs text-muted">·</span>
              <span className="text-xs text-muted">{article.readTime}</span>
            </div>
            <Link href={`/${params.locale}/blog/${article.slug}`}>
              <h2 className="text-xl font-bold text-[var(--foreground)] mb-2 hover:text-[#8b0000] transition-colors">
                {article.title}
              </h2>
            </Link>
            <p className="text-sm text-muted leading-relaxed mb-4">{article.excerpt}</p>
            <Link
              href={`/${params.locale}/blog/${article.slug}`}
              className="text-sm font-semibold text-[#8b0000] inline-flex items-center gap-1 hover:text-[#a00000] transition-colors"
            >
              Read more
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </article>
        ))}
      </div>

      <div className="mt-12 card text-center">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-2">More articles coming soon</h2>
        <p className="text-sm text-muted">
          We are working on more guides and tutorials. Check back later or{" "}
          <a href="mailto:toolup.support@gmail.com" className="text-[#8b0000] hover:underline">contact us</a> with topic suggestions.
        </p>
      </div>
    </div>
  );
}
