import { useState } from 'react'
import { api } from '../lib/api'
import type { NavProps } from '../types'

type Stage = 'request' | 'check-email' | 'reset' | 'done'

export default function ForgotPassword({ navigate }: NavProps) {
  const [email, setEmail] = useState('')
  const [resetToken, setResetToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [stage, setStage] = useState<Stage>('request')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.forgotPassword(email)
      if (res.demoToken) setResetToken(res.demoToken) // pre-fill for demo
      setStage('check-email')
    } catch (err: any) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.resetPassword(resetToken, newPassword)
      setStage('done')
    } catch (err: any) {
      setError(err.message || 'Reset failed. The link may have expired.')
    } finally {
      setLoading(false)
    }
  }

  const brand = (
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
  )

  const footer = (
    <div className="px-5 py-3 border-t border-gray-200 flex justify-center gap-4 text-xs text-gray-400">
      <a href="#" className="hover:text-gray-600">Privacy Policy</a>
      <span>·</span>
      <a href="#" className="hover:text-gray-600">Terms of Service</a>
      <span>·</span>
      <a href="#" className="hover:text-gray-600">Accessibility</a>
    </div>
  )

  const wrap = (children: React.ReactNode) => (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white border border-gray-300 rounded-sm">
        {brand}{children}{footer}
      </div>
      <p className="mt-4 text-xs text-gray-400">© 2025 Member Benefits Portal</p>
    </div>
  )

  if (stage === 'request') return wrap(
    <div className="px-5 py-6">
      <h1 className="text-[22px] font-bold text-gray-900 mb-1">Reset your password</h1>
      <p className="text-sm text-gray-500 mb-6">Enter your email and we'll send reset instructions.</p>
      {error && <div className="mb-4 px-3 py-2 border border-red-300 bg-red-50 rounded-sm text-sm text-red-700">{error}</div>}
      <form onSubmit={handleRequest} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com" required
            className="w-full px-3 py-2 text-sm border border-gray-400 rounded-sm focus:outline-none focus:border-gray-800 placeholder:text-gray-400" />
        </div>
        <button type="submit" disabled={loading}
          className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors disabled:opacity-50">
          {loading ? 'Sending…' : 'Send Reset Link'}
        </button>
      </form>
    </div>
  )

  if (stage === 'check-email') return wrap(
    <div className="px-5 py-6 text-center">
      <div className="w-14 h-14 border-2 border-gray-800 rounded-sm flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <h1 className="text-[22px] font-bold text-gray-900 mb-2">Check your email</h1>
      <p className="text-sm text-gray-500 mb-1">We've sent reset instructions to</p>
      <p className="text-sm font-semibold text-gray-800 mb-5">{email}</p>

      {resetToken && (
        <div className="mb-4 px-3 py-2 border border-blue-200 bg-blue-50 rounded-sm text-xs text-blue-700 text-left">
          <strong>Demo mode:</strong> reset token pre-filled below.
        </div>
      )}

      <button onClick={() => setStage('reset')}
        className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors mb-3">
        Enter reset code
      </button>
      <div className="flex justify-between text-xs text-gray-500">
        <button onClick={() => setStage('request')} className="hover:text-gray-800 underline">Try different email</button>
        <button onClick={() => navigate('login')} className="hover:text-gray-800 underline">Back to Sign In</button>
      </div>
    </div>
  )

  if (stage === 'reset') return wrap(
    <div className="px-5 py-6">
      <h1 className="text-[22px] font-bold text-gray-900 mb-1">Create new password</h1>
      <p className="text-sm text-gray-500 mb-5">Your new password must differ from previous ones.</p>
      {error && <div className="mb-4 px-3 py-2 border border-red-300 bg-red-50 rounded-sm text-sm text-red-700">{error}</div>}
      <form onSubmit={handleReset} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Reset Token</label>
          <input type="text" value={resetToken} onChange={e => setResetToken(e.target.value)} placeholder="Paste your reset token" required
            className="w-full px-3 py-2 text-sm border border-gray-400 rounded-sm font-mono focus:outline-none focus:border-gray-800 placeholder:text-gray-400" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <button type="button" onClick={() => setShowNew(v => !v)} className="text-xs text-gray-500 underline">{showNew ? 'Hide' : 'Show'}</button>
          </div>
          <input type={showNew ? 'text' : 'password'} value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="New password" required
            className="w-full px-3 py-2 text-sm border border-gray-400 rounded-sm focus:outline-none focus:border-gray-800" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm password" required
            className="w-full px-3 py-2 text-sm border border-gray-400 rounded-sm focus:outline-none focus:border-gray-800" />
          {confirmPassword && confirmPassword !== newPassword &&
            <p className="text-xs text-red-500 mt-1">Passwords do not match</p>}
        </div>
        <ul className="grid grid-cols-1 gap-y-1">
          {[
            ['At least 8 characters', newPassword.length >= 8],
            ['One uppercase letter', /[A-Z]/.test(newPassword)],
            ['One number', /\d/.test(newPassword)],
          ].map(([label, ok]) => (
            <li key={label as string} className={`flex items-center gap-1.5 text-xs ${ok ? 'text-gray-800' : 'text-gray-400'}`}>
              <span>{ok ? '✓' : '○'}</span> {label as string}
            </li>
          ))}
        </ul>
        <button type="submit" disabled={loading || newPassword !== confirmPassword || newPassword.length < 8}
          className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors disabled:opacity-40">
          {loading ? 'Resetting…' : 'Reset Password'}
        </button>
      </form>
    </div>
  )

  // done
  return wrap(
    <div className="px-5 py-8 text-center">
      <div className="w-14 h-14 border-2 border-gray-800 rounded-sm flex items-center justify-center mx-auto mb-4">
        <svg className="w-7 h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-[22px] font-bold text-gray-900 mb-2">Password reset!</h1>
      <p className="text-sm text-gray-500 mb-6">Your password has been updated. Sign in with your new password.</p>
      <button onClick={() => navigate('login')}
        className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors">
        Back to Sign In →
      </button>
    </div>
  )
}
