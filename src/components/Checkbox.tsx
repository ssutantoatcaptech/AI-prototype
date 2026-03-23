import { type InputHTMLAttributes } from 'react'

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  hint?: string
}

export default function Checkbox({ label, hint, disabled, className = '', id, ...props }: CheckboxProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <label htmlFor={inputId} className={`inline-flex items-start gap-2 cursor-pointer ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      <div className="relative flex items-center justify-center mt-0.5">
        <input
          id={inputId}
          type="checkbox"
          disabled={disabled}
          className="peer sr-only"
          {...props}
        />
        <div className="w-4 h-4 border-2 border-[#8A8886] rounded-sm bg-white
          peer-checked:bg-[#0078D4] peer-checked:border-[#0078D4]
          peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0078D4]
          transition-colors flex items-center justify-center">
          <svg className="hidden peer-checked:block w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6L4.5 9L10.5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="absolute w-4 h-4 peer-checked:[&>svg]:block">
          <svg className="hidden w-2.5 h-2.5 text-white absolute inset-0 m-auto" viewBox="0 0 12 12" fill="none">
            <path d="M1.5 6L4.5 9L10.5 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {(label || hint) && (
        <div className="flex flex-col">
          {label && <span className="text-sm text-[#201F1E]">{label}</span>}
          {hint && <span className="text-xs text-[#605E5C]">{hint}</span>}
        </div>
      )}
    </label>
  )
}
