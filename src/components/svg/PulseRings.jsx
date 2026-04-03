export default function PulseRings() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      {[0, 0.8, 1.6].map((delay, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${100 + i * 30}%`,
            height: `${100 + i * 30}%`,
            borderRadius: '50%',
            border: '2px solid var(--terra-500)',
            opacity: 0.4,
            animation: `pulseRing 2s ease-out ${delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
