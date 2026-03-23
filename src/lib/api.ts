export interface Member {
  id: number
  firstName: string
  lastName: string
  email: string
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('auth_token')
  const res = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || 'Request failed')
  return data as T
}

export const api = {
  register: (body: {
    firstName: string; lastName: string; email: string; password: string
    employerName?: string; employeeId?: string; dateOfBirth?: string; last4SSN?: string
    mfaEnabled?: boolean; mfaMethod?: string; phoneNumber?: string; backupEmail?: string
  }) => request<{ success: boolean; member: Member }>('/api/auth/register', {
    method: 'POST', body: JSON.stringify(body),
  }),

  login: (email: string, password: string) =>
    request<{ token?: string; member?: Member; requires2FA?: boolean; memberId?: number }>(
      '/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }
    ),

  send2FA: (memberId: number) =>
    request<{ success: boolean; demoCode: string; method: string }>(
      '/api/auth/send-2fa', { method: 'POST', body: JSON.stringify({ memberId }) }
    ),

  verify2FA: (memberId: number, code: string) =>
    request<{ token: string; member: Member }>(
      '/api/auth/verify-2fa', { method: 'POST', body: JSON.stringify({ memberId, code }) }
    ),

  forgotPassword: (email: string) =>
    request<{ success: boolean; demoToken?: string }>(
      '/api/auth/forgot-password', { method: 'POST', body: JSON.stringify({ email }) }
    ),

  resetPassword: (token: string, password: string) =>
    request<{ success: boolean }>(
      '/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ token, password }) }
    ),

  me: () => request<Member>('/api/auth/me'),
}
