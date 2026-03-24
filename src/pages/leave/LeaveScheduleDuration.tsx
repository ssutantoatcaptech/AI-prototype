import { useMemo } from 'react'
import Card from '../../components/leave/Card'
import OptionCard from '../../components/leave/OptionCard'
import RadioInline from '../../components/leave/RadioInline'
import WizardButtons from '../../components/leave/WizardButtons'
import { type LeaveFormData } from './types'

const patterns = [
  { label: 'Continuous Leave', desc: 'Taking leave all at once for consecutive days' },
  { label: 'Intermittent Leave', desc: 'Taking leave on multiple separate occasions as needed' },
  { label: 'Reduced Schedule', desc: 'Working fewer hours per day or week for a period' },
]

interface Props {
  formData: LeaveFormData
  onChange: (updates: Partial<LeaveFormData>) => void
  onBack: () => void
  onContinue: () => void
}

function calcDuration(startStr: string, endStr: string, schedule: { day: string; hours: number }[]) {
  if (!startStr || !endStr) return null
  const start = new Date(startStr + 'T00:00:00')
  const end = new Date(endStr + 'T00:00:00')
  if (isNaN(start.getTime()) || isNaN(end.getTime()) || end <= start) return null

  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const workDaySet = new Set(schedule.filter(d => d.hours > 0).map(d => d.day))

  let calendarDays = 0
  let workDays = 0
  const cursor = new Date(start)
  while (cursor <= end) {
    calendarDays++
    if (workDaySet.has(dayNames[cursor.getDay()])) workDays++
    cursor.setDate(cursor.getDate() + 1)
  }
  return { calendarDays, workDays }
}

export default function LeaveScheduleDuration({ formData, onChange, onBack, onContinue }: Props) {
  const duration = useMemo(
    () => calcDuration(formData.leaveStartDate, formData.expectedReturnDate, formData.schedule),
    [formData.leaveStartDate, formData.expectedReturnDate, formData.schedule]
  )

  const dateError = formData.leaveStartDate && formData.expectedReturnDate && !duration
    ? 'Return date must be after start date.'
    : ''

  const allAnswered = formData.leavePattern &&
    formData.leaveStartDate &&
    formData.expectedReturnDate &&
    formData.relatedToPriorLeave &&
    duration

  return (
    <Card>
      <h2 className="text-[21px] font-bold text-[#0f0f14] tracking-[-0.42px] mb-1">
        Leave Schedule &amp; Duration
      </h2>
      <p className="text-[15px] text-[#3d3d47] leading-6 mb-1">
        Specify when and how you'll take this leave. Use the date picker for accuracy.
      </p>

      <div className="pt-4">
        <label className="text-[14px] font-bold text-[#1e1e28]">
          Leave Pattern <span className="text-[#dc2626]">*</span>
        </label>
      </div>

      <div className="flex flex-col gap-2 mt-2">
        {patterns.map((p) => (
          <OptionCard
            key={p.label}
            label={p.label}
            description={p.desc}
            selected={formData.leavePattern === p.label}
            onClick={() => onChange({ leavePattern: p.label })}
          />
        ))}
      </div>

      {formData.leavePattern && (
        <>
          <div className="h-px bg-[#e8e8ec] my-6" />

          <h3 className="text-[16px] font-bold text-[#0f0f14] mb-4">
            {formData.leavePattern === 'Continuous Leave' ? 'Continuous Leave Dates' :
             formData.leavePattern === 'Intermittent Leave' ? 'Intermittent Leave Period' :
             'Reduced Schedule Period'}
          </h3>

          <div className="grid grid-cols-2 gap-5 animate-[fadeIn_0.2s_ease-out]">
            <div className="flex flex-col gap-[7px]">
              <label className="text-[14px] font-bold text-[#1e1e28]">
                Leave Start Date <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="date"
                value={formData.leaveStartDate}
                onChange={(e) => onChange({ leaveStartDate: e.target.value })}
                className="w-full border border-[#d0d0d5] rounded-[7px] px-[15px] py-[13px] text-[15px] text-[#0f0f14] bg-white focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-colors"
              />
            </div>
            <div className="flex flex-col gap-[7px]">
              <label className="text-[14px] font-bold text-[#1e1e28]">
                Expected Return Date <span className="text-[#dc2626]">*</span>
              </label>
              <input
                type="date"
                value={formData.expectedReturnDate}
                min={formData.leaveStartDate || undefined}
                onChange={(e) => onChange({ expectedReturnDate: e.target.value })}
                className="w-full border border-[#d0d0d5] rounded-[7px] px-[15px] py-[13px] text-[15px] text-[#0f0f14] bg-white focus:outline-none focus:border-[#1a1a2e] focus:ring-1 focus:ring-[#1a1a2e] transition-colors"
              />
            </div>
          </div>

          {dateError && (
            <p className="text-sm text-red-600 mt-2">{dateError}</p>
          )}

          {duration && (
            <div className="bg-[#f5f5f7] border border-[#e8e8ec] rounded-lg px-[17px] py-[13px] mt-4 animate-[fadeIn_0.2s_ease-out]">
              <p className="text-[14px]">
                <span className="text-[#3d3d47]">Calculated Leave Duration: </span>
                <span className="font-bold text-[#0f0f14]">
                  {duration.calendarDays} calendar days ({duration.workDays} work days)
                </span>
              </p>
            </div>
          )}

          <div className="flex flex-col gap-[7px] mt-5">
            <label className="text-[14px] font-bold text-[#1e1e28]">
              Is this related to a previous or ongoing leave? <span className="text-[#dc2626]">*</span>
            </label>
            <RadioInline
              options={['Yes', 'No']}
              value={formData.relatedToPriorLeave}
              onChange={(v) => onChange({ relatedToPriorLeave: v })}
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
