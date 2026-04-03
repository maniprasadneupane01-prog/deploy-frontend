import { useMagneticButton } from '../../hooks/useMagneticButton';

export default function Button({ variant = 'primary', children, className = '', magnetic = false, ...props }) {
  const magRef = useMagneticButton(0.2);

  const base = 'inline-flex items-center justify-center gap-2 font-sans font-semibold rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terra-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-400';

  const variants = {
    primary: 'bg-terra-500 text-white px-6 py-3 md:px-8 md:py-4 shadow-brand md:hover:translate-y-[-2px] md:hover:shadow-brand-lg active:translate-y-0',
    ghost: 'bg-transparent border border-terra-500/50 text-terra-400 px-5 py-3 md:px-7 md:py-4 hover:border-terra-500 hover:bg-terra-500/[0.08]',
    text: 'bg-transparent text-terra-400 px-3 py-2 md:px-4 md:py-2 hover:text-terra-300',
    danger: 'bg-red-600 text-white px-6 py-3 md:px-8 md:py-4 hover:bg-red-700',
  };

  const ref = magnetic ? magRef : null;

  return (
    <button ref={ref} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
