interface Step {
  label: string
  status: 'completed' | 'current' | 'upcoming'
}

interface Props {
  steps: Step[]
}

export default function Stepper({ steps }: Props) {
  return (
    <div className="flex items-start justify-center w-full">
      {steps.map((step, i) => (
        <div key={step.label} className={`flex items-start ${i < steps.length - 1 ? 'flex-1 min-w-0' : 'shrink-0'}`}>
          <div className="flex flex-col items-center min-w-[70px] shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold border-2 ${
                step.status === 'completed'
                  ? 'bg-[#1a1a2e] border-[#1a1a2e] text-white'
                  : step.status === 'current'
                  ? 'bg-white border-[#1a1a2e] text-[#1a1a2e]'
                  : 'bg-white border-[#e2e2e5] text-[#62626e]'
              }`}
            >
              {step.status === 'completed' ? '✓' : i + 1}
            </div>
            <div className="pt-1.5">
              <span
                className={`text-xs text-center whitespace-nowrap ${
                  step.status === 'current'
                    ? 'font-bold text-[#0f0f14]'
                    : step.status === 'completed'
                    ? 'text-[#3d3d47]'
                    : 'text-[#62626e]'
                }`}
              >
                {step.label}
              </span>
            </div>
          </div>
          {i < steps.length - 1 && (
            <div className="flex-1 min-w-5 flex items-center justify-center pt-[15px]">
              <div
                className={`h-0.5 w-full rounded-sm ${
                  step.status === 'completed' ? 'bg-[#1a1a2e]' : 'bg-[#e8e8ec]'
                }`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
