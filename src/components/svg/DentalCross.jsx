import { useEffect, useRef } from 'react';

export default function DentalCross({ size = 24, color = 'currentColor', animated = false }) {
  const pathRef = useRef(null);

  useEffect(() => {
    if (!animated || !pathRef.current) return;
    const path = pathRef.current;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    requestAnimationFrame(() => {
      path.style.transition = 'stroke-dashoffset 1s ease-out';
      path.style.strokeDashoffset = '0';
    });
  }, [animated]);

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        ref={pathRef}
        d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 1.5 : 0}
      />
    </svg>
  );
}
