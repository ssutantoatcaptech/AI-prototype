import { type InputHTMLAttributes } from 'react'

interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string
  labelPosition?: 'before' | 'after'
}

export default function Toggle({ label, labelPosition = 'after', disabled, id, ...props }: ToggleProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-')
  return (
    <label htmlFor={inputId} className={`inline-flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
      {label && labelPosition === 'before' && <span className="text-sm text-[#201F1E]">{label}</span>}
      <div className="relative">
        <input id={inputId} type="checkbox" disabled={disabled} className="peer sr-only" {...props} />
        <div className="w-10 h-5 bg-[#8A8886] rounded-full transition-colors peer-checked:bg-[#0078D4] peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0078D4]" />
        <div className="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform peer-checked:translate-x-5" />
      </div>
      {label && labelPosition === 'after' && <span className="text-sm text-[#201F1E]">{label}</span>}
    </label>
  )
}
