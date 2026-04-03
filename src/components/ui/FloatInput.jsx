export default function FloatInput({ label, error, hint, id, ...props }) {
  return (
    <div className="relative">
      <input
        id={id}
        placeholder=" "
        className={`w-full px-4 py-3.5 bg-transparent border rounded-lg text-sm transition-all duration-200
          peer focus:outline-none focus:border-terra-500 focus:shadow-[0_0_0_3px_rgba(192,82,42,0.15)]
          ${error ? 'border-red-500' : 'border-[rgba(201,185,154,0.25)]'}`}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)] transition-all duration-200 pointer-events-none
          peer-focus:top-[-0.5rem] peer-focus:text-[0.72rem] peer-focus:text-terra-500 peer-focus:bg-[var(--bg-card)] peer-focus:px-1
          peer-[:not(:placeholder-shown)]:top-[-0.5rem] peer-[:not(:placeholder-shown)]:text-[0.72rem] peer-[:not(:placeholder-shown)]:bg-[var(--bg-card)] peer-[:not(:placeholder-shown)]:px-1
          ${error ? 'peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:text-red-500' : ''}"
      >
        {label}
      </label>
      {hint && !error && <p id={`${id}-hint`} className="text-xs text-[var(--text-muted)] mt-1.5">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-red-500 mt-1.5 animate-fade-down">{error}</p>}
    </div>
  );
}
