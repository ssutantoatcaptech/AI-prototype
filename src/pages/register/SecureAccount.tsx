import { WireframeBrand, WireframeSteps, WireframeFooter, WireframeLabel, WireframeInput, WireframeButton } from '../../components/WireframeCard'
import type { NavProps, RegistrationData } from '../../types'

interface Props extends NavProps {
  data: RegistrationData
  setData: (d: Partial<RegistrationData>) => void
}

export default function SecureAccount({ navigate, data, setData }: Props) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('register-review')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-gray-300 rounded-sm">
        <WireframeBrand />
        <WireframeSteps current={2} total={4} />

        <div className="px-5 py-5">
          <h1 className="text-[20px] font-bold text-gray-900 mb-1">Secure Your Account</h1>
          <p className="text-sm text-gray-500 mb-5">Add an extra layer of security to protect your benefits information.</p>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* MFA Toggle */}
            <div className="border border-gray-300 rounded-sm p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Enable Multi-Factor Authentication</p>
                  <p className="text-xs text-gray-500 mt-0.5">Recommended — requires a code in addition to your password</p>
                </div>
                <button
                  type="button"
                  onClick={() => setData({ mfaEnabled: !data.mfaEnabled })}
                  className={`relative flex-shrink-0 w-10 h-5 rounded-full border transition-colors ${
                    data.mfaEnabled ? 'bg-gray-800 border-gray-800' : 'bg-white border-gray-400'
                  }`}
                  role="switch"
                  aria-checked={data.mfaEnabled}
                >
                  <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white border border-gray-300 rounded-full shadow transition-transform ${data.mfaEnabled ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            </div>

            {data.mfaEnabled && (
              <>
                {/* Method selection */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">How would you like to receive codes?</p>
                  <div className="space-y-2">
                    {([
                      { id: 'sms' as const, label: 'Text Message (SMS)', sub: 'Codes sent to your mobile phone' },
                      { id: 'email' as const, label: 'Email', sub: 'Codes sent to your email address' },
                    ]).map(m => (
                      <label
                        key={m.id}
                        className={`flex items-start gap-3 p-3 border cursor-pointer rounded-sm ${
                          data.mfaMethod === m.id ? 'border-gray-800 bg-gray-50' : 'border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="mfaMethod"
                          checked={data.mfaMethod === m.id}
                          onChange={() => setData({ mfaMethod: m.id })}
                          className="mt-0.5 accent-gray-800"
                        />
                        <div>
                          <p className="text-sm font-medium text-gray-800">{m.label}</p>
                          <p className="text-xs text-gray-500">{m.sub}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Phone number */}
                {data.mfaMethod === 'sms' && (
                  <div>
                    <WireframeLabel>Mobile Phone Number</WireframeLabel>
                    <div className="flex gap-2">
                      <select className="px-2 py-2 text-sm border border-gray-400 rounded-sm bg-white focus:outline-none focus:border-gray-800 w-16">
                        <option>+1</option>
                      </select>
                      <WireframeInput
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={data.phoneNumber}
                        onChange={e => setData({ phoneNumber: e.target.value })}
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}

                {/* Backup email */}
                <div>
                  <WireframeLabel>Backup Email (optional)</WireframeLabel>
                  <WireframeInput
                    type="email"
                    placeholder="backup@example.com"
                    value={data.backupEmail}
                    onChange={e => setData({ backupEmail: e.target.value })}
                  />
                </div>
              </>
            )}

            <WireframeButton type="submit">Continue →</WireframeButton>
            <button
              type="button"
              onClick={() => navigate('register-login')}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-800 border border-gray-300 rounded-sm bg-white"
            >
              ← Back
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-gray-400">
            Contact Support at <a href="tel:+18005551234" className="underline">1-800-BENEFITS</a>
          </p>
        </div>

        <WireframeFooter />
      </div>
      <p className="mt-4 text-xs text-gray-400">© 2025 Member Benefits Portal</p>
    </div>
  )
}
