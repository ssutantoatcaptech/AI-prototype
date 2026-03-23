const express = require('express')
const cors = require('cors')
const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')
const crypto = require('crypto')

function hashPassword(password, salt) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex')
}
function generateToken() { return crypto.randomBytes(32).toString('hex') }
function generateCode() { return String(Math.floor(100000 + Math.random() * 900000)) }

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

  // Member auth tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      employer_name TEXT,
      employee_id TEXT,
      date_of_birth TEXT,
      last_4_ssn TEXT,
      mfa_enabled INTEGER DEFAULT 1,
      mfa_method TEXT DEFAULT 'sms',
      phone_number TEXT,
      backup_email TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS member_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER NOT NULL REFERENCES members(id),
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS mfa_codes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      member_id INTEGER NOT NULL REFERENCES members(id),
      code TEXT NOT NULL,
      expires_at DATETIME NOT NULL,
      used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS password_resets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      token TEXT UNIQUE NOT NULL,
      expires_at DATETIME NOT NULL,
      used INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `)

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

// ─── Auth Routes ──────────────────────────────────────────────────────────────

// Register
app.post('/api/auth/register', (req, res) => {
  const { firstName, lastName, email, password, employerName, employeeId, dateOfBirth, last4SSN, mfaEnabled, mfaMethod, phoneNumber, backupEmail } = req.body
  if (!email || !password || !firstName || !lastName) return res.status(400).json({ error: 'Missing required fields' })
  try {
    const db = getDb(DEMO_DB_PATH)
    const existing = db.prepare('SELECT id FROM members WHERE email = ?').get(email)
    if (existing) return res.status(409).json({ error: 'An account with this email already exists' })
    const salt = generateToken()
    const hash = hashPassword(password, salt)
    const result = db.prepare(`
      INSERT INTO members (first_name, last_name, email, password_hash, password_salt, employer_name, employee_id, date_of_birth, last_4_ssn, mfa_enabled, mfa_method, phone_number, backup_email)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(firstName, lastName, email, hash, salt, employerName || '', employeeId || '', dateOfBirth || '', last4SSN || '', mfaEnabled ? 1 : 0, mfaMethod || 'sms', phoneNumber || '', backupEmail || '')
    const member = db.prepare('SELECT id, first_name, last_name, email FROM members WHERE id = ?').get(result.lastInsertRowid)
    res.json({ success: true, member })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' })
  try {
    const db = getDb(DEMO_DB_PATH)
    const member = db.prepare('SELECT * FROM members WHERE email = ?').get(email)
    if (!member) return res.status(401).json({ error: 'Invalid email or password' })
    const hash = hashPassword(password, member.password_salt)
    if (hash !== member.password_hash) return res.status(401).json({ error: 'Invalid email or password' })
    if (member.mfa_enabled) {
      return res.json({ requires2FA: true, memberId: member.id })
    }
    const token = generateToken()
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    db.prepare('INSERT INTO member_sessions (member_id, token, expires_at) VALUES (?, ?, ?)').run(member.id, token, expires)
    res.json({ token, member: { id: member.id, firstName: member.first_name, lastName: member.last_name, email: member.email } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Send 2FA code
app.post('/api/auth/send-2fa', (req, res) => {
  const { memberId } = req.body
  if (!memberId) return res.status(400).json({ error: 'memberId required' })
  try {
    const db = getDb(DEMO_DB_PATH)
    const member = db.prepare('SELECT id, mfa_method FROM members WHERE id = ?').get(memberId)
    if (!member) return res.status(404).json({ error: 'Member not found' })
    const code = generateCode()
    const expires = new Date(Date.now() + 10 * 60 * 1000).toISOString()
    db.prepare('UPDATE mfa_codes SET used = 1 WHERE member_id = ? AND used = 0').run(memberId)
    db.prepare('INSERT INTO mfa_codes (member_id, code, expires_at) VALUES (?, ?, ?)').run(memberId, code, expires)
    // In production this would send SMS/email. For demo, return the code.
    res.json({ success: true, demoCode: code, method: member.mfa_method })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Verify 2FA code
app.post('/api/auth/verify-2fa', (req, res) => {
  const { memberId, code } = req.body
  if (!memberId || !code) return res.status(400).json({ error: 'memberId and code required' })
  try {
    const db = getDb(DEMO_DB_PATH)
    const mfaCode = db.prepare(`
      SELECT * FROM mfa_codes WHERE member_id = ? AND code = ? AND used = 0 AND expires_at > datetime('now')
    `).get(memberId, code)
    if (!mfaCode) return res.status(401).json({ error: 'Invalid or expired code' })
    db.prepare('UPDATE mfa_codes SET used = 1 WHERE id = ?').run(mfaCode.id)
    const member = db.prepare('SELECT * FROM members WHERE id = ?').get(memberId)
    const token = generateToken()
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    db.prepare('INSERT INTO member_sessions (member_id, token, expires_at) VALUES (?, ?, ?)').run(memberId, token, expires)
    res.json({ token, member: { id: member.id, firstName: member.first_name, lastName: member.last_name, email: member.email } })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Forgot password
app.post('/api/auth/forgot-password', (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ error: 'Email required' })
  try {
    const db = getDb(DEMO_DB_PATH)
    const member = db.prepare('SELECT id FROM members WHERE email = ?').get(email)
    if (!member) return res.json({ success: true }) // Don't reveal if account exists
    const token = generateToken()
    const expires = new Date(Date.now() + 30 * 60 * 1000).toISOString()
    db.prepare('UPDATE password_resets SET used = 1 WHERE email = ?').run(email)
    db.prepare('INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)').run(email, token, expires)
    res.json({ success: true, demoToken: token }) // In production, email the token
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Reset password
app.post('/api/auth/reset-password', (req, res) => {
  const { token, password } = req.body
  if (!token || !password) return res.status(400).json({ error: 'Token and password required' })
  try {
    const db = getDb(DEMO_DB_PATH)
    const reset = db.prepare(`
      SELECT * FROM password_resets WHERE token = ? AND used = 0 AND expires_at > datetime('now')
    `).get(token)
    if (!reset) return res.status(400).json({ error: 'Invalid or expired reset link' })
    const member = db.prepare('SELECT * FROM members WHERE email = ?').get(reset.email)
    if (!member) return res.status(404).json({ error: 'Account not found' })
    const salt = generateToken()
    const hash = hashPassword(password, salt)
    db.prepare('UPDATE members SET password_hash = ?, password_salt = ? WHERE id = ?').run(hash, salt, member.id)
    db.prepare('UPDATE password_resets SET used = 1 WHERE id = ?').run(reset.id)
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get current member (validate session)
app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.replace('Bearer ', '')
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    const db = getDb(DEMO_DB_PATH)
    const session = db.prepare(`
      SELECT s.*, m.first_name, m.last_name, m.email FROM member_sessions s
      JOIN members m ON m.id = s.member_id
      WHERE s.token = ? AND s.expires_at > datetime('now')
    `).get(token)
    if (!session) return res.status(401).json({ error: 'Invalid or expired session' })
    res.json({ id: session.member_id, firstName: session.first_name, lastName: session.last_name, email: session.email })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Database Dashboard API running on http://localhost:${PORT}`)
})
