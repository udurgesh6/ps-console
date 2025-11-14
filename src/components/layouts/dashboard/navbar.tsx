import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Menu, X, ChevronDown, LogOut } from 'lucide-react'
import { Product, SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_WIDTH } from '@/constants/navigation'
import { User } from '@/types'

export const Navbar = ({ 
  onMobileMenuToggle,
  isMobileMenuOpen,
  userDetails,
  onLogout,
  isSidebarHovered = false
}: { 
  activeProduct: Product
  onProductChange: (product: Product) => void
  onMobileMenuToggle: () => void
  isMobileMenuOpen: boolean
  userDetails: User | null
  onLogout: () => void
  isSidebarHovered?: boolean
}) => {
  const sidebarCollapsedWidth = SIDEBAR_COLLAPSED_WIDTH
  const sidebarExpandedWidth = SIDEBAR_WIDTH

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-40 bg-background border-b h-16"
    >
      <div 
        className="hidden md:block h-full transition-all duration-300 ease-in-out"
        style={{
          paddingLeft: isSidebarHovered ? `${sidebarExpandedWidth}px` : `${sidebarCollapsedWidth}px`
        }}
      >
        <div className="flex items-center justify-end h-full px-4 md:px-8">
          {/* <div className="flex items-center space-x-3">
            <div className="flex items-center gap-1">
              {PRODUCTS.map((product) => (
                <button
                  key={product.id}
                  onClick={() => onProductChange(product.id)}
                  className={cn(
                    'px-2 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors',
                    activeProduct === product.id
                      ? 'text-primary'
                      : 'text-gray-600 hover:text-gray-900'
                  )}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div> */}

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="profile-button flex items-center px-2 rounded-md gap-1">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-white">
                      {userDetails?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userDetails?.name || 'User'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600" 
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <div className="md:hidden h-full">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onMobileMenuToggle} 
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="profile-button bg-primary flex items-center px-2 rounded-md gap-1">
                  <Avatar className="w-8 h-8 bg-primary">
                    <AvatarFallback className="bg-primary text-white">
                      {userDetails?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{userDetails?.name || 'User'}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600" 
                  onClick={onLogout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}
