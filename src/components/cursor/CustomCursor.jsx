import { useCustomCursor } from '../../hooks/useCustomCursor';

export default function CustomCursor() {
  const { dotRef, ringRef } = useCustomCursor();

  return (
    <>
      <div ref={dotRef} className="fixed w-2 h-2 bg-terra-500 rounded-full pointer-events-none z-[9999] mix-blend-difference" style={{ left: 0, top: 0 }} aria-hidden="true" />
      <div ref={ringRef} className="fixed w-[34px] h-[34px] border-2 border-terra-500/50 rounded-full pointer-events-none z-[9999] transition-transform duration-150" style={{ left: 0, top: 0 }} aria-hidden="true" />
    </>
  );
}