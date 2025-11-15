export type SimulationInterval = 
  | "daily" 
  | "weekly" 
  | "bi-weekly" 
  | "monthly" 
  | "quarterly" 
  | "custom";

export type SimulationCategory = 
  | "high-priority"
  | "department-specific"
  | "technical"
  | "organization-wide"
  | "customer-facing"
  | "onboarding"
  | "remote-workers"
  | "seasonal"
  | "compliance";

export type DayOfWeek = 
  | "monday" 
  | "tuesday" 
  | "wednesday" 
  | "thursday" 
  | "friday" 
  | "saturday" 
  | "sunday";

export type ScheduleType = 
  | "weekly" 
  | "bi-weekly" 
  | "monthly" 
  | "quarterly" 
  | "custom";

// Base schedule interface
interface BaseSchedule {
  type: ScheduleType;
  timeOfDay: string; // Format: "HH:MM" (24-hour)
  timezone: string; // IANA timezone string (e.g., "America/New_York")
}

// Weekly schedule
export interface WeeklySchedule extends BaseSchedule {
  type: "weekly";
  dayOfWeek: DayOfWeek[];
}

// Bi-weekly schedule
export interface BiWeeklySchedule extends BaseSchedule {
  type: "bi-weekly";
  dayOfWeek: DayOfWeek[];
}

// Monthly schedule
export interface MonthlySchedule extends BaseSchedule {
  type: "monthly";
  dayOfMonth: number; // 1-31
}

// Quarterly schedule
export interface QuarterlySchedule extends BaseSchedule {
  type: "quarterly";
  monthsOfYear: number[]; // [1, 4, 7, 10] for Q1, Q2, Q3, Q4
  dayOfMonth: number; // 1-31
}

// Custom schedule
export interface CustomSchedule extends BaseSchedule {
  type: "custom";
  dayOfWeek?: DayOfWeek[];
  specificDates?: string[]; // ISO date strings ["2024-11-01", "2024-11-15"]
}

export type Schedule = 
  | WeeklySchedule 
  | BiWeeklySchedule 
  | MonthlySchedule 
  | QuarterlySchedule 
  | CustomSchedule;

export interface SimulationProfile {
  id: string;
  name: string;
  description: string;
  category: SimulationCategory;
  simulationInterval: SimulationInterval;
  simulationFrequency: number; // Number of times per month
  employeeGroups: string[]; // Array of employee group IDs
  attackVectors: string[]; // Array of attack vector IDs
  schedule: Schedule;
  isActive?: boolean; // Optional: whether the profile is currently active
  createdAt?: Date;
  updatedAt?: Date;
  lastRunDate?: Date;
  nextRunDate?: Date;
}

// Employee Group reference type
export interface EmployeeGroup {
  id: string;
  name: string;
  count: number;
  department?: string;
  location?: string;
}

// Filter group for UI
export interface SimulationProfileFilterGroup {
  title: string;
  key: keyof Pick<SimulationProfile, "category" | "simulationInterval" | "simulationFrequency">;
  options: {
    label: string;
    value: string;
    count?: number;
  }[];
}

export default SimulationProfile;