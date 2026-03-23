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

const requirements = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

export default function CreateLogin({ navigate, data, setData }: Props) {
  const [confirm, setConfirm] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('register-secure')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
        <PortalHeader />
        <div className="flex items-center justify-between mb-4">
          <ProgressDots steps={4} current={1} />
          <span className="text-xs text-gray-400">Step 2 of 4</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Create Your Login</h1>
        <p className="text-sm text-gray-500 mb-5">Set up your email and password to access the portal.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={data.email}
            onChange={e => setData({ email: e.target.value })}
            required
          />

          <div>
            <Input
              label="Set Your Password"
              type="password"
              placeholder="••••••••"
              value={data.password}
              onChange={e => setData({ password: e.target.value })}
              required
            />
            <ul className="mt-2 space-y-1">
              {requirements.map(r => (
                <li key={r.label} className={`flex items-center gap-1.5 text-xs ${r.test(data.password) ? 'text-green-600' : 'text-gray-400'}`}>
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    {r.test(data.password)
                      ? <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      : <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    }
                  </svg>
                  {r.label}
                </li>
              ))}
            </ul>
          </div>

          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            error={confirm && confirm !== data.password ? 'Passwords do not match' : undefined}
            required
          />

          <Button type="submit" fullWidth>Continue to Profile →</Button>
          <button type="button" onClick={() => navigate('register-verify')} className="w-full text-sm text-gray-500 hover:text-black">← Back</button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-400">
          Need help?{' '}
          <a href="#" className="underline hover:text-gray-600">Contact Support</a>
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
