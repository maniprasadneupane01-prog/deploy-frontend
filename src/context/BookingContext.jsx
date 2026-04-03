import { createContext, useContext, useRef, useState } from 'react';

const BookingCtx = createContext(null);

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const triggerRef = useRef(null);

  const openPanel = (service = null, triggerEl = null) => {
    setSelectedService(service);
    triggerRef.current = triggerEl || document.activeElement;
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
      triggerRef.current.focus();
    }
    triggerRef.current = null;
  };

  return (
    <BookingCtx.Provider value={{ isOpen, selectedService, openPanel, closePanel }}>
      {children}
    </BookingCtx.Provider>
  );
}

export const useBooking = () => {
  const ctx = useContext(BookingCtx);
  if (!ctx) throw new Error('useBooking must be inside BookingProvider');
  return ctx;
};
