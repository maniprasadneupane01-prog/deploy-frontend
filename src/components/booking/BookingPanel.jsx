import { useRef, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBooking } from '../../context/BookingContext';
import { useTranslation } from 'react-i18next';
import { toast } from '../ui/Toast';
import { useBookingForm } from '../../hooks/useBookingForm';
import StepIndicator from './StepIndicator';
import Step1Personal from './Step1Personal';
import Step2Appointment from './Step2Appointment';
import Step3Review from './Step3Review';
import BookingSuccess from './BookingSuccess';

export default function BookingPanel() {
  const { t } = useTranslation();
  const { isOpen, selectedService, closePanel } = useBooking();
  const panelRef = useRef(null);

  const handleSuccess = useCallback(() => {}, []);
  const handleError = useCallback((msg) => { toast(msg, 'error'); }, []);
  const form = useBookingForm(handleSuccess, handleError);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => { if (e.key === 'Escape') closePanel(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closePanel]);

  useEffect(() => {
    if (isOpen && panelRef.current) {
      panelRef.current.focus();
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div className="fixed inset-0 z-[399] bg-[rgba(10,10,8,0.75)] backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePanel} />
          <motion.div ref={panelRef} tabIndex={-1} className="fixed top-0 right-0 h-[100dvh] w-full md:w-[500px] z-[400] bg-[var(--bg-page)] shadow-[-20px_0_80px_rgba(0,0,0,0.5)] overflow-y-auto outline-none" initial={{ x: '100%' }} animate={{ x: 0, transition: { type: 'tween', ease: [0.16,1,0.3,1], duration: 0.45 } }} exit={{ x: '100%', transition: { type: 'tween', ease: [0.7,0,0.84,0], duration: 0.35 } }}>
            <div className="sticky top-0 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] px-6 py-5 z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.jpg" alt="Biraj Dental" className="w-7 h-7 rounded-full object-cover" />
                  <h2 className="font-cormorant font-semibold text-xl">{t('booking.title')}</h2>
                </div>
                <button onClick={closePanel} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-terra-500/10 transition-colors" aria-label="Close panel">✕</button>
              </div>
              <p className="font-sans text-xs text-[var(--text-muted)]">📍 Ga:Pali, Suryabinayak, Bhaktapur (Ward 8)</p>
            </div>
            <div className="p-6">
              {form.step < 4 && <StepIndicator currentStep={form.step} />}
              {form.step === 4 ? (
                <BookingSuccess response={form.response} form={form} closePanel={closePanel} />
              ) : form.step === 1 ? (
                <Step1Personal form={form} t={t} />
              ) : form.step === 2 ? (
                <Step2Appointment form={form} t={t} selectedService={selectedService} />
              ) : (
                <Step3Review form={form} t={t} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}