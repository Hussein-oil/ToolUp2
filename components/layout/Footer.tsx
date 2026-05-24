"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const links = [
    { href: `/${locale}/privacy-policy`, label: t("privacyPolicy") },
    { href: `/${locale}/terms-of-service`, label: t("termsOfService") },
    { href: `/${locale}/contact`, label: t("contact") },
    { href: `/${locale}/blog`, label: t("blog") },
  ];

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#8b0000" />
            <path d="M8 10h16M8 16h10M8 22h13" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <span className="text-sm text-muted">{t("copyright")}</span>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-4 gap-y-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-[#8b0000] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={`mailto:${t("email")}`}
          className="text-sm text-muted hover:text-[#8b0000] transition-colors flex items-center gap-1.5"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          {t("email")}
        </a>
      </div>
    </footer>
  );
}
