import { useState, useEffect } from 'react'
import type { View, RegistrationData, Member } from './types'
import { api } from './lib/api'

import Login from './pages/Login'
import TwoFactor from './pages/TwoFactor'
import ForgotPassword from './pages/ForgotPassword'
import VerifyIdentity from './pages/register/VerifyIdentity'
import CreateLogin from './pages/register/CreateLogin'
import SecureAccount from './pages/register/SecureAccount'
import ReviewComplete from './pages/register/ReviewComplete'
import AccountCreated from './pages/register/AccountCreated'
import Dashboard from './pages/Dashboard'
import MyCoverages from './pages/MyCoverages'
import Claims from './pages/Claims'
import Support from './pages/Support'

const defaultRegData: RegistrationData = {
  firstName: '', lastName: '', dateOfBirth: '', last4SSN: '',
  employerName: '', employeeId: '', email: '', password: '',
  mfaEnabled: true, mfaMethod: 'sms', phoneNumber: '', backupEmail: '',
}

export default function App() {
  const [view, setView] = useState<View>('login')
  const [member, setMember] = useState<Member | null>(null)
  const [pending2FAId, setPending2FAId] = useState<number | null>(null)
  const [regData, setRegData] = useState<RegistrationData>(defaultRegData)

  // Restore session on load
  useEffect(() => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      api.me().then(m => { setMember(m); setView('dashboard') }).catch(() => {
        localStorage.removeItem('auth_token')
      })
    }
  }, [])

  function handleLogin(token: string, m: Member) {
    localStorage.setItem('auth_token', token)
    setMember(m)
    setView('dashboard')
  }

  function handleLogout() {
    localStorage.removeItem('auth_token')
    setMember(null)
    setView('login')
  }

  function handleRequires2FA(memberId: number) {
    setPending2FAId(memberId)
    setView('two-factor')
  }

  function updateRegData(partial: Partial<RegistrationData>) {
    setRegData(prev => ({ ...prev, ...partial }))
  }

  const nav = { navigate: setView }
  const authNav = { ...nav, onLogin: handleLogin }
  const regProps = { ...nav, onLogin: handleLogin, data: regData, setData: updateRegData }

  switch (view) {
    case 'login':            return <Login {...authNav} onRequires2FA={handleRequires2FA} />
    case 'two-factor':       return <TwoFactor {...authNav} memberId={pending2FAId} />
    case 'forgot-password':  return <ForgotPassword {...nav} />
    case 'register-verify':  return <VerifyIdentity {...regProps} />
    case 'register-login':   return <CreateLogin {...regProps} />
    case 'register-secure':  return <SecureAccount {...regProps} />
    case 'register-review':  return <ReviewComplete {...nav} onLogin={handleLogin} data={regData} />
    case 'register-success': return <AccountCreated {...nav} member={member} />
    case 'dashboard':        return <Dashboard {...nav} member={member} onLogout={handleLogout} />
    case 'my-coverages':     return <MyCoverages {...nav} />
    case 'claims':           return <Claims {...nav} />
    case 'support':          return <Support {...nav} />
    case 'messages':         return <Dashboard {...nav} member={member} onLogout={handleLogout} />
    default:                 return <Login {...authNav} onRequires2FA={handleRequires2FA} />
  }
}
