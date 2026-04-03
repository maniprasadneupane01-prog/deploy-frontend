import { useEffect } from 'react';
import { useSlots } from '../../hooks/useSlots';
import { GeneralIcon, ExtractionIcon, FillingIcon, RootCanalIcon, WhiteningIcon, ImplantIcon, BracesIcon, PediatricIcon } from '../svg/ServiceIcons';
import FloatTextarea from '../ui/FloatTextarea';
import Button from '../ui/Button';
import Skeleton from '../ui/Skeleton';

const iconMap = { general: GeneralIcon, extraction: ExtractionIcon, fillings: FillingIcon, rootCanal: RootCanalIcon, whitening: WhiteningIcon, implants: ImplantIcon, braces: BracesIcon, pediatric: PediatricIcon };
const iconKeys = ['general', 'extraction', 'fillings', 'rootCanal', 'whitening', 'implants', 'braces', 'pediatric'];
const serviceNames = ['General Checkup & Cleaning', 'Tooth Extraction', 'Dental Fillings', 'Root Canal Treatment', 'Teeth Whitening', 'Dental Implants', 'Orthodontics / Braces', 'Pediatric Dentistry'];

const tomorrow = () => { const d = new Date(); d.setDate(d.getDate() + 1); return d.toISOString().split('T')[0]; };
const maxDate = () => { const d = new Date(); d.setDate(d.getDate() + 60); return d.toISOString().split('T')[0]; };

export default function Step2Appointment({ form, t, selectedService }) {
  const { formData, errors, updateField, nextStep, prevStep } = form;
  const a = formData.appointment;
  const { booked, available, loading, fetchSlots } = useSlots();

  useEffect(() => {
    if (selectedService) updateField('appointment.service', selectedService);
  }, [selectedService]);

  useEffect(() => {
    if (a.date && a.branch) fetchSlots(a.date, a.branch);
  }, [a.date, a.branch]);

  const morningSlots = ['9:00 AM', '10:00 AM', '11:00 AM'];
  const afternoonSlots = ['12:00 PM', '1:00 PM', '2:00 PM'];
  const eveningSlots = ['3:00 PM', '4:00 PM', '5:00 PM'];

  const isValid = a.service && a.branch && a.date && a.timeSlot;

  const SlotGroup = ({ label, slots }) => (
    <div>
      <p className="font-sans font-medium text-xs uppercase tracking-[0.1em] text-[var(--text-muted)] mb-2">{label}</p>
      <div className="flex flex-wrap gap-2">
        {slots.map(slot => {
          const isBooked = booked.includes(slot);
          const isSelected = a.timeSlot === slot;
          return (
            <button key={slot} type="button" disabled={isBooked} onClick={() => updateField('appointment.timeSlot', slot)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all min-w-[80px] ${
                isSelected ? 'bg-terra-500 text-white shadow-brand scale-[1.05]' : isBooked ? 'opacity-40 cursor-not-allowed border border-[var(--border-subtle)] text-[var(--text-disabled)]' : 'border border-[var(--border-default)] hover:border-terra-500 hover:bg-terra-500/[0.08]'
              }`}>
              {slot}
              {isBooked && <span className="block text-[10px] text-[var(--text-disabled)]">{t('booking.step2.taken')}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div>
      <h3 className="font-cormorant font-semibold text-xl mb-6">{t('booking.step2.title')}</h3>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('booking.step2.serviceLabel')}</label>
          <div className="grid grid-cols-2 gap-2">
            {iconKeys.map((key, i) => {
              const Icon = iconMap[key];
              const isSelected = a.service === serviceNames[i];
              return (
                <button key={key} type="button" onClick={() => updateField('appointment.service', serviceNames[i])}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all border ${isSelected ? 'border-terra-500 bg-terra-500/10' : 'border-[var(--border-default)] hover:border-terra-500/50'}`}>
                  <Icon size={20} />
                  <span className="truncate">{serviceNames[i]}</span>
                  {isSelected && <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="var(--terra-500)" strokeWidth="2"><path d="M3 7l3 3 5-5" strokeLinecap="round"/></svg>}
                </button>
              );
            })}
          </div>
          {errors['appointment.service'] && <p className="text-xs text-red-500 mt-1">{errors['appointment.service']}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('booking.step2.branchLabel')}</label>
          <div className="space-y-2">
            {[{ key: 'suryabinayak', name: t('booking.step2.branches.suryabinayak.name'), addr: t('booking.step2.branches.suryabinayak.address') }, { key: 'gatthaghar', name: t('booking.step2.branches.gatthaghar.name'), addr: t('booking.step2.branches.gatthaghar.address') }].map(b => (
              <div key={b.key} onClick={() => updateField('appointment.branch', b.key)} className={`p-4 rounded-lg border cursor-pointer transition-all ${a.branch === b.key ? 'border-terra-500 border-l-4 border-l-terra-500 bg-terra-500/5' : 'border-[var(--border-default)] hover:border-terra-500/50'}`}>
                <p className="font-sans font-semibold text-sm">{b.name}</p>
                <p className="font-sans text-xs text-[var(--text-muted)]">{b.addr}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('booking.step2.dateLabel')}</label>
          <input type="date" min={tomorrow()} max={maxDate()} value={a.date} onChange={e => updateField('appointment.date', e.target.value)}
            className="w-full px-4 py-3 bg-[var(--bg-card)] border border-[var(--border-default)] rounded-lg text-sm focus:outline-none focus:border-terra-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('booking.step2.timeLabel')}</label>
          {loading ? (
            <div className="flex flex-wrap gap-2">{Array.from({ length: 9 }).map((_, i) => <Skeleton key={i} height="42px" className="w-[100px] rounded-md" />)}</div>
          ) : (
            <div className="space-y-4">
              <SlotGroup label={t('booking.step2.morning')} slots={morningSlots} />
              <SlotGroup label={t('booking.step2.afternoon')} slots={afternoonSlots} />
              <SlotGroup label={t('booking.step2.evening')} slots={eveningSlots} />
            </div>
          )}
          {errors['appointment.timeSlot'] && <p className="text-xs text-red-500 mt-1">{errors['appointment.timeSlot']}</p>}
        </div>

        <FloatTextarea id="b-notes" label={t('booking.step2.notesLabel')} value={a.notes} onChange={e => updateField('appointment.notes', e.target.value)} maxLength={500} />

        <div className="flex gap-3">
          <Button variant="ghost" onClick={prevStep} className="flex-1">← Back</Button>
          <Button variant="primary" disabled={!isValid} onClick={nextStep} className="flex-1">Next →</Button>
        </div>
      </div>
    </div>
  );
}