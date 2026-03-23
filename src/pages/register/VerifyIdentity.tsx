import WireframeCard, { WireframeBrand, WireframeSteps, WireframeFooter, WireframeLabel, WireframeInput, WireframeButton } from '../../components/WireframeCard'
import type { NavProps, RegistrationData } from '../../types'

interface Props extends NavProps {
  data: RegistrationData
  setData: (d: Partial<RegistrationData>) => void
}

export default function VerifyIdentity({ navigate, data, setData }: Props) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('register-login')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-gray-300 rounded-sm">
        <WireframeBrand />
        <WireframeSteps current={0} total={4} />

        <div className="px-5 py-5">
          <h1 className="text-[20px] font-bold text-gray-900 mb-1">Verify Your Identity</h1>
          <p className="text-sm text-gray-500 mb-5">Provide your information to verify eligibility for your benefit plan.</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Personal Info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Personal Information</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <WireframeLabel>First Name *</WireframeLabel>
                    <WireframeInput
                      placeholder="First name"
                      value={data.firstName}
                      onChange={e => setData({ firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <WireframeLabel>Last Name *</WireframeLabel>
                    <WireframeInput
                      placeholder="Last name"
                      value={data.lastName}
                      onChange={e => setData({ lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <WireframeLabel>Date of Birth *</WireframeLabel>
                  <WireframeInput
                    type="date"
                    value={data.dateOfBirth}
                    onChange={e => setData({ dateOfBirth: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <WireframeLabel>Last 4 digits of SSN *</WireframeLabel>
                  <WireframeInput
                    placeholder="••••"
                    maxLength={4}
                    value={data.last4SSN}
                    onChange={e => setData({ last4SSN: e.target.value.replace(/\D/g, '') })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Employment */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Employment Information</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-3">
                <div>
                  <WireframeLabel>Employer Name</WireframeLabel>
                  <WireframeInput
                    placeholder="Your employer"
                    value={data.employerName}
                    onChange={e => setData({ employerName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <WireframeLabel>Employee ID</WireframeLabel>
                  <WireframeInput
                    placeholder="EMP-XXXXX"
                    value={data.employeeId}
                    onChange={e => setData({ employeeId: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Certification */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-0.5 w-4 h-4 border border-gray-400 accent-gray-800 flex-shrink-0" />
              <span className="text-xs text-gray-600 leading-relaxed">
                I certify that the information provided is accurate and complete, and that I am eligible for this benefit plan.
              </span>
            </label>

            <WireframeButton type="submit">Continue →</WireframeButton>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">Need help? </span>
            <a href="#" className="text-xs text-gray-600 underline hover:text-gray-900">Contact Support</a>
          </div>
        </div>

        <WireframeFooter />
      </div>
      <p className="mt-4 text-xs text-gray-400">© 2025 Member Benefits Portal</p>
    </div>
  )
}
