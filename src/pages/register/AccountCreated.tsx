import { WireframeBrand, WireframeFooter, WireframeButton } from '../../components/WireframeCard'
import type { NavProps, Member } from '../../types'

interface Props extends NavProps { member: Member | null }

export default function AccountCreated({ navigate, member }: Props) {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[380px] bg-white border border-gray-300 rounded-sm">
        <WireframeBrand />

        <div className="px-5 py-8 text-center">
          {/* Check icon */}
          <div className="w-14 h-14 border-2 border-gray-800 rounded-sm flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-[20px] font-bold text-gray-900 mb-2">
            Account Created Successfully{member ? `, ${member.firstName}` : ''}!
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Your member account is ready. You can now access your benefits, view coverage details, and manage your account.
          </p>

          <WireframeButton onClick={() => navigate('dashboard')}>
            Continue to Member Portal →
          </WireframeButton>
        </div>

        {/* What's next */}
        <div className="px-5 pb-5">
          <div className="border border-gray-200 rounded-sm p-3">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">What's Next</p>
            <ul className="space-y-2">
              {[
                'Review your coverage details',
                'Download or view your ID card',
                'Explore your available benefits',
              ].map(item => (
                <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                  <span className="text-gray-400 mt-0.5">→</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <WireframeFooter />
      </div>
      <p className="mt-4 text-xs text-gray-400">© 2025 Member Benefits Portal</p>
    </div>
  )
}
