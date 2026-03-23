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

export default function VerifyIdentity({ navigate, data, setData }: Props) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    navigate('register-login')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6">
        <PortalHeader />
        <div className="flex items-center justify-between mb-4">
          <ProgressDots steps={4} current={0} />
          <span className="text-xs text-gray-400">Step 1 of 4</span>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-1">Verify Your Identity</h1>
        <p className="text-sm text-gray-500 mb-5">Please provide your information so we can verify your eligibility.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Personal Information</h2>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="First Name"
                  placeholder="Jane"
                  value={data.firstName}
                  onChange={e => setData({ firstName: e.target.value })}
                  required
                />
                <Input
                  label="Last Name"
                  placeholder="Smith"
                  value={data.lastName}
                  onChange={e => setData({ lastName: e.target.value })}
                  required
                />
              </div>
              <Input
                label="Date of Birth *"
                type="date"
                value={data.dateOfBirth}
                onChange={e => setData({ dateOfBirth: e.target.value })}
                required
              />
              <Input
                label="Last 4 of SSN *"
                placeholder="••••"
                maxLength={4}
                value={data.last4SSN}
                onChange={e => setData({ last4SSN: e.target.value.replace(/\D/g, '') })}
                required
              />
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Employment Information</h2>
            <div className="space-y-3">
              <Input
                label="Employer Name"
                placeholder="Acme Corporation"
                value={data.employerName}
                onChange={e => setData({ employerName: e.target.value })}
                required
              />
              <Input
                label="Employee ID"
                placeholder="EMP-12345"
                value={data.employeeId}
                onChange={e => setData({ employeeId: e.target.value })}
                required
              />
            </div>
          </div>

          <label className="flex items-start gap-3 text-sm text-gray-600 cursor-pointer">
            <input type="checkbox" required className="mt-0.5 rounded border-gray-300 flex-shrink-0" />
            <span>I certify that the information provided is accurate and I am eligible for this benefit plan.</span>
          </label>

          <Button type="submit" fullWidth>Continue →</Button>
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
