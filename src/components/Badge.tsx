import { type ReactNode } from 'react'

type BadgeColor = 'brand' | 'success' | 'warning' | 'danger' | 'informative' | 'subtle'
type BadgeSize = 'small' | 'medium' | 'large'
type BadgeAppearance = 'filled' | 'ghost' | 'outline' | 'tint'

interface BadgeProps {
  children: ReactNode
  color?: BadgeColor
  size?: BadgeSize
  appearance?: BadgeAppearance
  shape?: 'rounded' | 'circular' | 'square'
}

const colorMap: Record<BadgeColor, Record<BadgeAppearance, string>> = {
  brand:       { filled: 'bg-[#0078D4] text-white', ghost: 'text-[#0078D4]', outline: 'border border-[#0078D4] text-[#0078D4]', tint: 'bg-[#DEECF9] text-[#0078D4]' },
  success:     { filled: 'bg-[#107C10] text-white', ghost: 'text-[#107C10]', outline: 'border border-[#107C10] text-[#107C10]', tint: 'bg-[#DFF6DD] text-[#107C10]' },
  warning:     { filled: 'bg-[#D83B01] text-white', ghost: 'text-[#D83B01]', outline: 'border border-[#D83B01] text-[#D83B01]', tint: 'bg-[#FED9CC] text-[#D83B01]' },
  danger:      { filled: 'bg-[#A4262C] text-white', ghost: 'text-[#A4262C]', outline: 'border border-[#A4262C] text-[#A4262C]', tint: 'bg-[#FDE7E9] text-[#A4262C]' },
  informative: { filled: 'bg-[#0027B4] text-white', ghost: 'text-[#0027B4]', outline: 'border border-[#0027B4] text-[#0027B4]', tint: 'bg-[#EEF0FB] text-[#0027B4]' },
  subtle:      { filled: 'bg-[#E1DFDD] text-[#201F1E]', ghost: 'text-[#605E5C]', outline: 'border border-[#8A8886] text-[#605E5C]', tint: 'bg-[#F3F2F1] text-[#605E5C]' },
}

const sizeMap: Record<BadgeSize, string> = {
  small:  'text-[10px] px-1 h-4 min-w-[16px]',
  medium: 'text-xs px-1.5 h-5 min-w-[20px]',
  large:  'text-sm px-2 h-6 min-w-[24px]',
}

const shapeMap = { rounded: 'rounded', circular: 'rounded-full', square: 'rounded-none' }

export default function Badge({ children, color = 'brand', size = 'medium', appearance = 'filled', shape = 'rounded' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center justify-center font-semibold ${colorMap[color][appearance]} ${sizeMap[size]} ${shapeMap[shape]}`}>
      {children}
    </span>
  )
}
