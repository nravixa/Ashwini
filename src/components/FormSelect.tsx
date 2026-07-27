import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FormSelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  required?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
  name?: string;
  value?: any;
  onChange?: (e: any) => void;
  className?: string;
}

export default function FormSelect({ label, error, required, options, placeholder, className = "", ...props }: FormSelectProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans text-xs uppercase tracking-widest text-white/70 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <select
          {...props}
          className={`w-full bg-white/5 border ${
            error ? "border-red-500" : "border-white/10 focus:border-rose-gold focus:shadow-[0_0_15px_rgba(240,140,174,0.3)]"
          } outline-none px-4 py-3 pr-8 rounded-xl font-sans text-sm text-white cursor-pointer appearance-none transition-all duration-300 ${className}`}
        >
          {placeholder && (
            <option value="" disabled className="bg-background text-white">
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-background text-white">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/70 pointer-events-none" />
      </div>
      {error && (
        <span className="text-xs text-red-500 font-sans">{error}</span>
      )}
    </div>
  );
}
