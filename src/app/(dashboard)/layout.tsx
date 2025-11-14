'use client'

import { useAuth } from '@/context/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Product, PRODUCTS, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/navigation'
import { Navbar } from '@/components/layouts/dashboard/navbar'
import { Sidebar } from '@/components/layouts/dashboard/sidebar'
import { MobileMenu } from '@/components/layouts/dashboard/mobile-menu'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated, isLoading, userDetails, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  
  const [activeProduct, setActiveProduct] = useState<Product>('cyber-attack')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true)

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  // Detect active product from pathname
  useEffect(() => {
    const productFromPath = PRODUCTS.find(p => 
      pathname.includes(`/${p.id}`)
    )
    if (productFromPath) {
      setActiveProduct(productFromPath.id)
    }
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const currentProduct = PRODUCTS.find(p => p.id === activeProduct) || PRODUCTS[0]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        activeProduct={activeProduct}
        onProductChange={setActiveProduct}
        onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMobileMenuOpen={isMobileMenuOpen}
        userDetails={userDetails}
        onLogout={handleLogout}
        isSidebarHovered={isSidebarExpanded}
      />

      <Sidebar
        product={currentProduct}
        onExpandChange={setIsSidebarExpanded}
      />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        activeProduct={activeProduct}
        onProductChange={setActiveProduct}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      <main 
        className="pt-16 transition-all duration-300 ease-in-out hidden md:block"
        style={{
          marginLeft: isSidebarExpanded ? `${SIDEBAR_WIDTH}px` : `${SIDEBAR_COLLAPSED_WIDTH}px`
        }}
      >
        <div className="p-4 px-5">
          <div className="px-5 py-0">
            {children}
          </div>
        </div>
      </main>

      <main 
        className="pt-16 transition-all duration-300 ease-in-out block md:hidden"
      >
        <div className="p-4 px-7">
          <div className="">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
