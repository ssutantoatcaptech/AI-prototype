import { useState } from 'react'

// ── Design Tokens ────────────────────────────────────────────────────────────
const tokens = {
  bg: { navy: '#0A1128', slate: '#101820' },
  primary: '#0055A4',
  text: { primary: '#F8FAFC', secondary: '#64748B' },
  status: { success: '#108981', warning: '#F59E0B', error: '#EF4444', inactive: '#64748B' },
  surface: {
    card: 'rgba(255,255,255,0.05)',
    hover: 'rgba(255,255,255,0.10)',
    nav: 'rgba(10,17,40,0.8)',
  },
  border: 'rgba(255,255,255,0.08)',
}

// ── Types ────────────────────────────────────────────────────────────────────
type NavPage = 'overview' | 'benefits' | 'claims'

// ── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: 'Active' | 'Pending' | 'Denied' | 'Inactive' | 'Approved' }) {
  const colors: Record<string, string> = {
    Active:   tokens.status.success,
    Approved: tokens.status.success,
    Pending:  tokens.status.warning,
    Denied:   tokens.status.error,
    Inactive: tokens.status.inactive,
  }
  const color = colors[status] || tokens.status.inactive
  return (
    <span style={{
      background: `${color}22`,
      color,
      border: `1px solid ${color}44`,
      fontSize: 11,
      fontWeight: 600,
      padding: '2px 8px',
      borderRadius: 4,
      letterSpacing: '0.02em',
    }}>
      {status}
    </span>
  )
}

function Card({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: tokens.surface.card,
      border: `1px solid ${tokens.border}`,
      borderRadius: 12,
      backdropFilter: 'blur(16px)',
      padding: 24,
      ...style,
    }}>
      {children}
    </div>
  )
}

function StatCard({ label, value, sub, subColor }: { label: string; value: string; sub?: string; subColor?: string }) {
  return (
    <Card style={{ flex: 1 }}>
      <div style={{ fontSize: 12, color: tokens.text.secondary, fontWeight: 500, marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 700, color: tokens.text.primary, marginBottom: 4 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: subColor || tokens.text.secondary }}>{sub}</div>}
    </Card>
  )
}

function Alert({ intent, title, message, dismissible }: { intent: 'info' | 'success' | 'warning' | 'error'; title: string; message: string; dismissible?: boolean }) {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null
  const cfg = {
    info:    { color: '#3B82F6', bg: 'rgba(59,130,246,0.10)', icon: 'ℹ' },
    success: { color: tokens.status.success, bg: 'rgba(16,137,129,0.10)', icon: '✓' },
    warning: { color: tokens.status.warning, bg: 'rgba(245,158,11,0.10)', icon: '⚠' },
    error:   { color: tokens.status.error, bg: 'rgba(239,68,68,0.10)', icon: '!' },
  }[intent]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 16px', borderRadius: 8, background: cfg.bg, border: `1px solid ${cfg.color}33` }}>
      <span style={{ color: cfg.color, fontWeight: 700, fontSize: 14, marginTop: 1 }}>{cfg.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: cfg.color }}>{title}</div>
        <div style={{ fontSize: 12, color: tokens.text.secondary, marginTop: 2 }}>{message}</div>
      </div>
      {dismissible && (
        <button onClick={() => setDismissed(true)} style={{ background: 'none', border: 'none', color: tokens.text.secondary, cursor: 'pointer', fontSize: 12 }}>✕</button>
      )}
    </div>
  )
}

