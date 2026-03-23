import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import type { NavProps } from '../types'

const coverages = [
  {
    type: 'Medical',
    plan: 'PPO Gold Plan',
    group: 'GRP-884521',
    member: 'MBR-001234',
    effective: 'Jan 1, 2025',
    deductible: '$1,500',
    outOfPocket: '$4,500',
    coinsurance: '80%',
    copay: '$25',
    status: 'Active',
    spent: 340,
    total: 1500,
  },
  {
    type: 'Dental',
    plan: 'Dental Plus',
    group: 'GRP-884522',
    member: 'MBR-001234',
    effective: 'Jan 1, 2025',
    deductible: '$100',
    outOfPocket: '$1,500',
    coinsurance: '80%',
    copay: '$0',
    status: 'Active',
    spent: 0,
    total: 100,
  },
  {
    type: 'Vision',
    plan: 'Vision Basic',
    group: 'GRP-884523',
    member: 'MBR-001234',
    effective: 'Jan 1, 2025',
    deductible: '$0',
    outOfPocket: '$500',
    coinsurance: '100%',
    copay: '$10',
    status: 'Active',
    spent: 0,
    total: 100,
  },
]

function CoverageCard({ c }: { c: typeof coverages[0] }) {
  const pct = Math.round((c.spent / c.total) * 100)
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-gray-900">{c.type}</h3>
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{c.status}</span>
          </div>
          <p className="text-sm text-gray-500 mt-0.5">{c.plan}</p>
        </div>
        <Button variant="outline" className="text-xs py-1.5 px-3">View Details</Button>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-4">
        {[
          ['Group #', c.group],
          ['Member ID', c.member],
          ['Effective Date', c.effective],
          ['Deductible', c.deductible],
          ['Out-of-Pocket Max', c.outOfPocket],
          ['Coinsurance', c.coinsurance],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-gray-400">{label}</p>
            <p className="text-sm font-medium text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Deductible Progress</span>
          <span>${c.spent.toLocaleString()} of {c.deductible}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full" style={{ width: `${Math.min(pct, 100)}%` }} />
        </div>
      </div>
    </div>
  )
}

export default function MyCoverages({ navigate }: NavProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar active="my-coverages" navigate={navigate} />

      <main className="ml-52 flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Coverages</h1>
            <p className="text-sm text-gray-500 mt-0.5">Your active benefit plans for plan year 2025</p>
          </div>

          <div className="space-y-4">
            {coverages.map(c => <CoverageCard key={c.type} c={c} />)}
          </div>
        </div>
      </main>
    </div>
  )
}
