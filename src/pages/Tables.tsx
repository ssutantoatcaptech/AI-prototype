import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { type TableInfo, type TableData } from '../types'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'

export default function Tables() {
  const { data: tables, loading } = useApi<TableInfo[]>('/api/tables')
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [page, setPage] = useState(1)

  const { data: tableData, loading: dataLoading } = useApi<TableData>(
    selectedTable ? `/api/tables/${selectedTable}/data?page=${page}&limit=25` : '',
    [selectedTable, page]
  )

  if (loading) return <LoadingSpinner />

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-white">Tables</h1>
        <p className="text-sm text-gray-500 mt-0.5">Browse schema and data</p>
      </div>

      <div className="grid grid-cols-5 gap-4 h-[calc(100vh-12rem)]">
        {/* Table list */}
        <div className="col-span-1 card overflow-auto p-2">
          <div className="text-xs text-gray-500 uppercase tracking-wider px-2 py-1 mb-1">Tables</div>
          {tables?.map(t => (
            <button
              key={t.name}
              onClick={() => { setSelectedTable(t.name); setPage(1) }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedTable === t.name
                  ? 'bg-blue-600/20 text-blue-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <div className="font-mono font-medium truncate">{t.name}</div>
              <div className="text-xs text-gray-600 mt-0.5">{t.rowCount} rows · {t.columns.length} cols</div>
            </button>
          ))}
        </div>

        {/* Table content */}
        <div className="col-span-4 card overflow-hidden flex flex-col p-0">
          {!selectedTable ? (
            <div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
              Select a table to view its data
            </div>
          ) : dataLoading ? (
            <LoadingSpinner />
          ) : tableData ? (
            <>
              {/* Header */}
              <div className="px-4 py-3 border-b border-gray-800 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-semibold text-blue-400">{selectedTable}</span>
                  <span className="text-xs text-gray-500">{tableData.total.toLocaleString()} rows</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  Page {tableData.page} / {tableData.totalPages}
                </div>
              </div>

              {/* Schema strip */}
              <div className="px-4 py-2 border-b border-gray-800 flex gap-2 overflow-x-auto shrink-0">
                {tableData.columns.map(col => (
                  <span
                    key={col.name}
                    className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${
                      col.primaryKey
                        ? 'bg-yellow-900/30 text-yellow-400'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                    title={`${col.type}${col.notNull ? ' NOT NULL' : ''}`}
                  >
                    {col.primaryKey && '🔑 '}{col.name}
                    <span className="text-gray-600 ml-1">{col.type}</span>
                  </span>
                ))}
              </div>

              {/* Data */}
              <div className="flex-1 overflow-auto">
                <DataTable rows={tableData.rows} columns={tableData.columns} compact />
              </div>

              {/* Pagination */}
              {tableData.totalPages > 1 && (
                <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between shrink-0">
                  <button
                    className="btn-ghost text-sm"
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                  >
                    ← Previous
                  </button>
                  <span className="text-xs text-gray-500">
                    Showing {(page - 1) * tableData.limit + 1}–{Math.min(page * tableData.limit, tableData.total)} of {tableData.total}
                  </span>
                  <button
                    className="btn-ghost text-sm"
                    onClick={() => setPage(p => Math.min(tableData.totalPages, p + 1))}
                    disabled={page === tableData.totalPages}
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}
