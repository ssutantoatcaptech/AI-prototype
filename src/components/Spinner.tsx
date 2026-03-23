type SpinnerSize = 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large' | 'huge'

interface SpinnerProps {
  size?: SpinnerSize
  label?: string
  labelPosition?: 'above' | 'below' | 'before' | 'after'
}

const sizeMap: Record<SpinnerSize, string> = {
  'tiny': 'w-2 h-2 border-[1.5px]',
  'extra-small': 'w-3 h-3 border-2',
  'small': 'w-4 h-4 border-2',
  'medium': 'w-5 h-5 border-2',
  'large': 'w-8 h-8 border-[3px]',
  'extra-large': 'w-12 h-12 border-4',
  'huge': 'w-16 h-16 border-4',
}

export default function Spinner({ size = 'medium', label, labelPosition = 'after' }: SpinnerProps) {
  const spinner = (
    <span className={`inline-block rounded-full border-[#0078D4] border-t-transparent animate-spin ${sizeMap[size]}`} role="progressbar" aria-label={label || 'Loading'} />
  )
  if (!label) return spinner
  const isVertical = labelPosition === 'above' || labelPosition === 'below'
  return (
    <div className={`inline-flex items-center gap-2 ${isVertical ? 'flex-col' : 'flex-row'}`}>
      {(labelPosition === 'above' || labelPosition === 'before') && <span className="text-sm text-[#605E5C]">{label}</span>}
      {spinner}
      {(labelPosition === 'below' || labelPosition === 'after') && <span className="text-sm text-[#605E5C]">{label}</span>}
    </div>
  )
}
