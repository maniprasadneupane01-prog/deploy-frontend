import { useState } from 'react';
import Button from '../ui/Button';

export default function Step3Review({ form, t }) {
  const { formData, errors, submit, isSubmitting, confirmChecked, setConfirmChecked, prevStep } = form;
  const { patient, appointment } = formData;

  const branchName = appointment.branch === 'suryabinayak' ? 'Suryabinayak (Main)' : 'Gatthaghar';
  const f = t('booking.step3.fields', { returnObjects: true });

  const rows = [
    [f.name, patient.name], [f.email, patient.email], [f.phone, patient.phone],
    [f.age, patient.age || '—'], [f.gender, patient.gender || '—'],
    [f.service, appointment.service], [f.branch, branchName],
    [f.date, appointment.date], [f.time, appointment.timeSlot],
    ...(appointment.notes ? [[f.notes, appointment.notes]] : []),
  ];

  return (
    <div>
      <h3 className="font-cormorant font-semibold text-xl mb-6">{t('booking.step3.title')}</h3>
      <div className="rounded-lg border border-[var(--border-default)] overflow-hidden mb-6">
        <h4 className="px-4 py-3 bg-[var(--bg-section-alt)] font-sans font-semibold text-sm">{t('booking.step3.summaryTitle')}</h4>
        {rows.map(([label, value], i) => (
          <div key={i} className={`flex justify-between px-4 py-2.5 text-sm ${i % 2 === 0 ? 'bg-[var(--bg-card)]' : 'bg-[var(--bg-section-alt)]'}`}>
            <span className="font-sans font-medium text-[var(--text-muted)] text-xs uppercase">{label}</span>
            <span className="font-sans text-right">{value}</span>
          </div>
        ))}
      </div>

      <label className="flex items-center gap-3 mb-6 cursor-pointer">
        <div className="relative">
          <input type="checkbox" checked={confirmChecked} onChange={e => setConfirmChecked(e.target.checked)} className="sr-only peer" />
          <div className="w-5 h-5 border-2 border-[var(--border-default)] rounded peer-checked:bg-terra-500 peer-checked:border-terra-500 transition-all flex items-center justify-center">
            {confirmChecked && <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2"><path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
        </div>
        <span className="font-sans text-sm">{t('booking.step3.confirmLabel')}</span>
      </label>
      {errors['confirm'] && <p className="text-xs text-red-500 mb-4">{errors['confirm']}</p>}

      <div className="flex gap-3">
        <Button variant="ghost" onClick={prevStep} className="flex-1">← Back</Button>
        <Button variant="primary" disabled={!confirmChecked || isSubmitting} onClick={submit} className="flex-1" aria-busy={isSubmitting}>
          {isSubmitting ? t('booking.step3.confirming') : t('booking.step3.submitBtn')}
        </Button>
      </div>
    </div>
  );
}