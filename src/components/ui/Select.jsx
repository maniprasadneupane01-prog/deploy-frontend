export default function Select({ label, error, id, children, ...props }) {
  return (
    <div>
      {label && <label htmlFor={id} className="block text-sm font-medium text-[var(--text-secondary)] mb-2">{label}</label>}
      <select
        id={id}
        className={`w-full px-4 py-3 bg-[var(--bg-card)] border rounded-lg text-sm transition-all duration-200 focus:outline-none focus:border-terra-500 focus:shadow-[0_0_0_3px_rgba(192,82,42,0.15)] appearance-none cursor-pointer
          ${error ? 'border-red-500' : 'border-[rgba(201,185,154,0.25)]'}`}
        aria-invalid={!!error}
        {...props}
      >
        {children}
      </select>
      {error && <p role="alert" className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
