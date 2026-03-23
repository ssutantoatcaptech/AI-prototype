interface ProgressDotsProps {
  steps: number
  current: number
}

export default function ProgressDots({ steps, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: steps }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all ${
            i < current
              ? 'w-6 h-2 bg-black'
              : i === current
              ? 'w-6 h-2 bg-black'
              : 'w-2 h-2 bg-gray-300'
          }`}
        />
      ))}
    </div>
  )
}
