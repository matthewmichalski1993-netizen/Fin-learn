export function Squiggle({ className = "", color = "#F4B740" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M2 8 C 20 2, 35 2, 50 8 S 80 14, 100 8 S 130 2, 150 8 S 180 14, 198 8"
        fill="none"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
