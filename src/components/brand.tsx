export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 3v8M20 29v8M3 20h8M29 20h8M8 8l6 6M26 26l6 6M32 8l-6 6M14 26l-6 6"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M20 12l2.5 5.5L28 20l-5.5 2.5L20 28l-2.5-5.5L12 20l5.5-2.5L20 12Z"
        fill="currentColor"
      />
    </svg>
  );
}
