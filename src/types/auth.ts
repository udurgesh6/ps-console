export interface User {
  userId: string
  name: string
  role: 'superadmin' | 'admin' | 'user'
  tenantId: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface OtpVerifyRequest {
  email: string
  password: string
  otp: string
}

export interface OtpRequestResponse {
  message: string
  expiresIn: number // in minutes
}

export interface LoginResponse {
  accessToken: string
  userId: string
  name: string
  role: 'superadmin' | 'admin' | 'user'
  tenantId: string
}

export interface AuthContextType {
  userDetails: User | null
  isLoading: boolean
  login: (loginResponse: LoginResponse) => void
  logout: () => void
  isAuthenticated: boolean
}
