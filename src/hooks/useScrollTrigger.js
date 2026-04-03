import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useScrollTrigger(callback, deps = []) {
  const ctx = useRef(null);
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    ctx.current = gsap.context(() => callback());
    return () => ctx.current?.revert();
  }, deps);
}
