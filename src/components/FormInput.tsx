import React from 'react';

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export default function FormInput({ label, error, required, className = "", ...props }: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-sans text-xs uppercase tracking-widest text-white/70 font-semibold">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className={`bg-white/5 border ${
          error ? "border-red-500" : "border-white/10 focus:border-rose-gold focus:shadow-[0_0_15px_rgba(240,140,174,0.3)]"
        } outline-none px-4 py-3 rounded-xl font-sans text-sm text-white placeholder-white/30 transition-all duration-300 w-full ${className}`}
      />
      {error && (
        <span className="text-xs text-red-500 font-sans">{error}</span>
      )}
    </div>
  );
}
