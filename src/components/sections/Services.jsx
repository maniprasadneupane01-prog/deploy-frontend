import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useBooking } from '../../context/BookingContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GeneralIcon, ExtractionIcon, FillingIcon, RootCanalIcon, WhiteningIcon, ImplantIcon, BracesIcon, PediatricIcon } from '../svg/ServiceIcons';

const iconMap = { general: GeneralIcon, extraction: ExtractionIcon, fillings: FillingIcon, rootCanal: RootCanalIcon, whitening: WhiteningIcon, implants: ImplantIcon, braces: BracesIcon, pediatric: PediatricIcon };
const iconKeys = ['general', 'extraction', 'fillings', 'rootCanal', 'whitening', 'implants', 'braces', 'pediatric'];

export default function Services() {
  const { t } = useTranslation();
  const { openPanel } = useBooking();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 768) return;

    const track = trackRef.current;
    if (!track) return;
    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.2,
        start: 'top top',
        end: `+=${totalScroll}`,
        onUpdate: (self) => { gsap.set(track, { x: -(self.progress * totalScroll) }); }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services-section" ref={sectionRef} className="section bg-[var(--bg-section-alt)]">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] mb-12">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{t('services.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold" style={{ fontSize: 'var(--fs-h2)' }}>{t('services.title')}</h2>
      </div>
      <div ref={trackRef} className="flex flex-col md:flex-row gap-6 px-[var(--content-pad)] md:px-0 md:pl-[var(--content-pad)]">
        {iconKeys.map((key) => {
          const Icon = iconMap[key];
          const item = t(`services.items.${key}`, { returnObjects: true });
          return (
            <div key={key} data-service={item.name} className="flex-shrink-0 w-full md:w-[340px] lg:w-[380px] p-5 md:p-8 rounded-[var(--radius-xl)] bg-[var(--grad-card)] border border-[var(--border-subtle)] shadow-sm md:hover:translate-y-[-10px] md:hover:shadow-lg md:hover:border-terra-500/60 transition-all duration-300 group cursor-pointer" onClick={() => openPanel(item.name, document.activeElement)}>
              <div className="w-16 h-16 mb-6 text-terra-400 md:group-hover:rotate-[360deg] transition-transform duration-800"><Icon /></div>
              <h3 className="font-cormorant font-semibold text-xl mb-2">{item.name}</h3>
              <p className="font-sans text-sm text-[var(--text-muted)] mb-4">{item.desc}</p>
              <span className="inline-block font-mono text-xs bg-terra-500/10 text-terra-400 px-3 py-1 rounded-full mb-4">{item.price}</span>
              <p className="font-sans text-sm text-terra-400 group-hover:text-terra-300 transition-colors">{t('services.bookService')}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
