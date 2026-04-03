import { useState, useCallback } from 'react';
import { api } from '../utils/api';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEPAL_PHONE_RE = /^(\+977[-\s]?)?[9][0-9]{9}$|^0?1[-\s]?[0-9]{6,7}$/;

export function useBookingForm(onSuccess, onError) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    patient: { name: '', email: '', phone: '', age: '', gender: '' },
    appointment: { service: '', branch: '', date: '', timeSlot: '', notes: '' },
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [response, setResponse] = useState(null);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const updateField = useCallback((path, value) => {
    setFormData(prev => {
      const [section, field] = path.split('.');
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
    setErrors(prev => {
      const next = { ...prev };
      delete next[path];
      return next;
    });
  }, []);

  const validate = useCallback((stepNum) => {
    const errs = {};
    if (stepNum === 1) {
      const { name, email, phone } = formData.patient;
      if (!name || name.trim().length < 2) errs['patient.name'] = 'Please enter your full name.';
      if (!email || !EMAIL_RE.test(email)) errs['patient.email'] = 'Please enter a valid email.';
      if (!phone || !NEPAL_PHONE_RE.test(phone.replace(/\s/g, ''))) errs['patient.phone'] = 'Enter a valid Nepal phone number.';
    } else if (stepNum === 2) {
      const { service, branch, date, timeSlot } = formData.appointment;
      if (!service) errs['appointment.service'] = 'Please select a service.';
      if (!branch) errs['appointment.branch'] = 'Please select a branch.';
      if (!date) errs['appointment.date'] = 'Please select a date.';
      if (!timeSlot) errs['appointment.timeSlot'] = 'Please select a time slot.';
    } else if (stepNum === 3) {
      if (!confirmChecked) errs['confirm'] = 'Please confirm your details.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData, confirmChecked]);

  const nextStep = useCallback(() => {
    if (validate(step)) setStep(s => Math.min(s + 1, 3));
  }, [step, validate]);

  const prevStep = useCallback(() => {
    setStep(s => Math.max(s - 1, 1));
    setErrors({});
  }, []);

  const submit = useCallback(async () => {
    if (!validate(3)) return;
    setIsSubmitting(true);
    try {
      const { data } = await api.post('/appointments', formData);
      setResponse(data.data);
      setStep(4);
      if (onSuccess) onSuccess(data.data);
    } catch (err) {
      const status = err.response?.status;
      const msg = err.response?.data?.message;
      if (status === 409) onError?.(msg);
      else if (status === 400) {
        const details = err.response?.data?.details;
        const msgs = details ? Object.values(details).slice(0, 2) : [msg];
        onError?.(msgs.join('. '));
      } else if (status === 429) onError?.('Too many requests. Please wait a minute.');
      else if (status === 500 || !status) {
        onError?.('Could not reach the server. Please call 9851031257 to book by phone.');
      } else {
        onError?.('Server error. Please call 9851031257.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validate, onSuccess, onError]);

  const reset = useCallback(() => {
    setStep(1);
    setFormData({
      patient: { name: '', email: '', phone: '', age: '', gender: '' },
      appointment: { service: '', branch: '', date: '', timeSlot: '', notes: '' },
    });
    setErrors({});
    setResponse(null);
    setConfirmChecked(false);
    setIsSubmitting(false);
  }, []);

  return {
    step, formData, errors, isSubmitting, response, confirmChecked,
    setConfirmChecked, updateField, nextStep, prevStep, submit, reset,
  };
}
