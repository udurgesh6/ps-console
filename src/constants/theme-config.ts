import { LucideIcon, BarChart3, Users, FolderOpen, VectorSquare, FileBadge, Library, Settings, Mail } from 'lucide-react'

/**
 * Global Design System - Theme Categories
 * These can be used anywhere in the application: navigation, buttons, cards, badges, etc.
 */

export type ThemeCategory = 
  | 'dashboard' 
  | 'team' 
  | 'simulation' 
  | 'attackVector' 
  | 'awareness' 
  | 'library' 
  | 'systemConfig'
  | 'inbox'
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'neutral'

export interface ThemeConfig {
  id: ThemeCategory
  label: string
  icon: LucideIcon
  colors: {
    // Icon & Text Colors
    icon: string          // e.g., 'text-blue-600'
    text: string          // e.g., 'text-blue-700'
    textHover: string     // e.g., 'hover:text-blue-800'
    
    // Background Colors
    bg: string            // e.g., 'bg-blue-50'
    bgHover: string       // e.g., 'hover:bg-blue-100'
    bgActive: string      // e.g., 'bg-blue-100'
    
    // Border Colors
    border: string        // e.g., 'border-blue-200'
    borderHover: string   // e.g., 'hover:border-blue-300'
    
    // Solid/Primary Colors (for buttons, badges, etc.)
    solid: string         // e.g., 'bg-blue-600'
    solidHover: string    // e.g., 'hover:bg-blue-700'
    solidText: string     // e.g., 'text-white'
    
    // Ring/Focus Colors
    ring: string          // e.g., 'ring-blue-500'
  }
  // Raw hex/rgb values for programmatic use (charts, canvas, etc.)
  raw: {
    primary: string       // Main color hex
    light: string         // Light variant
    dark: string          // Dark variant
  }
}

/**
 * Global Theme Constants
 * Use these anywhere in your app for consistent styling
 */
