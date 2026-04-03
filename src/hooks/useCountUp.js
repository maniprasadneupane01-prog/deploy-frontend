import { useRef, useState, useEffect } from 'react';

export function useCountUp(end, duration = 2000, decimals = 0) {
  const ref = useRef(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setDisplayValue(end);
            return;
          }
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(2, -10 * progress);
            const current = eased * end;
            setDisplayValue(decimals > 0 ? current.toFixed(decimals) : Math.floor(current));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration, decimals]);

  return [displayValue, ref];
}
