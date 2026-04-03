import { useTranslation } from 'react-i18next';

export default function TrustMarquee() {
  const { t } = useTranslation();
  const items = [t('trust.reviews'), t('trust.followers'), t('trust.locations'), t('trust.rootCanal'), t('trust.whitening'), t('trust.implants'), t('trust.pediatric'), t('trust.emergency')];
  const doubled = [...items, ...items];

  return (
    <div className="bg-terra-500 py-5 overflow-hidden">
      <div className="marquee-track flex gap-6 md:gap-12 items-center" style={{ animation: 'marquee 25s linear infinite', width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="font-sans font-semibold text-white text-sm tracking-[0.05em] whitespace-nowrap flex items-center gap-6 md:gap-12">
            {item}
            {i < doubled.length - 1 && <span className="opacity-50">·</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
