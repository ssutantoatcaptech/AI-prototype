import { useState } from 'react'
import type { NavProps } from '../types'

type Method = 'sms' | 'email' | 'app'

export default function TwoFactor({ navigate }: NavProps) {
  const [method, setMethod] = useState<Method>('sms')
  const [code, setCode] = useState('')
  const [sent, setSent] = useState(false)

  function handleSend() { setSent(true) }

  function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    navigate('dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white border border-gray-300 rounded-sm">

        {/* Brand bar */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-gray-800 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">Member Portal</span>
          </div>
          <button
            onClick={() => navigate('login')}
            className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1"
          >
            ← Sign In
          </button>
        </div>

        <div className="px-5 py-6">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Two-Factor Authentication</h1>
          <p className="text-sm text-gray-500 mb-5">Verify your identity to continue</p>

          {/* Method tabs */}
          <div className="flex border border-gray-400 rounded-sm overflow-hidden mb-5">
            {([
              { id: 'sms' as Method, label: 'SMS' },
              { id: 'email' as Method, label: 'Email' },
              { id: 'app' as Method, label: 'Auth App' },
            ]).map(m => (
              <button
                key={m.id}
                onClick={() => { setMethod(m.id); setSent(false); setCode('') }}
                className={`flex-1 py-2 text-xs font-medium border-r last:border-r-0 border-gray-400 transition-colors ${
                  method === m.id ? 'bg-gray-900 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {!sent ? (
            <div className="space-y-4">
              {/* Description */}
              <div className="bg-gray-50 border border-gray-200 rounded-sm p-3 text-xs text-gray-600 space-y-1">
                {method === 'sms' && <p>A verification code will be sent to your mobile number on file.</p>}
                {method === 'email' && <p>A verification code will be sent to your email address on file.</p>}
                {method === 'app' && <p>Open your authentication app and enter the 6-digit code shown.</p>}
              </div>

              {method !== 'app' && (
                <button
                  onClick={handleSend}
                  className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors"
                >
                  Send Verification Code
                </button>
              )}
              {method === 'app' && (
                <button
                  onClick={handleSend}
                  className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors"
                >
                  Enter Code
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4">
              {/* Code input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Verification Code</label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="123456"
                  value={code}
                  onChange={e => setCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full px-3 py-3 text-center text-xl tracking-[0.5em] font-mono border border-gray-400 rounded-sm bg-white focus:outline-none focus:border-gray-800"
                  required
                />
                <p className="text-xs text-gray-400 mt-1 text-center">Enter the 6-digit code</p>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors"
              >
                Verify and Continue →
              </button>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <button type="button" onClick={() => setSent(false)} className="hover:text-gray-800 underline">
                  Resend code
                </button>
                <span className="text-gray-300">|</span>
                <button type="button" className="hover:text-gray-800 underline">
                  Get verification link
                </button>
              </div>
            </form>
          )}

          {/* Help */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-2">Having trouble?</p>
            <ul className="space-y-1 text-xs text-gray-500 list-disc list-inside">
              <li>Check your spam or junk folder</li>
              <li>Make sure your contact info is current</li>
              <li>Codes expire after 10 minutes</li>
              <li>Contact Support at 1-800-BENEFITS</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-200 flex justify-center gap-4 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <span>·</span>
          <a href="#" className="hover:text-gray-600">Accessibility</a>
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-400">© 2025 Member Benefits Portal</p>
    </div>
  )
}
