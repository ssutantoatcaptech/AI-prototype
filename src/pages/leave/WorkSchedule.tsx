import Card from '../../components/leave/Card'
import CheckboxItem from '../../components/leave/CheckboxItem'
import WizardButtons from '../../components/leave/WizardButtons'
import { type LeaveFormData } from './types'

interface Props {
  formData: LeaveFormData
  onChange: (updates: Partial<LeaveFormData>) => void
  onBack: () => void
  onContinue: () => void
}

export default function WorkSchedule({ formData, onChange, onBack, onContinue }: Props) {
  const totalWeeklyHours = formData.schedule.reduce((sum, d) => sum + d.hours, 0)

  const updateHours = (dayIndex: number, hours: number) => {
    const updated = formData.schedule.map((d, i) => i === dayIndex ? { ...d, hours } : d)
    onChange({ schedule: updated, scheduleConfirmed: false })
  }

  return (
    <Card>
      <h2 className="text-[21px] font-bold text-[#0f0f14] tracking-[-0.42px] mb-1">
        Work Schedule
      </h2>
      <p className="text-[15px] text-[#3d3d47] leading-6 mb-2">
        Confirm your standard work schedule. This is used to calculate leave duration and entitlements.
      </p>

      <div className="border border-[#e2e2e5] rounded-lg overflow-hidden mt-2">
        <div className="bg-[#f5f5f7] border-b border-[#e8e8ec] flex items-center px-4 h-9">
          <span className="w-[140px] text-[12px] font-semibold text-[#62626e] uppercase">Day</span>
          <span className="flex-1 text-[12px] font-semibold text-[#62626e] uppercase">Scheduled Hours</span>
        </div>
        {formData.schedule.map((row, i) => (
          <div
            key={row.day}
            className={`flex items-center px-4 py-2 ${i < formData.schedule.length - 1 ? 'border-b border-[#e8e8ec]' : ''}`}
          >
            <span className="w-[140px] text-[15px] font-semibold text-[#0f0f14]">{row.day}</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={24}
                value={row.hours}
                onChange={(e) => updateHours(i, Math.max(0, Math.min(24, Number(e.target.value) || 0)))}
                className="w-16 border border-[#d0d0d5] rounded px-2 py-1 text-[15px] text-[#0f0f14] text-center focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-colors"
              />
              <span className="text-[14px] text-[#3d3d47]">hrs</span>
            </div>
          </div>
        ))}
        {/* Total row */}
        <div className="flex items-center px-4 py-2.5 bg-[#f5f5f7] border-t border-[#e8e8ec]">
          <span className="w-[140px] text-[14px] font-bold text-[#0f0f14]">Weekly Total</span>
          <span className="text-[15px] font-bold text-[#0f0f14]">{totalWeeklyHours} hrs</span>
        </div>
      </div>

      <div className="mt-4">
        <CheckboxItem
          checked={formData.scheduleConfirmed}
          onChange={(v) => onChange({ scheduleConfirmed: v })}
          label="My entire schedule is correct as shown above"
        />
      </div>

      <div className="mt-6">
        <WizardButtons onBack={onBack} onContinue={onContinue} disabled={!formData.scheduleConfirmed} />
      </div>
    </Card>
  )
}
