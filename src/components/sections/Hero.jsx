import { useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { useBooking } from '../../context/BookingContext';
import { useParticleCanvas } from '../../hooks/useParticleCanvas';
import gsap from 'gsap';
import ToothOutline from '../svg/ToothOutline';
import NewariPattern from '../svg/NewariPattern';
import PulseRings from '../svg/PulseRings';
import Button from '../ui/Button';

export default function Hero() {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { openPanel } = useBooking();
  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  useParticleCanvas(canvasRef, theme);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      tl.fromTo('.hero-eyebrow', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 0.2)
        .fromTo('.hero-word', { y: 70, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.14 }, 0.38)
        .fromTo('.hero-sub', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55 }, 1.1)
        .fromTo('.hero-cta', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12 }, 1.28)
        .fromTo('.hero-location', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 }, 1.55)
        .fromTo('.hero-tooth', { x: 80, opacity: 0 }, { x: 0, opacity: 0.04, duration: 1, ease: 'power3.out' }, 1.7);
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] overflow-hidden bg-[var(--grad-hero)]">
      <canvas ref={canvasRef} aria-hidden="true" role="presentation" className="absolute inset-0 w-full h-full opacity-70 transition-opacity duration-[1500ms]" style={{ opacity: 0 }} onLoad={e => e.target.style.opacity = '0.7'} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,8,5,0.6)_100%)]" />
      <div className="hero-tooth absolute right-[-5%] top-1/2 -translate-y-1/2 z-[2] animate-float-y hidden lg:block">
        <ToothOutline width={420} />
      </div>
      <NewariPattern width="100%" height={60} className="absolute bottom-0 z-[3]" />

      <div className="absolute inset-0 z-[4] flex items-center">
        <div className="w-full max-w-3xl mx-auto px-[var(--content-pad)]">
          <p className="hero-eyebrow font-sans font-medium text-[0.7rem] tracking-[0.15em] uppercase text-terra-400 mb-4">{t('hero.eyebrow')}</p>
          <h1 className="font-yeseva leading-[1.05] text-white mb-5" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)' }}>
            {['hero.line1','hero.line2','hero.line3','hero.line4'].map((key) => (
              <span key={key} className="hero-word block">
                {key === 'hero.line2' ? (
                  <span style={{ backgroundImage: 'var(--grad-text)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', WebkitTextFillColor: 'transparent' }}>{t(key)}</span>
                ) : t(key)}
              </span>
            ))}
          </h1>
          <p className="hero-sub font-sans font-light text-[var(--text-secondary)] mb-7 max-w-xl leading-relaxed" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}>{t('hero.sub')}</p>
          <div className="hero-cta flex flex-col sm:flex-row items-start gap-4 mb-6">
            <div className="relative inline-flex">
              <PulseRings />
              <Button variant="primary" magnetic onClick={() => openPanel(null, document.activeElement)}>{t('hero.ctaPrimary')} →</Button>
            </div>
            <a href="tel:+9779851075694" className="inline-flex items-center gap-2 font-sans font-medium text-terra-400 border border-terra-500/50 rounded-full px-6 py-3.5 hover:border-terra-500 hover:bg-terra-500/[0.08] transition-all">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339,1.85.573,2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              {t('hero.ctaSecondary')}
            </a>
          </div>
          <p className="hero-location font-sans text-sm text-[var(--text-muted)]">📍 {t('hero.address')}</p>
        </div>
      </div>

      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex-col items-center gap-2 text-terra-400/60 animate-bounce">
        <div className="w-[2px] h-8 bg-terra-400/40 rounded-full" />
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6l4 4 4-4"/></svg>
        <span className="text-xs font-sans">{t('hero.scrollLabel')}</span>
      </div>
    </section>
  );
}
