import { SimulationProfile } from "@/types";

export const dummySimulationProfiles: SimulationProfile[] = [
  {
    id: "sp-1",
    name: "Executive Leadership Training",
    description: "Targeted phishing simulation for C-level executives and senior management to identify BEC and spear-phishing vulnerabilities",
    category: "high-priority",
    simulationInterval: "weekly",
    simulationFrequency: 4,
    employeeGroups: ["eg-1", "eg-2"],
    attackVectors: ["av-4", "av-5", "av-9"],
    schedule: {
      type: "custom",
      dayOfWeek: ["monday", "wednesday"],
      timeOfDay: "09:00",
      timezone: "America/New_York",
    },
    isActive: true,
  },
  {
    id: "sp-2",
    name: "Finance Department Security Awareness",
    description: "Monthly simulation targeting finance team with wire transfer fraud and invoice scams to prevent financial losses",
    category: "department-specific",
    simulationInterval: "monthly",
    simulationFrequency: 1,
    employeeGroups: ["eg-3"],
    attackVectors: ["av-4", "av-7"],
    schedule: {
      type: "monthly",
      dayOfMonth: 15,
      timeOfDay: "10:30",
      timezone: "America/New_York",
    },
    isActive: true,
  },
  {
    id: "sp-3",
    name: "IT Department Advanced Threats",
    description: "Bi-weekly advanced phishing campaigns testing IT staff against sophisticated social engineering and credential harvesting",
    category: "technical",
    simulationInterval: "bi-weekly",
    simulationFrequency: 2,
    employeeGroups: ["eg-4", "eg-5"],
    attackVectors: ["av-2", "av-3", "av-8", "av-11"],
    schedule: {
      type: "bi-weekly",
      dayOfWeek: ["tuesday", "thursday"],
      timeOfDay: "14:00",
      timezone: "America/New_York",
    },
    isActive: false
  },
  {
    id: "sp-4",
    name: "All-Hands Quarterly Assessment",
    description: "Comprehensive quarterly phishing test for entire organization to measure overall security awareness baseline",
    category: "organization-wide",
    simulationInterval: "quarterly",
    simulationFrequency: 0.33,
    employeeGroups: ["eg-1", "eg-2", "eg-3", "eg-4", "eg-5", "eg-6"],
    attackVectors: ["av-1", "av-6", "av-10"],
    schedule: {
      type: "quarterly",
      monthsOfYear: [3, 6, 9, 12],
      dayOfMonth: 1,
      timeOfDay: "09:00",
      timezone: "America/New_York",
    },
    isActive: true
  },
  {
    id: "sp-5",
    name: "Customer Service Social Engineering",
    description: "Weekly vishing and pretexting simulations for customer-facing teams to build resistance against phone-based attacks",
    category: "customer-facing",
    simulationInterval: "weekly",
    simulationFrequency: 4,
    employeeGroups: ["eg-6"],
    attackVectors: ["av-5", "av-9"],
    schedule: {
      type: "weekly",
      dayOfWeek: ["friday"],
      timeOfDay: "11:00",
      timezone: "America/New_York",
    },
    isActive: false
  },
  {
    id: "sp-6",
    name: "New Hire Onboarding Security",
    description: "Basic phishing awareness training for new employees within their first 30 days, run twice monthly",
    category: "onboarding",
    simulationInterval: "bi-weekly",
    simulationFrequency: 2,
    employeeGroups: ["eg-7"],
    attackVectors: ["av-1", "av-6", "av-10"],
    schedule: {
      type: "bi-weekly",
      dayOfWeek: ["monday"],
      timeOfDay: "09:30",
      timezone: "America/New_York",
    },
    isActive: false
  },
  {
    id: "sp-7",
    name: "Sales Team Travel Scams",
    description: "Monthly simulations focused on travel and hospitality scams targeting remote and traveling sales personnel",
    category: "department-specific",
    simulationInterval: "monthly",
    simulationFrequency: 1,
    employeeGroups: ["eg-8"],
    attackVectors: ["av-1", "av-4"],
    schedule: {
      type: "monthly",
      dayOfMonth: 10,
      timeOfDay: "08:00",
      timezone: "America/Los_Angeles",
    },
    isActive: true
  },
  {
    id: "sp-8",
    name: "Marketing Team Social Media Threats",
    description: "Bi-weekly simulations testing marketing staff against social media phishing and fake brand impersonation",
    category: "department-specific",
    simulationInterval: "bi-weekly",
    simulationFrequency: 2,
    employeeGroups: ["eg-9"],
    attackVectors: ["av-8", "av-10"],
    schedule: {
      type: "custom",
      dayOfWeek: ["tuesday", "thursday"],
      timeOfDay: "13:00",
      timezone: "America/Chicago",
    },
    isActive: false
  },
  {
    id: "sp-9",
    name: "HR Credential Harvesting Defense",
    description: "Weekly simulations for HR team focusing on fake job applications and resume-based malware attacks",
    category: "high-priority",
    simulationInterval: "weekly",
    simulationFrequency: 4,
    employeeGroups: ["eg-10"],
    attackVectors: ["av-3", "av-8", "av-11"],
    schedule: {
      type: "weekly",
      dayOfWeek: ["wednesday"],
      timeOfDay: "10:00",
      timezone: "America/New_York",
    },
    isActive: false
  },
  {
    id: "sp-10",
    name: "Remote Workers Security Baseline",
    description: "Monthly comprehensive testing for remote employees covering VPN scams, fake IT support, and cloud service phishing",
    category: "remote-workers",
    simulationInterval: "monthly",
    simulationFrequency: 1,
    employeeGroups: ["eg-11"],
    attackVectors: ["av-5", "av-6", "av-7", "av-9"],
    schedule: {
      type: "monthly",
      dayOfMonth: 5,
      timeOfDay: "09:00",
      timezone: "America/New_York",
    },
    isActive: true
  },
  {
    id: "sp-11",
    name: "Seasonal Campaign - Diwali Special",
    description: "Special seasonal phishing simulation during Diwali festival period targeting all employees with culturally relevant scenarios",
    category: "seasonal",
    simulationInterval: "custom",
    simulationFrequency: 1,
    employeeGroups: ["eg-1", "eg-2", "eg-3", "eg-4", "eg-5", "eg-6"],
    attackVectors: ["av-12"],
    schedule: {
      type: "custom",
      specificDates: ["2024-11-01", "2024-11-02", "2024-11-03"],
      timeOfDay: "10:00",
      timezone: "Asia/Kolkata",
    },
    isActive: true
  },
  {
    id: "sp-12",
    name: "Compliance Team Regulatory Phishing",
    description: "Quarterly high-stakes simulations for compliance officers testing against fake regulatory notices and audit requests",
    category: "compliance",
    simulationInterval: "quarterly",
    simulationFrequency: 0.33,
    employeeGroups: ["eg-12"],
    attackVectors: ["av-2", "av-7", "av-9"],
    schedule: {
      type: "quarterly",
      monthsOfYear: [1, 4, 7, 10],
      dayOfMonth: 20,
      timeOfDay: "11:00",
      timezone: "America/New_York",
    },
  },
];

