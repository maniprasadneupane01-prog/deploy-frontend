import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function FAQ() {
  const { t } = useTranslation();
  const [openIdx, setOpenIdx] = useState(null);
  const items = t('faq.items', { returnObjects: true });

  return (
    <section className="section">
      <div className="max-w-[720px] mx-auto px-[var(--content-pad)]">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3 text-center">{t('faq.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold mb-12 text-center" style={{ fontSize: 'var(--fs-h2)' }}>{t('faq.title')}</h2>
        <div className="space-y-0">
          {items.map((item, i) => (
            <div key={i} className="border-b border-[var(--border-default)]">
              <button
                className={`w-full flex items-center justify-between py-5 text-left font-sans font-medium transition-colors ${openIdx === i ? 'text-terra-400' : 'text-[var(--text-primary)]'}`}
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                aria-expanded={openIdx === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span>{item.q}</span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className={`transition-transform duration-300 ${openIdx === i ? 'rotate-180' : ''}`}><path d="M5 7l5 5 5-5"/></svg>
              </button>
              <div id={`faq-answer-${i}`} className={`overflow-hidden transition-all duration-300 ${openIdx === i ? 'max-h-[400px] opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}`}>
                <p className="font-sans text-[var(--text-secondary)] leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
