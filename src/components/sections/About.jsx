import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const leftRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(leftRef.current, { x: -60, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const loc = t('about.locations', { returnObjects: true });

  return (
    <section ref={sectionRef} className="section">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] grid grid-cols-1 lg:grid-cols-[55%_45%] gap-8 lg:gap-16 items-center">
        <div ref={leftRef}>
          <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{t('about.sectionLabel')}</p>
          <h2 className="font-cormorant font-semibold whitespace-pre-line mb-6" style={{ fontSize: 'var(--fs-h2)' }}>{t('about.title')}</h2>
          <div className="space-y-4 text-[var(--text-secondary)] font-sans leading-relaxed mb-8">
            <p>{t('about.body1')}</p>
            <p>{t('about.body2')}</p>
            <p>{t('about.body3')}</p>
          </div>
          <div className="space-y-4">
            {[loc.main, loc.branch].map((l, i) => (
              <div key={i} className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 {l.label}</p>
                <p className="font-sans text-sm text-[var(--text-secondary)] whitespace-pre-line">{l.address}</p>
                <p className="font-sans text-sm text-[var(--text-muted)] mt-2">{l.phone}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <svg width="380" height="480" viewBox="0 0 380 480" fill="none" className="max-w-full h-auto animate-float-y" aria-hidden="true">
            <rect x="10" y="10" width="360" height="460" rx="8" stroke="var(--terra-500)" strokeWidth="1.5" opacity="0.3" />
            <rect x="30" y="30" width="320" height="420" rx="4" stroke="var(--terra-500)" strokeWidth="1" opacity="0.2" />
            {[[30,30],[350,30],[30,450],[350,450]].map(([x,y],i) => <path key={i} d={`M${x} ${y} L${x+(x<100?20:-20)} ${y} L${x+(x<100?20:-20)} ${y+(y<100?20:-20)}`} stroke="var(--terra-400)" strokeWidth="1.5" fill="none" opacity="0.4" />)}
            <path d="M190 120C160 120 140 150 135 180C130 210 120 250 110 290C100 330 105 360 130 370C150 378 160 365 165 345C170 325 175 310 190 310C205 310 210 325 215 345C220 365 230 378 250 370C275 360 280 330 270 290C260 250 250 210 245 180C240 150 220 120 190 120Z" fill="var(--terra-500)" opacity="0.15" stroke="var(--terra-500)" strokeWidth="1.5" />
            {[60,100,140,240,280,320].map((x,i) => <rect key={i} x={x} y={420} width="40" height="40" fill="var(--terra-500)" opacity="0.06" />)}
          </svg>
        </div>
      </div>
    </section>
  );
}
