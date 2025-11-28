import z from "zod";
import { AttackVector, attackVectorSchema } from "./attack-vector";
import { EmployeeGroup, employeeGroupSchema } from "./employee-group";

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

// Helper function to calculate max frequency based on interval
export const calculateMaxFrequency = (intervalDays: number): number => {
  return Math.ceil(30 / intervalDays);
};

export interface SimulationProfile {
  id: string;
  name: string;
  description: string;
  category: SimulationCategory;
  employeeGroups: EmployeeGroup[];
  attackVectors: AttackVector[];
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  lastRunDate?: Date;
  nextRunDate?: Date;
  letAIDecideAttackVectors?: boolean;
  isAutonomous?: boolean;
  
  // Autonomous scheduling fields - single values
  simulationInterval?: number; // 1-28 days between simulations
  simulationFrequency?: number; // Number of simulations per month (max depends on interval)
  startDate?: Date;
  endDate?: Date;
  timezone?: string;
  
  // Manual scheduling field
  schedule?: Schedule;
}

// Employee Group reference type
// export interface EmployeeGroup {
//   id: string;
//   name: string;
//   count: number;
//   department?: string;
//   location?: string;
// }

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

export const simulationProfileBasicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "high-priority",
    "department-specific",
    "technical",
    "organization-wide",
    "customer-facing",
    "onboarding",
    "remote-workers",
    "seasonal",
    "compliance"
  ], {
    message: "Please select a valid category"
  }),
});

// 2. Target Selection (Employee Groups) Form Schema
export const simulationProfileTargetSelectionSchema = z.object({
  employeeGroups: z.array(employeeGroupSchema)
    .min(1, "At least one employee group must be selected")
});

export const simulationProfileAttackVectorsSchema = z.object({
    attackVectors: z.array(attackVectorSchema),
    letAIDecideAttackVectors: z.boolean().optional(),
}).refine(
    (data) => {
        // If letAIDecideAttackVectors is true, attackVectors can be empty
        if (data.letAIDecideAttackVectors === true) {
            return true;
        }
        // Otherwise, attackVectors must have at least one item
        return data.attackVectors.length >= 1;
    },
    {
        message: "At least one attack vector is required",
        path: ["attackVectors"], // This puts the error on the attackVectors field
    }
);

// 4. Schedule Form Schema
// Base schedule schema
const baseScheduleSchema = z.object({
  timeOfDay: z.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM format (24-hour)"),
  timezone: z.string()
    .min(1, "Timezone is required"),
});

// Weekly schedule schema
const weeklyScheduleSchema = baseScheduleSchema.extend({
  type: z.literal("weekly"),
  dayOfWeek: z.array(z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ])).min(1, "At least one day must be selected"),
});

// Bi-weekly schedule schema
const biWeeklyScheduleSchema = baseScheduleSchema.extend({
  type: z.literal("bi-weekly"),
  dayOfWeek: z.array(z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ])).min(1, "At least one day must be selected"),
});

// Monthly schedule schema
const monthlyScheduleSchema = baseScheduleSchema.extend({
  type: z.literal("monthly"),
  dayOfMonth: z.number()
    .int("Day must be a whole number")
    .min(1, "Day must be between 1 and 31")
    .max(31, "Day must be between 1 and 31"),
});

// Quarterly schedule schema
const quarterlyScheduleSchema = baseScheduleSchema.extend({
  type: z.literal("quarterly"),
  monthsOfYear: z.array(z.number().int().min(1).max(12))
    .min(1, "At least one month must be selected")
    .max(4, "Maximum 4 months can be selected for quarterly schedule"),
  dayOfMonth: z.number()
    .int("Day must be a whole number")
    .min(1, "Day must be between 1 and 31")
    .max(31, "Day must be between 1 and 31"),
});

