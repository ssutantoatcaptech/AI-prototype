interface ProgressBarProps {
  value?: number        // 0–100, undefined = indeterminate
  thickness?: 'medium' | 'large'
  color?: 'brand' | 'success' | 'warning' | 'error'
  label?: string
  hint?: string
}

const colorMap = {
  brand:   'bg-[#0078D4]',
  success: 'bg-[#107C10]',
  warning: 'bg-[#D83B01]',
  error:   'bg-[#A4262C]',
}

const thicknessMap = { medium: 'h-1', large: 'h-2' }

export default function ProgressBar({ value, thickness = 'medium', color = 'brand', label, hint }: ProgressBarProps) {
  const indeterminate = value === undefined
  return (
    <div className="flex flex-col gap-1 w-full">
      {(label || hint) && (
        <div className="flex justify-between items-center">
          {label && <span className="text-sm text-[#201F1E]">{label}</span>}
          {hint && <span className="text-xs text-[#605E5C]">{hint}</span>}
        </div>
      )}
      <div className={`w-full bg-[#EDEBE9] rounded-full overflow-hidden ${thicknessMap[thickness]}`}>
        {indeterminate ? (
          <div className={`h-full w-1/3 rounded-full ${colorMap[color]} animate-[slide_1.5s_ease-in-out_infinite]`}
            style={{ animation: 'indeterminate 1.5s ease-in-out infinite' }} />
        ) : (
          <div className={`h-full rounded-full transition-all duration-300 ${colorMap[color]}`}
            style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
        )}
      </div>
      {!indeterminate && value !== undefined && (
        <span className="text-xs text-[#605E5C] text-right">{Math.round(value)}%</span>
      )}
      <style>{`@keyframes indeterminate { 0% { transform: translateX(-100%) } 100% { transform: translateX(400%) } }`}</style>
    </div>
  )
}
