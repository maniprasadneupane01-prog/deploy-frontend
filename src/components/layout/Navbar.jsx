import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';
import { useLang } from '../../context/LanguageContext';
import { useBooking } from '../../context/BookingContext';
import LogoIcon from '../svg/LogoIcon';
import gsap from 'gsap';

export default function Navbar() {
  const { t } = useTranslation();
  const { theme, toggle } = useTheme();
  const { lang, setLang } = useLang();
  const { openPanel } = useBooking();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen && menuRef.current) {
      gsap.fromTo(menuRef.current.children, { opacity: 0, y: 10 }, { opacity: 1, y: 0, stagger: 0.08, duration: 0.3, ease: 'power2.out' });
    }
  }, [mobileOpen]);

  useEffect(() => { setMobileOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/blog', label: t('nav.blog') },
    { to: '/#contact', label: t('nav.contact') },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-350 ${
        scrolled
          ? 'bg-ink-400/88 backdrop-blur-[20px] backdrop-saturate-[180%] border-b border-[var(--border-subtle)] shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent'
      }`}
      style={{ height: 'var(--nav-height)' }}
    >
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)] h-full flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 hover:scale-[1.05] transition-transform">
          <LogoIcon size={32} color="var(--terra-400)" />
          <div>
            <span className="font-yeseva text-xl text-white leading-none block">Biraj Dental</span>
            <span className="font-sans font-light text-[0.65rem] text-[var(--text-muted)] tracking-wide">Bhaktapur</span>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative font-sans font-medium text-sm transition-colors after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-terra-500 after:scale-x-0 after:origin-center after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                location.pathname === link.to ? 'text-terra-400 after:scale-x-100' : 'text-[var(--text-secondary)]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center border border-[var(--border-default)] rounded-full overflow-hidden">
            <button
              onClick={() => setLang('en')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-all duration-250 ${lang === 'en' ? 'bg-terra-500 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
            >EN</button>
            <button
              onClick={() => setLang('ne')}
              className={`px-3.5 py-1.5 text-xs font-medium transition-all duration-250 ${lang === 'ne' ? 'bg-terra-500 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}
            >नेपाली</button>
          </div>

          <button onClick={toggle} className="w-9 h-9 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-terra-400 transition-colors" aria-label="Toggle theme">
            {theme === 'dark' ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button
            onClick={() => openPanel(null, document.activeElement)}
            className="hidden md:inline-flex bg-terra-500 text-white font-sans font-semibold text-sm px-5 py-2.5 rounded-full shadow-brand hover:translate-y-[-1px] hover:shadow-brand-lg transition-all"
          >{t('nav.bookCta')}</button>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu" aria-expanded={mobileOpen}>
            <span className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`w-5 h-0.5 bg-[var(--text-primary)] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div ref={menuRef} className="md:hidden absolute top-[var(--nav-height)] left-0 right-0 bg-ink-400/96 backdrop-blur-xl border-b border-[var(--border-subtle)] py-6 px-[var(--content-pad)]">
          <div className="flex flex-col gap-4">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="font-sans font-medium text-lg text-[var(--text-secondary)] hover:text-terra-400 transition-colors py-2">{link.label}</Link>
            ))}
            <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-subtle)]">
              <div className="flex items-center border border-[var(--border-default)] rounded-full overflow-hidden">
                <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-sm ${lang === 'en' ? 'bg-terra-500 text-white' : 'text-[var(--text-muted)]'}`}>EN</button>
                <button onClick={() => setLang('ne')} className={`px-3 py-1.5 text-sm ${lang === 'ne' ? 'bg-terra-500 text-white' : 'text-[var(--text-muted)]'}`}>नेपाली</button>
              </div>
            </div>
            <button
              onClick={() => { openPanel(null, document.activeElement); setMobileOpen(false); }}
              className="w-full bg-terra-500 text-white font-sans font-semibold py-3.5 rounded-full mt-2"
            >{t('nav.bookCta')}</button>
          </div>
        </div>
      )}
    </nav>
  );
}
