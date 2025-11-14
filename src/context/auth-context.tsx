'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import type { AuthContextType, LoginResponse, User } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!userDetails

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const userData = Cookies.get('user')

    if (accessToken && userData) {
      try {
        const parsedUser = JSON.parse(userData)
        setUserDetails(parsedUser)
      } catch {
        Cookies.remove('accessToken')
        Cookies.remove('user')
      }
    }

    setIsLoading(false)
  }, [])

  const cookieOptions = {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    expires: 7,
  }

  const login = (loginResponse: LoginResponse) => {
    const user: User = {
      userId: loginResponse.userId,
      name: loginResponse.name,
      role: loginResponse.role,
      tenantId: loginResponse.tenantId,
    }

    Cookies.set('accessToken', loginResponse.accessToken, cookieOptions)
    Cookies.set('user', JSON.stringify(user), cookieOptions)
    setUserDetails(user)
  }

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('user')
    setUserDetails(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
