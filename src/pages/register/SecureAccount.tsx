import { useState } from 'react'
import Button from '../../components/Button'
import Input from '../../components/Input'
import PortalHeader from '../../components/PortalHeader'
import ProgressDots from '../../components/ProgressDots'
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
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
        <PortalHeader />
        <div className="flex items-center justify-between mb-4">
          <ProgressDots steps={4} current={2} />
          <span className="text-xs text-gray-400">Step 3 of 4</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Secure Your Account</h1>
        <p className="text-sm text-gray-500 mb-5">Add an extra layer of security to protect your benefits information.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* MFA Toggle */}
          <div className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div>
              <p className="text-sm font-medium text-gray-900">Recommended: Enable Multi-Factor Authentication</p>
              <p className="text-xs text-gray-500 mt-0.5">Require a code in addition to your password</p>
            </div>
            <button
              type="button"
              onClick={() => setData({ mfaEnabled: !data.mfaEnabled })}
              className={`relative flex-shrink-0 w-10 h-6 rounded-full transition-colors ${data.mfaEnabled ? 'bg-black' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${data.mfaEnabled ? 'translate-x-4' : ''}`} />
            </button>
          </div>

          {data.mfaEnabled && (
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">How would you like to receive codes?</p>
              {(['sms', 'email'] as const).map(m => (
                <label key={m} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="mfaMethod"
                    checked={data.mfaMethod === m}
                    onChange={() => setData({ mfaMethod: m })}
                    className="text-black"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{m === 'sms' ? 'Text Message (SMS)' : 'Email'}</p>
                    <p className="text-xs text-gray-500">{m === 'sms' ? 'Codes sent to your mobile phone' : 'Codes sent to your email address'}</p>
                  </div>
                </label>
              ))}

              {data.mfaMethod === 'sms' && (
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-medium">Mobile Phone Number</p>
                  <div className="flex gap-2">
                    <select className="px-2 py-2.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-black">
                      <option>+1</option>
                    </select>
                    <Input
                      placeholder="(555) 000-0000"
                      type="tel"
                      value={data.phoneNumber}
                      onChange={e => setData({ phoneNumber: e.target.value })}
                      className="flex-1"
                    />
                  </div>
                </div>
              )}

              <Input
                label="Backup Email (optional)"
                type="email"
                placeholder="backup@example.com"
                value={data.backupEmail}
                onChange={e => setData({ backupEmail: e.target.value })}
              />
            </div>
          )}

          <Button type="submit" fullWidth>Continue →</Button>
          <button type="button" onClick={() => navigate('register-login')} className="w-full text-sm text-gray-500 hover:text-black">← Back</button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          Need help? Contact Support at{' '}
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
