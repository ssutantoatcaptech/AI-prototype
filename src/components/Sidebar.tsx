import { type Page } from '../types'

interface Props {
  activePage: Page
  onNavigate: (page: Page) => void
  tableCount?: number
}

const navItems: { id: Page; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '▦' },
  { id: 'tables', label: 'Tables', icon: '⊞' },
  { id: 'query', label: 'Query Editor', icon: '❯_' },
  { id: 'activity', label: 'Activity Log', icon: '≡' },
  { id: 'figma', label: 'Figma Files', icon: '✦' },
  { id: 'components', label: 'Components', icon: '⬡' },
  { id: 'moo', label: 'MoO Portal', icon: 'M' },
]

export default function Sidebar({ activePage, onNavigate, tableCount }: Props) {
  return (
    <aside className="w-56 bg-gray-900 border-r border-gray-800 flex flex-col h-screen fixed top-0 left-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            DB
          </div>
          <div>
            <div className="font-semibold text-sm text-white">DB Dashboard</div>
            <div className="text-xs text-gray-500">demo.db · SQLite</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              activePage === item.id
                ? 'bg-blue-600/20 text-blue-400 font-medium'
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
            }`}
          >
            <span className="text-xs opacity-70 font-mono w-5 text-center">{item.icon}</span>
            {item.label}
            {item.id === 'tables' && tableCount !== undefined && (
              <span className="ml-auto text-xs bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded-full">
                {tableCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-800">
        <div className="text-xs text-gray-600">Database Dashboard v1.0</div>
      </div>
    </aside>
  )
}
