import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Complete Guide to Image Compression for the Web in 2025 | Toolup Blog",
  description:
    "Large images are one of the biggest causes of slow websites. Learn what image compression is, which formats to use, and how to find the right quality-to-size balance.",
  openGraph: {
    type: "article",
    title: "The Complete Guide to Image Compression for the Web in 2025",
    description:
      "Large images are one of the biggest causes of slow websites. Learn what image compression is, which formats to use, and how to find the right quality-to-size balance.",
  },
};

export default function ArticlePage({ params }: { params: { locale: string } }) {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 animate-fade-in">
      {/* Back link */}
      <Link
        href={`/${params.locale}/blog`}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-[#8b0000] transition-colors mb-8"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Blog
      </Link>

      {/* Article header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#8b0000]/10 text-[#8b0000]">
            Image Tools
          </span>
          <span className="text-xs text-muted">January 8, 2025</span>
          <span className="text-xs text-muted">·</span>
          <span className="text-xs text-muted">7 min read</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight mb-4">
          The Complete Guide to Image Compression for the Web in 2025
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          Large images are one of the biggest causes of slow websites. Learn what image compression is,
          which formats to use, and how to find the right quality-to-size balance for your specific needs.
        </p>
      </header>

      {/* Article body */}
      <article className="space-y-8 text-[var(--foreground)]">

        <section>
          <h2 className="text-2xl font-bold mb-3">Why Image Size Matters More Than You Think</h2>
          <p className="text-muted leading-relaxed mb-4">
            According to HTTP Archive data, images account for roughly 50% of the total bytes transferred
            on the average web page. A single unoptimized photograph can easily be 4–8 MB — enough to
            make your page load several seconds slower on a mobile connection.
          </p>
          <p className="text-muted leading-relaxed">
            Google's Core Web Vitals — the performance metrics that directly affect search ranking —
            are heavily influenced by how quickly images load. Largest Contentful Paint (LCP), which
            measures when the main content appears on screen, is almost always triggered by an image.
            Optimizing your images is therefore not just a user experience issue; it is an SEO issue too.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">What Is Image Compression?</h2>
          <p className="text-muted leading-relaxed mb-4">
            Image compression reduces file size by encoding image data more efficiently. There are two
            fundamental types:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card">
              <h3 className="font-bold text-[var(--foreground)] mb-2">Lossless Compression</h3>
              <p className="text-sm text-muted leading-relaxed">
                Reduces file size without discarding any image data. The decompressed image is
                pixel-perfect identical to the original. Best for logos, screenshots, and graphics
                with text. Typical savings: 10–30%.
              </p>
            </div>
            <div className="card">
              <h3 className="font-bold text-[var(--foreground)] mb-2">Lossy Compression</h3>
              <p className="text-sm text-muted leading-relaxed">
                Permanently removes some image data to achieve much higher compression ratios.
                The result looks nearly identical at moderate quality settings. Best for photos.
                Typical savings: 40–85%.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Image Formats Explained</h2>
          <p className="text-muted leading-relaxed mb-4">
            Choosing the right format is as important as compression settings. Here is a breakdown
            of every format you will encounter in 2025:
          </p>
          <div className="space-y-4">
            {[
              {
                format: "JPEG / JPG",
                type: "Lossy",
                best: "Photographs, complex images with gradients",
                avoid: "Images with transparent areas, logos with sharp edges",
                notes: "The default for photos for 30 years. Quality 75–85 is the sweet spot for web use. Universally supported.",
              },
              {
                format: "PNG",
                type: "Lossless",
                best: "Logos, icons, screenshots, images requiring transparency",
                avoid: "Full-resolution photographs (file sizes will be very large)",
                notes: "The only widely supported format with true full-transparency (alpha channel). Use for UI elements, not photos.",
              },
              {
                format: "WebP",
                type: "Both",
                best: "Any web image — especially photos with transparency",
                avoid: "When you need broad software compatibility outside browsers",
                notes: "Google's format. 25–35% smaller than JPEG at equivalent quality. Supports transparency (unlike JPEG). Supported by all modern browsers.",
              },
              {
                format: "AVIF",
                type: "Both",
                best: "High-quality photos where maximum compression is needed",
                avoid: "When encoding speed matters or broad compatibility is required",
                notes: "The newest format. 50% smaller than JPEG at equivalent quality. Browser support is excellent but encoding is slow.",
              },
              {
                format: "SVG",
                type: "Vector",
                best: "Logos, icons, illustrations, charts",
                avoid: "Photographs — SVG cannot represent photographic detail",
                notes: "Scalable vector graphics. File size is often tiny and the image is perfectly sharp at any size.",
              },
            ].map(({ format, type, best, avoid, notes }) => (
              <div key={format} className="card">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold text-[var(--foreground)]">{format}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${type === "Lossy" ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" : type === "Lossless" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"}`}>
                    {type}
                  </span>
                </div>
                <p className="text-xs text-muted mb-1"><strong className="text-[var(--foreground)]">Best for:</strong> {best}</p>
                <p className="text-xs text-muted mb-1"><strong className="text-[var(--foreground)]">Avoid for:</strong> {avoid}</p>
                <p className="text-xs text-muted">{notes}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Choosing the Right Quality Setting</h2>
          <p className="text-muted leading-relaxed mb-4">
            For lossy formats, the quality setting is the single biggest lever you have. Here is
            a practical guide based on use case:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-start py-2 pr-4 font-semibold text-[var(--foreground)]">Quality</th>
                  <th className="text-start py-2 pr-4 font-semibold text-[var(--foreground)]">Best For</th>
                  <th className="text-start py-2 font-semibold text-[var(--foreground)]">Notes</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                {[
                  ["90–100%", "Print, archival, professional photography", "Minimal size benefit. Use only when pixel-perfect quality is required."],
                  ["80–90%", "High-quality web display, portfolio sites", "Near-lossless to the human eye. Good for hero images and feature photos."],
                  ["70–80%", "General web use, blog photos, product images", "The sweet spot. Significant size reduction with barely visible quality loss."],
                  ["50–70%", "Thumbnails, small previews, social sharing", "Noticeable at full size but fine for small display sizes."],
                  ["Below 50%", "Extreme compression, placeholders", "Visible artifacts. Avoid for primary content."],
                ].map(([q, use, note], i) => (
                  <tr key={i} className="border-b border-[var(--border)] last:border-0">
                    <td className="py-2.5 pr-4 font-mono font-semibold text-[#8b0000]">{q}</td>
                    <td className="py-2.5 pr-4">{use}</td>
                    <td className="py-2.5">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Resize Before You Compress</h2>
          <p className="text-muted leading-relaxed mb-4">
            One of the most common mistakes is compressing a 4000×3000 pixel image and then
            displaying it in a 400×300 container. The browser downloads all 12 megapixels and
            discards 90% of them. This wastes bandwidth and slows your page down dramatically.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            Always resize your image to the maximum size it will be displayed before compressing.
            If your website design shows images at a maximum width of 800px, export your image
            at 800px wide (or 1600px for Retina/HiDPI screens — 2× display density).
          </p>
          <div className="card bg-[#8b0000]/5 border-[#8b0000]/20">
            <p className="text-sm text-muted">
              <strong className="text-[var(--foreground)]">Example:</strong> A 4000×3000 photo at 85% JPEG quality is about 3.5 MB.
              The same image resized to 1200×900 and compressed to 75% quality is about 120 KB —
              a <strong className="text-[var(--foreground)]">97% reduction</strong> with no visible quality difference in a typical web context.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">A Practical Compression Workflow</h2>
          <ol className="space-y-4 text-muted">
            {[
              { title: "Determine the display size", detail: "Check your website's CSS to find the maximum width the image will be shown at. Use browser DevTools to inspect the rendered image element." },
              { title: "Resize to 1× and 2× versions", detail: "Create one version at the exact display width (for standard screens) and one at 2× (for Retina). Use srcset in HTML to serve the right version." },
              { title: "Choose the right format", detail: "Use WebP for photos. Use PNG only for images that need transparency and have flat colors. Convert older JPEGs to WebP for immediate size savings." },
              { title: "Compress with the right quality", detail: "Start at 80% quality for photos. Lower it until you see visible artifacts, then go one step back. For most images, 70–80% is the optimal range." },
              { title: "Audit regularly", detail: "Run Google PageSpeed Insights or Lighthouse on your site periodically. The 'Serve images in next-gen formats' and 'Properly size images' recommendations are the most impactful to fix." },
            ].map(({ title, detail }, i) => (
              <li key={i} className="flex gap-4">
                <span className="w-7 h-7 rounded-full bg-[#8b0000] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <div>
                  <p className="font-semibold text-[var(--foreground)] mb-1">{title}</p>
                  <p className="text-sm">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Compressing Images Without Uploading Them</h2>
          <p className="text-muted leading-relaxed mb-4">
            Most image compression tools work by uploading your files to a server, compressing them,
            and returning the result. This is slow (your files must travel the network twice) and
            potentially private — the server now has a copy of your images.
          </p>
          <p className="text-muted leading-relaxed mb-4">
            Toolup's image compressor works entirely in your browser. It uses the Canvas API to
            re-encode your image at the quality level you choose, producing a compressed file without
            ever sending your image anywhere. This means:
          </p>
          <ul className="space-y-2 text-muted">
            {[
              "Compression is instant — no upload time",
              "Your images remain completely private",
              "You can compress hundreds of images in bulk",
              "Results are downloaded directly as a ZIP",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-[#8b0000] shrink-0">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3">Summary: The Rules of Image Compression</h2>
          <div className="card space-y-3">
            {[
              "Resize images to their actual display size before compressing.",
              "Use WebP for photos — it outperforms JPEG in both quality and file size.",
              "Use PNG only when you need transparency with flat colors or text.",
              "70–80% JPEG/WebP quality is the sweet spot for most web use cases.",
              "Use srcset to serve Retina-appropriate sizes without over-serving standard screens.",
              "Audit your site regularly with Lighthouse or PageSpeed Insights.",
              "Use browser-based tools to protect the privacy of images you are optimizing.",
            ].map((rule, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="w-5 h-5 rounded-full bg-[#8b0000]/10 text-[#8b0000] text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <span className="text-muted">{rule}</span>
              </div>
            ))}
          </div>
        </section>

      </article>

      {/* Related Tools */}
      <section className="mt-12 pt-8 border-t border-[var(--border)]">
        <h2 className="text-xl font-bold text-[var(--foreground)] mb-4">Try These Image Tools</h2>
        <div className="flex flex-wrap gap-3">
          {[
            { name: "Bulk Image Compressor", path: "image-compressor" },
            { name: "Image Resizer", path: "image-resizer" },
            { name: "Watermark Adder", path: "watermark-adder" },
          ].map((tool) => (
            <Link
              key={tool.path}
              href={`/${params.locale}/tools/${tool.path}`}
              className="px-4 py-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] text-sm font-medium text-[var(--foreground)] hover:text-[#8b0000] hover:border-[#8b0000]/30 transition-colors"
            >
              {tool.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
