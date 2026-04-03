import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { api } from '../../utils/api';
import FloatInput from '../ui/FloatInput';
import Button from '../ui/Button';
import CheckMark from '../svg/CheckMark';

export default function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await api.post('/contact', form);
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
      let msg = 'Failed to send message. Please try again or call us directly.';
      if (err.response) {
        if (err.response.data?.details) {
          msg = Object.values(err.response.data.details).join('. ');
        } else if (err.response.data?.message) {
          msg = err.response.data.message;
        } else {
          msg = `Server error (${err.response.status}). Please try again.`;
        }
      } else if (err.request) {
        msg = 'Could not connect to server. The server may be starting up — please wait 30 seconds and try again.';
      } else {
        msg = err.message || msg;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="section bg-[var(--bg-section-alt)]">
      <div className="max-w-[var(--max-width)] mx-auto px-[var(--content-pad)]">
        <p className="font-sans font-medium text-sm tracking-[0.15em] uppercase text-terra-400 mb-3 text-center">{t('contact.sectionLabel')}</p>
        <h2 className="font-cormorant font-semibold mb-12 text-center" style={{ fontSize: 'var(--fs-h2)' }}>{t('contact.title')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="relative w-full h-[250px] md:h-[350px] rounded-[var(--radius-lg)] overflow-hidden border border-[var(--border-subtle)]">
              <iframe
                title="Biraj Dental Location"
                loading="lazy"
                className="w-full h-full"
                src="https://maps.google.com/maps?q=Gathaghar+Chowk,+Bhaktapur,+Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border-2 border-terra-500 border-l-4 border-l-terra-500 relative">
                <span className="absolute top-2 right-2 bg-terra-500 text-white text-[0.6rem] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">Main Branch</span>
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Gathaghar, Namunabasti</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Gathaghar Chowk, Bhaktapur</p>
                <p className="font-sans text-sm text-[var(--text-muted)] mt-1">01-16634729 / 9851031257</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Jorpati, Narayantar</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Kathmandu</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Sallaghari</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Bhaktapur</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Chabahil, Ganeshthan</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Kathmandu</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Suryabinayak</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Bhaktapur</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Charikot</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Dolakha</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Chautara</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Sindhupalchowk</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Banepa</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Kavre</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)]/50 border border-dashed border-[var(--border-subtle)] opacity-50">
                <p className="font-sans font-semibold text-[var(--text-muted)] mb-1">📍 Coming Soon</p>
                <p className="font-sans text-sm text-[var(--text-disabled)]">Location to be added</p>
              </div>
            </div>
          </div>
          <div>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <CheckMark />
                <p className="font-cormorant font-semibold text-2xl mt-4">{t('contact.success')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="font-cormorant font-semibold text-xl mb-6">{t('contact.formTitle')}</h3>
                {error && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-sans">
                    {error}
                  </div>
                )}
                <FloatInput id="contact-name" label={t('contact.nameLabel')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                <FloatInput id="contact-email" label={t('contact.emailLabel')} type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
                <FloatInput id="contact-phone" label={t('contact.phoneLabel')} type="tel" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                <FloatInput id="contact-message" label={t('contact.messageLabel')} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                <Button type="submit" variant="primary" className="w-full" disabled={loading}>
                  {loading ? 'Sending...' : t('contact.submitBtn')}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
