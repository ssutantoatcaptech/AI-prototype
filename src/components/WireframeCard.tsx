interface WireframeCardProps {
  children: React.ReactNode
  footer?: boolean
}

export function WireframeBrand({ title = 'Member Benefits Portal' }: { title?: string }) {
  return (
    <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-gray-200">
      <div className="w-6 h-6 border-2 border-gray-800 rounded-sm flex items-center justify-center flex-shrink-0">
        <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
      </div>
      <span className="text-sm font-semibold text-gray-800">{title}</span>
    </div>
  )
}

export function WireframeFooter() {
  return (
    <div className="px-5 py-3 border-t border-gray-200 flex justify-center gap-3 text-xs text-gray-400">
      <a href="#" className="hover:text-gray-600">Privacy Policy</a>
      <span>·</span>
      <a href="#" className="hover:text-gray-600">Terms of Service</a>
      <span>·</span>
      <a href="#" className="hover:text-gray-600">Accessibility</a>
    </div>
  )
}

export function WireframeLabel({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-gray-700 mb-1">{children}</label>
}

export function WireframeInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full px-3 py-2 text-sm border border-gray-400 rounded-sm bg-white placeholder:text-gray-400 focus:outline-none focus:border-gray-800 ${props.className ?? ''}`}
    />
  )
}

export function WireframeButton({ children, outline = false, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { outline?: boolean }) {
  return (
    <button
      {...props}
      className={`w-full py-2.5 text-sm font-semibold rounded-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        outline
          ? 'border border-gray-800 text-gray-800 bg-white hover:bg-gray-50'
          : 'bg-gray-900 text-white hover:bg-black'
      } ${props.className ?? ''}`}
    >
      {children}
    </button>
  )
}

export function WireframeSteps({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200 bg-gray-50">
      <div className="flex items-center gap-1.5">
        {Array.from({ length: total }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all ${
              i < current ? 'w-5 bg-gray-800' : i === current ? 'w-5 bg-gray-800' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 font-medium">Step {current + 1} of {total}</span>
    </div>
  )
}

export default function WireframeCard({ children, footer = true }: WireframeCardProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-gray-300 rounded-sm">
        {children}
        {footer && <WireframeFooter />}
      </div>
      <p className="mt-4 text-xs text-gray-400">© 2025 Member Benefits Portal</p>
    </div>
  )
}
