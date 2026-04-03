import { useEffect, useRef } from 'react';

export default function CheckMark({ size = 90 }) {
  const circleRef = useRef(null);
  const checkRef = useRef(null);

  useEffect(() => {
    const circle = circleRef.current;
    const check = checkRef.current;
    if (!circle || !check) return;

    const circleLen = 2 * Math.PI * 45;
    circle.style.strokeDasharray = circleLen;
    circle.style.strokeDashoffset = circleLen;

    requestAnimationFrame(() => {
      circle.style.transition = 'stroke-dashoffset 0.9s ease-out';
      circle.style.strokeDashoffset = '0';
    });

    setTimeout(() => {
      check.style.strokeDasharray = 60;
      check.style.strokeDashoffset = 60;
      requestAnimationFrame(() => {
        check.style.transition = 'stroke-dashoffset 0.7s ease-out';
        check.style.strokeDashoffset = '0';
      });
    }, 500);
  }, []);

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
      <circle ref={circleRef} cx="50" cy="50" r="45" stroke="var(--terra-500)" strokeWidth="3" fill="none" />
      <path ref={checkRef} d="M30 50 L45 65 L70 35" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
