export default function Badge({ children, variant = 'default', className = '' }) {
  const variants = {
    default: 'bg-[rgba(201,185,154,0.1)] text-[var(--text-secondary)]',
    terra: 'bg-terra-500/10 text-terra-400',
    gold: 'bg-gold-500/10 text-gold-400',
    success: 'bg-[rgba(34,197,94,0.1)] text-green-500',
    error: 'bg-[rgba(239,68,68,0.1)] text-red-500',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
