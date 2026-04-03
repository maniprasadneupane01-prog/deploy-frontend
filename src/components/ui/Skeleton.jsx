export default function Skeleton({ className = '', height = '1rem' }) {
  return (
    <div
      className={`rounded-md bg-[linear-gradient(90deg,var(--bg-card)_25%,var(--bg-elevated)_50%,var(--bg-card)_75%)] bg-[length:200%_100%] animate-shimmer ${className}`}
      style={{ height }}
      aria-hidden="true"
    />
  );
}
