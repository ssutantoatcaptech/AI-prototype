import Button from '../../components/Button'
import PortalHeader from '../../components/PortalHeader'
import type { NavProps } from '../../types'

export default function AccountCreated({ navigate }: NavProps) {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-6 text-center">
        <PortalHeader title="Member Benefits Portal" />

        <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-5">
          <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-xl font-bold text-gray-900 mb-2">Account Created Successfully</h1>
        <p className="text-sm text-gray-500 mb-8">
          Your member account has been set up. You can now access your benefits, view coverage details, and manage your account.
        </p>

        <Button fullWidth onClick={() => navigate('dashboard')}>
          Continue to Member Portal →
        </Button>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-3">What's next?</p>
          <div className="space-y-2 text-left">
            {[
              'Review your coverage details',
              'Set up your ID card',
              'Explore available benefits',
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-xs text-gray-600">
                <div className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
