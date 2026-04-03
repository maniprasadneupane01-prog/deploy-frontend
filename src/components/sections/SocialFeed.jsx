import { useTranslation } from 'react-i18next';

const feedGrads = [
  'linear-gradient(135deg, #C0522A, #7D2E11)',
  'linear-gradient(135deg, #D4A017, #A87C10)',
  'linear-gradient(135deg, #A03E1C, #D4714A)',
  'linear-gradient(135deg, #7D2E11, #C0522A, #D4A017)',
  'linear-gradient(135deg, #1A1008, #C0522A)',
  'linear-gradient(135deg, #D4A017, #E8B83A)',
];

export default function SocialFeed() {
  const { t } = useTranslation();
  const sf = t('socialFeed', { returnObjects: true });

  return (
    <section className="section">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] text-center">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{sf.sectionLabel}</p>
        <h2 className="font-cormorant font-semibold mb-10" style={{ fontSize: 'var(--fs-h2)' }}>{sf.title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {feedGrads.map((grad, i) => (
            <div key={i} className="aspect-square rounded-[var(--radius-lg)] overflow-hidden relative group cursor-pointer" style={{ background: grad }}>
              <div className="absolute inset-0 bg-terra-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              </div>
            </div>
          ))}
        </div>
        <a href={sf.ctaLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 font-sans font-semibold text-terra-400 border border-terra-500/50 rounded-full px-8 py-4 hover:border-terra-500 hover:bg-terra-500/[0.08] transition-all">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          {sf.cta}
        </a>
      </div>
    </section>
  );
}
