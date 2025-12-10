import { api } from '@/lib/axios'
import type {
  LoginRequest,
  OtpVerifyRequest,
  OtpRequestResponse,
  LoginResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  ConfirmResetPasswordRequest,
  ConfirmResetPasswordResponse,
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
    console.log(response)
    return response
  },

  refreshToken: async (refreshToken: string) => {
    const response = await api.post('/refresh', { refreshToken })
    return response
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    const response = await api.post<ResetPasswordResponse>(
      '/reset-password',
      data
    )
    return response
  },

  confirmResetPassword: async (data: ConfirmResetPasswordRequest): Promise<ConfirmResetPasswordResponse> => {
    const response = await api.post<ConfirmResetPasswordResponse>(
      '/reset-password/confirm',
      data
    )
    return response
  }
}
