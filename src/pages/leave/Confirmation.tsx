import { type LeaveFormData, CHILD_RELATED_REASONS } from './types'

function formatDate(dateStr: string) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function generateCaseNumber() {
  return `LV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9000) + 1000)}`
}

interface Props {
  formData: LeaveFormData
  onViewStatus: () => void
}

export default function Confirmation({ formData, onViewStatus }: Props) {
  const caseNumber = generateCaseNumber()
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const isChildRelated = CHILD_RELATED_REASONS.includes(formData.leaveReason)

  const nextSteps = [
    {
      title: 'Eligibility Notification',
      desc: "We'll review your request and notify you about your eligibility.",
    },
    ...(isChildRelated ? [] : [{
      title: 'Medical Certification Sent',
      desc: "We'll send the certification form to your healthcare provider within 24 hours.",
    }]),
    {
      title: 'HR Review & Decision',
      desc: `Once ${isChildRelated ? 'verified' : 'we receive the certification'}, your request will be reviewed within 3–5 business days.`,
    },
    {
      title: 'Decision Letter Sent',
      desc: "You'll receive an official decision letter via email and mail outlining approval status.",
    },
    {
      title: 'Stay Updated',
      desc: 'Track your request status anytime in the HR portal or contact us with questions.',
    },
  ]

  return (
    <div className="animate-[fadeIn_0.4s_ease-out]">
      {/* Hero */}
      <div className="flex flex-col items-center pt-6 pb-8">
        <div className="w-16 h-16 rounded-full bg-[#1a1a2e] flex items-center justify-center mb-4 animate-[popIn_0.4s_ease-out]">
          <span className="text-white text-[28px] font-bold">✓</span>
        </div>
        <h1 className="text-[24px] font-bold text-[#0f0f14] text-center">
          Leave Request Successfully Submitted
        </h1>
        <p className="text-[15px] text-[#3d3d47] text-center mt-1">
          Your request has been received and is now being processed by our HR team.
        </p>
      </div>

      {/* Case Card */}
      <div className="bg-white border border-[#e2e2e5] rounded-[10px] px-7 pt-6 pb-5 mb-5">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-[13px] font-bold text-[#62626e]">Leave Case Number</p>
            <p className="text-[21px] font-bold text-[#0f0f14]">{caseNumber}</p>
          </div>
          <button
            onClick={() => navigator.clipboard.writeText(caseNumber)}
            className="w-10 h-10 bg-[#f5f5f7] rounded-lg flex items-center justify-center hover:bg-[#e8e8ec] transition-colors"
            title="Copy case number"
          >
            📋
          </button>
        </div>

        <div className="h-px bg-[#e8e8ec] mb-6" />

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] font-bold text-[#62626e] uppercase tracking-[0.44px]">Submitted Date</span>
            <span className="text-[15px] font-semibold text-[#0f0f14]">{today}</span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] font-bold text-[#62626e] uppercase tracking-[0.44px]">Leave Start Date</span>
            <span className="text-[15px] font-semibold text-[#0f0f14]">{formatDate(formData.leaveStartDate)}</span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] font-bold text-[#62626e] uppercase tracking-[0.44px]">Expected Return</span>
            <span className="text-[15px] font-semibold text-[#0f0f14]">{formatDate(formData.expectedReturnDate)}</span>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[11px] font-bold text-[#62626e] uppercase tracking-[0.44px]">Processing Time</span>
            <span className="text-[15px] font-semibold text-[#0f0f14]">3–5 business days</span>
          </div>
        </div>
      </div>

      {/* What Happens Next */}
      <div className="bg-white border border-[#e2e2e5] rounded-[10px] px-7 pt-6 pb-8 mb-3">
        <h3 className="text-[17px] font-bold text-[#0f0f14] mb-5">
          What Happens Next
        </h3>
        <div className="flex flex-col gap-4">
          {nextSteps.map((step, i) => (
            <div key={step.title} className="flex items-start gap-[14px]">
              <div className="w-7 h-7 rounded-full bg-[#f5f5f7] border border-[#e2e2e5] flex items-center justify-center shrink-0">
                <span className="text-[13px] font-bold text-[#0f0f14]">{i + 1}</span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-[15px] font-bold text-[#0f0f14]">{step.title}</span>
                <span className="text-[14px] text-[#3d3d47] leading-[21px]">{step.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        {[
          { icon: '👁', label: 'View Status', action: onViewStatus },
          { icon: '📤', label: 'Upload Documents', action: () => {} },
          { icon: '📞', label: 'Contact HR', action: () => {} },
        ].map((action) => (
          <button
            key={action.label}
            onClick={action.action}
            className="bg-white border border-[#e2e2e5] rounded-lg p-[17px] flex flex-col items-center gap-1.5 hover:bg-gray-50 hover:border-[#d0d0d5] transition-colors"
          >
            <span className="text-lg">{action.icon}</span>
            <span className="text-[14px] font-semibold text-[#0f0f14] text-center">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Email Notice */}
      <div className="bg-[#f5f5f7] border border-[#e8e8ec] rounded-lg flex items-center gap-2.5 px-[19px] py-[15px]">
        <span className="text-base">📧</span>
        <p className="text-[14px]">
          <span className="text-[#3d3d47]">A confirmation email with all details and instructions has been sent to </span>
          <span className="font-bold text-[#0f0f14]">
            {formData.employeeName.toLowerCase().replace(' ', '.')}@company.com
          </span>
        </p>
      </div>
    </div>
  )
}
