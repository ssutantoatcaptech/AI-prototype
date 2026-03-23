import { type ReactNode, useState } from 'react'

type Intent = 'info' | 'success' | 'warning' | 'error'

interface MessageBarProps {
  intent?: Intent
  children: ReactNode
  title?: string
  dismissible?: boolean
}

const config: Record<Intent, { bar: string; icon: string; emoji: string }> = {
  info:    { bar: 'bg-[#EEF0FB] border-[#0027B4]', icon: 'text-[#0027B4]', emoji: 'ℹ' },
  success: { bar: 'bg-[#DFF6DD] border-[#107C10]', icon: 'text-[#107C10]', emoji: '✓' },
  warning: { bar: 'bg-[#FFF4CE] border-[#D83B01]', icon: 'text-[#D83B01]', emoji: '⚠' },
  error:   { bar: 'bg-[#FDE7E9] border-[#A4262C]', icon: 'text-[#A4262C]', emoji: '✕' },
}

export default function MessageBar({ intent = 'info', children, title, dismissible = false }: MessageBarProps) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  const { bar, icon, emoji } = config[intent]
  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded border-l-4 ${bar}`} role="alert">
      <span className={`text-base font-bold shrink-0 mt-0.5 ${icon}`}>{emoji}</span>
      <div className="flex-1 text-sm text-[#201F1E]">
        {title && <div className="font-semibold mb-0.5">{title}</div>}
        <div className="text-[#605E5C]">{children}</div>
      </div>
      {dismissible && (
        <button onClick={() => setDismissed(true)} className="text-[#605E5C] hover:text-[#201F1E] text-xs shrink-0 mt-0.5">✕</button>
      )}
    </div>
  )
}
