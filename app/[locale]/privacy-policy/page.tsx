import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Toolup",
  description: "Toolup privacy policy. Learn how we handle your data — spoiler: we don't collect any.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted mb-10">Last updated: January 1, 2025</p>

      <div className="prose prose-sm max-w-none space-y-8">
        {[
          {
            title: "1. Overview",
            content: "Toolup is designed with privacy as a core principle. All tools on this website process data entirely within your browser. We do not collect, store, or transmit your files, text, or any tool input to our servers.",
          },
          {
            title: "2. Data We Collect",
            content: "We collect no personal data. We do not require registration or login. We do not store any files or text you process using our tools. Basic, anonymized analytics (page views, browser type) may be collected to improve the service.",
          },
          {
            title: "3. How Your Files Are Processed",
            content: "All file processing (image compression, resizing, watermarking) happens locally in your browser using the Canvas API and JavaScript. Your files are never uploaded to our servers. This means faster processing and complete privacy.",
          },
          {
            title: "4. Cookies",
            content: "We use minimal cookies to remember your theme preference (dark/light mode) and language selection. These cookies are stored locally in your browser and do not contain personal information. We do not use tracking cookies.",
          },
          {
            title: "5. Third-Party Advertising",
            content: "We may display advertisements through Google AdSense or similar services to support the free operation of this website. These services may use cookies to serve relevant ads. You can opt out of personalized advertising through Google's Ad Settings.",
          },
          {
            title: "6. Third-Party Services",
            content: "We may use third-party analytics services (such as Google Analytics) in the future to understand how the site is used. Any such services will be listed here when added.",
          },
          {
            title: "7. Children's Privacy",
            content: "Toolup is not directed at children under 13. We do not knowingly collect information from children.",
          },
          {
            title: "8. Changes to This Policy",
            content: "We may update this Privacy Policy occasionally. Changes will be posted on this page with an updated date. Continued use of the site after changes constitutes acceptance.",
          },
          {
            title: "9. Contact",
            content: "For privacy questions, contact us at toolup.support@gmail.com.",
          },
        ].map(({ title, content }) => (
          <section key={title} className="card">
            <h2 className="text-lg font-bold text-[var(--foreground)] mb-3">{title}</h2>
            <p className="text-muted leading-relaxed">{content}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
