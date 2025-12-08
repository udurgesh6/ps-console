import z from "zod";

export type ScheduleType = "weekly" | "bi-weekly" | "monthly" | "custom";

export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// Map day names to numbers (1-7)
export const DAY_OF_WEEK_MAP: Record<DayOfWeek, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

// Final simulation profile schema
export const simulationProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  categoryId: z.string(),
  employeeGroupIds: z.array(z.string()),
  attackVectorIds: z.array(z.string()),
  minSimulationInterval: z.number().optional(),
  maxSimulationFrequency: z.number().optional(),
  isActive: z.boolean().optional(),
  startDate: z.number().optional(), // Unix timestamp
  endDate: z.number().optional(), // Unix timestamp
  simulationTrackingDuration: z.number().optional(),
  scheduleType: z.enum(["weekly", "bi-weekly", "monthly", "custom"]).optional(),
  launchPreference: z.number().optional(), // 1-7 for weekly/bi-weekly, 1-31 for monthly
  launchDates: z.array(z.number()).optional(), // Unix timestamps for custom
});

export type SimulationProfile = z.infer<typeof simulationProfileSchema>;

// Basic info schema (unchanged)
export const simulationProfileBasicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().nonempty("Category is required"),
});

// Target selection schema (unchanged)
export const simulationProfileTargetSelectionSchema = z.object({
  employeeGroupIds: z
    .array(z.string())
    .min(1, "At least one employee group must be selected"),
});

// Attack vectors schema (unchanged)
export const simulationProfileAttackVectorsSchema = z.object({
  attackVectorIds: z
    .array(z.string())
    .min(1, "At least one attack vector must be selected"),
});

// Extended attack vectors schema for form UI with full objects
export const simulationProfileAttackVectorsFormSchema = z.object({
  attackVectors: z.array(z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
    emailTemplate: z.object({
      subject: z.string().optional(),
      htmlBody: z.string(),
    }),
  })),
});

// Time regex
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

// Base schema with common fields for both modes
const baseScheduleSchema = z.object({
  timezone: z.string().min(1, "Timezone is required"),
  startDate: z
    .string()
    .regex(dateRegex, "Date must be in ISO format (YYYY-MM-DD)")
    .refine(
      (date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)),
      {
        message: "Start date cannot be in the past",
      }
    ),
  endDate: z
    .string()
    .regex(dateRegex, "Date must be in ISO format (YYYY-MM-DD)")
    .refine(
      (date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)),
      {
        message: "End date cannot be in the past",
      }
    ),
  startTime: z
    .string()
    .regex(timeRegex, "Time must be in HH:MM format (24-hour)")
    .refine((time) => time !== "", {
      message: "Start time is required",
    }),
  endTime: z
    .string()
    .regex(timeRegex, "Time must be in HH:MM format (24-hour)")
    .refine((time) => time !== "", {
      message: "End time is required",
    }),
});

