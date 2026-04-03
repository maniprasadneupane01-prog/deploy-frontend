import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Lightbox from '../ui/Lightbox';

const gradients = [
  'linear-gradient(135deg, #C0522A, #7D2E11)',
  'linear-gradient(135deg, #D4A017, #A87C10)',
  'linear-gradient(135deg, #A03E1C, #D4714A)',
  'linear-gradient(135deg, #7D2E11, #C0522A, #D4A017)',
  'linear-gradient(135deg, #1A1008, #C0522A)',
  'linear-gradient(135deg, #D4A017, #E8B83A, #D4A017)',
];

export default function Gallery() {
  const { t } = useTranslation();
  const [lightbox, setLightbox] = useState(null);

  const openLightbox = (idx) => setLightbox(idx);
  const closeLightbox = () => setLightbox(null);
  const prevImg = () => setLightbox(p => (p - 1 + gradients.length) % gradients.length);
  const nextImg = () => setLightbox(p => (p + 1) % gradients.length);

  return (
    <section className="section">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)]">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{t('gallery.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold mb-12" style={{ fontSize: 'var(--fs-h2)' }}>{t('gallery.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" style={{ gridTemplateAreas: '"big mid1 sm1" "big mid2 sm2" "bot1 bot2 sm3"' }}>
          {[
            { area: 'big', grad: gradients[0], span: 'row-span-2 aspect-[4/5]' },
            { area: 'mid1', grad: gradients[1], span: 'aspect-[4/3]' },
            { area: 'sm1', grad: gradients[2], span: 'aspect-square' },
            { area: 'mid2', grad: gradients[3], span: 'aspect-[4/3]' },
            { area: 'sm2', grad: gradients[4], span: 'aspect-square' },
            { area: 'bot1', grad: gradients[5], span: 'aspect-[16/9]' },
          ].map((tile, i) => (
            <div key={i} className={`relative overflow-hidden rounded-[var(--radius-lg)] cursor-pointer group ${tile.span}`} style={{ gridArea: tile.area }} onClick={() => openLightbox(i)}>
              <div className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03]" style={{ background: tile.grad }} />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
                <p className="font-sans text-xs sm:text-sm text-white/40 text-center px-4 leading-relaxed select-none">Your dental photos will appear here after you approve this project.</p>
              </div>
              <div className="absolute inset-0 bg-terra-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="14" stroke="white" strokeWidth="2"/><path d="M16 10v12M10 16h12" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox !== null && <Lightbox images={gradients} currentIndex={lightbox} onClose={closeLightbox} onPrev={prevImg} onNext={nextImg} />}
    </section>
  );
}
