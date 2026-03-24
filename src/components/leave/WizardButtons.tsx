interface Props {
  onBack: () => void
  onContinue: () => void
  continueLabel?: string
  disabled?: boolean
}

export default function WizardButtons({ onBack, onContinue, continueLabel = 'Continue', disabled }: Props) {
  return (
    <div className="flex items-center justify-between border-t border-[#e8e8ec] pt-[21px]">
      <button
        type="button"
        onClick={onBack}
        className="px-[25px] py-[11px] rounded-[7px] border border-[#e2e2e5] bg-white text-[14px] text-[#3d3d47] font-['Source_Sans_Pro',sans-serif] hover:bg-[#f5f5f7] transition-colors"
      >
        ← Back
      </button>
      <button
        type="button"
        onClick={onContinue}
        disabled={disabled}
        className={`px-7 py-2.5 rounded-[7px] text-[14px] font-bold text-white font-['Source_Sans_Pro',sans-serif] transition-colors ${
          disabled
            ? 'bg-[#111118]/40 cursor-not-allowed'
            : 'bg-[#111118] hover:bg-[#2a2a35]'
        }`}
      >
        {continueLabel}
      </button>
    </div>
  )
}
