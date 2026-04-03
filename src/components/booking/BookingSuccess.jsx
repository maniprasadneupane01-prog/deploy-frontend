import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import CheckMark from '../svg/CheckMark';
import Button from '../ui/Button';

export default function BookingSuccess({ response, form, closePanel }) {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const confettiRef = useRef(null);

  useEffect(() => { setShow(true); }, []);

  useEffect(() => {
    if (!show || !confettiRef.current || !response) return;
    const colors = ['#C0522A','#D4A017','#E8B83A','#FDF0EB','#D4714A'];
    confettiRef.current.innerHTML = '';
    for (let i = 0; i < 16; i++) {
      const el = document.createElement('div');
      const size = 6 + Math.random() * 8;
      el.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:${colors[i%colors.length]};border-radius:${Math.random()>0.5?'50%':'0'};--dx:${-120+Math.random()*240}px;--dy:${-160+Math.random()*120}px;--dr:${-360+Math.random()*720}deg;animation:confetti 1.2s ease ${Math.random()*0.6}s forwards;left:50%;top:50%;`;
      confettiRef.current.appendChild(el);
    }
  }, [show, response]);

  const downloadPDF = async () => {
    if (!response) return;
    const { generateAppointmentPDF } = await import('../../utils/pdfGenerator');
    generateAppointmentPDF(response);
  };

  const bookAnother = () => {
    form.reset();
  };

  if (!response) return null;

  return (
    <div className={`text-center transition-all duration-500 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      <div className="relative inline-block mb-4">
        <CheckMark />
        <div ref={confettiRef} className="absolute inset-0 pointer-events-none overflow-hidden" style={{ width: 200, height: 200, left: '50%', top: '50%', marginLeft: -100, marginTop: -100 }} />
      </div>
      <h3 className="font-cormorant font-semibold text-2xl mb-2">{t('booking.success.title')}</h3>
      <p className="font-sans text-sm text-[var(--text-muted)] mb-1">{t('booking.success.idLabel')}</p>
      <p className="font-mono font-semibold text-xl text-terra-400 mb-6">{response.id}</p>
      <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mb-6 text-left">
        {[['Service', response.appointment.service], ['Branch', response.appointment.branch === 'suryabinayak' ? 'Suryabinayak (Main)' : 'Gatthaghar'], ['Date', response.appointment.date], ['Time', response.appointment.timeSlot]].map(([l,v],i) => (
          <div key={i} className={`flex justify-between px-4 py-2.5 text-sm ${i%2?'bg-[var(--bg-section-alt)]':''}`}><span className="text-[var(--text-muted)] text-xs uppercase">{l}</span><span>{v}</span></div>
        ))}
      </div>
      <div className="space-y-3">
        <Button variant="primary" className="w-full" onClick={downloadPDF}>↓ {t('booking.success.download')}</Button>
        <Button variant="ghost" className="w-full" onClick={bookAnother}>+ {t('booking.success.bookAnother')}</Button>
      </div>
      <p className="mt-6 text-xs text-[var(--text-muted)]">{t('booking.success.urgent')}<br /><a href="tel:+9779851075694" className="font-mono text-terra-400">{t('booking.success.phone')}</a></p>
    </div>
  );
}