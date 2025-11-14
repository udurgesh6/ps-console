'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { OtpVerification } from '@/components/auth/otp-verification'
import { useRequestOtp, useVerifyOtp } from '@/hooks/use-auth'
import { useAuth } from '@/context/auth-context'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { loginSchema } from '@/schemas/auth'
// import { getErrorMessage } from '@/lib/utils'

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showOtpStep, setShowOtpStep] = useState(false)
  const [otpExpiresIn, setOtpExpiresIn] = useState(0)

  const router = useRouter()
  const { login } = useAuth()

  const requestOtpMutation = useRequestOtp()
  const verifyOtpMutation = useVerifyOtp()

  // React Hook Form setup
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'udurgesh6@gmail.com',
      password: 'password',
    },
  })

    const onSubmit = async () => {

  // const onSubmit = async (data: LoginFormData) => {
    // requestOtpMutation.mutate(
    //   { email: data.email, password: data.password },
    //   {
    //     onSuccess: (response) => {
    //       toast.success(response.message || 'Verification code sent!')
    //       const expiresInMinutes = response.expiresIn || 10
    //       setOtpExpiresIn(expiresInMinutes * 60)
    //       setShowOtpStep(true)
    //     },
    //     onError: (error) => {
    //       toast.error(getErrorMessage(error, 'Failed to send verification code'))
    //     },
    //   }
    // )
    toast.success('Verification code sent!')
    const expiresInMinutes = 10
    setOtpExpiresIn(expiresInMinutes * 60)
    setShowOtpStep(true)
  }

    const handleOtpVerify = async () => {
  // const handleOtpVerify = async (otp: string) => {
    // const { email, password } = form.getValues()
    // verifyOtpMutation.mutate(
    //   { email, password, otp },
    //   {
    //     onSuccess: (data) => {
    //       login(data)
    //       toast.success('Login successful!')
    //       setShowOtpStep(false)

    //       // Navigate based on user role
    //       if (data.role === 'superadmin') {
    //         router.push('/superadmin')
    //       } else {
    //         router.push('/dashboard')
    //       }
    //     },
    //     onError: (error) => {
    //       toast.error(error.message || 'Invalid verification code')
    //     },
    //   }
    // )
    login({
      userId: '1',
      name: 'John Doe',
      role: 'superadmin',
      tenantId: '1',
      accessToken: '1',
    })
    toast.success('Login successful!')
    setShowOtpStep(false)
    router.push('/dashboard')
  }

  const handleBackToLogin = () => {
    setShowOtpStep(false)
    verifyOtpMutation.reset()
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="mb-8">
        <Image
          src="/phish-sheriff-logo-navbar.png"
          alt="PhishSheriff Logo"
          width={200}
          height={200}
        />
      </div>

      {/* Login/OTP Card */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {!showOtpStep ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-1">Sign In</h2>
              <p className="text-gray-500 text-center text-sm">
                Enter your credentials to access the portal
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail
                            className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
                            size={18}
                          />
                          <Input
                            type="email"
                            className="pl-10"
                            placeholder="Enter your email"
                            autoComplete="email"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock
                            className="absolute left-3 top-2.5 text-gray-400 pointer-events-none"
                            size={18}
                          />
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            className="pl-10 pr-10"
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            {...field}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                          >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <div className="text-right pt-1">
                        <Button
                          type="button"
                          variant="link"
                          size="sm"
                          onClick={() => router.push('/forgot-password')}
                          className="text-blue-600 text-xs p-0 h-auto hover:text-blue-700"
                        >
                          Forgot password?
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full"
                  disabled={requestOtpMutation.isPending}
                >
                  {requestOtpMutation.isPending ? 'Requesting Code...' : 'Sign In'}
                </Button>
              </form>
            </Form>

            <div className="text-center text-sm text-gray-500 mt-6">
              Need access?{' '}
              <span className="text-gray-700 font-medium">
                Contact your administrator
              </span>
            </div>
          </>
        ) : (
          <OtpVerification
            email={form.getValues('email')}
            expiresIn={otpExpiresIn}
            onVerify={handleOtpVerify}
            onBack={handleBackToLogin}
            loading={verifyOtpMutation.isPending}
            error={verifyOtpMutation.isError ? verifyOtpMutation.error.message : ''}
          />
        )}
      </div>

      <div className="mt-8 text-xs text-gray-400 text-center">
        © 2025 YourCompany. All rights reserved.
      </div>
    </div>
  )
}
