import Card from '../../components/leave/Card'
import CheckboxItem from '../../components/leave/CheckboxItem'
import WizardButtons from '../../components/leave/WizardButtons'
import { type LeaveFormData } from './types'

function getBenefits(formData: LeaveFormData) {
  const benefits: { icon: string; iconBg: string; iconColor: string; label: string; desc: string }[] = []

  // FMLA is available for most leave types
  const fmlaReasons = [
    'My own health condition', 'Care for a family member', 'Bond with a new child',
    'Pregnancy / maternity leave', 'Military family leave',
  ]
  if (fmlaReasons.includes(formData.leaveReason)) {
    benefits.push({
      icon: '✓', iconBg: 'bg-blue-400/10', iconColor: 'text-blue-500',
      label: 'FMLA Leave',
      desc: 'Up to 12 weeks of job-protected leave under the Family and Medical Leave Act',
    })
  }

  // STD for own health conditions
  if (['My own health condition', 'Pregnancy / maternity leave'].includes(formData.leaveReason)) {
    benefits.push({
      icon: '$', iconBg: 'bg-blue-600/[0.06]', iconColor: 'text-blue-600',
      label: 'Short-Term Disability (STD)',
      desc: 'Income replacement while unable to work due to your condition',
    })
  }

  // State paid leave
  if (formData.leaveReason !== 'Personal leave' && formData.leaveReason !== 'Other / employer-approved') {
    benefits.push({
      icon: '$', iconBg: 'bg-blue-600/[0.06]', iconColor: 'text-blue-600',
      label: 'Washington Paid Family & Medical Leave',
      desc: 'State-sponsored partial wage replacement during your leave',
    })
  }

  // Bereavement pay
  if (formData.leaveReason === 'Bereavement') {
    benefits.push({
      icon: '♡', iconBg: 'bg-purple-500/10', iconColor: 'text-purple-600',
      label: 'Bereavement Leave',
      desc: 'Up to 5 days of company-paid bereavement leave for immediate family members',
    })
  }

  return benefits
}

interface Props {
  formData: LeaveFormData
  onChange: (updates: Partial<LeaveFormData>) => void
  onBack: () => void
  onContinue: () => void
}

export default function LeaveEstimate({ formData, onChange, onBack, onContinue }: Props) {
  const benefits = getBenefits(formData)
  const hasBenefits = benefits.length > 0

  return (
    <Card>
      <h2 className="text-[21px] font-bold text-[#0f0f14] tracking-[-0.42px] mb-1">
        Leave Estimate
      </h2>
      <p className="text-[15px] text-[#3d3d47] leading-6 mb-4">
        Review your leave eligibility and estimated available leave time based on company policies
        and applicable laws.
      </p>

      <div className="bg-[#f5f5f7] rounded-lg px-[17px] py-[13px] mb-3">
        <p className="text-[14px] text-black leading-[21.7px]">
          This is an estimate only. An initial determination will be made once your information has been
          reviewed by your case manager. Eligibility and benefit amounts are subject to verification.
        </p>
      </div>

      {hasBenefits && (
        <div className="border border-[#e2e2e5] rounded-lg overflow-hidden mb-3">
          {/* Header */}
          <div className="bg-[#e8e8ec] border-b border-[#e8e8ec] flex items-center gap-3 px-5 py-4">
            <div className="w-7 h-7 rounded-full bg-[#666] flex items-center justify-center shrink-0">
              <span className="text-white text-[14px]">✓</span>
            </div>
            <div>
              <p className="text-[15px] font-bold text-[#0f0f14]">Preliminary Eligibility Confirmed</p>
              <p className="text-[13px] text-[#3d3d47]">
                Based on your answers, you appear to meet the requirements for the following
              </p>
            </div>
          </div>

          {/* Dynamic benefit rows */}
          {benefits.map((b, i) => (
            <div
              key={b.label}
              className={`flex items-start gap-3 px-5 py-[14px] ${i < benefits.length - 1 ? 'border-b border-[#e8e8ec]' : ''}`}
            >
              <div className="pt-0.5 shrink-0">
                <div className={`w-6 h-6 rounded-md ${b.iconBg} flex items-center justify-center`}>
                  <span className={`text-[12px] ${b.iconColor}`}>{b.icon}</span>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-[#0f0f14]">{b.label}</span>
                <span className="text-[13px] text-[#3d3d47]">{b.desc}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-[#f5f5f7] border border-[#e8e8ec] rounded-lg px-[19px] py-[14px] mb-3">
        <p className="text-[13px] leading-[20.8px]">
          <span className="font-bold text-[#0f0f14]">What this means:</span>{' '}
          <span className="text-[#3d3d47]">
            We will file the applicable claims on your behalf. You do not need to file separately
            for these benefits. Your case manager will confirm final eligibility and provide specific benefit amounts
            after reviewing your complete file.
          </span>
        </p>
      </div>

      <div className="pt-3 pb-6">
        <CheckboxItem
          checked={formData.estimateUnderstood}
          onChange={(v) => onChange({ estimateUnderstood: v })}
          label="I understand this is an estimate and that final eligibility will be determined after review."
        />
      </div>

      <WizardButtons onBack={onBack} onContinue={onContinue} disabled={!formData.estimateUnderstood} />
    </Card>
  )
}