export const THEMES: Record<ThemeCategory, ThemeConfig> = {
  // Business & Analytics
  dashboard: {
    id: 'dashboard',
    label: 'Dashboard',
    icon: BarChart3,
    colors: {
      icon: 'text-blue-600',
      text: 'text-blue-700',
      textHover: 'hover:text-blue-800',
      bg: 'bg-blue-50',
      bgHover: 'hover:bg-blue-100',
      bgActive: 'bg-blue-100',
      border: 'border-blue-200',
      borderHover: 'hover:border-blue-300',
      solid: 'bg-blue-600',
      solidHover: 'hover:bg-blue-700',
      solidText: 'text-white',
      ring: 'ring-blue-500',
    },
    raw: {
      primary: '#2563eb',
      light: '#eff6ff',
      dark: '#1e40af',
    }
  },

  // People & Collaboration
  team: {
    id: 'team',
    label: 'Team',
    icon: Users,
    colors: {
      icon: 'text-purple-600',
      text: 'text-purple-700',
      textHover: 'hover:text-purple-800',
      bg: 'bg-purple-50',
      bgHover: 'hover:bg-purple-100',
      bgActive: 'bg-purple-100',
      border: 'border-purple-200',
      borderHover: 'hover:border-purple-300',
      solid: 'bg-purple-600',
      solidHover: 'hover:bg-purple-700',
      solidText: 'text-white',
      ring: 'ring-purple-500',
    },
    raw: {
      primary: '#9333ea',
      light: '#faf5ff',
      dark: '#7e22ce',
    }
  },

  // Testing & Action
  simulation: {
    id: 'simulation',
    label: 'Simulation',
    icon: FolderOpen,
    colors: {
      icon: 'text-orange-600',
      text: 'text-orange-700',
      textHover: 'hover:text-orange-800',
      bg: 'bg-orange-50',
      bgHover: 'hover:bg-orange-100',
      bgActive: 'bg-orange-100',
      border: 'border-orange-200',
      borderHover: 'hover:border-orange-300',
      solid: 'bg-orange-600',
      solidHover: 'hover:bg-orange-700',
      solidText: 'text-white',
      ring: 'ring-orange-500',
    },
    raw: {
      primary: '#ea580c',
      light: '#fff7ed',
      dark: '#c2410c',
    }
  },

  // Security & Danger
  attackVector: {
    id: 'attackVector',
    label: 'Attack Vector',
    icon: VectorSquare,
    colors: {
      icon: 'text-red-600',
      text: 'text-red-700',
      textHover: 'hover:text-red-800',
      bg: 'bg-red-50',
      bgHover: 'hover:bg-red-100',
      bgActive: 'bg-red-100',
      border: 'border-red-200',
      borderHover: 'hover:border-red-300',
      solid: 'bg-red-600',
      solidHover: 'hover:bg-red-700',
      solidText: 'text-white',
      ring: 'ring-red-500',
    },
    raw: {
      primary: '#dc2626',
      light: '#fef2f2',
      dark: '#b91c1c',
    }
  },

  // Training & Growth
  awareness: {
    id: 'awareness',
    label: 'Awareness',
    icon: FileBadge,
    colors: {
      icon: 'text-green-600',
      text: 'text-green-700',
      textHover: 'hover:text-green-800',
      bg: 'bg-green-50',
      bgHover: 'hover:bg-green-100',
      bgActive: 'bg-green-100',
      border: 'border-green-200',
      borderHover: 'hover:border-green-300',
      solid: 'bg-green-600',
      solidHover: 'hover:bg-green-700',
      solidText: 'text-white',
      ring: 'ring-green-500',
    },
    raw: {
      primary: '#16a34a',
      light: '#f0fdf4',
      dark: '#15803d',
    }
  },

  // Resources & Knowledge
  library: {
    id: 'library',
    label: 'Library',
    icon: Library,
    colors: {
      icon: 'text-indigo-600',
      text: 'text-indigo-700',
      textHover: 'hover:text-indigo-800',
      bg: 'bg-indigo-50',
      bgHover: 'hover:bg-indigo-100',
      bgActive: 'bg-indigo-100',
      border: 'border-indigo-200',
      borderHover: 'hover:border-indigo-300',
      solid: 'bg-indigo-600',
      solidHover: 'hover:bg-indigo-700',
      solidText: 'text-white',
      ring: 'ring-indigo-500',
    },
    raw: {
      primary: '#4f46e5',
      light: '#eef2ff',
      dark: '#4338ca',
    }
  },

  // System & Configuration
  systemConfig: {
    id: 'systemConfig',
    label: 'System Config',
    icon: Settings,
    colors: {
      icon: 'text-gray-600',
      text: 'text-gray-700',
      textHover: 'hover:text-gray-800',
      bg: 'bg-gray-50',
      bgHover: 'hover:bg-gray-100',
      bgActive: 'bg-gray-100',
      border: 'border-gray-200',
      borderHover: 'hover:border-gray-300',
      solid: 'bg-gray-600',
      solidHover: 'hover:bg-gray-700',
      solidText: 'text-white',
      ring: 'ring-gray-500',
    },
    raw: {
      primary: '#4b5563',
      light: '#f9fafb',
      dark: '#374151',
    }
  },

  // Communication
  inbox: {
    id: 'inbox',
    label: 'Inbox',
    icon: Mail,
    colors: {
      icon: 'text-teal-600',
      text: 'text-teal-700',
      textHover: 'hover:text-teal-800',
      bg: 'bg-teal-50',
      bgHover: 'hover:bg-teal-100',
      bgActive: 'bg-teal-100',
      border: 'border-teal-200',
      borderHover: 'hover:border-teal-300',
      solid: 'bg-teal-600',
      solidHover: 'hover:bg-teal-700',
      solidText: 'text-white',
      ring: 'ring-teal-500',
    },
    raw: {
      primary: '#0d9488',
      light: '#f0fdfa',
      dark: '#0f766e',
    }
  },

  // Status Colors - Success
  success: {
    id: 'success',
    label: 'Success',
    icon: FileBadge,
    colors: {
      icon: 'text-emerald-600',
      text: 'text-emerald-700',
      textHover: 'hover:text-emerald-800',
      bg: 'bg-emerald-50',
      bgHover: 'hover:bg-emerald-100',
      bgActive: 'bg-emerald-100',
      border: 'border-emerald-200',
      borderHover: 'hover:border-emerald-300',
      solid: 'bg-emerald-600',
      solidHover: 'hover:bg-emerald-700',
      solidText: 'text-white',
      ring: 'ring-emerald-500',
    },
    raw: {
      primary: '#059669',
      light: '#ecfdf5',
      dark: '#047857',
    }
  },

  // Status Colors - Warning
  warning: {
    id: 'warning',
    label: 'Warning',
    icon: FileBadge,
    colors: {
      icon: 'text-amber-600',
      text: 'text-amber-700',
      textHover: 'hover:text-amber-800',
      bg: 'bg-amber-50',
      bgHover: 'hover:bg-amber-100',
      bgActive: 'bg-amber-100',
      border: 'border-amber-200',
      borderHover: 'hover:border-amber-300',
      solid: 'bg-amber-600',
      solidHover: 'hover:bg-amber-700',
      solidText: 'text-white',
      ring: 'ring-amber-500',
    },
    raw: {
      primary: '#d97706',
      light: '#fffbeb',
      dark: '#b45309',
    }
  },

  // Status Colors - Error
  error: {
    id: 'error',
    label: 'Error',
    icon: FileBadge,
    colors: {
      icon: 'text-rose-600',
      text: 'text-rose-700',
      textHover: 'hover:text-rose-800',
      bg: 'bg-rose-50',
      bgHover: 'hover:bg-rose-100',
      bgActive: 'bg-rose-100',
      border: 'border-rose-200',
      borderHover: 'hover:border-rose-300',
      solid: 'bg-rose-600',
      solidHover: 'hover:bg-rose-700',
      solidText: 'text-white',
      ring: 'ring-rose-500',
    },
    raw: {
      primary: '#e11d48',
      light: '#fff1f2',
      dark: '#be123c',
    }
  },

  // Status Colors - Info
  info: {
    id: 'info',
    label: 'Info',
    icon: FileBadge,
    colors: {
      icon: 'text-sky-600',
      text: 'text-sky-700',
      textHover: 'hover:text-sky-800',
      bg: 'bg-sky-50',
      bgHover: 'hover:bg-sky-100',
      bgActive: 'bg-sky-100',
      border: 'border-sky-200',
      borderHover: 'hover:border-sky-300',
      solid: 'bg-sky-600',
      solidHover: 'hover:bg-sky-700',
      solidText: 'text-white',
      ring: 'ring-sky-500',
    },
    raw: {
      primary: '#0284c7',
      light: '#f0f9ff',
      dark: '#0369a1',
    }
  },

  // Neutral/Default
  neutral: {
    id: 'neutral',
    label: 'Neutral',
    icon: FileBadge,
    colors: {
      icon: 'text-slate-600',
      text: 'text-slate-700',
      textHover: 'hover:text-slate-800',
      bg: 'bg-slate-50',
      bgHover: 'hover:bg-slate-100',
      bgActive: 'bg-slate-100',
      border: 'border-slate-200',
      borderHover: 'hover:border-slate-300',
      solid: 'bg-slate-600',
      solidHover: 'hover:bg-slate-700',
      solidText: 'text-white',
      ring: 'ring-slate-500',
    },
    raw: {
      primary: '#475569',
      light: '#f8fafc',
      dark: '#334155',
    }
  },
}

/**
 * Helper function to get theme configuration
 */
export const getTheme = (category: ThemeCategory): ThemeConfig => {
  return THEMES[category]
}

/**
 * Helper function to get theme colors only
 */
export const getThemeColors = (category: ThemeCategory) => {
  return THEMES[category].colors
}

/**
 * Helper function to get raw color values
 */
export const getThemeRawColors = (category: ThemeCategory) => {
  return THEMES[category].raw
}