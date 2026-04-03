import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[400] flex items-center justify-center"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-[rgba(10,10,15,0.96)]" />
        <motion.div
          className="relative w-full max-w-4xl mx-4 aspect-[4/5] max-h-[80vh] rounded-xl overflow-hidden"
          initial={{ scale: 0.88, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.88, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={e => e.stopPropagation()}
        >
          <div className="w-full h-full" style={{ background: images[currentIndex] }} />
          <button onClick={onClose} className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors" aria-label="Close">✕</button>
          <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors" aria-label="Previous">←</button>
          <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors" aria-label="Next">→</button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
