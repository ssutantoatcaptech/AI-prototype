import { type ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  onDismiss?: () => void
  size?: 'small' | 'medium' | 'large'
  appearance?: 'filled' | 'outline' | 'brand'
  disabled?: boolean
}

const sizeMap = { small: 'h-5 text-xs px-1.5 gap-1', medium: 'h-6 text-xs px-2 gap-1.5', large: 'h-8 text-sm px-3 gap-2' }
const appearanceMap = {
  filled:  'bg-[#E1DFDD] text-[#201F1E] border border-transparent',
  outline: 'bg-white text-[#201F1E] border border-[#8A8886]',
  brand:   'bg-[#DEECF9] text-[#0078D4] border border-transparent',
}

export default function Tag({ children, onDismiss, size = 'medium', appearance = 'filled', disabled }: TagProps) {
  return (
    <span className={`inline-flex items-center rounded font-medium ${sizeMap[size]} ${appearanceMap[appearance]} ${disabled ? 'opacity-40' : ''}`}>
      <span>{children}</span>
      {onDismiss && (
        <button onClick={disabled ? undefined : onDismiss} disabled={disabled}
          className="flex items-center justify-center hover:bg-black/10 rounded-sm transition-colors w-3.5 h-3.5 shrink-0 text-[10px]">
          ✕
        </button>
      )}
    </span>
  )
}
