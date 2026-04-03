export default function Divider({ text, className = '' }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="flex-1 h-px bg-[var(--border-default)]" />
      {text && <span className="text-sm text-[var(--text-muted)] font-medium">{text}</span>}
      <div className="flex-1 h-px bg-[var(--border-default)]" />
    </div>
  );
}
