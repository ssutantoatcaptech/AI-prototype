import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Overview from './pages/Overview'
import Tables from './pages/Tables'
import QueryEditor from './pages/QueryEditor'
import ActivityLogPage from './pages/ActivityLog'
import FigmaFiles from './pages/FigmaFiles'
import ComponentDemo from './pages/ComponentDemo'
import MoOPortal from './pages/MoOPortal'
import AuthWireframes from './pages/AuthWireframes'
import LeaveWizard from './pages/LeaveWizard'
import { type Page } from './types'
import { useApi } from './hooks/useApi'
import { type TableInfo } from './types'

export default function App() {
  const [page, setPage] = useState<Page>('overview')
  const { data: tables } = useApi<TableInfo[]>('/api/tables')

  const renderPage = () => {
    switch (page) {
      case 'overview': return <Overview />
      case 'tables': return <Tables />
      case 'query': return <QueryEditor />
      case 'activity': return <ActivityLogPage />
      case 'figma': return <FigmaFiles />
      case 'components': return <ComponentDemo />
      case 'moo': return <MoOPortal />
      case 'auth': return <AuthWireframes />
    }
  }

  if (page === 'auth') {
    return <AuthWireframes />
  }

  if (page === 'leave') {
    return <LeaveWizard onBack={() => setPage('overview')} />
  }

  if (page === 'moo') {
    return <MoOPortal onBack={() => setPage('overview')} />
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar
        activePage={page}
        onNavigate={setPage}
        tableCount={tables?.length}
      />
      <main className="flex-1 ml-56 p-6 overflow-auto min-h-screen">
        {renderPage()}
      </main>
    </div>
  )
}