// Autonomous mode schema
const autonomousScheduleSchema = baseScheduleSchema
  .extend({
    isAutonomous: z.literal(true),
    minSimulationInterval: z
      .number()
      .int("Must be a whole number")
      .min(1, "Minimum interval must be at least 1 day")
      .max(365, "Minimum interval cannot exceed 365 days"),
    maxSimulationFrequency: z
      .number()
      .int("Must be a whole number")
      .min(1, "Maximum interval must be at least 1 day")
      .max(365, "Maximum interval cannot exceed 365 days"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => data.maxSimulationFrequency >= data.minSimulationInterval,
    {
      message:
        "Maximum interval must be greater than or equal to minimum interval",
      path: ["maxSimulationFrequency"],
    }
  )
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      return endTotalMinutes > startTotalMinutes;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

// Weekly schedule schema
const weeklyScheduleSchema = baseScheduleSchema
  .extend({
    isAutonomous: z.literal(false),
    scheduleType: z.literal("weekly"),
    dayOfWeek: z
      .array(
        z.enum([
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ])
      )
      .min(1, "At least one day must be selected")
      .max(1, "Only one day can be selected for weekly schedule"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      return endTotalMinutes > startTotalMinutes;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

// Bi-weekly schedule schema
const biWeeklyScheduleSchema = baseScheduleSchema
  .extend({
    isAutonomous: z.literal(false),
    scheduleType: z.literal("bi-weekly"),
    dayOfWeek: z
      .array(
        z.enum([
          "monday",
          "tuesday",
          "wednesday",
          "thursday",
          "friday",
          "saturday",
          "sunday",
        ])
      )
      .min(1, "At least one day must be selected")
      .max(1, "Only one day can be selected for bi-weekly schedule"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      return endTotalMinutes > startTotalMinutes;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

// Monthly schedule schema
const monthlyScheduleSchema = baseScheduleSchema
  .extend({
    isAutonomous: z.literal(false),
    scheduleType: z.literal("monthly"),
    dayOfMonth: z
      .number()
      .int("Day must be a whole number")
      .min(1, "Day must be between 1 and 31")
      .max(31, "Day must be between 1 and 31"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      return endTotalMinutes > startTotalMinutes;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

// Custom schedule schema
const customScheduleSchema = baseScheduleSchema
  .extend({
    isAutonomous: z.literal(false),
    scheduleType: z.literal("custom"),
    specificDates: z
      .array(
        z.string().regex(dateRegex, "Date must be in ISO format (YYYY-MM-DD)")
      )
      .min(1, "At least one date must be selected"),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })
  .refine(
    (data) => {
      const [startHours, startMinutes] = data.startTime.split(":").map(Number);
      const [endHours, endMinutes] = data.endTime.split(":").map(Number);
      const startTotalMinutes = startHours * 60 + startMinutes;
      const endTotalMinutes = endHours * 60 + endMinutes;
      return endTotalMinutes > startTotalMinutes;
    },
    {
      message: "End time must be after start time",
      path: ["endTime"],
    }
  );

// Combined schedule schema using discriminated union on isAutonomous
export const simulationProfileScheduleSchema = z.discriminatedUnion(
  "isAutonomous",
  [
    autonomousScheduleSchema,
    z.discriminatedUnion("scheduleType", [
      weeklyScheduleSchema,
      biWeeklyScheduleSchema,
      monthlyScheduleSchema,
      customScheduleSchema,
    ]),
  ]
);

export type ScheduleTypeValue = "weekly" | "bi-weekly" | "monthly" | "custom";

// Type exports
export type SimulationProfileBasicInfoFormData = z.infer<
  typeof simulationProfileBasicInfoSchema
>;
export type SimulationProfileTargetSelectionFormData = z.infer<
  typeof simulationProfileTargetSelectionSchema
>;
export type SimulationProfileAttackVectorsFormData = z.infer<
  typeof simulationProfileAttackVectorsSchema
>;
export type SimulationProfileAttackVectorsFormUIData = z.infer<
  typeof simulationProfileAttackVectorsFormSchema
>;
export type SimulationProfileScheduleFormData = z.infer<
  typeof simulationProfileScheduleSchema
>;

// Helper function to convert form data to API format with proper timezone handling
export const convertScheduleFormToAPI = (
  formData: SimulationProfileScheduleFormData,
  timezone?: string
): Partial<SimulationProfile> => {
  // Use the timezone from formData or fallback to provided timezone
  const tz = formData.timezone || timezone || "UTC";

  // Convert dates with times to UTC timestamps considering the selected timezone
  // We need to interpret the date/time as being in the selected timezone, then convert to UTC
  const startDateTime = convertToUTCTimestamp(
    formData.startDate,
    formData.startTime,
    tz
  );
  const endDateTime = convertToUTCTimestamp(
    formData.endDate,
    formData.endTime,
    tz
  );

  const baseData = {
    startDate: startDateTime,
    endDate: endDateTime,
  };

  // Autonomous mode
  if (formData.isAutonomous) {
    return {
      ...baseData,
      minSimulationInterval: formData.minSimulationInterval,
      maxSimulationFrequency: formData.maxSimulationFrequency,
    };
  }

  // Scheduled mode
  if (
    formData.scheduleType === "weekly" ||
    formData.scheduleType === "bi-weekly"
  ) {
    return {
      ...baseData,
      scheduleType: formData.scheduleType,
      launchPreference: DAY_OF_WEEK_MAP[formData.dayOfWeek[0]],
    };
  }

  if (formData.scheduleType === "monthly") {
    return {
      ...baseData,
      scheduleType: formData.scheduleType,
      launchPreference: formData.dayOfMonth,
    };
  }

  if (formData.scheduleType === "custom") {
    return {
      ...baseData,
      scheduleType: formData.scheduleType,
      launchDates: formData.specificDates.map((date) =>
        convertToUTCTimestamp(date, formData.startTime, tz)
      ),
    };
  }

  return baseData;
};

// Helper function to convert date, time, and timezone to UTC timestamp
function convertToUTCTimestamp(
  date: string,
  time: string,
  timezone: string
): number {
  // Create an ISO string in the format that includes timezone info
  // Example: "2024-01-15T14:30:00" in "America/New_York" timezone
  
  // Combine date and time
  const dateTimeString = `${date}T${time}:00`;
  
  // Option 1: Using Intl.DateTimeFormat (browser-native, no dependencies)
  // This creates a date in the specified timezone
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // Parse the input date/time as if it's in the target timezone
  const parts = formatter.formatToParts(new Date(dateTimeString));
  const getPart = (type: string) =>
    parts.find((part) => part.type === type)?.value || "";

  const year = getPart("year");
  const month = getPart("month");
  const day = getPart("day");
  const hour = getPart("hour");
  const minute = getPart("minute");
  const second = getPart("second");

  // Create a UTC date from the parsed parts
  // But we need to account for the timezone offset
  const localDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:${second}`);
  
  // Get the offset between the specified timezone and UTC at this date/time
  const offsetMinutes = getTimezoneOffset(dateTimeString, timezone);
  
  // Adjust for timezone offset to get UTC timestamp
  return localDate.getTime() - offsetMinutes * 60 * 1000;
}

// Helper to get timezone offset in minutes for a specific date/time
function getTimezoneOffset(dateTimeString: string, timezone: string): number {
  // Create date object as if it's in the target timezone
  const date = new Date(dateTimeString);
  
  // Format it in both UTC and the target timezone
  const utcDate = new Date(
    date.toLocaleString("en-US", { timeZone: "UTC" })
  );
  const tzDate = new Date(
    date.toLocaleString("en-US", { timeZone: timezone })
  );
  
  // The difference in milliseconds is the offset
  return (tzDate.getTime() - utcDate.getTime()) / (60 * 1000);
}

export interface SimulationProfileQueryParams {
  limit?: number;
  offset?: number;
  query?: string;
  sortKey?: string;
  sortDirection?: "asc" | "desc";
  categoryId?: string;
  isActive?: boolean;
  [key: string]: string | number | boolean | undefined; // Add index signature
}

export interface SimulationProfileDetailsResponse {
  simulationProfiles: SimulationProfile[];
  total: number;
  limit: number;
}

export interface CreateSimulationProfileRequest {
  name: string;
  description: string;
  categoryId: string;
  employeeGroupIds: string[];
  attackVectorIds: string[];
  minSimulationInterval?: number;
  maxSimulationFrequency?: number;
  isActive?: boolean;
  startDate?: number; // Unix timestamp
  endDate?: number; // Unix timestamp
  simulationTrackingDuration?: number;
  scheduleType?: "weekly" | "bi-weekly" | "monthly" | "custom";
  launchPreference?: number;
  launchDates?: number[];
}

export interface UpdateSimulationProfileRequest
  extends CreateSimulationProfileRequest {
  id: string;
}

export default SimulationProfile;
