import Card from '../../components/leave/Card'
import RadioInline from '../../components/leave/RadioInline'
import CheckboxItem from '../../components/leave/CheckboxItem'
import WizardButtons from '../../components/leave/WizardButtons'
import { type LeaveFormData } from './types'

interface Props {
  formData: LeaveFormData
  onChange: (updates: Partial<LeaveFormData>) => void
  onBack: () => void
  onContinue: () => void
}

export default function Compliance({ formData, onChange, onBack, onContinue }: Props) {
  const allAnswered = formData.priorLeaveIn12Months &&
    formData.workersCompRelated &&
    formData.needsAccommodations &&
    formData.complianceAcknowledged

  return (
    <Card>
      <h2 className="text-[21px] font-bold text-[#0f0f14] tracking-[-0.42px] mb-1">
        Regulatory &amp; Compliance Information
      </h2>
      <p className="text-[15px] text-[#3d3d47] leading-6 mb-4">
        Answer these questions to ensure compliance with federal and state leave regulations.
      </p>

      <div className="flex flex-col gap-3">
        {/* Question 1 */}
        <div className="border border-[#e2e2e5] rounded-lg px-[25px] py-[21px] flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#1e1e28]">
            Have you taken any other leave (FMLA or non-FMLA) in the past 12 months?{' '}
            <span className="text-[#dc2626]">*</span>
          </label>
          <RadioInline
            options={['Yes', 'No']}
            value={formData.priorLeaveIn12Months}
            onChange={(v) => onChange({ priorLeaveIn12Months: v })}
          />
          {formData.priorLeaveIn12Months === 'Yes' && (
            <p className="text-[13px] text-[#3d3d47] leading-[19.5px] mt-1 animate-[fadeIn_0.2s_ease-out]">
              Your case manager will review any prior leave usage to calculate remaining entitlements.
            </p>
          )}
        </div>

        {/* Question 2 */}
        <div className="border border-[#e2e2e5] rounded-lg px-[25px] py-[21px] flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#1e1e28]">
            Is this leave related to a workers' compensation claim?{' '}
            <span className="text-[#dc2626]">*</span>
          </label>
          <RadioInline
            options={['Yes', 'No']}
            value={formData.workersCompRelated}
            onChange={(v) => onChange({ workersCompRelated: v })}
          />
          {formData.workersCompRelated === 'Yes' && (
            <p className="text-[13px] text-[#3d3d47] leading-[19.5px] mt-1 animate-[fadeIn_0.2s_ease-out]">
              Workers' compensation and FMLA leave may run concurrently. Additional information may be required.
            </p>
          )}
        </div>

        {/* Question 3 */}
        <div className="border border-[#e2e2e5] rounded-lg px-[25px] py-[21px] flex flex-col gap-2">
          <label className="text-[14px] font-bold text-[#1e1e28]">
            Will you need accommodations when you return to work?{' '}
            <span className="text-[#dc2626]">*</span>
          </label>
          <RadioInline
            options={['Yes', 'No', 'Uncertain at this time']}
            value={formData.needsAccommodations}
            onChange={(v) => onChange({ needsAccommodations: v })}
          />
          {formData.needsAccommodations === 'Yes' && (
            <p className="text-[13px] text-[#3d3d47] leading-[19.5px] mt-1 animate-[fadeIn_0.2s_ease-out]">
              Your case manager will follow up to discuss accommodation options under the ADA.
            </p>
          )}
        </div>

        {/* Acknowledgment */}
        <div className="border border-[#e2e2e5] rounded-lg px-[25px] py-[21px]">
          <CheckboxItem
            checked={formData.complianceAcknowledged}
            onChange={(v) => onChange({ complianceAcknowledged: v })}
            label="I acknowledge that I have been informed of my rights and responsibilities under applicable federal and state leave laws."
            helper="Including FMLA, ADA, and Washington Paid Family & Medical Leave."
          />
        </div>
      </div>

      <div className="mt-6">
        <WizardButtons
          onBack={onBack}
          onContinue={onContinue}
          continueLabel="Continue to Review"
          disabled={!allAnswered}
        />
      </div>
    </Card>
  )
}
