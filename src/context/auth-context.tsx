'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import type { AuthContextType, LoginResponse, Tenant, User } from '@/types'

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userDetails, setUserDetails] = useState<User | null>(null)
  const [tenantDetails, setTenantDetails] = useState<Tenant | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = !!userDetails

  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    const userData = Cookies.get('user')
    const tenantData = Cookies.get('tenant')

    if (accessToken && refreshToken && userData && tenantData) {
      try {
        const parsedUser = JSON.parse(userData)
        const parsedTenant = JSON.parse(tenantData)
        setUserDetails(parsedUser)
        setTenantDetails(parsedTenant)
      } catch {
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        Cookies.remove('tenant')
        Cookies.remove('user')
      }
    }

    setIsLoading(false)
  }, [])

  // const cookieOptions = {
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict' as const,
  //   expires: 7,
  // }

  const login = (loginResponse: LoginResponse) => {
    const user: User = {
      id: loginResponse.user.id,
      email: loginResponse.user.email,
      first_name: loginResponse.user.first_name,
      last_name: loginResponse.user.last_name,
      role: loginResponse.user.role,
    }

    const tenant: Tenant = {
      id: loginResponse.tenant.id,
      name: loginResponse.tenant.name,
    }

    Cookies.set('accessToken', loginResponse.access_token)
    Cookies.set('refreshToken', loginResponse.refresh_token)
    Cookies.set('user', JSON.stringify(user))
    Cookies.set('tenant', JSON.stringify(tenant))
    setUserDetails(user)
    setTenantDetails(tenant)
  }

  const logout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    Cookies.remove('tenant')
    Cookies.remove('user')
    setUserDetails(null)
    setTenantDetails(null) 
    router.push('/login')
  }

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        tenantDetails,
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