function MoOButton({ children, variant = 'primary', size = 'md', onClick, icon }: {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  icon?: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary:     { background: tokens.primary, color: '#fff', border: 'none' },
    secondary:   { background: 'transparent', color: tokens.text.primary, border: `1px solid ${tokens.border}` },
    tertiary:    { background: 'transparent', color: tokens.text.secondary, border: 'none' },
    destructive: { background: 'rgba(239,68,68,0.15)', color: tokens.status.error, border: `1px solid ${tokens.status.error}44` },
  }
  const sizes: Record<string, React.CSSProperties> = {
    sm: { height: 32, padding: '0 12px', fontSize: 12 },
    md: { height: 40, padding: '0 16px', fontSize: 14 },
    lg: { height: 48, padding: '0 24px', fontSize: 15 },
  }
  return (
    <button onClick={onClick} style={{
      ...styles[variant],
      ...sizes[size],
      borderRadius: 8,
      fontWeight: 500,
      fontFamily: 'Inter, sans-serif',
      cursor: 'pointer',
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      transition: 'opacity 0.15s',
    }}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

// ── Pages ────────────────────────────────────────────────────────────────────

function OverviewPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Stats row */}
      <div style={{ display: 'flex', gap: 16 }}>
        <StatCard label="Total Coverage" value="$250,000" sub="↑ Active · Across 3 policies" subColor={tokens.status.success} />
        <StatCard label="Active Policies" value="3" sub="Dental · Vision · Medical" />
        <StatCard label="Pending Claims" value="1" sub="Requires attention" subColor={tokens.status.warning} />
        <StatCard label="Next Premium Due" value="Oct 15" sub="$135.00 / month" />
      </div>

      {/* Main content */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16 }}>
        {/* Recent Claims */}
        <Card style={{ padding: 0 }}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${tokens.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: tokens.text.primary }}>Recent Claims</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: tokens.surface.card, border: `1px solid ${tokens.border}`, borderRadius: 6, padding: '6px 12px' }}>
                <span style={{ fontSize: 12, color: tokens.text.secondary }}>🔍</span>
                <span style={{ fontSize: 12, color: tokens.text.secondary }}>Search claims...</span>
              </div>
              <MoOButton variant="secondary" size="sm" icon="⊟">Filter</MoOButton>
            </div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${tokens.border}` }}>
                {['Date', 'Type', 'Provider', 'Amount', 'Status'].map(h => (
                  <th key={h} style={{ padding: '10px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: tokens.text.secondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { date: 'Oct 15, 2023', type: '🦷 Dental',   provider: 'Dr. Smith Family Dentistry', amount: '$150.00',   status: 'Approved' as const },
                { date: 'Sep 28, 2023', type: '👁 Vision',   provider: 'ClearSight Optometry',       amount: '$320.00',   status: 'Pending'  as const },
                { date: 'Aug 10, 2023', type: '🏥 Medical',  provider: 'General Hospital',            amount: '$1,250.00', status: 'Denied'   as const },
              ].map((row, i) => (
                <tr key={i} style={{ borderBottom: `1px solid ${tokens.border}` }}>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.secondary }}>{row.date}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.primary }}>{row.type}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.primary }}>{row.provider}</td>
                  <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.primary, fontWeight: 600 }}>{row.amount}</td>
                  <td style={{ padding: '14px 20px' }}><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        {/* Alerts & quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Alert intent="info"    title="Annual Enrollment" message="Your annual enrollment window opens in 14 days." />
          <Alert intent="success" title="Profile Updated"   message="Your profile information has been updated successfully." dismissible />
          <Alert intent="warning" title="Action Required"   message="Please verify your email address to continue receiving notifications." />

          <Card style={{ marginTop: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: tokens.text.primary, marginBottom: 12 }}>Quick Actions</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <MoOButton variant="primary">Submit Claim</MoOButton>
              <MoOButton variant="secondary">Update Coverage</MoOButton>
              <MoOButton variant="tertiary">Learn More →</MoOButton>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

function BenefitsPage() {
  const plans = [
    { icon: '🦷', name: 'Dental Plan',   status: 'Active' as const,   number: 'DEN-987654', level: 'Family',      premium: '$45.00 / mo',  color: tokens.primary },
    { icon: '👁',  name: 'Vision Plan',  status: 'Active' as const,   number: 'VIS-234567', level: 'Individual',  premium: '$12.00 / mo',  color: tokens.status.success },
    { icon: '🏥', name: 'Medical Plan',  status: 'Pending' as const,  number: 'MED-345678', level: 'Family',      premium: '$78.00 / mo',  color: tokens.status.warning },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {plans.map(plan => (
          <Card key={plan.name} style={{ border: `1px solid ${plan.color}44`, position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 20 }}>{plan.icon} {plan.name}</span>
              <StatusBadge status={plan.status} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[['Policy Number', plan.number], ['Coverage Level', plan.level], ['Premium', plan.premium]].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 12, color: tokens.text.secondary }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: tokens.text.primary }}>{v}</span>
                </div>
              ))}
            </div>
            <button style={{ marginTop: 16, background: 'none', border: 'none', color: plan.color, fontSize: 13, fontWeight: 500, cursor: 'pointer', padding: 0, fontFamily: 'Inter, sans-serif' }}>
              View Details →
            </button>
          </Card>
        ))}
      </div>
      {/* Add Dependent card */}
      <Card style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, padding: 48, border: `1px dashed ${tokens.border}` }}>
        <div style={{ width: 40, height: 40, borderRadius: '50%', background: tokens.surface.card, border: `1px solid ${tokens.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: tokens.text.secondary }}>＋</div>
        <div style={{ fontSize: 15, fontWeight: 600, color: tokens.text.primary }}>Add New Dependent</div>
        <div style={{ fontSize: 13, color: tokens.text.secondary }}>Enroll family members to your active plans.</div>
        <MoOButton variant="secondary" icon="＋">Add Dependent</MoOButton>
      </Card>
    </div>
  )
}

