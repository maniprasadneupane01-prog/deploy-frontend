export default function NewariPattern({ width = '100%', height = 60, opacity = 0.06, style = {} }) {
  const cells = 20;
  const cellW = 60;
  return (
    <svg
      width={width} height={height} viewBox={`0 0 ${cells * cellW} ${height}`}
      fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"
      style={{ opacity, ...style }}
    >
      {Array.from({ length: cells }).map((_, i) => (
        <g key={i} transform={`translate(${i * cellW + 10}, 10)`}>
          <rect x="0" y="0" width="40" height="40" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M20 5 L35 20 L20 35 L5 20Z" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <line x1="20" y1="0" x2="20" y2="40" stroke="currentColor" strokeWidth="0.3" />
          <line x1="0" y1="20" x2="40" y2="20" stroke="currentColor" strokeWidth="0.3" />
        </g>
      ))}
    </svg>
  );
}
