import FloatInput from '../ui/FloatInput';
import Button from '../ui/Button';

export default function Step1Personal({ form, t }) {
  const { formData, errors, updateField, nextStep } = form;
  const p = formData.patient;
  const cleanPhone = p.phone.replace(/[\s\-\(\)]/g, '');
  const isValid = p.name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.email) && /^(\+977)?9\d{9}$|^0?1\d{6,7}$/.test(cleanPhone);

  return (
    <div>
      <h3 className="font-cormorant font-semibold text-xl mb-6">{t('booking.step1.title')}</h3>
      <div className="space-y-5">
        <FloatInput id="b-name" label={t('booking.step1.nameLabel')} value={p.name} onChange={e => updateField('patient.name', e.target.value)} error={errors['patient.name']} required />
        <FloatInput id="b-email" label={t('booking.step1.emailLabel')} type="email" value={p.email} onChange={e => updateField('patient.email', e.target.value)} error={errors['patient.email']} required />
        <FloatInput id="b-phone" label={t('booking.step1.phoneLabel')} type="tel" value={p.phone} onChange={e => updateField('patient.phone', e.target.value)} error={errors['patient.phone']} hint={t('booking.step1.phoneHint')} required />
        <FloatInput id="b-age" label={`${t('booking.step1.ageLabel')} ${t('booking.step1.ageOptional')}`} type="number" min="1" max="120" value={p.age} onChange={e => updateField('patient.age', e.target.value)} />
        <div>
          <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{t('booking.step1.genderLabel')}</label>
          <div className="flex border border-[var(--border-default)] rounded-full overflow-hidden">
            {['male','female','other'].map(g => (
              <button key={g} type="button" onClick={() => updateField('patient.gender', g)} className={`flex-1 py-2.5 text-sm font-medium transition-all ${p.gender === g ? 'bg-terra-500 text-white' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'}`}>{t(`booking.step1.${g}`)}</button>
            ))}
          </div>
        </div>
        <Button variant="primary" className="w-full" disabled={!isValid} onClick={nextStep}>{t('booking.step1.nextBtn')}</Button>
      </div>
    </div>
  );
}