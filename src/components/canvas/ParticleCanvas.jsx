import { useRef } from 'react';
import { useParticleCanvas } from '../../hooks/useParticleCanvas';

export default function ParticleCanvas({ theme = 'dark' }) {
  const ref = useRef(null);
  useParticleCanvas(ref, theme);
  return <canvas ref={ref} aria-hidden="true" role="presentation" className="absolute inset-0 w-full h-full" />;
}