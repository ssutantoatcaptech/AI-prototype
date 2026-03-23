import { useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import PortalHeader from '../components/PortalHeader'
import type { NavProps } from '../types'

export default function Login({ navigate }: NavProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('two-factor')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
        <PortalHeader />

        <h1 className="text-xl font-bold text-gray-900 mb-1">Member Portal</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to access your benefits</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="rounded border-gray-300"
              />
              Remember me
            </label>
            <button
              type="button"
              onClick={() => navigate('forgot-password')}
              className="text-sm text-gray-600 hover:text-black underline"
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" fullWidth>Sign In</Button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('register-verify')}
            className="text-black font-medium hover:underline"
          >
            Register
          </button>
        </p>

        <footer className="mt-8 pt-4 border-t border-gray-100 flex justify-center gap-4 text-xs text-gray-400">
          <a href="#" className="hover:text-gray-600">Privacy Policy</a>
          <a href="#" className="hover:text-gray-600">Terms of Service</a>
          <a href="#" className="hover:text-gray-600">Accessibility</a>
        </footer>
      </div>
    </div>
  )
}
