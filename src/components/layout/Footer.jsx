import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  const services = [
    t('services.items.general.name'),
    t('services.items.extraction.name'),
    t('services.items.fillings.name'),
    t('services.items.rootCanal.name'),
    t('services.items.whitening.name'),
    t('services.items.implants.name'),
    t('services.items.braces.name'),
    t('services.items.pediatric.name'),
  ];

  const links = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/blog', label: t('nav.blog') },
  ];

  return (
    <footer className="bg-[var(--grad-footer)] border-t border-[var(--border-subtle)]">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] py-10 md:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h3 className="font-yeseva text-2xl text-white mb-3">Biraj Dental</h3>
          <p className="text-[var(--text-secondary)] text-sm mb-5 italic">"{t('footer.tagline')}"</p>
          <a href="https://www.facebook.com/p/Biraj-Dental-PvtLtd-100063143595415/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[var(--text-muted)] hover:text-terra-400 transition-colors text-sm" aria-label="Facebook">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Facebook
          </a>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wider">{t('footer.quickLinks')}</h4>
          <ul className="space-y-2.5">
            {links.map(l => (
              <li key={l.to}><Link to={l.to} className="text-[var(--text-secondary)] hover:text-terra-400 transition-colors text-sm">{l.label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wider">{t('footer.ourServices')}</h4>
          <ul className="space-y-2.5">
            {services.map((s, i) => (
              <li key={i} className="text-[var(--text-secondary)] text-sm">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-semibold text-sm text-[var(--text-primary)] mb-4 uppercase tracking-wider">{t('footer.contactInfo')}</h4>
          <div className="space-y-3 text-sm text-[var(--text-secondary)]">
            <p>📍 Ga:Pali, Suryabinayak, Bhaktapur</p>
            <p>📞 +977 985-1075694</p>
            <p>☎️ 01-6613106</p>
            <p>✉️ mainalibr@gmail.com</p>
          </div>
          <h4 className="font-sans font-semibold text-sm text-[var(--text-primary)] mt-6 mb-3 uppercase tracking-wider">{t('footer.hours')}</h4>
          <p className="text-[var(--text-secondary)] text-sm">{t('footer.hoursMain')}</p>
          <p className="text-[var(--text-secondary)] text-sm mt-1">{t('footer.hoursBranch')}</p>
        </div>
      </div>

      <div className="border-t border-[var(--border-subtle)] py-6">
        <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]">
          <p>{t('footer.copyright')}</p>
          <p>{t('footer.madeIn')}</p>
        </div>
      </div>
    </footer>
  );
}
