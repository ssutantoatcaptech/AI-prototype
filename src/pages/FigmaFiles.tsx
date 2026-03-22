import { useState } from 'react'
import { type FigmaProject, type FigmaFile } from '../types'

const API_BASE = 'http://localhost:3001'

export default function FigmaFiles() {
  const [token, setToken] = useState('')
  const [teamId, setTeamId] = useState('')
  const [projects, setProjects] = useState<FigmaProject[]>([])
  const [selectedProject, setSelectedProject] = useState<FigmaProject | null>(null)
  const [files, setFiles] = useState<FigmaFile[]>([])
  const [loadingProjects, setLoadingProjects] = useState(false)
  const [loadingFiles, setLoadingFiles] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function fetchProjects() {
    if (!token || !teamId) return
    setError(null)
    setProjects([])
    setFiles([])
    setSelectedProject(null)
    setLoadingProjects(true)
    try {
      const res = await fetch(`${API_BASE}/api/figma/teams/${teamId}/projects`, {
        headers: { 'X-Figma-Token': token },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setProjects(data.projects || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoadingProjects(false)
    }
  }

  async function fetchFiles(project: FigmaProject) {
    setSelectedProject(project)
    setFiles([])
    setError(null)
    setLoadingFiles(true)
    try {
      const res = await fetch(`${API_BASE}/api/figma/projects/${project.id}/files`, {
        headers: { 'X-Figma-Token': token },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setFiles(data.files || [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoadingFiles(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-white">Figma Files</h1>
        <p className="text-sm text-gray-400 mt-1">Browse your Figma team projects and files</p>
      </div>

      {/* Credentials */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
        <h2 className="text-sm font-medium text-gray-300">Connection</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Personal Access Token</label>
            <input
              type="password"
              value={token}
              onChange={e => setToken(e.target.value)}
              placeholder="figd_..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 mb-1">Team ID</label>
            <input
              type="text"
              value={teamId}
              onChange={e => setTeamId(e.target.value)}
              placeholder="123456789"
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <button
          onClick={fetchProjects}
          disabled={!token || !teamId || loadingProjects}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm rounded-lg transition-colors"
        >
          {loadingProjects ? 'Loading…' : 'List Projects'}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-800 rounded-lg px-4 py-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-medium text-gray-300 mb-3">
            Projects <span className="text-gray-600 font-normal">({projects.length})</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {projects.map(project => (
              <button
                key={project.id}
                onClick={() => fetchFiles(project)}
                className={`text-left px-4 py-3 rounded-lg border text-sm transition-colors ${
                  selectedProject?.id === project.id
                    ? 'bg-blue-600/20 border-blue-500 text-blue-300'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white'
                }`}
              >
                <div className="font-medium truncate">{project.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">ID: {project.id}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {selectedProject && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
          <h2 className="text-sm font-medium text-gray-300 mb-3">
            Files in <span className="text-white">{selectedProject.name}</span>
            {!loadingFiles && (
              <span className="text-gray-600 font-normal"> ({files.length})</span>
            )}
          </h2>

          {loadingFiles && (
            <div className="text-sm text-gray-500 py-4 text-center">Loading files…</div>
          )}

          {!loadingFiles && files.length === 0 && (
            <div className="text-sm text-gray-600 py-4 text-center">No files found in this project.</div>
          )}

          {!loadingFiles && files.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {files.map(file => (
                <a
                  key={file.key}
                  href={`https://www.figma.com/file/${file.key}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-500 transition-colors"
                >
                  {file.thumbnail_url && (
                    <div className="aspect-video bg-gray-700 overflow-hidden">
                      <img
                        src={file.thumbnail_url}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                  )}
                  <div className="px-3 py-2.5">
                    <div className="text-sm font-medium text-white truncate">{file.name}</div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {new Date(file.last_modified).toLocaleDateString()}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
