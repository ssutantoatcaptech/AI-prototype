import type { Member } from '../lib/api'

export type View =
  | 'login'
  | 'forgot-password'
  | 'two-factor'
  | 'register-verify'
  | 'register-login'
  | 'register-secure'
  | 'register-review'
  | 'register-success'
  | 'dashboard'
  | 'my-coverages'
  | 'claims'
  | 'support'
  | 'messages'

export interface NavProps {
  navigate: (view: View) => void
}

export interface AuthNavProps extends NavProps {
  onLogin: (token: string, member: Member) => void
}

export interface RegistrationData {
  firstName: string
  lastName: string
  dateOfBirth: string
  last4SSN: string
  employerName: string
  employeeId: string
  email: string
  password: string
  mfaEnabled: boolean
  mfaMethod: 'sms' | 'email'
  phoneNumber: string
  backupEmail: string
}

export type { Member }
