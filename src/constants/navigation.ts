import { LucideIcon, FolderOpen, BarChart3, Users, VectorSquare, Settings, Library, FileBadge } from 'lucide-react'
import { ThemeCategory } from './theme-config'

export interface SidebarItem {
  label: string
  href: string
  icon?: LucideIcon
  theme?: ThemeCategory
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
      { 
        label: 'Dashboard', 
        href: '/dashboard', 
        icon: BarChart3,
        theme: 'dashboard'
      },
    ],
    showTitle: false
  },
  {
    id: 'team',
    title: 'Team',
    items: [
      { 
        label: 'Team', 
        href: '/team/employees', 
        icon: Users,
        theme: 'team'
      },
    ],
    showTitle: false
  },
  {
    id: 'attack-vector',
    title: 'Attack Vector',
    items: [
      { 
        label: 'Attack Vector', 
        href: '/attack-vector', 
        icon: VectorSquare,
        theme: 'attackVector'
      }
    ],
    showTitle: false
  },
  {
    id: 'simulation',
    title: 'Simulation',
    items: [
      { 
        label: 'Simulations', 
        href: '/simulations', 
        icon: FolderOpen,
        theme: 'simulation'
      },
    ],
    showTitle: false
  },
  
  {
    id: 'awareness',
    title: 'Awareness',
    items: [
      { 
        label: 'Awareness', 
        href: '/awareness', 
        icon: FileBadge,
        theme: 'awareness'
      },
    ],
    showTitle: false
  },
  {
    id: 'library',
    title: 'Library',
    items: [
      { 
        label: 'Library', 
        href: '/templates/form', 
        icon: Library,
        theme: 'library'
      }
    ],
    showTitle: false,
    isSystemConfig: true
  },
  {
    id: 'system-config',
    title: 'System Config',
    items: [
      { 
        label: 'System Config', 
        href: '/system-config', 
        icon: Settings,
        theme: 'systemConfig'
      }
    ],
    showTitle: false,
    isSystemConfig: true
  }
]
export const SIDEBAR_WIDTH = 220
export const SIDEBAR_COLLAPSED_WIDTH = 64
