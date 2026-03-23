export type View =
  | 'login'
  | 'forgot-password'
  | 'two-factor'
  | 'check-email'
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
