import type { Metadata } from "next";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import ImageResizer from "@/components/tools/ImageResizer";

export const metadata: Metadata = {
  title: "Free Image Resizer Online | Toolup",
  description:
    "Resize images to any width and height for free. Lock aspect ratio, preview before download. Works entirely in your browser — no uploads.",
};

export default function ImageResizerPage({ params }: { params: { locale: string } }) {
  return (
    <ToolPageLayout
      locale={params.locale}
      toolName="Image Resizer"
      toolDescription="Resize any image to exact dimensions. Lock the aspect ratio to prevent distortion. Preview your result before downloading."
      steps={[
        { title: "Upload your image", description: "Click the upload area to select an image from your device." },
        { title: "Enter dimensions", description: "Type the desired width and height in pixels." },
        { title: "Lock aspect ratio (optional)", description: "Enable the aspect ratio lock to keep proportions when you change one dimension." },
        { title: "Resize and download", description: "Click 'Resize Image' to process, then download the result." },
      ]}
      faqs={[
        { q: "Does this tool upload my image?", a: "No. Everything runs in your browser using the Canvas API. Your images stay on your device." },
        { q: "What formats can I resize?", a: "Any common image format your browser supports — JPG, PNG, WEBP, GIF, BMP, etc." },
        { q: "What does 'Lock aspect ratio' do?", a: "It automatically adjusts the other dimension when you change width or height, so your image doesn't get stretched." },
        { q: "Will resizing reduce quality?", a: "Enlarging images beyond their original size may reduce sharpness. Reducing size generally keeps quality well." },
      ]}
      relatedTools={[
        { name: "Bulk Image Compressor", href: `/${params.locale}/tools/image-compressor` },
        { name: "Watermark Adder", href: `/${params.locale}/tools/watermark-adder` },
        { name: "QR Code Generator", href: `/${params.locale}/tools/qr-generator` },
      ]}
    >
      <ImageResizer />
    </ToolPageLayout>
  );
}
