import Card from '../../components/leave/Card'
import OptionCard from '../../components/leave/OptionCard'
import WizardButtons from '../../components/leave/WizardButtons'
import { type LeaveFormData, CHILD_RELATED_REASONS } from './types'

const reasons = [
  { label: 'My own health condition', desc: 'Illness, injury, surgery, or medical treatment', icon: '🏥' },
  { label: 'Care for a family member', desc: 'Serious health condition of a covered family member', icon: '👨‍👩‍👧' },
  { label: 'Bond with a new child', desc: 'Newborn, adopted, or placed foster child', icon: '👶' },
  { label: 'Pregnancy / maternity leave', desc: 'Prenatal care, incapacity, or childbirth', icon: '🤰' },
  { label: 'Military family leave', desc: 'Qualifying exigency or military caregiver leave', icon: '🎖️' },
  { label: 'Bereavement', desc: 'Death of a covered family member', icon: '🕊️' },
  { label: 'Personal leave', desc: 'Company-approved personal absence', icon: '🏠' },
  { label: 'Other / employer-approved', desc: 'Any other employer-approved leave reason', icon: '📋' },
]

interface Props {
  formData: LeaveFormData
  onChange: (updates: Partial<LeaveFormData>) => void
  onBack: () => void
  onContinue: () => void
}

export default function ReasonForLeave({ formData, onChange, onBack, onContinue }: Props) {
  const isChildRelated = CHILD_RELATED_REASONS.includes(formData.leaveReason)

  return (
    <Card>
      <h2 className="text-[21px] font-bold text-[#0f0f14] tracking-[-0.42px] mb-1">
        Reason for Leave
      </h2>
      <p className="text-[15px] text-[#3d3d47] leading-6 mb-4">
        Select the option that best fits your situation. Your selection will customize the next screens to
        collect relevant information for your leave type.
      </p>

      <div className="flex flex-col gap-2">
        {reasons.map((r) => (
          <OptionCard
            key={r.label}
            label={r.label}
            description={r.desc}
            selected={formData.leaveReason === r.label}
            onClick={() => onChange({
              leaveReason: r.label,
              // Reset child-related fields when switching away from child reasons
              ...(!CHILD_RELATED_REASONS.includes(r.label) ? {
                childArrivalStatus: '',
                expectedDeliveryDate: '',
                spouseWorksForEmployer: '',
              } : {}),
            })}
          />
        ))}
      </div>

      {formData.leaveReason && (
        <div className="mt-4 bg-[#e8e8ec] rounded-lg px-[17px] py-[13px] animate-[fadeIn_0.2s_ease-out]">
          <p className="text-[14px] text-black leading-[21.7px]">
            {isChildRelated
              ? "Next, we'll collect details about your new child and expected dates."
              : "Next, we'll confirm your work schedule and collect leave dates."}
          </p>
        </div>
      )}

      <div className="mt-6">
        <WizardButtons onBack={onBack} onContinue={onContinue} disabled={!formData.leaveReason} />
      </div>
    </Card>
  )
}
