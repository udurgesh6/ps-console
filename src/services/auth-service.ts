import { api } from '@/lib/axios'
import type {
  LoginRequest,
  OtpVerifyRequest,
  OtpRequestResponse,
  LoginResponse,
} from '@/types'

export const authService = {
  requestOtp: async (credentials: LoginRequest): Promise<OtpRequestResponse> => {
    const response = await api.post<OtpRequestResponse>(
      '/request-otp',
      credentials
    )
    return response
  },

  verifyOtp: async (
    verifyData: OtpVerifyRequest
  ): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/login', verifyData)
    return response
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/refresh', { refreshToken })
    return response
  },
}
