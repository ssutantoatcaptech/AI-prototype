const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

// Store active database connections
const connections = new Map()

// Default demo database path
const DEMO_DB_PATH = path.join(__dirname, 'demo.db')

function getDb(dbPath) {
  if (!connections.has(dbPath)) {
    const db = new Database(dbPath)
    db.pragma('journal_mode = WAL')
    db.pragma('foreign_keys = ON')
    connections.set(dbPath, db)
  }
  return connections.get(dbPath)
}

function initDemoDb() {
  const db = getDb(DEMO_DB_PATH)

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT DEFAULT 'user',
      status TEXT DEFAULT 'active',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      stock INTEGER DEFAULT 0,
      category TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id),
      total REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      unit_price REAL NOT NULL
    );

    CREATE TABLE IF NOT EXISTS logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      level TEXT NOT NULL,
      message TEXT NOT NULL,
      source TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

  // Seed data if empty
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get()
  if (userCount.count === 0) {
    const insertUser = db.prepare('INSERT INTO users (name, email, role, status) VALUES (?, ?, ?, ?)')
    const insertProduct = db.prepare('INSERT INTO products (name, description, price, stock, category) VALUES (?, ?, ?, ?, ?)')
    const insertOrder = db.prepare('INSERT INTO orders (user_id, total, status) VALUES (?, ?, ?)')
    const insertOrderItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)')
    const insertLog = db.prepare('INSERT INTO logs (level, message, source) VALUES (?, ?, ?)')

    const users = [
      ['Alice Johnson', 'alice@example.com', 'admin', 'active'],
      ['Bob Smith', 'bob@example.com', 'user', 'active'],
      ['Carol White', 'carol@example.com', 'user', 'inactive'],
      ['David Brown', 'david@example.com', 'moderator', 'active'],
      ['Emma Davis', 'emma@example.com', 'user', 'active'],
      ['Frank Miller', 'frank@example.com', 'user', 'active'],
      ['Grace Wilson', 'grace@example.com', 'user', 'suspended'],
      ['Henry Moore', 'henry@example.com', 'user', 'active'],
    ]
    users.forEach(u => insertUser.run(...u))

    const products = [
      ['Laptop Pro', 'High-performance laptop', 1299.99, 45, 'Electronics'],
      ['Wireless Mouse', 'Ergonomic wireless mouse', 49.99, 200, 'Electronics'],
      ['USB-C Hub', '7-in-1 USB-C hub', 79.99, 150, 'Electronics'],
      ['Mechanical Keyboard', 'RGB mechanical keyboard', 149.99, 75, 'Electronics'],
      ['Monitor 27"', '4K IPS monitor', 599.99, 30, 'Electronics'],
      ['Desk Lamp', 'LED desk lamp', 39.99, 300, 'Office'],
      ['Notebook', 'Premium hardcover notebook', 19.99, 500, 'Office'],
      ['Pen Set', 'Professional pen set', 24.99, 400, 'Office'],
    ]
    products.forEach(p => insertProduct.run(...p))

    const orderStatuses = ['completed', 'pending', 'processing', 'cancelled']
    for (let i = 1; i <= 20; i++) {
      const userId = Math.ceil(Math.random() * 8)
      const status = orderStatuses[Math.floor(Math.random() * orderStatuses.length)]
      const total = parseFloat((Math.random() * 500 + 50).toFixed(2))
      const order = insertOrder.run(userId, total, status)
      const numItems = Math.ceil(Math.random() * 3)
      for (let j = 0; j < numItems; j++) {
        const productId = Math.ceil(Math.random() * 8)
        const qty = Math.ceil(Math.random() * 3)
        const price = parseFloat((Math.random() * 100 + 20).toFixed(2))
        insertOrderItem.run(order.lastInsertRowid, productId, qty, price)
      }
    }

    const logs = [
      ['INFO', 'Application started', 'server'],
      ['INFO', 'Database connection established', 'database'],
      ['WARN', 'High memory usage detected', 'monitor'],
      ['ERROR', 'Failed to send email notification', 'email'],
      ['INFO', 'User alice@example.com logged in', 'auth'],
      ['INFO', 'User bob@example.com logged in', 'auth'],
      ['WARN', 'Slow query detected on orders table', 'database'],
      ['INFO', 'Scheduled backup completed', 'backup'],
      ['ERROR', 'Payment gateway timeout', 'payments'],
      ['INFO', 'Cache cleared successfully', 'cache'],
    ]
    logs.forEach(l => insertLog.run(...l))
  }

  return db
}

