import { useState } from 'react'
import { WireframeBrand, WireframeSteps, WireframeFooter, WireframeLabel, WireframeInput, WireframeButton } from '../../components/WireframeCard'
import type { NavProps, RegistrationData } from '../../types'

interface Props extends NavProps {
  data: RegistrationData
  setData: (d: Partial<RegistrationData>) => void
}

const reqs = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /\d/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
]

export default function CreateLogin({ navigate, data, setData }: Props) {
  const [confirm, setConfirm] = useState('')
  const [showPw, setShowPw] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('register-secure')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-gray-300 rounded-sm">
        <WireframeBrand />
        <WireframeSteps current={1} total={4} />

        <div className="px-5 py-5">
          <h1 className="text-[20px] font-bold text-gray-900 mb-1">Create Your Login</h1>
          <p className="text-sm text-gray-500 mb-5">Set up your email and password to access the portal.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <WireframeLabel>Email Address *</WireframeLabel>
              <WireframeInput
                type="email"
                placeholder="email@example.com"
                value={data.email}
                onChange={e => setData({ email: e.target.value })}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <WireframeLabel>Set Your Password *</WireframeLabel>
                <button type="button" onClick={() => setShowPw(v => !v)} className="text-xs text-gray-500 underline">
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
              <WireframeInput
                type={showPw ? 'text' : 'password'}
                placeholder="Password"
                value={data.password}
                onChange={e => setData({ password: e.target.value })}
                required
              />
              {/* Requirements */}
              <ul className="mt-2 grid grid-cols-1 gap-y-1">
                {reqs.map(r => (
                  <li key={r.label} className={`flex items-center gap-1.5 text-xs ${r.test(data.password) ? 'text-gray-800' : 'text-gray-400'}`}>
                    <span className="w-3 text-center">{r.test(data.password) ? '✓' : '○'}</span>
                    {r.label}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <WireframeLabel>Confirm Password *</WireframeLabel>
              <WireframeInput
                type="password"
                placeholder="Confirm password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
              />
              {confirm && confirm !== data.password && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
              )}
            </div>

            <WireframeButton type="submit">Continue to Profile →</WireframeButton>
            <button
              type="button"
              onClick={() => navigate('register-verify')}
              className="w-full py-2 text-sm text-gray-500 hover:text-gray-800 border border-gray-300 rounded-sm bg-white"
            >
              ← Back
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-xs text-gray-400">Need help? </span>
            <a href="#" className="text-xs text-gray-600 underline hover:text-gray-900">Contact Support</a>
          </div>
        </div>

        <WireframeFooter />
      </div>
      <p className="mt-4 text-xs text-gray-400">© 2025 Member Benefits Portal</p>
    </div>
  )
}
