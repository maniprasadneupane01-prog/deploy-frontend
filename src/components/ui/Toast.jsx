import { useState, useEffect } from 'react';

let toastId = 0;
const listeners = [];

export function toast(message, type = 'error') {
  const id = ++toastId;
  listeners.forEach(fn => fn({ id, message, type }));
  setTimeout(() => {
    listeners.forEach(fn => fn({ id, remove: true }));
  }, 5000);
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (t) => {
      if (t.remove) setToasts(prev => prev.filter(x => x.id !== t.id));
      else setToasts(prev => [...prev, t]);
    };
    listeners.push(handler);
    return () => { listeners.splice(listeners.indexOf(handler), 1); };
  }, []);

  const colors = {
    error: 'border-red-500/30 bg-red-500/10',
    success: 'border-green-500/30 bg-green-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
  };

  return (
    <div className="fixed top-4 right-4 left-4 z-[500] flex flex-col gap-3 sm:left-auto sm:max-w-sm" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`px-5 py-3.5 rounded-lg border backdrop-blur-sm text-sm animate-fade-down ${colors[t.type] || colors.error}`}>
          {t.message}
        </div>
      ))}
    </div>
  );
}
