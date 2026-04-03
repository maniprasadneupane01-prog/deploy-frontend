import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function Testimonials() {
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const [cardWidth, setCardWidth] = useState(380);
  const paused = useRef(false);
  const containerRef = useRef(null);
  const items = t('testimonials.items', { returnObjects: true });
  const doubled = [...items, ...items];

  useEffect(() => {
    function updateWidth() {
      if (window.innerWidth < 640) {
        setCardWidth(window.innerWidth - 48);
      } else {
        setCardWidth(380);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused.current) setOffset(p => (p + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <section className="section bg-[var(--bg-section-alt)] overflow-hidden">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] mb-12">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{t('testimonials.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold" style={{ fontSize: 'var(--fs-h2)' }}>{t('testimonials.title')}</h2>
      </div>
      <div ref={containerRef} className="flex gap-6 transition-transform duration-500 ease-in-out px-[var(--content-pad)]" style={{ transform: `translateX(-${offset * (cardWidth + 24)}px)` }} onMouseEnter={() => paused.current = true} onMouseLeave={() => paused.current = false}>
        {doubled.map((item, i) => (
          <div key={i} className="flex-shrink-0 w-[calc(100vw-3rem)] sm:w-[380px] p-5 sm:p-8 rounded-[var(--radius-lg)] bg-[var(--grad-card)] border border-[var(--border-subtle)]">
            <div className="flex gap-1 mb-4 text-gold-500">{Array.from({ length: item.rating }).map((_, j) => <span key={j}>★</span>)}</div>
            <p className="font-cormorant italic text-lg text-[var(--text-secondary)] mb-6 leading-relaxed">"{item.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-terra-600 flex items-center justify-center text-white font-yeseva text-lg">{item.name[0]}</div>
              <div>
                <p className="font-sans font-semibold text-sm">{item.name}</p>
                <p className="font-sans text-xs text-[var(--text-muted)]">{item.location} · {item.treatment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
