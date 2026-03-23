import { useState } from 'react'
import { WireframeBrand, WireframeSteps, WireframeFooter, WireframeButton } from '../../components/WireframeCard'
import type { NavProps, RegistrationData } from '../../types'

interface Props extends NavProps {
  data: RegistrationData
}

function Section({ title, onEdit, children }: { title: string; onEdit: () => void; children: React.ReactNode }) {
  return (
    <div className="border border-gray-300 rounded-sm">
      <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
        <span className="text-xs font-bold text-gray-600 uppercase tracking-wider">{title}</span>
        <button onClick={onEdit} className="text-xs text-gray-500 hover:text-gray-900 underline flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
          Edit
        </button>
      </div>
      <div className="px-3 py-2.5 space-y-2">{children}</div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-medium text-gray-800 text-right max-w-[180px] truncate">{value || '—'}</span>
    </div>
  )
}

const agreements = [
  { key: 'terms', label: 'Terms of Service', sub: 'I agree to the Terms of Service and User Agreement' },
  { key: 'privacy', label: 'Privacy Policy', sub: 'I acknowledge the Privacy Policy and data practices' },
  { key: 'communications', label: 'Health Communications', sub: 'I consent to receive benefit-related communications' },
  { key: 'dataSharing', label: 'Data Sharing Authorization', sub: 'I authorize sharing of my health benefits data as needed' },
] as const

export default function ReviewComplete({ navigate, data }: Props) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const allChecked = agreements.every(a => checked[a.key])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('register-success')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-gray-300 rounded-sm">
        <WireframeBrand />
        <WireframeSteps current={3} total={4} />

        <div className="px-5 py-5">
          <h1 className="text-[20px] font-bold text-gray-900 mb-1">Review & Complete</h1>
          <p className="text-sm text-gray-500 mb-5">Review your information before completing registration.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Section title="Personal Info" onEdit={() => navigate('register-verify')}>
              <Row label="Name" value={`${data.firstName} ${data.lastName}`} />
              <Row label="Date of Birth" value={data.dateOfBirth} />
              <Row label="Employer" value={data.employerName} />
              <Row label="Employee ID" value={data.employeeId} />
            </Section>

            <Section title="Login" onEdit={() => navigate('register-login')}>
              <Row label="Email" value={data.email} />
              <Row label="Password" value="••••••••" />
            </Section>

            <Section title="Security" onEdit={() => navigate('register-secure')}>
              <Row label="Multi-Factor Auth" value={data.mfaEnabled ? 'Enabled' : 'Disabled'} />
              {data.mfaEnabled && <Row label="Method" value={data.mfaMethod === 'sms' ? 'Text Message (SMS)' : 'Email'} />}
            </Section>

            {/* Legal Agreements */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Legal Agreements</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>
              <div className="space-y-3">
                {agreements.map(a => (
                  <label key={a.key} className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!checked[a.key]}
                      onChange={e => setChecked(prev => ({ ...prev, [a.key]: e.target.checked }))}
                      className="mt-0.5 w-4 h-4 border border-gray-400 accent-gray-800 flex-shrink-0"
                    />
                    <div>
                      <p className="text-xs font-semibold text-gray-800">{a.label}</p>
                      <p className="text-xs text-gray-500">{a.sub}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <WireframeButton type="submit" disabled={!allChecked}>Complete Registration →</WireframeButton>
            <button
              type="button"
              onClick={() => navigate('register-secure')}
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
