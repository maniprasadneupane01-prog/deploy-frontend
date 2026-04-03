const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NEPAL_PHONE_RE = /^(\+977[-\s]?)?[9][0-9]{9}$|^0?1[-\s]?[0-9]{6,7}$/;

export function validateName(name) {
  if (!name || name.trim().length < 2) return 'Full name must be at least 2 characters.';
  if (!/^[a-zA-Z\u0900-\u097F\s'.,-]+$/.test(name.trim())) return 'Name contains invalid characters.';
  return null;
}

export function validateEmail(email) {
  if (!email) return 'Email address is required.';
  if (!EMAIL_RE.test(email)) return 'Please enter a valid email address.';
  return null;
}

export function validatePhone(phone) {
  if (!phone) return 'Phone number is required.';
  if (!NEPAL_PHONE_RE.test(phone.replace(/\s/g, ''))) return 'Enter a valid Nepal phone number.';
  return null;
}

export function validateAge(age) {
  if (age === '' || age === undefined) return null;
  const n = parseInt(age, 10);
  if (isNaN(n) || n < 1 || n > 120) return 'Please enter a valid age (1-120).';
  return null;
}

export function isFutureDate(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const input = new Date(dateStr + 'T00:00:00');
  return input >= today;
}