// Custom schedule schema
const customScheduleSchema = baseScheduleSchema.extend({
  type: z.literal("custom"),
  dayOfWeek: z.array(z.enum([
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
  ])).optional(),
  specificDates: z.array(z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "Date must be in ISO format (YYYY-MM-DD)"
  )).optional(),
}).refine(
  (data) => (data.dayOfWeek && data.dayOfWeek.length > 0) || (data.specificDates && data.specificDates.length > 0),
  {
    message: "Either days of week or specific dates must be provided for custom schedule",
    path: ["dayOfWeek"],
  }
);

// Manual schedule - discriminated union of all schedule types
const manualScheduleSchema = z.discriminatedUnion("type", [
  weeklyScheduleSchema,
  biWeeklyScheduleSchema,
  monthlyScheduleSchema,
  quarterlyScheduleSchema,
  customScheduleSchema,
]);

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const autonomousScheduleSchema = z.object({
  isAutonomous: z.literal(true),
  simulationInterval: z.number()
    .int("Must be a whole number")
    .min(1, "Interval must be at least 1 day")
    .max(28, "Interval cannot exceed 28 days"),
  simulationFrequency: z.number()
    .int("Must be a whole number")
    .min(1, "Frequency must be at least 1 per month"),
  startDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in ISO format (YYYY-MM-DD)")
    .refine((date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "Start date cannot be in the past",
    }),
  endDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in ISO format (YYYY-MM-DD)")
    .refine((date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: "End date cannot be in the past",
    }),
  startTime: z.string()
    .regex(timeRegex, "Time must be in HH:MM format (24-hour)")
    .refine((time) => time !== "", {
      message: "Start time is required",
    }),
  endTime: z.string()
    .regex(timeRegex, "Time must be in HH:MM format (24-hour)")
    .refine((time) => time !== "", {
      message: "End time is required",
    }),
  timezone: z.string()
    .min(1, "Timezone is required"),
})
.refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  {
    message: "End date must be after start date",
    path: ["endDate"],
  }
)
.refine(
  (data) => {
    const maxFreq = calculateMaxFrequency(data.simulationInterval);
    return data.simulationFrequency <= maxFreq;
  },
  {
    message: "Frequency exceeds maximum allowed for the selected interval",
    path: ["simulationFrequency"],
  }
)
.refine(
  (data) => {
    // Convert time strings to minutes for comparison
    const [startHours, startMinutes] = data.startTime.split(':').map(Number);
    const [endHours, endMinutes] = data.endTime.split(':').map(Number);
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    return endTotalMinutes > startTotalMinutes;
  },
  {
    message: "End time must be after start time",
    path: ["endTime"],
  }
);

// Non-autonomous schedule wrapper
const nonAutonomousScheduleSchema = z.object({
  isAutonomous: z.literal(false),
  schedule: manualScheduleSchema,
});

// Combined simulation profile schedule schema
export const simulationProfileScheduleSchema = z.discriminatedUnion("isAutonomous", [
  autonomousScheduleSchema,
  nonAutonomousScheduleSchema,
]);

export type ScheduleTypeValue = "weekly" | "bi-weekly" | "monthly" | "quarterly" | "custom";

// Type exports
export type SimulationProfileBasicInfoFormData = z.infer<typeof simulationProfileBasicInfoSchema>;
export type SimulationProfileTargetSelectionFormData = z.infer<typeof simulationProfileTargetSelectionSchema>;
export type SimulationProfileAttackVectorsFormData = z.infer<typeof simulationProfileAttackVectorsSchema>;
export type SimulationProfileScheduleFormData = z.infer<typeof simulationProfileScheduleSchema>;

// Combined type for all form steps (useful for multi-step form state management)
export interface SimulationProfileFormSteps {
  basicInfo: SimulationProfileBasicInfoFormData;
  targetSelection: SimulationProfileTargetSelectionFormData;
  attackVectors: SimulationProfileAttackVectorsFormData;
  schedule: SimulationProfileScheduleFormData;
}

// Complete form data type
export type SimulationProfileCompleteFormData = 
  SimulationProfileBasicInfoFormData & 
  SimulationProfileTargetSelectionFormData & 
  SimulationProfileAttackVectorsFormData & 
  { schedule: SimulationProfileScheduleFormData };

export default SimulationProfile;
