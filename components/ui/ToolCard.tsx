import Link from "next/link";
import { ReactNode } from "react";

interface ToolCardProps {
  name: string;
  description: string;
  href: string;
  icon: ReactNode;
  ctaLabel: string;
  badge?: string;
}

export default function ToolCard({ name, description, href, icon, ctaLabel, badge }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="group card hover:scale-[1.02] hover:shadow-lg hover:border-[#8b0000]/30 cursor-pointer animate-fade-in flex flex-col h-full gap-4 relative"
    >
      {badge && (
        <span className="absolute top-4 end-4 text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#8b0000] text-white">
          {badge}
        </span>
      )}
      <div className="w-12 h-12 rounded-xl bg-[#8b0000]/10 flex items-center justify-center text-[#8b0000] shrink-0">
        {icon}
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-lg text-[var(--foreground)] mb-1 group-hover:text-[#8b0000] transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#8b0000] group-hover:text-[#a00000] transition-colors">
        {ctaLabel}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
}
