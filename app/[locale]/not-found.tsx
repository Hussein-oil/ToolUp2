import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 px-4 text-center">
      <div className="text-8xl font-black text-[#8b0000] opacity-20">404</div>
      <div>
        <h2 className="text-2xl font-bold text-[var(--foreground)] mb-2">Page not found</h2>
        <p className="text-muted text-sm">The page you are looking for does not exist.</p>
      </div>
      <Link href="/" className="btn-primary">
        Go Home
      </Link>
    </div>
  );
}
