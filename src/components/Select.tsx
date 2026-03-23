import { type SelectHTMLAttributes } from 'react'

interface SelectOption { label: string; value: string }

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  hint?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export default function Select({ label, hint, error, options, placeholder, id, className = '', ...props }: SelectProps) {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={selectId} className="text-sm font-semibold text-[#201F1E]">{label}</label>}
      <div className="relative">
        <select id={selectId}
          className={`w-full appearance-none bg-white border rounded px-2.5 py-1.5 pr-8 text-sm text-[#201F1E] transition-colors cursor-pointer
            ${error ? 'border-[#A4262C] focus:outline focus:outline-2 focus:outline-[#A4262C]' : 'border-[#8A8886] focus:border-[#0078D4] focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-[#0078D4]'}
            disabled:bg-[#F3F2F1] disabled:text-[#A19F9D] disabled:cursor-not-allowed`}
          {...props}>
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#605E5C] text-xs">⌄</span>
      </div>
      {error && <span className="text-xs text-[#A4262C]">{error}</span>}
      {!error && hint && <span className="text-xs text-[#605E5C]">{hint}</span>}
    </div>
  )
}
