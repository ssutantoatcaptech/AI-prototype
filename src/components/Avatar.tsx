type AvatarSize = 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120

interface AvatarProps {
  name?: string
  image?: string
  size?: AvatarSize
  shape?: 'circular' | 'square'
  color?: 'brand' | 'auto'
}

const sizeMap: Record<AvatarSize, string> = {
  20: 'w-5 h-5 text-[8px]', 24: 'w-6 h-6 text-[9px]', 28: 'w-7 h-7 text-[10px]',
  32: 'w-8 h-8 text-xs', 36: 'w-9 h-9 text-xs', 40: 'w-10 h-10 text-sm',
  48: 'w-12 h-12 text-sm', 56: 'w-14 h-14 text-base', 64: 'w-16 h-16 text-lg',
  72: 'w-[72px] h-[72px] text-xl', 96: 'w-24 h-24 text-2xl', 120: 'w-[120px] h-[120px] text-3xl',
}

const colors = ['#0078D4','#107C10','#8764B8','#D83B01','#038387','#CA5010','#C239B3','#0099BC']

function getColor(name: string) {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
  return colors[Math.abs(hash) % colors.length]
}

function initials(name: string) {
  const parts = name.trim().split(/\s+/)
  return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase()
}

export default function Avatar({ name = '', image, size = 32, shape = 'circular', color = 'auto' }: AvatarProps) {
  const bg = color === 'brand' ? '#0078D4' : getColor(name || 'U')
  const shapeClass = shape === 'circular' ? 'rounded-full' : 'rounded'
  return (
    <div className={`inline-flex items-center justify-center font-semibold text-white shrink-0 overflow-hidden ${sizeMap[size]} ${shapeClass}`}
      style={{ backgroundColor: image ? undefined : bg }}>
      {image
        ? <img src={image} alt={name} className="w-full h-full object-cover" />
        : <span>{name ? initials(name) : '?'}</span>
      }
    </div>
  )
}
