import { useState } from 'react'
import type { NavProps } from '../types'

export default function Login({ navigate }: NavProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [showPw, setShowPw] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('two-factor')
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white border border-gray-300 rounded-sm">

        {/* Brand bar */}
        <div className="flex items-center gap-2 px-5 pt-5 pb-4 border-b border-gray-200">
          <div className="w-6 h-6 border-2 border-gray-800 rounded-sm flex items-center justify-center flex-shrink-0">
            <svg className="w-3.5 h-3.5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-gray-800 tracking-wide">Member Portal</span>
        </div>

        <div className="px-5 py-6">
          <h1 className="text-[22px] font-bold text-gray-900 mb-1">Sign in</h1>
          <p className="text-sm text-gray-500 mb-6">Sign in to access your benefits</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full px-3 py-2 pr-14 text-sm border border-gray-400 rounded-sm bg-white placeholder:text-gray-400 focus:outline-none focus:border-gray-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:text-gray-800 underline"
                >
                  {showPw ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={e => setRemember(e.target.checked)}
                  className="w-4 h-4 border border-gray-400 rounded-sm accent-gray-800"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => navigate('forgot-password')}
                className="text-sm text-gray-600 hover:text-gray-900 underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In */}
            <button
              type="submit"
              className="w-full py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-sm hover:bg-black transition-colors mt-2"
            >
              Sign In →
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Register */}
          <p className="text-sm text-center text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('register-verify')}
              className="font-semibold text-gray-900 hover:underline"
            >
              Register
            </button>
          </p>
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
