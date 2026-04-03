export default function ToothOutline({ width = 420, opacity = 0.04, style = {} }) {
  return (
    <svg
      width={width} viewBox="0 0 200 240" fill="none"
      xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ opacity, ...style }}
    >
      <path
        d="M100 20C70 20 50 40 45 70C40 100 35 130 30 160C25 190 20 210 40 220C55 228 70 225 75 210C80 195 80 175 85 160C90 145 95 135 100 135C105 135 110 145 115 160C120 175 120 195 125 210C130 225 145 228 160 220C180 210 175 190 170 160C165 130 160 100 155 70C150 40 130 20 100 20Z"
        stroke="currentColor" strokeWidth="2" fill="none"
      />
    </svg>
  );
}
