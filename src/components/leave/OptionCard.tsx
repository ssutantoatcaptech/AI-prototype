interface Props {
  label: string
  description: string
  selected: boolean
  onClick: () => void
}

export default function OptionCard({ label, description, selected, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-5 py-[15px] rounded-lg border text-left transition-colors ${
        selected
          ? 'bg-[#f5f5f7] border-black'
          : 'bg-white border-[#e2e2e5] hover:bg-gray-50'
      }`}
    >
      <div
        className={`w-[18px] h-[18px] rounded-full border-2 shrink-0 flex items-center justify-center ${
          selected ? 'border-black' : 'border-[#d0d0d5]'
        }`}
      >
        {selected && <div className="w-2 h-2 rounded-full bg-black" />}
      </div>
      <div className="flex flex-col gap-0.5">
        <span className="text-[15px] font-semibold text-[#0f0f14] leading-[21px] font-['Source_Sans_Pro',sans-serif]">
          {label}
        </span>
        <span className="text-[13px] text-[#3d3d47] leading-[18.2px] font-['Source_Sans_Pro',sans-serif]">
          {description}
        </span>
      </div>
    </button>
  )
}
