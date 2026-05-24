import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Toolup",
  description: "Toolup terms of service. Read our acceptable use policy and disclaimer of warranties.",
};

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 animate-fade-in">
      <h1 className="text-4xl font-bold text-[var(--foreground)] mb-2">Terms of Service</h1>
      <p className="text-sm text-muted mb-10">Last updated: January 1, 2025</p>

      <div className="space-y-8">
        {[
          {
            title: "1. Acceptance of Terms",
            content: "By accessing and using Toolup (toolup.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use this website.",
          },
          {
            title: "2. Description of Service",
            content: "Toolup provides free, browser-based tools including image compression, image resizing, watermark addition, word counting, JSON formatting, QR code generation, and password generation. All tools operate locally in your browser.",
          },
          {
            title: "3. Acceptable Use",
            content: "You agree to use Toolup only for lawful purposes. You may not use this service to process content that is illegal, infringes on intellectual property rights, or violates any applicable laws. You are solely responsible for the content you process using our tools.",
          },
          {
            title: "4. Intellectual Property",
            content: "The Toolup brand, logo, design, and source code are the property of Toolup. You may not copy, reproduce, or distribute any part of the service without express written permission.",
          },
          {
            title: "5. Disclaimer of Warranties",
            content: "Toolup is provided 'as is' and 'as available' without warranties of any kind, express or implied. We do not warrant that the service will be uninterrupted, error-free, or free from viruses or other harmful components.",
          },
          {
            title: "6. Limitation of Liability",
            content: "To the maximum extent permitted by law, Toolup and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, including loss of data, profits, or goodwill.",
          },
          {
            title: "7. Privacy",
            content: "Your use of Toolup is also governed by our Privacy Policy, which is incorporated into these Terms by reference.",
          },
          {
            title: "8. Changes to Terms",
            content: "We reserve the right to modify these Terms at any time. Changes will be posted on this page. Continued use of the service after changes constitutes acceptance of the new Terms.",
          },
          {
            title: "9. Governing Law",
            content: "These Terms shall be governed by applicable law. Any disputes shall be resolved in the appropriate courts.",
          },
          {
            title: "10. Contact",
            content: "For questions about these Terms, contact us at toolup.support@gmail.com.",
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