function ClaimsPage() {
  const claims = [
    { id: '#CLM-001', date: 'Oct 15, 2023', type: '🦷 Dental',  provider: 'Dr. Smith Family Dentistry', amount: '$150.00',   status: 'Approved' as const },
    { id: '#CLM-002', date: 'Sep 28, 2023', type: '👁 Vision',  provider: 'ClearSight Optometry',       amount: '$320.00',   status: 'Pending'  as const },
    { id: '#CLM-003', date: 'Aug 10, 2023', type: '🏥 Medical', provider: 'General Hospital',            amount: '$1,250.00', status: 'Denied'   as const },
    { id: '#CLM-004', date: 'Jul 22, 2023', type: '🦷 Dental',  provider: 'Smile Dental Group',          amount: '$89.00',    status: 'Approved' as const },
    { id: '#CLM-005', date: 'Jun 05, 2023', type: '👁 Vision',  provider: 'EyeCare Plus',                amount: '$210.00',   status: 'Approved' as const },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 14, color: tokens.text.secondary }}>{claims.length} claims found</div>
        <MoOButton variant="primary" icon="＋">Submit New Claim</MoOButton>
      </div>
      <Card style={{ padding: 0 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${tokens.border}` }}>
              {['Claim ID', 'Date', 'Type', 'Provider', 'Amount', 'Status'].map(h => (
                <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontSize: 11, fontWeight: 600, color: tokens.text.secondary, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {claims.map((row, i) => (
              <tr key={i} style={{ borderBottom: `1px solid ${tokens.border}`, cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.background = tokens.surface.hover)}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.primary, fontWeight: 500 }}>{row.id}</td>
                <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.secondary }}>{row.date}</td>
                <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.primary }}>{row.type}</td>
                <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.primary }}>{row.provider}</td>
                <td style={{ padding: '14px 20px', fontSize: 13, color: tokens.text.primary, fontWeight: 600 }}>{row.amount}</td>
                <td style={{ padding: '14px 20px' }}><StatusBadge status={row.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── Main Portal ──────────────────────────────────────────────────────────────

const navItems = [
  { id: 'overview' as NavPage, label: 'Overview',  icon: '⊞' },
  { id: 'benefits' as NavPage, label: 'Benefits',  icon: '🛡' },
  { id: 'claims'   as NavPage, label: 'Claims',    icon: '📄' },
]

const pageTitle: Record<NavPage, string> = {
  overview: 'Overview',
  benefits: 'Benefits',
  claims:   'Claims',
}

export default function MoOPortal() {
  const [page, setPage] = useState<NavPage>('overview')

  return (
    <div style={{
      fontFamily: 'Inter, sans-serif',
      minHeight: '100vh',
      background: tokens.bg.navy,
      display: 'flex',
    }}>
      {/* Sidebar */}
      <aside style={{
        width: 220,
        background: tokens.surface.nav,
        backdropFilter: 'blur(30px)',
        borderRight: `1px solid ${tokens.border}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0, left: 0, bottom: 0,
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 16px', borderBottom: `1px solid ${tokens.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: tokens.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: '#fff' }}>M</div>
          <span style={{ fontWeight: 700, fontSize: 15, color: tokens.text.primary }}>MoO Portal</span>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 8px' }}>
          <div style={{ fontSize: 10, fontWeight: 600, color: tokens.text.secondary, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '8px 8px 4px' }}>Dashboard</div>
          {navItems.map(item => (
            <button key={item.id} onClick={() => setPage(item.id)} style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '9px 10px',
              borderRadius: 8,
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              fontWeight: page === item.id ? 600 : 400,
              background: page === item.id ? `${tokens.primary}22` : 'transparent',
              color: page === item.id ? tokens.primary : tokens.text.secondary,
              transition: 'all 0.15s',
              textAlign: 'left',
            }}>
              <span style={{ fontSize: 14 }}>{item.icon}</span>
              {item.label}
              {item.id === 'claims' && (
                <span style={{ marginLeft: 'auto', background: tokens.status.warning, color: '#000', fontSize: 10, fontWeight: 700, borderRadius: 4, padding: '1px 5px' }}>1</span>
              )}
            </button>
          ))}
        </nav>

        {/* User */}
        <div style={{ padding: 16, borderTop: `1px solid ${tokens.border}`, display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: `${tokens.primary}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: tokens.primary }}>AU</div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: tokens.text.primary }}>Admin User</div>
            <div style={{ fontSize: 11, color: tokens.text.secondary }}>admin@moo.com</div>
          </div>
          <button style={{ marginLeft: 'auto', background: 'none', border: 'none', color: tokens.text.secondary, cursor: 'pointer', fontSize: 14 }}>›</button>
        </div>
      </aside>

      {/* Main content */}
      <main style={{ marginLeft: 220, flex: 1, padding: 32, minHeight: '100vh', background: tokens.bg.slate }}>
        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 11, color: tokens.text.secondary, marginBottom: 4 }}>Dashboard › {pageTitle[page]}</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, color: tokens.text.primary }}>{pageTitle[page]}</h1>
        </div>

        {/* Page content */}
        {page === 'overview' && <OverviewPage />}
        {page === 'benefits' && <BenefitsPage />}
        {page === 'claims'   && <ClaimsPage />}
      </main>
    </div>
  )
}
