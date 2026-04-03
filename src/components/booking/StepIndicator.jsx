export default function StepIndicator({ currentStep }) {
  const steps = [
    { label: 'Your Details' },
    { label: 'Appointment' },
    { label: 'Review' },
  ];

  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {steps.map((s, i) => {
        const num = i + 1;
        const isPast = num < currentStep;
        const isCurrent = num === currentStep;
        return (
          <div key={i} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                isPast ? 'bg-terra-500 text-white' : isCurrent ? 'border-2 border-terra-500 text-terra-500 animate-pulse' : 'border border-[var(--border-default)] text-[var(--text-disabled)]'
              }`}>
                {isPast ? (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="white" strokeWidth="2"><path d="M3 7l3 3 5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                ) : num}
              </div>
              <span className="text-[0.65rem] font-sans mt-1.5 text-[var(--text-muted)]">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-2 mb-5 transition-all duration-500 ${num < currentStep ? 'bg-terra-500' : 'bg-[var(--border-default)]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}