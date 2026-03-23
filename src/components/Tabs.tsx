import { type ReactNode, useState } from 'react'

interface Tab {
  id: string
  label: string
  icon?: ReactNode
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  size?: 'small' | 'medium' | 'large'
}

const sizeMap = { small: 'text-xs px-2 py-1.5', medium: 'text-sm px-3 py-2', large: 'text-base px-4 py-2.5' }

export default function Tabs({ tabs, defaultTab, size = 'medium' }: TabsProps) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id)
  const activeTab = tabs.find(t => t.id === active)
  return (
    <div className="flex flex-col">
      <div className="flex border-b border-[#EDEBE9] gap-0">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActive(tab.id)}
            className={`inline-flex items-center gap-1.5 font-semibold transition-colors border-b-2 -mb-px ${sizeMap[size]}
              ${active === tab.id
                ? 'text-[#0078D4] border-[#0078D4]'
                : 'text-[#605E5C] border-transparent hover:text-[#201F1E] hover:border-[#C8C6C4]'
              }`}>
            {tab.icon && <span className="text-base">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-4">{activeTab?.content}</div>
    </div>
  )
}
