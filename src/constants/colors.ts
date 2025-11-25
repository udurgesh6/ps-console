import { hexToRgba } from "@/utils/hex-to-rgba";

// Modern color palette for charts and visualizations
export const CHART_COLORS = {
  darkBlue: '#003f5c',
  navy: '#2f4b7c',
  purple: '#665191',
  mauve: '#a05195',
  rose: '#d45087',
  coral: '#f95d6a',
  orange: '#ff7c43',
  amber: '#ffa600',
  emerald: '#50c878'
} as const;

// Color array for easy iteration
export const CHART_COLOR_ARRAY = [
  '#003f5c',
  '#2f4b7c',
  '#665191',
  '#a05195',
  '#d45087',
  '#f95d6a',
  '#ff7c43',
  '#ffa600',
] as const;

const createColorPair = (color: string) => ({
  main: color,
  bg: hexToRgba(color, 0.1),
  bgMedium: hexToRgba(color, 0.2),
  bgStrong: hexToRgba(color, 0.3),
});

// Predefined color schemes for common use cases
export const COLOR_SCHEMES = {
  // Risk levels
  risk: {
    high: createColorPair(CHART_COLORS.coral),      // #f95d6a - Coral
    medium: createColorPair(CHART_COLORS.amber),    // #ffa600 - Amber
    low: createColorPair(CHART_COLORS.emerald),      // #50c878 - Emerald
  },
  
  // Status indicators
  status: {
    critical: createColorPair(CHART_COLORS.rose),   // #d45087 - Rose
    warning: createColorPair(CHART_COLORS.orange),  // #ff7c43 - Orange
    success: createColorPair(CHART_COLORS.navy),    // #2f4b7c - Navy
    info: createColorPair(CHART_COLORS.darkBlue),   // #003f5c - Dark Blue
  },
  
  // User & People related
  user: {
    primary: createColorPair(CHART_COLORS.mauve),   // #a05195 - Mauve
    secondary: createColorPair(CHART_COLORS.purple), // #665191 - Purple
    group: createColorPair(CHART_COLORS.navy),      // #2f4b7c - Navy
    admin: createColorPair(CHART_COLORS.darkBlue),  // #003f5c - Dark Blue
  },
  
  // Communication & Activity
  communication: {
    email: createColorPair(CHART_COLORS.coral),     // #f95d6a - Coral
    message: createColorPair(CHART_COLORS.mauve),   // #a05195 - Mauve
    notification: createColorPair(CHART_COLORS.amber), // #ffa600 - Amber
    chat: createColorPair(CHART_COLORS.purple),     // #665191 - Purple
  },
  
  // Security & Protection
  security: {
    shield: createColorPair(CHART_COLORS.navy),     // #2f4b7c - Navy
    lock: createColorPair(CHART_COLORS.darkBlue),   // #003f5c - Dark Blue
    alert: createColorPair(CHART_COLORS.coral),     // #f95d6a - Coral
    verified: createColorPair(CHART_COLORS.purple), // #665191 - Purple
  },
  
  // Analytics & Metrics
  analytics: {
    chart: createColorPair(CHART_COLORS.purple),    // #665191 - Purple
    trending: createColorPair(CHART_COLORS.amber),  // #ffa600 - Amber
    growth: createColorPair(CHART_COLORS.navy),     // #2f4b7c - Navy
    decline: createColorPair(CHART_COLORS.coral),   // #f95d6a - Coral
  },
  
  // Actions & Operations
  action: {
    create: createColorPair(CHART_COLORS.purple),   // #665191 - Purple
    edit: createColorPair(CHART_COLORS.amber),      // #ffa600 - Amber
    delete: createColorPair(CHART_COLORS.coral),    // #f95d6a - Coral
    view: createColorPair(CHART_COLORS.navy),       // #2f4b7c - Navy
  },
  
  // Business & Finance
  business: {
    revenue: createColorPair(CHART_COLORS.navy),    // #2f4b7c - Navy
    expense: createColorPair(CHART_COLORS.coral),   // #f95d6a - Coral
    profit: createColorPair(CHART_COLORS.purple),   // #665191 - Purple
    target: createColorPair(CHART_COLORS.amber),    // #ffa600 - Amber
  },
  
  // Training & Education
  training: {
    course: createColorPair(CHART_COLORS.purple),   // #665191 - Purple
    completed: createColorPair(CHART_COLORS.navy),  // #2f4b7c - Navy
    pending: createColorPair(CHART_COLORS.amber),   // #ffa600 - Amber
    failed: createColorPair(CHART_COLORS.coral),    // #f95d6a - Coral
  },
  
  // Documents & Files
  document: {
    pdf: createColorPair(CHART_COLORS.coral),       // #f95d6a - Coral
    spreadsheet: createColorPair(CHART_COLORS.navy), // #2f4b7c - Navy
    presentation: createColorPair(CHART_COLORS.amber), // #ffa600 - Amber
    text: createColorPair(CHART_COLORS.purple),     // #665191 - Purple
  },
  
  // Time & Calendar
  time: {
    today: createColorPair(CHART_COLORS.purple),    // #665191 - Purple
    upcoming: createColorPair(CHART_COLORS.amber),  // #ffa600 - Amber
    past: createColorPair(CHART_COLORS.navy),       // #2f4b7c - Navy
    overdue: createColorPair(CHART_COLORS.coral),   // #f95d6a - Coral
  },
  
  // Gradients for charts and backgrounds
  gradient: {
    start: CHART_COLORS.darkBlue,  // #003f5c
    end: CHART_COLORS.amber,       // #ffa600
    warm: {
      start: CHART_COLORS.coral,   // #f95d6a
      end: CHART_COLORS.amber,     // #ffa600
    },
    cool: {
      start: CHART_COLORS.darkBlue, // #003f5c
      end: CHART_COLORS.purple,     // #665191
    },
    vibrant: {
      start: CHART_COLORS.mauve,   // #a05195
      end: CHART_COLORS.coral,     // #f95d6a
    },
  }
} as const;


export const SEMANTIC_COLORS = {
  // Common icons
  users: COLOR_SCHEMES.user.group,
  mail: COLOR_SCHEMES.communication.email,
  bell: COLOR_SCHEMES.communication.notification,
  shield: COLOR_SCHEMES.security.shield,
  alertTriangle: COLOR_SCHEMES.risk.high,
  checkCircle: COLOR_SCHEMES.status.success,
  xCircle: COLOR_SCHEMES.status.critical,
  info: COLOR_SCHEMES.status.info,
  settings: COLOR_SCHEMES.action.edit,
  calendar: COLOR_SCHEMES.time.today,
  fileText: COLOR_SCHEMES.document.text,
  trendingUp: COLOR_SCHEMES.analytics.growth,
  trendingDown: COLOR_SCHEMES.analytics.decline,
  plus: COLOR_SCHEMES.action.create,
  trash: COLOR_SCHEMES.action.delete,
  eye: COLOR_SCHEMES.action.view,
} as const;