import { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function WhyUs() {
  const { t } = useTranslation();
  const sectionRef = useRef(null);
  const [activePanel, setActivePanel] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;
    const panels = t('whyUs.panels', { returnObjects: true });
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: true,
        start: 'top top',
        end: `+=${panels.length * 100}vh`,
        onUpdate: (self) => {
          const idx = Math.min(Math.floor(self.progress * panels.length), panels.length - 1);
          setActivePanel(idx);
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [t]);

  const panels = t('whyUs.panels', { returnObjects: true });

  return (
    <section ref={sectionRef} className="bg-[var(--bg-section-alt)]">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] py-[var(--section-pad-y)]">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{t('whyUs.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold mb-16" style={{ fontSize: 'var(--fs-h2)' }}>{t('whyUs.title')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-8">
          <div className="hidden lg:flex flex-col gap-6 items-center pt-4">
            {panels.map((_, i) => (
              <div key={i} className={`w-4 h-4 rounded-full transition-all duration-500 ${i <= activePanel ? 'bg-terra-500 scale-110' : 'bg-[var(--border-default)]'}`} />
            ))}
          </div>
          <div className="relative min-h-[200px] lg:min-h-[300px]">
            {panels.map((panel, i) => (
              <div key={i} className={`transition-all duration-700 ${i === activePanel ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 absolute inset-0 pointer-events-none'}`}>
                <span className="font-yeseva text-[4rem] md:text-[6rem] lg:text-[8rem] leading-none text-terra-500/[0.04] absolute -top-8 -left-4">{panel.number}</span>
                <h3 className="font-cormorant font-semibold relative z-10 mb-4" style={{ fontSize: 'var(--fs-h3)' }}>{panel.title}</h3>
                <p className="font-sans text-[var(--text-secondary)] leading-relaxed max-w-xl">{panel.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
