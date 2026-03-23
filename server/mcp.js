const { McpServer } = require('@modelcontextprotocol/sdk/server/mcp.js')
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js')
const Database = require('better-sqlite3')
const path = require('path')
const fs = require('fs')
const { z } = require('zod')

const DB_PATH = path.join(__dirname, 'demo.db')

function getDb() {
  const db = new Database(DB_PATH)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')
  return db
}

function initDemoDb() {
  const db = getDb()

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

  db.close()
}

// ─── MCP Server ───────────────────────────────────────────────────────────────

const server = new McpServer({
  name: 'database-dashboard',
  version: '1.0.0',
})

// Tool: list_tables
server.tool(
  'list_tables',
  'List all tables in the database with their schema and row counts',
  {},
  async () => {
    const db = getDb()
    try {
      const tables = db.prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name`
      ).all()

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

      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      }
    } finally {
      db.close()
    }
  }
)

// Tool: query_table
server.tool(
  'query_table',
  'Get rows from a specific table with optional pagination',
  {
    table_name: z.string().describe('Name of the table to query'),
    page: z.number().int().min(1).default(1).describe('Page number (1-based)'),
    limit: z.number().int().min(1).max(200).default(50).describe('Number of rows per page'),
  },
  async ({ table_name, page, limit }) => {
    if (!/^[a-zA-Z0-9_]+$/.test(table_name)) {
      return {
        content: [{ type: 'text', text: 'Error: Invalid table name. Only alphanumeric characters and underscores are allowed.' }],
        isError: true,
      }
    }

    const db = getDb()
    try {
      const offset = (page - 1) * limit
      const total = db.prepare(`SELECT COUNT(*) as count FROM "${table_name}"`).get()
      const rows = db.prepare(`SELECT * FROM "${table_name}" LIMIT ? OFFSET ?`).all(limit, offset)
      const columns = db.prepare(`PRAGMA table_info("${table_name}")`).all()

      const result = {
        table: table_name,
        columns: columns.map(c => ({ name: c.name, type: c.type, primaryKey: !!c.pk })),
        rows,
        pagination: {
          page,
          limit,
          total: total.count,
          totalPages: Math.ceil(total.count / limit),
        },
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      }
    } catch (err) {
      return {
        content: [{ type: 'text', text: `Error: ${err.message}` }],
        isError: true,
      }
    } finally {
      db.close()
    }
  }
)

// Tool: execute_sql
server.tool(
  'execute_sql',
  'Execute a read-only SQL SELECT query against the database',
  {
    sql: z.string().describe('SQL SELECT query to execute'),
  },
  async ({ sql }) => {
    const normalized = sql.trim().toUpperCase()
    const writeKeywords = ['INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE', 'ALTER', 'TRUNCATE', 'REPLACE']
    if (writeKeywords.some(kw => normalized.startsWith(kw))) {
      return {
        content: [{ type: 'text', text: 'Error: Write operations are not allowed. Only SELECT queries are permitted.' }],
        isError: true,
      }
    }

    const db = getDb()
    try {
      const start = Date.now()
      const rows = db.prepare(sql).all()
      const elapsed = Date.now() - start

      const result = {
        rows,
        rowCount: rows.length,
        columns: rows.length > 0 ? Object.keys(rows[0]) : [],
        elapsed_ms: elapsed,
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      }
    } catch (err) {
      return {
        content: [{ type: 'text', text: `Error: ${err.message}` }],
        isError: true,
      }
    } finally {
      db.close()
    }
  }
)

// Tool: get_stats
server.tool(
  'get_stats',
  'Get overview statistics for the database including table sizes and total row counts',
  {},
  async () => {
    const db = getDb()
    try {
      const tables = db.prepare(
        `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'`
      ).all()

      const stats = tables.map(t => {
        const count = db.prepare(`SELECT COUNT(*) as count FROM "${t.name}"`).get()
        const info = db.prepare(`PRAGMA table_info("${t.name}")`).all()
        return { name: t.name, rows: count.count, columns: info.length }
      })

      const dbStat = fs.statSync(DB_PATH)

      const result = {
        tables: stats,
        totalTables: stats.length,
        totalRows: stats.reduce((sum, t) => sum + t.rows, 0),
        dbSizeBytes: dbStat.size,
      }

      return {
        content: [{ type: 'text', text: JSON.stringify(result, null, 2) }],
      }
    } finally {
      db.close()
    }
  }
)

// Tool: get_activity
server.tool(
  'get_activity',
  'Get recent activity logs from the database',
  {
    limit: z.number().int().min(1).max(100).default(20).describe('Number of log entries to return'),
  },
  async ({ limit }) => {
    const db = getDb()
    try {
      const logs = db.prepare(
        `SELECT * FROM logs ORDER BY created_at DESC LIMIT ?`
      ).all(limit)

      return {
        content: [{ type: 'text', text: JSON.stringify(logs, null, 2) }],
      }
    } finally {
      db.close()
    }
  }
)

// ─── Start ────────────────────────────────────────────────────────────────────

async function main() {
  // Ensure demo database exists and is seeded
  if (!fs.existsSync(DB_PATH)) {
    initDemoDb()
  }

  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error('Database Dashboard MCP server running on stdio')
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
