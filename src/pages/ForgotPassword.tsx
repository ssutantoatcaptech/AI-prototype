import { useState } from 'react'
import type { NavProps } from '../types'

export default function ForgotPassword({ navigate }: NavProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [stage, setStage] = useState<'request' | 'check-email' | 'reset'>('request')

  function handleRequest(e: React.FormEvent) {
    e.preventDefault()
    setStage('check-email')
  }

  function handleReset(e: React.FormEvent) {
    e.preventDefault()
    navigate('login')
  }

  /* ── Request stage ── */
  if (stage === 'request') return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white border border-gray-300 rounded-sm">

        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-gray-800 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">Member Portal</span>
          </div>
          <button onClick={() => navigate('login')} className="text-xs text-gray-500 hover:text-gray-800">← Sign In</button>
        </div>

        <div className="px-5 py-6">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Reset your password</h1>
          <p className="text-sm text-gray-500 mb-6">Enter your email address and we'll send reset instructions.</p>

          <form onSubmit={handleRequest} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
                className="w-full px-3 py-2 text-sm border border-gray-400 rounded-sm bg-white placeholder:text-gray-400 focus:outline-none focus:border-gray-800"
              />
            </div>

            <button type="submit" className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors">
              Send Reset Link
            </button>
          </form>

          <div className="mt-5 pt-4 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-2">Having trouble?</p>
            <ul className="space-y-1 text-xs text-gray-500 list-disc list-inside">
              <li>Make sure the email matches your registered account</li>
              <li>Check your spam or junk folder</li>
              <li>Contact Support at 1-800-BENEFITS</li>
            </ul>
          </div>
        </div>

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

  /* ── Check email stage ── */
  if (stage === 'check-email') return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white border border-gray-300 rounded-sm">

        <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-gray-200">
          <div className="w-6 h-6 border-2 border-gray-800 rounded-sm flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800">Member Portal</span>
        </div>

        <div className="px-5 py-6 text-center">
          {/* Envelope icon */}
          <div className="w-14 h-14 border-2 border-gray-800 rounded-sm flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <h1 className="text-[22px] font-bold text-gray-900 mb-2">Check your email</h1>
          <p className="text-sm text-gray-500 mb-1">We've sent password reset instructions to</p>
          <p className="text-sm font-semibold text-gray-800 mb-6">{email}</p>

          <button
            onClick={() => setStage('reset')}
            className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors mb-3"
          >
            I've received my link
          </button>

          <div className="flex items-center justify-between text-xs text-gray-500">
            <button onClick={() => setStage('request')} className="hover:text-gray-800 underline">
              Try a different email
            </button>
            <span className="text-gray-300">|</span>
            <button onClick={() => navigate('login')} className="hover:text-gray-800 underline">
              Back to Sign In
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200 text-left">
            <p className="text-xs font-semibold text-gray-600 mb-2">Didn't receive it?</p>
            <ul className="space-y-1 text-xs text-gray-500 list-disc list-inside">
              <li>Check your spam or junk folder</li>
              <li>The link expires in 30 minutes</li>
              <li>Contact Support at 1-800-BENEFITS</li>
            </ul>
          </div>
        </div>

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

  /* ── Create new password stage ── */
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white border border-gray-300 rounded-sm">

        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 border-2 border-gray-800 rounded-sm flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-800">Member Portal</span>
          </div>
          <button onClick={() => navigate('login')} className="text-xs text-gray-500 hover:text-gray-800">← Sign In</button>
        </div>

        <div className="px-5 py-6">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Create new password</h1>
          <p className="text-sm text-gray-500 mb-6">Your new password must be different from your previous passwords.</p>

          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="New password"
                  required
                  className="w-full px-3 py-2 pr-14 text-sm border border-gray-400 rounded-sm focus:outline-none focus:border-gray-800"
                />
                <button type="button" onClick={() => setShowNew(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 underline">
                  {showNew ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                className="w-full px-3 py-2 text-sm border border-gray-400 rounded-sm focus:outline-none focus:border-gray-800"
              />
              {confirmPassword && confirmPassword !== newPassword && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            {/* Requirements */}
            <ul className="space-y-1 text-xs text-gray-500">
              {[
                ['At least 8 characters', newPassword.length >= 8],
                ['One uppercase letter', /[A-Z]/.test(newPassword)],
                ['One number', /\d/.test(newPassword)],
                ['One special character', /[^A-Za-z0-9]/.test(newPassword)],
              ].map(([label, ok]) => (
                <li key={label as string} className={`flex items-center gap-1.5 ${ok ? 'text-gray-800' : 'text-gray-400'}`}>
                  <span>{ok ? '✓' : '○'}</span> {label as string}
                </li>
              ))}
            </ul>

            <button
              type="submit"
              disabled={newPassword !== confirmPassword || newPassword.length < 8}
              className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Reset Password
            </button>
          </form>
        </div>

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
