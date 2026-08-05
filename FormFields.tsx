import { ReactNode } from 'react';

interface BigButtonProps {
  selected: boolean;
  onClick: () => void;
  icon?: ReactNode;
  label: string;
}

export function BigButton({ selected, onClick, icon, label }: BigButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-14 w-full items-center justify-center gap-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 active:scale-[0.98] ${
        selected
          ? 'border-[var(--primary)] bg-[var(--primary)] text-white shadow-md'
          : 'border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

interface CapsuleProps {
  selected: boolean;
  onClick: () => void;
  label: string;
}

export function Capsule({ selected, onClick, label }: CapsuleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
        selected
          ? 'border-[var(--primary)] bg-[var(--primary)] text-white'
          : 'border-[var(--border)] bg-white text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)]'
      }`}
    >
      {label}
    </button>
  );
}

interface TextInputProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: 'text' | 'tel' | 'number';
  error?: string;
  maxLength?: number;
  id?: string;
  hint?: string;
}

export function TextInput({ label, value, onChange, placeholder, required, type = 'text', error, maxLength, id, hint }: TextInputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[var(--text-primary)]">
          {label} {required && <span className="text-[var(--danger)]">*</span>}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-required={required}
        className={`h-12 rounded-[10px] border-2 px-4 text-[15px] text-[var(--text-primary)] outline-none transition-all duration-200 ${
          error
            ? 'border-[var(--danger)] bg-red-50'
            : 'border-[var(--border)] bg-white focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(0,71,171,0.1)]'
        }`}
      />
      {hint && !error && <span className="text-xs text-[var(--text-secondary)]">{hint}</span>}
      {error && <span className="text-xs text-[var(--danger)]" role="alert">{error}</span>}
    </div>
  );
}

interface TextAreaProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

export function TextArea({ label, value, onChange, placeholder, rows = 3, maxLength }: TextAreaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-[var(--text-primary)]">{label}</label>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        className="resize-none rounded-[10px] border-2 border-[var(--border)] bg-white px-4 py-3 text-[15px] text-[var(--text-primary)] outline-none transition-all focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(0,71,171,0.1)]"
      />
      {maxLength && (
        <span className="text-left text-xs text-[var(--text-secondary)]">{value.length} / {maxLength}</span>
      )}
    </div>
  );
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
}

export function Select({ label, value, onChange, options, placeholder = 'اختر...', required }: SelectProps) {
  return (
    <div className="relative flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-semibold text-[var(--text-primary)]">
          {label} {required && <span className="text-[var(--danger)]">*</span>}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`relative h-12 cursor-pointer rounded-[10px] border-2 bg-white px-4 text-[15px] outline-none transition-all ${
          value
            ? 'border-[var(--border)] text-[var(--text-primary)] focus:border-[var(--primary)] focus:shadow-[0_0_0_3px_rgba(0,71,171,0.1)]'
            : 'border-[var(--border)] text-[var(--text-secondary)] focus:border-[var(--primary)]'
        }`}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export function Toggle({ label, checked, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex items-center gap-2 text-sm font-medium text-[var(--text-primary)] transition-all active:scale-[0.97]"
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded-md border-2 transition-all ${checked ? 'border-[var(--primary)] bg-[var(--primary)]' : 'border-[var(--border)] bg-white'}`}>
        {checked && (
          <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </span>
      {label}
    </button>
  );
}
