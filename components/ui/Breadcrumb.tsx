import Link from "next/link";

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-muted mb-6" aria-label="Breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          )}
          {crumb.href ? (
            <Link href={crumb.href} className="hover:text-[#8b0000] transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-[var(--foreground)] font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
