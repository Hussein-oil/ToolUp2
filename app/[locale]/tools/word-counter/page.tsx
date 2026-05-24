import type { Metadata } from "next";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import WordCounter from "@/components/tools/WordCounter";

export const metadata: Metadata = {
  title: "Free Word Counter Online | Toolup",
  description:
    "Count words, characters, sentences, paragraphs, and reading time instantly. Free online word counter — works in real-time, no uploads needed.",
};

export default function WordCounterPage({ params }: { params: { locale: string } }) {
  return (
    <ToolPageLayout
      locale={params.locale}
      toolName="Word Counter"
      toolDescription="Count words, characters, sentences, and paragraphs in real-time. Also estimates reading time. Paste any text and get instant results."
      steps={[
        { title: "Paste or type your text", description: "Click inside the text area and paste or type the text you want to analyze." },
        { title: "View real-time stats", description: "Word count, character count, sentences, paragraphs, and reading time update as you type." },
        { title: "Copy or clear", description: "Use the Copy button to copy your text, or Clear to start fresh." },
      ]}
      faqs={[
        { q: "How is reading time calculated?", a: "Reading time is based on the average adult reading speed of 200 words per minute." },
        { q: "Is there a word or character limit?", a: "No. You can paste as much text as your browser can handle." },
        { q: "Does this tool save my text?", a: "No. The text is only stored locally in your browser and never sent to any server." },
        { q: "How are sentences counted?", a: "Sentences are counted by detecting sentence-ending punctuation: periods, exclamation marks, and question marks." },
        { q: "What counts as a paragraph?", a: "A paragraph is counted as a block of text separated by one or more blank lines." },
      ]}
      relatedTools={[
        { name: "JSON Formatter", href: `/${params.locale}/tools/json-formatter` },
        { name: "Password Generator", href: `/${params.locale}/tools/password-generator` },
        { name: "QR Code Generator", href: `/${params.locale}/tools/qr-generator` },
      ]}
    >
      <WordCounter />
    </ToolPageLayout>
  );
}
