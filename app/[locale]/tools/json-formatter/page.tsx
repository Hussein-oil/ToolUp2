import type { Metadata } from "next";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import JsonFormatter from "@/components/tools/JsonFormatter";

export const metadata: Metadata = {
  title: "Free JSON Formatter & Validator Online | Toolup",
  description:
    "Format, prettify, minify, and validate JSON data instantly for free. No uploads — runs entirely in your browser. Copy formatted output with one click.",
};

export default function JsonFormatterPage({ params }: { params: { locale: string } }) {
  return (
    <ToolPageLayout
      locale={params.locale}
      toolName="JSON Formatter"
      toolDescription="Format and prettify JSON for readability, or minify it to save space. Validate JSON instantly and copy the result with one click."
      steps={[
        { title: "Paste your JSON", description: "Paste your JSON data into the input area on the left." },
        { title: "Choose an action", description: "Click Format/Prettify to make it readable, Minify to compress it, or Validate to check for errors." },
        { title: "Review output", description: "The formatted or minified JSON appears on the right. Errors are shown in red." },
        { title: "Copy the result", description: "Click the Copy button to copy the output to your clipboard." },
      ]}
      faqs={[
        { q: "Is my JSON data sent to a server?", a: "No. All formatting and validation runs in your browser using native JavaScript. Nothing is sent anywhere." },
        { q: "What does 'Minify' do?", a: "Minify removes all whitespace and line breaks, making the JSON as compact as possible — useful for APIs and storage." },
        { q: "What does 'Validate' do?", a: "Validate checks if your JSON is syntactically correct. If there is an error, it shows the exact error message." },
        { q: "Is there a size limit for JSON input?", a: "No hard limit — it depends on your browser's available memory." },
        { q: "Can I format JSON with comments?", a: "Standard JSON does not support comments. If your JSON has comments, it will fail validation." },
      ]}
      relatedTools={[
        { name: "Word Counter", href: `/${params.locale}/tools/word-counter` },
        { name: "Password Generator", href: `/${params.locale}/tools/password-generator` },
        { name: "QR Code Generator", href: `/${params.locale}/tools/qr-generator` },
      ]}
    >
      <JsonFormatter />
    </ToolPageLayout>
  );
}
