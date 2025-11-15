export interface PageConfig {
  title?: string;
  description?: string;
  showTitle?: boolean;
  showDescription?: boolean;
}

export const pageConfigs: Record<string, PageConfig> = {
  '/dashboard': {
    title: 'Security Dashboard',
    description: 'Real-time phishing simulation insights and risk assessment',
    showTitle: true,
    showDescription: false,
  },
  '/dashboard/simulation': {
    title: 'Security Dashboard',
    description: 'This is the simulation page',
    showTitle: true,
    showDescription: false,
  },
  '/dashboard/risk-analysis': {
    title: 'Security Dashboard',
    description: 'This is the risk analysis page',
    showTitle: true,
    showDescription: false,
  },
  '/dashboard/departments': {
    title: 'Security Dashboard',
    description: 'This is the departments page',
    showTitle: true,
    showDescription: false,
  },
  '/dashboard/trends': {
    title: 'Security Dashboard',
    description: 'This is the trends page',
    showTitle: true,
    showDescription: false,
  },
  '/team/employees': {
    title: 'Team',
    description: 'This is the team page',
    showTitle: true,
    showDescription: false,
  },
  '/team/groups': {
    title: 'Team',
    description: 'This is the team page',
    showTitle: true,
    showDescription: false,
  },
  '/templates/form': {
    title: 'Templates',
    description: 'This is the templates page',
    showTitle: true,
    showDescription: false,
  },
  '/templates/landing': {
    title: 'Templates',
    description: 'This is the templates page',
    showTitle: true,
    showDescription: false,
  },
  '/attack-vector': {
    title: 'Attack Vector',
    description: 'This is the attack vector page',
    showTitle: true,
    showDescription: false,
  },
  '/attack-vector/:id': {
    title: 'Attack Vector',
    description: 'This is the attack vector page',
    showTitle: true,
    showDescription: false,
  },
  '/simulations': {
    title: 'Simulations',
    description: 'This is the simulations page',
    showTitle: true,
    showDescription: false,
  },
};

export function getPageConfig(pathname: string): PageConfig {
  // First try exact match
  if (pageConfigs[pathname]) {
    return pageConfigs[pathname];
  }
  
  // Then try pattern matching for dynamic routes
  for (const [pattern, config] of Object.entries(pageConfigs)) {
    if (pattern.includes(':')) {
      // Convert pattern like '/attack-vector/:id' to regex
      const regexPattern = pattern.replace(/:[^/]+/g, '[^/]+');
      const regex = new RegExp(`^${regexPattern}$`);
      
      if (regex.test(pathname)) {
        return config;
      }
    }
  }
  
  return {};
}