import Sidebar from '../components/Sidebar'
import Button from '../components/Button'
import type { NavProps } from '../types'

const claims = [
  { id: 'CLM-2025-0041', date: 'Mar 10, 2025', provider: 'Dr. Emily Chen', type: 'Medical', amount: '$240.00', status: 'Processed', paid: '$192.00' },
  { id: 'CLM-2025-0038', date: 'Feb 28, 2025', provider: 'City Dental Group', type: 'Dental', amount: '$180.00', status: 'Pending', paid: '—' },
  { id: 'CLM-2025-0029', date: 'Feb 14, 2025', provider: 'Vision Works', type: 'Vision', amount: '$95.00', status: 'Processed', paid: '$85.00' },
  { id: 'CLM-2025-0017', date: 'Jan 22, 2025', provider: 'Metro Hospital', type: 'Medical', amount: '$1,200.00', status: 'Processed', paid: '$960.00' },
]

const statusColors: Record<string, string> = {
  Processed: 'bg-gray-100 text-gray-700',
  Pending: 'bg-yellow-50 text-yellow-700',
  Denied: 'bg-red-50 text-red-700',
}

export default function Claims({ navigate }: NavProps) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar active="claims" navigate={navigate} />

      <main className="ml-52 flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Claims</h1>
              <p className="text-sm text-gray-500 mt-0.5">View and manage your submitted claims</p>
            </div>
            <Button>Submit a Claim</Button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Claim ID</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Provider</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Type</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Billed</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Paid</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {claims.map(c => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-gray-600">{c.id}</td>
                    <td className="px-4 py-3 text-gray-700">{c.date}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{c.provider}</td>
                    <td className="px-4 py-3 text-gray-600">{c.type}</td>
                    <td className="px-4 py-3 text-right text-gray-900">{c.amount}</td>
                    <td className="px-4 py-3 text-right text-gray-900">{c.paid}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[c.status] ?? 'bg-gray-100 text-gray-600'}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
