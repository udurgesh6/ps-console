
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

export interface User {
  email: string
  first_name: string
  last_name: string
  role: 'admin' | 'superadmin'
  id: string
}

export interface Tenant {
  id: string
  name: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  user: User
  tenant: Tenant
}

export interface AuthContextType {
  userDetails: User | null
  tenantDetails: Tenant | null
  isLoading: boolean
  login: (loginResponse: LoginResponse) => void
  logout: () => void
  isAuthenticated: boolean
}