// Schedule type definitions for reference
export const scheduleTypes = {
  weekly: "Weekly",
  "bi-weekly": "Bi-weekly (Every 2 weeks)",
  monthly: "Monthly",
  quarterly: "Quarterly",
  custom: "Custom Schedule",
} as const;

export const simulationIntervals = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "bi-weekly", label: "Bi-weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "custom", label: "Custom" },
] as const;

export const categoryOptions = [
  { value: "high-priority", label: "High Priority", color: "red" },
  { value: "department-specific", label: "Department Specific", color: "blue" },
  { value: "technical", label: "Technical", color: "purple" },
  { value: "organization-wide", label: "Organization Wide", color: "green" },
  { value: "customer-facing", label: "Customer Facing", color: "orange" },
  { value: "onboarding", label: "Onboarding", color: "teal" },
  { value: "remote-workers", label: "Remote Workers", color: "indigo" },
  { value: "seasonal", label: "Seasonal", color: "pink" },
  { value: "compliance", label: "Compliance", color: "yellow" },
] as const;

// Dummy employee groups for reference
export const dummyEmployeeGroups = [
  { id: "eg-1", name: "Executive Leadership", count: 12 },
  { id: "eg-2", name: "Senior Management", count: 45 },
  { id: "eg-3", name: "Finance Department", count: 28 },
  { id: "eg-4", name: "IT Department", count: 67 },
  { id: "eg-5", name: "DevOps Team", count: 23 },
  { id: "eg-6", name: "Customer Service", count: 89 },
  { id: "eg-7", name: "New Hires (0-3 months)", count: 34 },
  { id: "eg-8", name: "Sales Team", count: 56 },
  { id: "eg-9", name: "Marketing Department", count: 41 },
  { id: "eg-10", name: "Human Resources", count: 18 },
  { id: "eg-11", name: "Remote Workers", count: 124 },
  { id: "eg-12", name: "Compliance Officers", count: 9 },
];

export interface SimulationProfileFilterGroup {
  title: string;
  key: string;
  options: { label: string; value: string; count?: number }[];
}

export const simulationProfileFilterGroups: SimulationProfileFilterGroup[] = [
  {
    title: "Category",
    key: "category",
    options: [
      { label: "High Priority", value: "high-priority", count: 2 },
      { label: "Department Specific", value: "department-specific", count: 3 },
      { label: "Technical", value: "technical", count: 1 },
      { label: "Organization Wide", value: "organization-wide", count: 1 },
      { label: "Customer Facing", value: "customer-facing", count: 1 },
      { label: "Onboarding", value: "onboarding", count: 1 },
      { label: "Remote Workers", value: "remote-workers", count: 1 },
      { label: "Seasonal", value: "seasonal", count: 1 },
      { label: "Compliance", value: "compliance", count: 1 },
    ],
  },
  {
    title: "Simulation Interval",
    key: "simulationInterval",
    options: [
      { label: "Weekly", value: "weekly", count: 3 },
      { label: "Bi-weekly", value: "bi-weekly", count: 3 },
      { label: "Monthly", value: "monthly", count: 3 },
      { label: "Quarterly", value: "quarterly", count: 2 },
      { label: "Custom", value: "custom", count: 1 },
    ],
  },
  {
    title: "Frequency (per month)",
    key: "simulationFrequency",
    options: [
      { label: "4+ times", value: "4", count: 4 },
      { label: "2-3 times", value: "2", count: 4 },
      { label: "Once", value: "1", count: 3 },
      { label: "Quarterly", value: "0.33", count: 2 },
    ],
  },
];

export default dummySimulationProfiles;