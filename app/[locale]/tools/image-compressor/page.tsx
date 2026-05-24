import type { Metadata } from "next";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ImageCompressor from "@/components/tools/ImageCompressor";

export const metadata: Metadata = {
  title: "Free Bulk Image Compressor Online | Toolup",
  description:
    "Compress multiple JPG, PNG, and WEBP images at once for free. Reduce file size without losing quality. Works locally — no uploads needed.",
};

export default function ImageCompressorPage({ params }: { params: { locale: string } }) {
  return (
    <ToolPageLayout
      locale={params.locale}
      toolName="Bulk Image Compressor"
      toolDescription="Compress multiple JPG, PNG, and WEBP images at once. Reduce file size while keeping great quality — all processed locally in your browser."
      steps={[
        { title: "Set compression quality", description: "Drag the quality slider to choose the balance between file size and image quality." },
        { title: "Upload your images", description: "Drag and drop multiple images onto the upload area, or click to browse your files." },
        { title: "Review results", description: "Each image shows the original size, compressed size, and percentage saved." },
        { title: "Download", description: "Download individual images or click 'Download All (ZIP)' to get everything at once." },
      ]}
      faqs={[
        { q: "Are my images uploaded to a server?", a: "No. All compression happens entirely in your browser using the Canvas API. Your images never leave your device." },
        { q: "What image formats are supported?", a: "JPG, PNG, and WEBP formats are supported for compression." },
        { q: "What quality setting should I use?", a: "For web use, 70–80% quality gives a great balance of size and quality. For printing, use 90%+." },
        { q: "Is there a file size or count limit?", a: "There is no hard limit, but very large files may take longer to process depending on your device." },
        { q: "Can I compress animated images?", a: "Animated images (GIFs) are not supported. The tool works best with static JPG, PNG, and WEBP files." },
      ]}
      relatedTools={[
        { name: "Image Resizer", href: `/${params.locale}/tools/image-resizer` },
        { name: "Watermark Adder", href: `/${params.locale}/tools/watermark-adder` },
        { name: "QR Code Generator", href: `/${params.locale}/tools/qr-generator` },
      ]}
    >
      <ImageCompressor />
    </ToolPageLayout>
  );
}
