export default function LogoIcon({ size = 40, color = 'currentColor' }) {
  return (
    <svg
      width={size} height={size} viewBox="0 0 40 40" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-label="Biraj Dental Logo" role="img"
      style={{ transition: 'transform 0.3s ease' }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) rotate(3deg)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ''; }}
    >
      <path
        d="M20 4C16 4 13 7 12 11C11 15 10 18 9 22C8 26 7 31 10 34C12 36 15 36 16 33C17 30 17 27 18 25C19 23 19.5 22 20 22C20.5 22 21 23 22 25C23 27 23 30 24 33C25 36 28 36 30 34C33 31 32 26 31 22C30 18 29 15 28 11C27 7 24 4 20 4Z"
        fill={color} opacity="0.9"
      />
      <path
        d="M15 8C15 8 17 6 20 6C23 6 25 8 25 8"
        stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"
      />
    </svg>
  );
}
