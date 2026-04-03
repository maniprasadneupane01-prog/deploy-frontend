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
        if (err.response.status === 400 && err.response.data?.details) {
          const details = err.response.data.details;
          msg = Object.values(details).join('. ');
        } else if (err.response.data?.message) {
          msg = err.response.data.message;
        }
      } else if (err.request) {
        msg = 'Could not connect to server. Please check your connection.';
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
                src="https://maps.google.com/maps?q=Ga:Pali,%20Suryabinayak,%20Bhaktapur,%20Nepal&t=&z=15&ie=UTF8&iwloc=&output=embed"
              />
            </div>
            <div className="mt-6 space-y-4">
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Suryabinayak (Main)</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Ga:Pali, Suryabinayak Municipality, Ward 8, Bhaktapur</p>
                <p className="font-sans text-sm text-[var(--text-muted)] mt-1">+977 985-1075694 | 01-6613106</p>
              </div>
              <div className="p-5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] border-l-4 border-l-terra-500">
                <p className="font-sans font-semibold text-terra-400 mb-1">📍 Gatthaghar (Branch)</p>
                <p className="font-sans text-sm text-[var(--text-secondary)]">Gatthaghar Namuna Basti, Chandra Binayek Chowk, Bhaktapur</p>
                <p className="font-sans text-sm text-[var(--text-muted)] mt-1">mainalibr@gmail.com</p>
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
