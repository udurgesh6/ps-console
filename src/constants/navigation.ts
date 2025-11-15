import { LucideIcon, Sparkles, FileStack, FolderOpen, BarChart3, Users, VectorSquare } from 'lucide-react'

export interface SidebarItem {
  label: string
  href: string
  icon?: LucideIcon
}

export interface SidebarGroup {
  title: string
  items: SidebarItem[]
  isDirect?: boolean
  isSystem?: boolean
}

export interface NavigationItem {
  id: string
  title: string
  items: SidebarItem[]
  showTitle?: boolean
  isSystemConfig?: boolean
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    ],
    showTitle: false
  },
  {
    id: 'team',
    title: 'Team',
    items: [
      { label: 'Team', href: '/team/employees', icon: Users },
    ],
    showTitle: false
  },
  {
    id: 'system-config',
    title: 'System Config',
    items: [
      { label: 'System Config', href: '/templates', icon: FileStack }
    ],
    showTitle: false,
    isSystemConfig: true
  },
  {
    id: 'attack-vector',
    title: 'Attack Vector',
    items: [
      { label: 'Attack Vector', href: '/attack-vector', icon: VectorSquare }
    ],
    showTitle: false
  },
  {
    id: 'simulation',
    title: 'Simulation',
    items: [
      { label: 'My Simulations', href: '/simulations', icon: FolderOpen },
      { label: 'Create With AI', href: '/simulations/create-with-ai', icon: Sparkles },
    ],
    showTitle: false
  },
]

export const SIDEBAR_WIDTH = 212
export const SIDEBAR_COLLAPSED_WIDTH = 64
