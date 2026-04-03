export function trackEvent(category, action, label) {
  if (import.meta.env.DEV) console.log(`[Analytics] ${category} / ${action} / ${label}`);
}