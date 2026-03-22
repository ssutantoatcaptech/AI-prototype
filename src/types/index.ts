export interface TableInfo {
  name: string
  rowCount: number
  columns: ColumnInfo[]
}

export interface ColumnInfo {
  name: string
  type: string
  notNull: boolean
  primaryKey: boolean
  defaultValue?: string | null
}

export interface TableData {
  rows: Record<string, unknown>[]
  columns: ColumnInfo[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface QueryResult {
  rows: Record<string, unknown>[]
  rowCount: number
  elapsed: number
  columns: string[]
  error?: string
}

export interface DbStats {
  tables: { name: string; rows: number; columns: number }[]
  totalTables: number
  totalRows: number
  dbSize: number
}

export interface ActivityLog {
  id: number
  level: 'INFO' | 'WARN' | 'ERROR'
  message: string
  source: string
  created_at: string
}

export type Page = 'overview' | 'tables' | 'query' | 'activity' | 'figma'

export interface FigmaProject {
  id: string
  name: string
}

export interface FigmaFile {
  key: string
  name: string
  thumbnail_url: string
  last_modified: string
}

export interface FigmaProjectsResponse {
  projects: FigmaProject[]
}

export interface FigmaFilesResponse {
  files: FigmaFile[]
}
