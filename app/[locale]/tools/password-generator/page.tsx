import type { Metadata } from "next";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import PasswordGenerator from "@/components/tools/PasswordGenerator";

export const metadata: Metadata = {
  title: "Free Password Generator Online | Toolup",
  description:
    "Generate strong, secure passwords with custom length and character types. Shows password strength. No uploads — runs entirely in your browser.",
};

export default function PasswordGeneratorPage({ params }: { params: { locale: string } }) {
  return (
    <ToolPageLayout
      locale={params.locale}
      toolName="Password Generator"
      toolDescription="Create strong, random passwords with custom length and character sets. See the strength rating instantly. Generate multiple passwords at once."
      steps={[
        { title: "Set password length", description: "Drag the slider to choose a length between 4 and 64 characters. 16+ is recommended." },
        { title: "Choose character types", description: "Toggle uppercase, lowercase, numbers, and symbols to include in your password." },
        { title: "Set count (optional)", description: "Use the count slider to generate multiple passwords at once (up to 10)." },
        { title: "Generate and copy", description: "Click Generate to create passwords, then click the copy icon next to any password to copy it." },
      ]}
      faqs={[
        { q: "Are these passwords truly random?", a: "Yes. Passwords are generated using the Web Crypto API (crypto.getRandomValues), which is cryptographically secure." },
        { q: "What is a strong password?", a: "A strong password is at least 12 characters long, contains uppercase, lowercase, numbers, and symbols, and is not a common word or phrase." },
        { q: "Are my generated passwords saved anywhere?", a: "No. Passwords are generated and displayed only in your browser. They are never stored or transmitted." },
        { q: "What does the strength indicator mean?", a: "Strength is rated as Weak, Fair, Strong, or Very Strong based on length and character variety." },
        { q: "Can I use these passwords for any account?", a: "Yes. Use a unique password for every account. We also recommend storing them in a password manager." },
      ]}
      relatedTools={[
        { name: "QR Code Generator", href: `/${params.locale}/tools/qr-generator` },
        { name: "Word Counter", href: `/${params.locale}/tools/word-counter` },
        { name: "JSON Formatter", href: `/${params.locale}/tools/json-formatter` },
      ]}
    >
      <PasswordGenerator />
    </ToolPageLayout>
  );
}
