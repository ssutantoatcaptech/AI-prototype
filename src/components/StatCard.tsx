interface Props {
  title: string
  value: string | number
  subtitle?: string
  accent?: 'blue' | 'green' | 'purple' | 'orange'
}

const accents = {
  blue: 'text-blue-400',
  green: 'text-green-400',
  purple: 'text-purple-400',
  orange: 'text-orange-400',
}

export default function StatCard({ title, value, subtitle, accent = 'blue' }: Props) {
  return (
    <div className="card">
      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">{title}</div>
      <div className={`text-2xl font-bold ${accents[accent]}`}>{value}</div>
      {subtitle && <div className="text-xs text-gray-600 mt-1">{subtitle}</div>}
    </div>
  )
}
