import { useState, useRef } from 'react'
import { type QueryResult } from '../types'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'

const EXAMPLE_QUERIES = [
  { label: 'All users', sql: 'SELECT * FROM users' },
  { label: 'Order totals by user', sql: 'SELECT u.name, COUNT(o.id) as orders, ROUND(SUM(o.total), 2) as total_spent\nFROM users u\nLEFT JOIN orders o ON u.id = o.user_id\nGROUP BY u.id, u.name\nORDER BY total_spent DESC' },
  { label: 'Products by category', sql: 'SELECT category, COUNT(*) as count, ROUND(AVG(price), 2) as avg_price\nFROM products\nGROUP BY category' },
  { label: 'Recent orders', sql: 'SELECT o.id, u.name, o.total, o.status, o.created_at\nFROM orders o\nJOIN users u ON u.id = o.user_id\nORDER BY o.created_at DESC\nLIMIT 10' },
  { label: 'Low stock products', sql: 'SELECT name, stock, price FROM products WHERE stock < 100 ORDER BY stock ASC' },
]

export default function QueryEditor() {
  const [sql, setSql] = useState('SELECT * FROM users LIMIT 10')
  const [result, setResult] = useState<QueryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  async function runQuery() {
    if (!sql.trim()) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sql }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Query failed')
        setResult(null)
      } else {
        setResult(data)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error')
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      runQuery()
    }
    if (e.key === 'Tab') {
      e.preventDefault()
      const el = textareaRef.current!
      const start = el.selectionStart
      const end = el.selectionEnd
      const newVal = sql.substring(0, start) + '  ' + sql.substring(end)
      setSql(newVal)
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 2
      })
    }
  }

  return (
    <div className="space-y-4 h-[calc(100vh-6rem)] flex flex-col">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-xl font-semibold text-white">Query Editor</h1>
          <p className="text-sm text-gray-500 mt-0.5">Run read-only SQL queries · Ctrl+Enter to execute</p>
        </div>
      </div>

      {/* Example queries */}
      <div className="flex gap-2 flex-wrap shrink-0">
        {EXAMPLE_QUERIES.map(q => (
          <button
            key={q.label}
            className="text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors"
            onClick={() => setSql(q.sql)}
          >
            {q.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="card p-0 flex flex-col shrink-0">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
          <span className="text-xs text-gray-500 font-mono">SQL</span>
          <button
            className="btn-primary text-xs px-3 py-1.5"
            onClick={runQuery}
            disabled={loading}
          >
            {loading ? 'Running…' : '▶ Run Query'}
          </button>
        </div>
        <textarea
          ref={textareaRef}
          value={sql}
          onChange={e => setSql(e.target.value)}
          onKeyDown={handleKeyDown}
          className="sql-editor bg-transparent text-gray-200 p-4 resize-none outline-none min-h-32 w-full"
          rows={6}
          spellCheck={false}
          placeholder="SELECT * FROM users"
        />
      </div>

      {/* Results */}
      <div className="card flex-1 overflow-hidden flex flex-col p-0">
        <div className="px-4 py-2 border-b border-gray-800 shrink-0 flex items-center gap-3">
          <span className="text-xs text-gray-500 font-mono uppercase tracking-wider">Results</span>
          {result && (
            <>
              <span className="text-xs text-green-400">{result.rowCount} rows</span>
              <span className="text-xs text-gray-600">{result.elapsed}ms</span>
            </>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="p-4">
              <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                <div className="text-red-400 font-medium text-sm mb-1">Query Error</div>
                <div className="text-red-300 text-sm font-mono">{error}</div>
              </div>
            </div>
          ) : result ? (
            <DataTable
              rows={result.rows}
              columns={result.columns}
              compact
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-600 text-sm">
              Run a query to see results
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
