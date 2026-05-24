export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <svg className="animate-spin text-[#8b0000]" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    </div>
  );
}
