// hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query'
import { authService } from '@/services/auth-service'
import type {
  LoginRequest,
  OtpVerifyRequest,
  OtpRequestResponse,
  LoginResponse,
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
