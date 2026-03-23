import Button from '../components/Button'
import Sidebar from '../components/Sidebar'
import type { NavProps, Member } from '../types'

interface Props extends NavProps { member: Member | null; onLogout: () => void }

const actions = [
  { label: 'Update My Preferences', done: false },
  { label: 'Set Up ID Card Access', done: false },
  { label: 'Opt In to Communications', done: false },
]

const benefits = [
  { name: 'Medical', plan: 'PPO Gold', status: 'Active', deductible: '$1,500', spent: '$340' },
  { name: 'Dental', plan: 'Dental Plus', status: 'Active', deductible: '$100', spent: '$0' },
  { name: 'Vision', plan: 'Vision Basic', status: 'Active', deductible: '$0', spent: '$0' },
]

export default function Dashboard({ navigate, member, onLogout }: Props) {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  const firstName = member?.firstName ?? 'Member'

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar active="dashboard" navigate={navigate} />

      <main className="ml-52 flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-5">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome, {firstName}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{today}</p>
            </div>
            <button onClick={onLogout} className="text-xs text-gray-500 hover:text-black border border-gray-300 rounded px-2 py-1">
              Sign Out
            </button>
          </div>

          <div className="grid grid-cols-3 gap-5">
            {/* Left column */}
            <div className="col-span-2 space-y-4">

              {/* Welcome notification */}
              <div className="bg-black text-white rounded-xl p-4 flex items-start justify-between">
                <div>
                  <p className="font-semibold text-sm">Welcome to Benefits Portal, {firstName} 👋</p>
                  <p className="text-xs text-gray-300 mt-1">Complete your profile setup to access all features.</p>
                </div>
                <button className="text-gray-400 hover:text-white text-lg leading-none">×</button>
              </div>

              {/* Actions to get started */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-900">Actions to Get Started</h2>
                  <span className="text-xs text-gray-400">Month 6</span>
                </div>
                <div className="space-y-2">
                  {actions.map(a => (
                    <div key={a.label} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${a.done ? 'bg-black border-black' : 'border-gray-300'}`} />
                      <span className="text-sm text-gray-700">{a.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Benefits */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-sm font-semibold text-gray-900">Active Benefits</h2>
                  <button onClick={() => navigate('my-coverages')} className="text-xs text-gray-500 hover:text-black underline">View all</button>
                </div>
                <div className="space-y-3">
                  {benefits.map(b => (
                    <div key={b.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{b.name}</p>
                        <p className="text-xs text-gray-500">{b.plan}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{b.status}</span>
                        <p className="text-xs text-gray-400 mt-1">Spent: {b.spent} / {b.deductible}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Quick Actions</h2>
                <div className="space-y-2">
                  <button className="w-full text-left text-sm text-gray-700 hover:text-black py-1.5 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Manage Preferences
                  </button>
                  <button onClick={() => navigate('support')} className="w-full text-left text-sm text-gray-700 hover:text-black py-1.5 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    Contact Support
                  </button>
                </div>
              </div>

              {/* Find ID Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Find ID Card</h2>
                <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                  </svg>
                </div>
                <Button fullWidth variant="outline" className="text-xs py-2">View ID Card</Button>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h2 className="text-sm font-semibold text-gray-900 mb-3">Recent Activity</h2>
                <div className="space-y-2 text-xs text-gray-500">
                  <p>No recent activity to show.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
