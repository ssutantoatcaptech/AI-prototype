import { type InputHTMLAttributes, type ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  hint?: string
  error?: string
  contentBefore?: ReactNode
  contentAfter?: ReactNode
}

export default function Input({ label, hint, error, contentBefore, contentAfter, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-[#201F1E]">
          {label}
        </label>
      )}
      <div className={`flex items-center bg-white border rounded px-2.5 py-1.5 gap-2 transition-colors
        ${error ? 'border-[#A4262C] focus-within:outline focus-within:outline-2 focus-within:outline-[#A4262C]' : 'border-[#8A8886] focus-within:border-[#0078D4] focus-within:outline focus-within:outline-2 focus-within:outline-offset-0 focus-within:outline-[#0078D4]'}
        ${props.disabled ? 'bg-[#F3F2F1] border-[#C8C6C4] cursor-not-allowed' : ''}
      `}>
        {contentBefore && <span className="text-[#605E5C] shrink-0">{contentBefore}</span>}
        <input
          id={inputId}
          className="flex-1 text-sm text-[#201F1E] bg-transparent outline-none placeholder-[#A19F9D] disabled:cursor-not-allowed disabled:text-[#A19F9D]"
          {...props}
        />
        {contentAfter && <span className="text-[#605E5C] shrink-0">{contentAfter}</span>}
      </div>
      {error && <span className="text-xs text-[#A4262C]">{error}</span>}
      {!error && hint && <span className="text-xs text-[#605E5C]">{hint}</span>}
    </div>
  )
}
