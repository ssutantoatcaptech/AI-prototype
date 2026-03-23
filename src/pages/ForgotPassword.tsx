import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import PortalHeader from '../components/PortalHeader'
import type { NavProps } from '../types'

export default function ForgotPassword({ navigate }: NavProps) {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
          <PortalHeader />
          <div className="text-center py-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2">Check your email</h1>
            <p className="text-sm text-gray-500 mb-1">We've sent password reset instructions to</p>
            <p className="text-sm font-medium text-gray-900 mb-6">{email}</p>
            <Button fullWidth onClick={() => navigate('login')}>Back to Sign In</Button>
            <p className="text-xs text-gray-400 mt-4">Didn't receive an email? Check your spam folder or try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
        <PortalHeader />

        <h1 className="text-xl font-bold text-gray-900 mb-1">Reset your password</h1>
        <p className="text-sm text-gray-500 mb-6">Enter your email address and we'll send you a reset link.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Button type="submit" fullWidth>Send Reset Link</Button>
        </form>

        <button
          onClick={() => navigate('login')}
          className="mt-4 text-sm text-gray-500 hover:text-black flex items-center gap-1"
        >
          ← Back to Sign In
        </button>
      </div>
    </div>
  )
}
