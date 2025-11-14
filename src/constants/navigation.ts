import { LucideIcon, Sparkles, FileStack, FolderOpen, BarChart3, Users, VectorSquare } from 'lucide-react'

export type Product = 'cyber-attack' | 'cyber-awareness'

export interface SidebarItem {
  label: string
  href: string
  icon?: LucideIcon
}

export interface SidebarGroup {
  title: string
  items: SidebarItem[]
  isDirect?: boolean
}

export interface ProductConfig {
  id: Product
  name: string
  sidebarGroups: SidebarGroup[]
}

export const PRODUCTS: ProductConfig[] = [
  {
    id: 'cyber-attack',
    name: 'Cyber Attack',
    sidebarGroups: [
      // {
      //   title: 'Simulation',
      //   items: [
      //     { label: 'Create With AI', href: '/dashboard/cyber-attack/create-ai', icon: Sparkles },
      //     { label: 'My Simulations', href: '/dashboard/cyber-attack/simulations', icon: FolderOpen },
      //   ],
      // },
      {
        title: 'Analytics',
        items: [
          { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
        ],
        isDirect: true
      },
      {
        title: 'Team',
        items: [
          { label: 'Team', href: '/team/employees', icon: Users },
        ],
        isDirect: true
      },
      {
        title: 'Templates',
        items: [
          { label: 'Templates', href: '/templates', icon: FileStack }
        ],
        isDirect: true
      },
      {
        title: 'Attack Vector',
        items: [
          { label: 'Attack Vector', href: '/attack-vector', icon: VectorSquare }
        ],
        isDirect: true
      },
    ],
  },
  {
    id: 'cyber-awareness',
    name: 'Cyber Awareness',
    sidebarGroups: [
      {
        title: 'Simulation',
        items: [
          { label: 'Create With AI', href: '/dashboard/cyber-awareness/create-ai', icon: Sparkles },
          { label: 'Templates', href: '/dashboard/cyber-awareness/templates', icon: FileStack },
          { label: 'My Simulations', href: '/dashboard/cyber-awareness/simulations', icon: FolderOpen },
        ],
      },
      {
        title: 'Analytics',
        items: [
          { label: 'Dashboard', href: '/dashboard/cyber-awareness/analytics', icon: BarChart3 },
        ],
      },
    ],
  },
]

export const SIDEBAR_WIDTH = 212
export const SIDEBAR_COLLAPSED_WIDTH = 64
