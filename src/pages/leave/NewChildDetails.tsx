import Card from '../../components/leave/Card'
import OptionCard from '../../components/leave/OptionCard'
import RadioInline from '../../components/leave/RadioInline'
import WizardButtons from '../../components/leave/WizardButtons'
import { type LeaveFormData } from './types'

interface Props {
  formData: LeaveFormData
  onChange: (updates: Partial<LeaveFormData>) => void
  onBack: () => void
  onContinue: () => void
}

export default function NewChildDetails({ formData, onChange, onBack, onContinue }: Props) {
  const isFutureArrival = formData.childArrivalStatus === 'Planning for a future arrival'
  const isAlreadyArrived = formData.childArrivalStatus === 'Child has already arrived'
  const isPregnancy = formData.leaveReason === 'Pregnancy / maternity leave'

  const allAnswered = formData.childArrivalStatus &&
    formData.spouseWorksForEmployer &&
    (isFutureArrival ? formData.expectedDeliveryDate : true) &&
    (isAlreadyArrived ? formData.expectedDeliveryDate : true)

  return (
    <Card>
      <h2 className="text-[21px] font-bold text-[#0f0f14] tracking-[-0.42px] mb-1">
        {isPregnancy ? 'Pregnancy Details' : 'New Child Details'}
      </h2>
      <p className="text-[15px] text-[#3d3d47] leading-6 mb-4">
        {isPregnancy
          ? "We'll use this information to set up your maternity leave."
          : "Congratulations! Let's get your leave set up."}
      </p>

      <div className="flex flex-col gap-2">
        <OptionCard
          label="Child has already arrived"
          description={isPregnancy
            ? 'The birth has already occurred'
            : 'The birth, adoption, or placement has already occurred'}
          selected={isAlreadyArrived}
          onClick={() => onChange({ childArrivalStatus: 'Child has already arrived' })}
        />
        <OptionCard
          label="Planning for a future arrival"
          description="You're requesting leave in anticipation"
          selected={isFutureArrival}
          onClick={() => onChange({ childArrivalStatus: 'Planning for a future arrival' })}
        />
      </div>

      {/* Date field — dynamic label based on arrival status */}
      {formData.childArrivalStatus && (
        <div className="flex flex-col gap-[7px] pt-5 pb-4 animate-[fadeIn_0.2s_ease-out]">
          <label className="text-[14px] font-bold text-[#1e1e28]">
            {isFutureArrival
              ? isPregnancy ? 'Expected delivery date' : 'Expected arrival date'
              : isPregnancy ? 'Date of birth' : 'Date of arrival'}
            {' '}<span className="text-[#dc2626]">*</span>
          </label>
          <input
            type="date"
            value={formData.expectedDeliveryDate}
            onChange={(e) => onChange({ expectedDeliveryDate: e.target.value })}
            className="w-full border border-[#d0d0d5] rounded-[7px] px-[15px] py-[13px] text-[15px] text-[#0f0f14] bg-white focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-colors"
          />
          {isFutureArrival && (
            <p className="text-[13px] text-[#3d3d47] leading-[19.5px]">
              Your best estimate is fine — this can be updated later.
            </p>
          )}
        </div>
      )}

      {formData.childArrivalStatus && (
        <>
          <div className="h-px bg-[#e8e8ec]" />
          <div className="pt-4 animate-[fadeIn_0.2s_ease-out]">
            <p className="text-[14px] font-bold text-[#1e1e28]">
              Does your spouse or domestic partner also work for the same employer?
            </p>
            <p className="text-[13px] text-[#3d3d47] leading-[19.5px] mb-2">
              Some leave entitlements may be shared between spouses employed by the same company.
            </p>
            <RadioInline
              options={['Yes', 'No', 'Not sure']}
              value={formData.spouseWorksForEmployer}
              onChange={(v) => onChange({ spouseWorksForEmployer: v })}
            />
          </div>
        </>
      )}

      <div className="mt-6">
        <WizardButtons onBack={onBack} onContinue={onContinue} disabled={!allAnswered} />
      </div>
    </Card>
  )
}
