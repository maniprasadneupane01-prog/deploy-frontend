import { cloneElement } from 'react';
import { useMagneticButton } from '../../hooks/useMagneticButton';

export default function MagneticWrap({ children, strength = 0.35 }) {
  const ref = useMagneticButton(strength);
  return cloneElement(children, { ref });
}