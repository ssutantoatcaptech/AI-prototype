import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { type ActivityLog } from '../types'
import LoadingSpinner from '../components/LoadingSpinner'

function levelStyle(level: string) {
  switch (level) {
    case 'ERROR': return 'bg-red-900/30 text-red-400 border-red-800'
    case 'WARN': return 'bg-yellow-900/30 text-yellow-400 border-yellow-800'
    default: return 'bg-green-900/30 text-green-400 border-green-800'
  }
}

const LEVELS = ['ALL', 'INFO', 'WARN', 'ERROR']

export default function ActivityLogPage() {
  const { data: logs, loading, refetch } = useApi<ActivityLog[]>('/api/activity')
  const [filter, setFilter] = useState('ALL')

  const filtered = logs?.filter(l => filter === 'ALL' || l.level === filter) ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Activity Log</h1>
          <p className="text-sm text-gray-500 mt-0.5">System events and database activity</p>
        </div>
        <button className="btn-ghost text-sm" onClick={refetch}>↻ Refresh</button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 p-1 bg-gray-900 border border-gray-800 rounded-lg w-fit">
        {LEVELS.map(level => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              filter === level
                ? 'bg-gray-700 text-white'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {level}
            {logs && level !== 'ALL' && (
              <span className="ml-1.5 text-xs opacity-60">
                {logs.filter(l => l.level === level).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Log entries */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="divide-y divide-gray-800">
            {filtered.length === 0 ? (
              <div className="py-12 text-center text-gray-500 text-sm">No log entries</div>
            ) : (
              filtered.map(log => (
                <div key={log.id} className="flex items-start gap-4 px-5 py-3 hover:bg-gray-800/20 transition-colors">
                  <span className={`badge border ${levelStyle(log.level)} shrink-0 mt-0.5`}>
                    {log.level}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-gray-200">{log.message}</div>
                    <div className="text-xs text-gray-600 mt-0.5">
                      Source: <span className="text-gray-500">{log.source}</span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 shrink-0 font-mono">
                    {new Date(log.created_at).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Summary cards */}
      {logs && (
        <div className="grid grid-cols-3 gap-4">
          {['INFO', 'WARN', 'ERROR'].map(level => {
            const count = logs.filter(l => l.level === level).length
            const styles: Record<string, string> = {
              INFO: 'text-green-400',
              WARN: 'text-yellow-400',
              ERROR: 'text-red-400',
            }
            return (
              <div key={level} className="card text-center">
                <div className="text-xs text-gray-500 mb-1">{level}</div>
                <div className={`text-2xl font-bold ${styles[level]}`}>{count}</div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