// Initialize demo database
initDemoDb()

// ─── Routes ───────────────────────────────────────────────────────────────────

// Get database overview stats
app.get('/api/stats', (req, res) => {
  try {
    const db = getDb(DEMO_DB_PATH)
    const tables = db.prepare(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'
    `).all()

    const stats = tables.map(t => {
      const count = db.prepare(`SELECT COUNT(*) as count FROM "${t.name}"`).get()
      const info = db.prepare(`PRAGMA table_info("${t.name}")`).all()
      return {
        name: t.name,
        rows: count.count,
        columns: info.length,
      }
    })

    const dbStat = fs.statSync(DEMO_DB_PATH)

    res.json({
      tables: stats,
      totalTables: stats.length,
      totalRows: stats.reduce((sum, t) => sum + t.rows, 0),
      dbSize: dbStat.size,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// List all tables
app.get('/api/tables', (req, res) => {
  try {
    const db = getDb(DEMO_DB_PATH)
    const tables = db.prepare(`
      SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name
    `).all()

    const result = tables.map(t => {
      const count = db.prepare(`SELECT COUNT(*) as count FROM "${t.name}"`).get()
      const columns = db.prepare(`PRAGMA table_info("${t.name}")`).all()
      return {
        name: t.name,
        rowCount: count.count,
        columns: columns.map(c => ({
          name: c.name,
          type: c.type,
          notNull: !!c.notnull,
          primaryKey: !!c.pk,
          defaultValue: c.dflt_value,
        })),
      }
    })

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get table data with pagination
app.get('/api/tables/:tableName/data', (req, res) => {
  const { tableName } = req.params
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 50
  const offset = (page - 1) * limit

  // Validate table name (alphanumeric + underscore only)
  if (!/^[a-zA-Z0-9_]+$/.test(tableName)) {
    return res.status(400).json({ error: 'Invalid table name' })
  }

  try {
    const db = getDb(DEMO_DB_PATH)
    const total = db.prepare(`SELECT COUNT(*) as count FROM "${tableName}"`).get()
    const rows = db.prepare(`SELECT * FROM "${tableName}" LIMIT ? OFFSET ?`).all(limit, offset)
    const columns = db.prepare(`PRAGMA table_info("${tableName}")`).all()

    res.json({
      rows,
      columns: columns.map(c => ({
        name: c.name,
        type: c.type,
        notNull: !!c.notnull,
        primaryKey: !!c.pk,
      })),
      total: total.count,
      page,
      limit,
      totalPages: Math.ceil(total.count / limit),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Execute a SQL query (read-only)
app.post('/api/query', (req, res) => {
  const { sql } = req.body
  if (!sql) return res.status(400).json({ error: 'SQL query is required' })

  // Block write operations for safety
  const normalized = sql.trim().toUpperCase()
  const writeKeywords = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER', 'TRUNCATE', 'REPLACE']
  const isWrite = writeKeywords.some(kw => normalized.startsWith(kw))

  if (isWrite) {
    return res.status(403).json({ error: 'Write operations are disabled in this dashboard. Only SELECT queries are allowed.' })
  }

  try {
    const db = getDb(DEMO_DB_PATH)
    const start = Date.now()
    const stmt = db.prepare(sql)
    const rows = stmt.all()
    const elapsed = Date.now() - start

    res.json({
      rows,
      rowCount: rows.length,
      elapsed,
      columns: rows.length > 0 ? Object.keys(rows[0]) : [],
    })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// Get chart data for orders over time
app.get('/api/charts/orders', (req, res) => {
  try {
    const db = getDb(DEMO_DB_PATH)
    const data = db.prepare(`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as count,
        SUM(total) as revenue,
        status
      FROM orders
      GROUP BY DATE(created_at), status
      ORDER BY date
    `).all()

    // Aggregate by date
    const byDate = {}
    data.forEach(row => {
      if (!byDate[row.date]) byDate[row.date] = { date: row.date, orders: 0, revenue: 0 }
      byDate[row.date].orders += row.count
      byDate[row.date].revenue += row.revenue
    })

    res.json(Object.values(byDate).slice(-14))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get order status distribution
app.get('/api/charts/order-status', (req, res) => {
  try {
    const db = getDb(DEMO_DB_PATH)
    const data = db.prepare(`
      SELECT status, COUNT(*) as count FROM orders GROUP BY status
    `).all()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get recent activity from logs
app.get('/api/activity', (req, res) => {
  try {
    const db = getDb(DEMO_DB_PATH)
    const logs = db.prepare(`
      SELECT * FROM logs ORDER BY created_at DESC LIMIT 20
    `).all()
    res.json(logs)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── Figma Routes ─────────────────────────────────────────────────────────────

// List projects in a Figma team
app.get('/api/figma/teams/:teamId/projects', async (req, res) => {
  const { teamId } = req.params
  const token = req.headers['x-figma-token']

  if (!token) {
    return res.status(401).json({ error: 'Missing X-Figma-Token header' })
  }

  try {
    const response = await fetch(`https://api.figma.com/v1/teams/${teamId}/projects`, {
      headers: { 'X-Figma-Token': token },
    })
    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      return res.status(response.status).json({ error: body.err || `Figma API error ${response.status}` })
    }
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// List files in a Figma project
app.get('/api/figma/projects/:projectId/files', async (req, res) => {
  const { projectId } = req.params
  const token = req.headers['x-figma-token']

  if (!token) {
    return res.status(401).json({ error: 'Missing X-Figma-Token header' })
  }

  try {
    const response = await fetch(`https://api.figma.com/v1/projects/${projectId}/files`, {
      headers: { 'X-Figma-Token': token },
    })
    if (!response.ok) {
      const body = await response.json().catch(() => ({}))
      return res.status(response.status).json({ error: body.err || `Figma API error ${response.status}` })
    }
    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Push variables to Figma file via Variables API
app.post('/api/figma/push-variables', async (req, res) => {
  const token = req.headers['x-figma-token']
  const { fileId } = req.body

  if (!token) return res.status(401).json({ error: 'Missing X-Figma-Token header' })
  if (!fileId) return res.status(400).json({ error: 'Missing fileId in request body' })

  // Build Figma Variables API payload from MoO tokens
  const collections = [
    { action: 'CREATE', id: 'col-colors',       name: 'Colors' },
    { action: 'CREATE', id: 'col-typography',   name: 'Typography' },
    { action: 'CREATE', id: 'col-spacing',      name: 'Spacing' },
    { action: 'CREATE', id: 'col-radius',       name: 'Border Radius' },
    { action: 'CREATE', id: 'col-components',   name: 'Components' },
  ]

  const modes = [
    { action: 'CREATE', id: 'mode-colors',      name: 'Default', variableCollectionId: 'col-colors' },
    { action: 'CREATE', id: 'mode-typography',  name: 'Default', variableCollectionId: 'col-typography' },
    { action: 'CREATE', id: 'mode-spacing',     name: 'Default', variableCollectionId: 'col-spacing' },
    { action: 'CREATE', id: 'mode-radius',      name: 'Default', variableCollectionId: 'col-radius' },
    { action: 'CREATE', id: 'mode-components',  name: 'Default', variableCollectionId: 'col-components' },
  ]

  function hexToRgb(hex) {
    const h = hex.replace('#', '')
    const hasAlpha = h.length === 8
    return {
      r: parseInt(h.substring(0, 2), 16) / 255,
      g: parseInt(h.substring(2, 4), 16) / 255,
      b: parseInt(h.substring(4, 6), 16) / 255,
      a: hasAlpha ? parseInt(h.substring(6, 8), 16) / 255 : 1,
    }
  }

  const colorVars = [
    { name: 'primary/main',      hex: '#0055A4' },
    { name: 'background/navy',   hex: '#0A1128' },
    { name: 'background/slate',  hex: '#101820' },
    { name: 'text/primary',      hex: '#F8FAFC' },
    { name: 'text/secondary',    hex: '#64748B' },
    { name: 'status/success',    hex: '#108981' },
    { name: 'status/warning',    hex: '#F59E0B' },
    { name: 'status/error',      hex: '#EF4444' },
    { name: 'status/inactive',   hex: '#64748B' },
    { name: 'border/default',    hex: '#FFFFFF14' },
    { name: 'border/focus',      hex: '#0055A480' },
    { name: 'surface/card',      hex: '#FFFFFF0D' },
    { name: 'surface/hover',     hex: '#FFFFFF1A' },
    { name: 'surface/nav',       hex: '#0A1128CC' },
  ]

  const typographyVars = [
    { name: 'fontFamily/primary',   value: 'Inter',    type: 'STRING' },
    { name: 'fontWeight/regular',   value: 400,        type: 'FLOAT' },
    { name: 'fontWeight/medium',    value: 500,        type: 'FLOAT' },
    { name: 'fontWeight/semibold',  value: 600,        type: 'FLOAT' },
    { name: 'fontWeight/bold',      value: 700,        type: 'FLOAT' },
    { name: 'fontSize/4xl',         value: 36,         type: 'FLOAT' },
    { name: 'fontSize/2xl',         value: 24,         type: 'FLOAT' },
    { name: 'fontSize/lg',          value: 18,         type: 'FLOAT' },
    { name: 'fontSize/base',        value: 16,         type: 'FLOAT' },
    { name: 'fontSize/sm',          value: 14,         type: 'FLOAT' },
    { name: 'fontSize/xs',          value: 12,         type: 'FLOAT' },
    { name: 'lineHeight/tight',     value: 40,         type: 'FLOAT' },
    { name: 'lineHeight/normal',    value: 28,         type: 'FLOAT' },
    { name: 'lineHeight/relaxed',   value: 24,         type: 'FLOAT' },
  ]

  const spacingVars = [1,2,3,4,6,8,12].map((n, i) => ({
    name: `spacing/${n}`,
    value: [4,8,12,16,24,32,48][i],
    type: 'FLOAT',
  }))

  const radiusVars = [
    { name: 'radius/sm',   value: 4,    type: 'FLOAT' },
    { name: 'radius/md',   value: 8,    type: 'FLOAT' },
    { name: 'radius/lg',   value: 12,   type: 'FLOAT' },
    { name: 'radius/xl',   value: 16,   type: 'FLOAT' },
    { name: 'radius/full', value: 9999, type: 'FLOAT' },
  ]

  const componentVars = [
    { name: 'button/height-sm', value: 32, type: 'FLOAT' },
    { name: 'button/height-md', value: 40, type: 'FLOAT' },
    { name: 'button/height-lg', value: 48, type: 'FLOAT' },
    { name: 'input/height',     value: 40, type: 'FLOAT' },
    { name: 'card/padding',     value: 24, type: 'FLOAT' },
    { name: 'card/radius',      value: 12, type: 'FLOAT' },
  ]

  const variables = [
    ...colorVars.map((v, i) => ({
      action: 'CREATE', id: `var-color-${i}`, name: v.name,
      resolvedType: 'COLOR', variableCollectionId: 'col-colors',
    })),
    ...typographyVars.map((v, i) => ({
      action: 'CREATE', id: `var-typo-${i}`, name: v.name,
      resolvedType: v.type, variableCollectionId: 'col-typography',
    })),
    ...spacingVars.map((v, i) => ({
      action: 'CREATE', id: `var-space-${i}`, name: v.name,
      resolvedType: 'FLOAT', variableCollectionId: 'col-spacing',
    })),
    ...radiusVars.map((v, i) => ({
      action: 'CREATE', id: `var-radius-${i}`, name: v.name,
      resolvedType: 'FLOAT', variableCollectionId: 'col-radius',
    })),
    ...componentVars.map((v, i) => ({
      action: 'CREATE', id: `var-comp-${i}`, name: v.name,
      resolvedType: 'FLOAT', variableCollectionId: 'col-components',
    })),
  ]

  const variableModeValues = [
    ...colorVars.map((v, i) => ({
      variableId: `var-color-${i}`, modeId: 'mode-colors', value: hexToRgb(v.hex),
    })),
    ...typographyVars.map((v, i) => ({
      variableId: `var-typo-${i}`, modeId: 'mode-typography', value: v.value,
    })),
    ...spacingVars.map((v, i) => ({
      variableId: `var-space-${i}`, modeId: 'mode-spacing', value: v.value,
    })),
    ...radiusVars.map((v, i) => ({
      variableId: `var-radius-${i}`, modeId: 'mode-radius', value: v.value,
    })),
    ...componentVars.map((v, i) => ({
      variableId: `var-comp-${i}`, modeId: 'mode-components', value: v.value,
    })),
  ]

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}/variables`, {
      method: 'POST',
      headers: { 'X-Figma-Token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({ variableCollections: collections, variableModes: modes, variables, variableModeValues }),
    })
    const data = await response.json()
    if (!response.ok) return res.status(response.status).json({ error: data.err || data.message || 'Figma API error' })
    res.json({ success: true, message: `Pushed ${variables.length} variables across ${collections.length} collections` })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Database Dashboard API running on http://localhost:${PORT}`)
})
