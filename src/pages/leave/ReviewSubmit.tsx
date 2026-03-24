import Card from '../../components/leave/Card'
import CheckboxItem from '../../components/leave/CheckboxItem'
import WizardButtons from '../../components/leave/WizardButtons'
import { type LeaveFormData, type StepId, CHILD_RELATED_REASONS } from './types'

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function getFiledBenefits(formData: LeaveFormData): string {
  const parts: string[] = []
  const fmlaReasons = [
    'My own health condition', 'Care for a family member', 'Bond with a new child',
    'Pregnancy / maternity leave', 'Military family leave',
  ]
  if (fmlaReasons.includes(formData.leaveReason)) parts.push('FMLA')
  if (['My own health condition', 'Pregnancy / maternity leave'].includes(formData.leaveReason)) parts.push('STD')
  if (formData.leaveReason !== 'Personal leave' && formData.leaveReason !== 'Other / employer-approved') parts.push('WA PFML')
  if (formData.leaveReason === 'Bereavement') parts.push('Bereavement')
  return parts.join(', ') || 'None'
}

interface Props {
  formData: LeaveFormData
  onChange: (updates: Partial<LeaveFormData>) => void
  onBack: () => void
  onContinue: () => void
  onGoToStep: (step: StepId) => void
}

export default function ReviewSubmit({ formData, onChange, onBack, onContinue, onGoToStep }: Props) {
  const isChildRelated = CHILD_RELATED_REASONS.includes(formData.leaveReason)

  const sections: { title: string; editStep: StepId; rows: { key: string; value: string }[] }[] = [
    {
      title: 'Employee Information',
      editStep: 'reason',
      rows: [
        { key: 'Employee', value: formData.employeeName },
        { key: 'Employee ID', value: formData.employeeId },
        { key: 'Employment Type', value: formData.employmentType },
      ],
    },
    {
      title: 'Leave Details',
      editStep: 'reason',
      rows: [
        { key: 'Leave Reason', value: formData.leaveReason || '—' },
        ...(isChildRelated ? [
          { key: 'Child Status', value: formData.childArrivalStatus || '—' },
          { key: formData.childArrivalStatus === 'Planning for a future arrival' ? 'Expected Date' : 'Date of Arrival', value: formatDate(formData.expectedDeliveryDate) },
          { key: 'Spouse at Same Employer', value: formData.spouseWorksForEmployer || '—' },
        ] : []),
        { key: 'Work-related', value: formData.workersCompRelated === 'Yes' ? 'Yes' : 'No' },
      ],
    },
    {
      title: 'Schedule & Duration',
      editStep: 'schedule-duration',
      rows: [
        { key: 'Leave Pattern', value: formData.leavePattern || '—' },
        { key: 'Leave Start Date', value: formatDate(formData.leaveStartDate) },
        { key: 'Expected Return', value: formatDate(formData.expectedReturnDate) },
        { key: 'Weekly Hours', value: `${formData.schedule.reduce((s, d) => s + d.hours, 0)} hrs` },
        { key: 'Related to Prior Leave', value: formData.relatedToPriorLeave || '—' },
      ],
    },
    {
      title: 'Benefits & Compliance',
      editStep: 'compliance',
      rows: [
        { key: 'Benefits Filed', value: getFiledBenefits(formData) },
        { key: 'Prior Leave (12 mo)', value: formData.priorLeaveIn12Months || '—' },
        { key: 'Needs Accommodations', value: formData.needsAccommodations || '—' },
      ],
    },
  ]

  return (
    <Card>
      <h2 className="text-[21px] font-bold text-[#0f0f14] tracking-[-0.42px] mb-1">
        Review &amp; Submit
      </h2>
      <p className="text-[15px] text-[#3d3d47] leading-6 mb-4">
        Please review the summary below. If anything needs to change, click "Edit" to go back to that section.
      </p>

      {sections.map((section) => (
        <div key={section.title} className="border border-[#e2e2e5] rounded-lg overflow-hidden mb-3">
          <div className="bg-[#f5f5f7] px-5 py-3 flex items-center justify-between border-b border-[#e8e8ec]">
            <span className="text-[13px] font-bold text-[#0f0f14] uppercase tracking-wide">
              {section.title}
            </span>
            <button
              type="button"
              onClick={() => onGoToStep(section.editStep)}
              className="text-[13px] font-semibold text-[#2563eb] hover:text-[#1d4ed8] transition-colors"
            >
              Edit
            </button>
          </div>
          {section.rows.map((row, i) => (
            <div
              key={row.key}
              className={`flex items-center justify-between px-5 py-3 ${
                i < section.rows.length - 1 ? 'border-b border-[#e8e8ec]' : ''
              }`}
            >
              <span className="text-[14px] text-[#62626e]">{row.key}</span>
              <span className="text-[15px] font-semibold text-[#0f0f14] text-right">{row.value}</span>
            </div>
          ))}
        </div>
      ))}

      <div className="border border-[#e2e2e5] rounded-lg px-[21px] py-[19px] mt-1">
        <CheckboxItem
          checked={formData.reviewConfirmed}
          onChange={(v) => onChange({ reviewConfirmed: v })}
          label="I confirm that the information provided above is accurate and complete to the best of my knowledge."
        />
      </div>

      <div className="mt-6">
        <WizardButtons
          onBack={onBack}
          onContinue={onContinue}
          continueLabel="Submit Leave Request"
          disabled={!formData.reviewConfirmed}
        />
      </div>
    </Card>
  )
}
