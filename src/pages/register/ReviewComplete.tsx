import { useState } from 'react'
import Button from '../../components/Button'
import PortalHeader from '../../components/PortalHeader'
import ProgressDots from '../../components/ProgressDots'
import type { NavProps, RegistrationData } from '../../types'

interface Props extends NavProps {
  data: RegistrationData
}

function EditButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="p-1 text-gray-400 hover:text-black">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    </button>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-1.5">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-xs font-medium text-gray-900">{value}</span>
    </div>
  )
}

export default function ReviewComplete({ navigate, data }: Props) {
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    communications: false,
    dataSharing: false,
  })

  const allAgreed = Object.values(agreements).every(Boolean)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('register-success')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
        <PortalHeader />
        <div className="flex items-center justify-between mb-4">
          <ProgressDots steps={4} current={3} />
          <span className="text-xs text-gray-400">Step 4 of 4</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Review & Complete</h1>
        <p className="text-sm text-gray-500 mb-5">Please review your information before completing registration.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Personal Info */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Personal Info</h2>
              <EditButton onClick={() => navigate('register-verify')} />
            </div>
            <Row label="Name" value={`${data.firstName} ${data.lastName}`} />
            <Row label="Date of Birth" value={data.dateOfBirth || '—'} />
            <Row label="Employer" value={data.employerName || '—'} />
            <Row label="Employee ID" value={data.employeeId || '—'} />
          </div>

          {/* Login */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Login</h2>
              <EditButton onClick={() => navigate('register-login')} />
            </div>
            <Row label="Email" value={data.email || '—'} />
            <Row label="Password" value="••••••••" />
          </div>

          {/* Security */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Security</h2>
              <EditButton onClick={() => navigate('register-secure')} />
            </div>
            <Row label="Multi-Factor Auth" value={data.mfaEnabled ? 'Enabled' : 'Disabled'} />
            {data.mfaEnabled && <Row label="Method" value={data.mfaMethod === 'sms' ? 'Text Message' : 'Email'} />}
          </div>

          {/* Legal Agreements */}
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Legal Agreements</h2>
            <div className="space-y-3">
              {[
                { key: 'terms' as const, label: 'Terms of Service', sub: 'I agree to the Terms of Service and User Agreement' },
                { key: 'privacy' as const, label: 'Privacy Policy', sub: 'I acknowledge the Privacy Policy and data practices' },
                { key: 'communications' as const, label: 'Health Communications', sub: 'I consent to receive benefit-related communications' },
                { key: 'dataSharing' as const, label: 'Data Sharing Authorization', sub: 'I authorize sharing of my health benefits data as needed' },
              ].map(({ key, label, sub }) => (
                <label key={key} className="flex items-start gap-3 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreements[key]}
                    onChange={e => setAgreements(a => ({ ...a, [key]: e.target.checked }))}
                    className="mt-0.5 rounded border-gray-300 flex-shrink-0"
                  />
                  <div>
                    <p className="font-medium text-gray-900 text-xs">{label}</p>
                    <p className="text-xs text-gray-500">{sub}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <Button type="submit" fullWidth disabled={!allAgreed}>Complete Registration →</Button>
          <button type="button" onClick={() => navigate('register-secure')} className="w-full text-sm text-gray-500 hover:text-black">← Back</button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          Contact Support at{' '}
          <a href="tel:+18005551234" className="underline hover:text-gray-600">1-800-555-1234</a>
        </div>

        <footer className="mt-6 pt-4 border-t border-gray-100 flex justify-center gap-4 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Accessibility</a>
        </footer>
      </div>
    </div>
  )
}
