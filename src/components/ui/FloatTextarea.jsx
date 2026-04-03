export default function FloatTextarea({ label, error, id, maxLength, value, onChange, ...props }) {
  const charCount = value?.length || 0;
  const nearLimit = maxLength && charCount > maxLength * 0.9;

  return (
    <div className="relative">
      <textarea
        id={id}
        placeholder=" "
        value={value || ''}
        onChange={onChange}
        maxLength={maxLength}
        rows={4}
        className={`w-full px-4 py-3.5 bg-transparent border rounded-lg text-sm transition-all duration-200 resize-none h-[100px]
          peer focus:outline-none focus:border-terra-500 focus:shadow-[0_0_0_3px_rgba(192,82,42,0.15)]
          ${error ? 'border-red-500' : 'border-[rgba(201,185,154,0.25)]'}`}
        aria-invalid={!!error}
        {...props}
      />
      <label
        htmlFor={id}
        className="absolute left-4 top-3.5 text-sm text-[var(--text-muted)] transition-all duration-200 pointer-events-none
          peer-focus:top-[-0.5rem] peer-focus:text-[0.72rem] peer-focus:text-terra-500 peer-focus:bg-[var(--bg-card)] peer-focus:px-1
          peer-[:not(:placeholder-shown)]:top-[-0.5rem] peer-[:not(:placeholder-shown)]:text-[0.72rem] peer-[:not(:placeholder-shown)]:bg-[var(--bg-card)] peer-[:not(:placeholder-shown)]:px-1"
      >
        {label}
      </label>
      {maxLength && (
        <p className={`absolute bottom-2 right-3 text-xs font-mono ${nearLimit ? 'text-red-500' : 'text-[var(--text-muted)]'}`}>
          {charCount}/{maxLength}
        </p>
      )}
      {error && <p role="alert" className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
