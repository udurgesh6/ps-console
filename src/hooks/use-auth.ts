// hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth-service'
import type {
  LoginRequest,
  OtpVerifyRequest,
  OtpRequestResponse,
  LoginResponse,
  ResetPasswordResponse,
  ResetPasswordRequest,
  ConfirmResetPasswordResponse,
  ConfirmResetPasswordRequest,
} from '@/types'
import type { ApiError } from '@/types/api'

export const useRequestOtp = () => {
  return useMutation<OtpRequestResponse, ApiError, LoginRequest>({
    mutationFn: (credentials) => authService.requestOtp(credentials),
  })
}

export const useVerifyOtp = () => {
  return useMutation<LoginResponse, ApiError, OtpVerifyRequest>({
    mutationFn: (verifyData) => authService.verifyOtp(verifyData),
  })
}

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, ApiError, ResetPasswordRequest>({
    mutationFn: (data) => authService.resetPassword(data),
  })
}

export const useConfirmResetPassword = () => {
  return useMutation<ConfirmResetPasswordResponse, ApiError, ConfirmResetPasswordRequest>({
    mutationFn: (data) => authService.confirmResetPassword(data),
  })
}
