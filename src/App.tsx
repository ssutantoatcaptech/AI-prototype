import { useState } from 'react'
import type { View, RegistrationData } from './types'

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
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  last4SSN: '',
  employerName: '',
  employeeId: '',
  email: '',
  password: '',
  mfaEnabled: true,
  mfaMethod: 'sms',
  phoneNumber: '',
  backupEmail: '',
}

export default function App() {
  const [view, setView] = useState<View>('login')
  const [regData, setRegData] = useState<RegistrationData>(defaultRegData)

  function updateRegData(partial: Partial<RegistrationData>) {
    setRegData(prev => ({ ...prev, ...partial }))
  }

  const nav = { navigate: setView }
  const regProps = { ...nav, data: regData, setData: updateRegData }

  switch (view) {
    case 'login':            return <Login {...nav} />
    case 'two-factor':       return <TwoFactor {...nav} />
    case 'forgot-password':  return <ForgotPassword {...nav} />
    case 'register-verify':  return <VerifyIdentity {...regProps} />
    case 'register-login':   return <CreateLogin {...regProps} />
    case 'register-secure':  return <SecureAccount {...regProps} />
    case 'register-review':  return <ReviewComplete {...nav} data={regData} />
    case 'register-success': return <AccountCreated {...nav} />
    case 'dashboard':        return <Dashboard {...nav} />
    case 'my-coverages':     return <MyCoverages {...nav} />
    case 'claims':           return <Claims {...nav} />
    case 'support':          return <Support {...nav} />
    case 'messages':         return <Dashboard {...nav} />
    default:                 return <Login {...nav} />
  }
}
