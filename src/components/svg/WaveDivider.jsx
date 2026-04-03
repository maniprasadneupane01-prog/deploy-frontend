export default function WaveDivider({ fill = 'top', color = 'var(--bg-page)' }) {
  const flip = fill === 'bottom' ? 'rotate(180)' : '';
  return (
    <svg width="100%" height="60" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" style={{ display: 'block', transform: flip }}>
      <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60Z" fill={color} />
    </svg>
  );
}
