import type { Metadata } from "next";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import QrGenerator from "@/components/tools/QrGenerator";

export const metadata: Metadata = {
  title: "Free QR Code Generator Online | Toolup",
  description:
    "Generate custom QR codes for any URL or text for free. Choose size, colors, and download as PNG. No sign-up, no uploads — runs in your browser.",
};

export default function QrGeneratorPage({ params }: { params: { locale: string } }) {
  return (
    <ToolPageLayout
      locale={params.locale}
      toolName="QR Code Generator"
      toolDescription="Generate custom QR codes for any URL, text, or data. Choose size and colors, preview instantly, and download as a PNG file."
      steps={[
        { title: "Enter your text or URL", description: "Type or paste the text, URL, or data you want to encode into the QR code." },
        { title: "Customize the QR code", description: "Select the size and choose foreground and background colors to match your brand." },
        { title: "Generate", description: "Click 'Generate QR Code' to create your QR code and see the preview." },
        { title: "Download", description: "Click 'Download PNG' to save the QR code image to your device." },
      ]}
      faqs={[
        { q: "Is there a limit to what I can encode?", a: "QR codes can encode URLs, text, phone numbers, email addresses, and more. Very long strings may reduce scannability." },
        { q: "What resolution is the downloaded QR code?", a: "The downloaded PNG matches the size you selected: 128, 256, 384, or 512 pixels." },
        { q: "Can the QR code be scanned by all phones?", a: "Yes. The generated QR codes follow the standard QR Code format and are compatible with all modern phone cameras and QR scanner apps." },
        { q: "Does this save my data?", a: "No. QR generation happens entirely in your browser. Your data is never sent to a server." },
        { q: "Can I change colors?", a: "Yes! You can pick any foreground (dark) and background (light) color using the color pickers." },
      ]}
      relatedTools={[
        { name: "Password Generator", href: `/${params.locale}/tools/password-generator` },
        { name: "Word Counter", href: `/${params.locale}/tools/word-counter` },
        { name: "JSON Formatter", href: `/${params.locale}/tools/json-formatter` },
      ]}
    >
      <QrGenerator />
    </ToolPageLayout>
  );
}
