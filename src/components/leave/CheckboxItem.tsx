interface Props {
  checked: boolean
  onChange: (checked: boolean) => void
  label: string
  helper?: string
}

export default function CheckboxItem({ checked, onChange, label, helper }: Props) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex gap-[11px] items-start text-left"
    >
      <div className="pt-0.5 shrink-0">
        <div
          className={`w-[18px] h-[18px] rounded flex items-center justify-center border-2 text-[11px] font-semibold ${
            checked
              ? 'bg-black border-black text-white'
              : 'bg-white border-[#d0d0d5]'
          }`}
        >
          {checked && '✓'}
        </div>
      </div>
      <div className="flex flex-col gap-[3px]">
        <span className="text-[15px] leading-[22.5px] text-[#0f0f14] font-['Source_Sans_Pro',sans-serif]">
          {label}
        </span>
        {helper && (
          <span className="text-[13px] leading-[19.5px] text-[#3d3d47] font-['Source_Sans_Pro',sans-serif]">
            {helper}
          </span>
        )}
      </div>
    </button>
  )
}
