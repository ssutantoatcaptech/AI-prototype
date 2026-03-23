import { useState } from 'react'
import Button from '../components/Button'
import PortalHeader from '../components/PortalHeader'
import type { NavProps } from '../types'

export default function TwoFactor({ navigate }: NavProps) {
  const [method, setMethod] = useState<'sms' | 'email'>('sms')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)

  function handleSend() {
    setSent(true)
  }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    navigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
        <PortalHeader />

        <h1 className="text-xl font-bold text-gray-900 mb-1">Two-Factor Authentication</h1>
        <p className="text-sm text-gray-500 mb-6">Verify your identity to continue</p>

        <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-5">
          {(['sms', 'email'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMethod(m)}
              className={`flex-1 py-2 text-sm font-medium transition-colors ${
                method === m ? 'bg-black text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              {m === 'sms' ? 'Text Message' : 'Email'}
            </button>
          ))}
        </div>

        {!sent ? (
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              {method === 'sms'
                ? "We'll send a verification code to your phone number on file."
                : "We'll send a verification code to your email address on file."}
            </p>
            <Button fullWidth onClick={handleSend}>Send Code</Button>
          </div>
        ) : (
          <form onSubmit={handleVerify} className="space-y-4">
            <p className="text-sm text-gray-600">
              Enter the 6-digit code sent to your {method === 'sms' ? 'phone' : 'email'}.
            </p>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
              className="w-full px-3 py-3 text-center text-2xl tracking-widest border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
            <Button type="submit" fullWidth>Verify and Continue</Button>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="w-full text-sm text-gray-500 hover:text-black"
            >
              Resend code
            </button>
          </form>
        )}

        <div className="mt-6 space-y-2 text-xs text-gray-500">
          <p className="font-medium text-gray-700">Having trouble?</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Check your spam or junk folder</li>
            <li>Make sure your contact info is up to date</li>
            <li>Codes expire after 10 minutes</li>
          </ul>
        </div>

        <button
          onClick={() => navigate('login')}
          className="mt-4 text-sm text-gray-500 hover:text-black flex items-center gap-1"
        >
          ← Back to Sign In
        </button>

        <footer className="mt-6 pt-4 border-t border-gray-100 flex justify-center gap-4 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Accessibility</a>
        </footer>
      </div>
    </div>
  )
}
