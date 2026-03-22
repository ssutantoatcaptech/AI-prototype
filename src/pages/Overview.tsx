import { useApi } from '../hooks/useApi'
import { type DbStats, type ActivityLog } from '../types'
import StatCard from '../components/StatCard'
import LoadingSpinner from '../components/LoadingSpinner'

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function levelColor(level: string) {
  switch (level) {
    case 'ERROR': return 'text-red-400 bg-red-900/30'
    case 'WARN': return 'text-yellow-400 bg-yellow-900/30'
    default: return 'text-green-400 bg-green-900/30'
  }
}

export default function Overview() {
  const { data: stats, loading: statsLoading } = useApi<DbStats>('/api/stats')
  const { data: logs, loading: logsLoading } = useApi<ActivityLog[]>('/api/activity')
  const { data: statusData } = useApi<{ status: string; count: number }[]>('/api/charts/order-status')

  if (statsLoading) return <LoadingSpinner />

  const totalRevenue = statusData
    ? undefined
    : undefined

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Overview</h1>
        <p className="text-sm text-gray-500 mt-0.5">Database health and summary</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tables"
          value={stats?.totalTables ?? '—'}
          subtitle="in demo.db"
          accent="blue"
        />
        <StatCard
          title="Total Rows"
          value={stats?.totalRows?.toLocaleString() ?? '—'}
          subtitle="across all tables"
          accent="green"
        />
        <StatCard
          title="Database Size"
          value={stats ? formatBytes(stats.dbSize) : '—'}
          subtitle="SQLite file size"
          accent="purple"
        />
        <StatCard
          title="Columns"
          value={stats?.tables.reduce((s, t) => s + t.columns, 0) ?? '—'}
          subtitle="total schema fields"
          accent="orange"
        />
      </div>

      {/* Tables overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-medium text-white mb-4">Tables</h2>
          <div className="space-y-2">
            {stats?.tables.map(t => (
              <div key={t.name} className="flex items-center justify-between py-2 border-b border-gray-800/50 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-blue-400">{t.name}</span>
                  <span className="text-xs text-gray-600">{t.columns} cols</span>
                </div>
                <span className="text-sm text-gray-400">{t.rows.toLocaleString()} rows</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order status distribution */}
        <div className="card">
          <h2 className="font-medium text-white mb-4">Order Status Distribution</h2>
          {statusData ? (
            <div className="space-y-3">
              {statusData.map(item => {
                const total = statusData.reduce((s, i) => s + i.count, 0)
                const pct = Math.round((item.count / total) * 100)
                const colors: Record<string, string> = {
                  completed: 'bg-green-500',
                  pending: 'bg-yellow-500',
                  processing: 'bg-blue-500',
                  cancelled: 'bg-red-500',
                }
                return (
                  <div key={item.status}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300 capitalize">{item.status}</span>
                      <span className="text-gray-500">{item.count} ({pct}%)</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${colors[item.status] ?? 'bg-gray-500'} transition-all`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <LoadingSpinner size="sm" />
          )}
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <h2 className="font-medium text-white mb-4">Recent Activity</h2>
        {logsLoading ? (
          <LoadingSpinner size="sm" />
        ) : (
          <div className="space-y-2">
            {logs?.slice(0, 8).map(log => (
              <div key={log.id} className="flex items-start gap-3 text-sm">
                <span className={`badge ${levelColor(log.level)} mt-0.5 shrink-0`}>
                  {log.level}
                </span>
                <span className="text-gray-300 flex-1">{log.message}</span>
                <span className="text-gray-600 text-xs shrink-0">{log.source}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
