import type { Metadata } from "next";
import ToolPageLayout from "@/components/ui/ToolPageLayout";
import WatermarkAdder from "@/components/tools/WatermarkAdder";

export const metadata: Metadata = {
  title: "Free Watermark Adder Online | Toolup",
  description:
    "Add custom text watermarks to images for free. Choose position, font size, opacity, and color. Real-time preview. Works locally in your browser.",
};

export default function WatermarkAdderPage({ params }: { params: { locale: string } }) {
  return (
    <ToolPageLayout
      locale={params.locale}
      toolName="Watermark Adder"
      toolDescription="Add custom text watermarks to your images. Control the position, font size, opacity, and color. Preview in real-time before downloading."
      steps={[
        { title: "Upload your image", description: "Click the upload area to select the image you want to watermark." },
        { title: "Enter watermark text", description: "Type your desired watermark text, such as your name, website, or copyright notice." },
        { title: "Customize appearance", description: "Choose a position from the 9-point grid, adjust font size, opacity, and color." },
        { title: "Apply and download", description: "Click 'Apply Watermark' to see the result, then download the watermarked image." },
      ]}
      faqs={[
        { q: "Is my image uploaded to any server?", a: "No. All processing uses the Canvas API entirely in your browser. Your images never leave your device." },
        { q: "Can I add a logo or image watermark?", a: "Currently, only text watermarks are supported. Image watermark support may be added in the future." },
        { q: "What opacity level should I use?", a: "50–70% opacity is a good balance — visible enough to protect the image but not too distracting." },
        { q: "Will the watermark affect image quality?", a: "The download uses high-quality JPEG encoding (92%), so quality loss is minimal." },
        { q: "Can I choose a transparent background?", a: "The watermark text itself can be made semi-transparent using the opacity slider." },
      ]}
      relatedTools={[
        { name: "Bulk Image Compressor", href: `/${params.locale}/tools/image-compressor` },
        { name: "Image Resizer", href: `/${params.locale}/tools/image-resizer` },
        { name: "QR Code Generator", href: `/${params.locale}/tools/qr-generator` },
      ]}
    >
      <WatermarkAdder />
    </ToolPageLayout>
  );
}
