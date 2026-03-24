interface Props {
  options: string[]
  value: string
  onChange: (value: string) => void
}

export default function RadioInline({ options, value, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-x-4">
      {options.map((option) => (
        <button
          key={option}
          type="button"
          onClick={() => onChange(option)}
          className="flex items-center gap-2 py-1.5"
        >
          <div
            className={`w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center ${
              value === option ? 'border-black' : 'border-[#d0d0d5]'
            }`}
          >
            {value === option && <div className="w-2 h-2 rounded-full bg-black" />}
          </div>
          <span className="text-[15px] text-[#0f0f14] font-['Source_Sans_Pro',sans-serif]">
            {option}
          </span>
        </button>
      ))}
    </div>
  )
}
