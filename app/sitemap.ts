import { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://toolup.com";
const locales = ["en", "ar", "fr", "es"];

const pages = [
  "",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/how-it-works",
  "/blog",
  "/tools/image-compressor",
  "/tools/image-resizer",
  "/tools/watermark-adder",
  "/tools/word-counter",
  "/tools/json-formatter",
  "/tools/qr-generator",
  "/tools/password-generator",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : "weekly",
        priority: page === "" ? 1.0 : page.startsWith("/tools") ? 0.8 : 0.6,
      });
    }
  }

  return entries;
}
