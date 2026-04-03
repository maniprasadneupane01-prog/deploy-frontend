import { useTranslation } from 'react-i18next';

const avatarGrads = [
  'linear-gradient(135deg, #C0522A, #7D2E11)',
  'linear-gradient(135deg, #D4A017, #A03E1C)',
  'linear-gradient(135deg, #A03E1C, #D4A017)',
];

export default function Team() {
  const { t } = useTranslation();
  const members = t('team.members', { returnObjects: true });

  return (
    <section className="section">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)]">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3">{t('team.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold mb-12" style={{ fontSize: 'var(--fs-h2)' }}>{t('team.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
          {members.map((m, i) => (
            <div key={i} className="flip-card w-[320px] h-[400px]" style={{ perspective: '1200px' }}>
              <div className="flip-inner relative w-full h-full transition-transform duration-[650ms]" style={{ transformStyle: 'preserve-3d' }}>
                <div className="flip-front absolute inset-0 rounded-[var(--radius-xl)] overflow-hidden bg-[var(--bg-card)] border border-[var(--border-subtle)]" style={{ backfaceVisibility: 'hidden' }}>
                  <div className="h-[60%] flex items-center justify-center relative" style={{ background: avatarGrads[i] }}>
                    <span className="font-yeseva text-5xl text-white/80">{m.name.split(' ').map(w => w[0]).join('')}</span>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[2]">
                      <p className="font-sans text-xs text-white/30 text-center px-4 leading-relaxed select-none">Photo, name and description of your dentist will appear here once you approve this project.</p>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-cormorant font-semibold text-xl mb-1">{m.name}</h3>
                    <p className="font-sans text-sm text-[var(--text-muted)]">{m.specialty}</p>
                    <p className="font-sans text-xs text-[var(--text-disabled)] mt-4">{t('team.hoverReveal')}</p>
                  </div>
                </div>
                <div className="flip-back absolute inset-0 rounded-[var(--radius-xl)] bg-terra-600 text-white p-6 flex flex-col justify-center" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                  <h3 className="font-cormorant font-semibold text-xl mb-1">{m.name}</h3>
                  <span className="font-mono text-xs bg-white/20 px-2 py-0.5 rounded-full w-fit mb-3">{m.credentials}</span>
                  <p className="font-sans font-light text-sm text-white/80 mb-4">{m.bio}</p>
                  <div className="flex flex-wrap gap-2">{m.tags.map((tag, j) => <span key={j} className="text-xs bg-white/15 px-2.5 py-1 rounded-full">{tag}</span>)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
