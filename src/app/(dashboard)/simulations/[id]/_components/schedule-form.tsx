import { FC, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CalendarIcon,
  X,
  Sparkles,
  Calendar as CalendarRegular,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { ScheduleTypeValue, SimulationProfileScheduleFormData } from "@/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SimulationProfileScheduleStepProps {
  form: UseFormReturn<SimulationProfileScheduleFormData>;
  isSubmitting?: boolean;
}

const DAYS_OF_WEEK = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
] as const;

const MONTHS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const TIMEZONES = [
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Dubai", label: "Dubai (GST)" },
  { value: "Asia/Kolkata", label: "India (IST)" },
  { value: "Asia/Singapore", label: "Singapore (SGT)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Australia/Sydney", label: "Sydney (AEDT)" },
];

// Helper function to calculate max frequency based on interval
const calculateMaxFrequency = (intervalDays: number): number => {
  return Math.ceil(30 / intervalDays);
};

export const SimulationProfileScheduleStep: FC<
  SimulationProfileScheduleStepProps
> = ({ form, isSubmitting = false }) => {
  const isAutonomous = form.watch("isAutonomous");
  const scheduleType = form.watch("schedule.type");
  const startDate = form.watch("startDate");
  const endDate = form.watch("endDate");
  const simulationInterval = form.watch("simulationInterval");
  const simulationFrequency = form.watch("simulationFrequency");

  // Update max frequency when interval changes
  useEffect(() => {
    if (isAutonomous && simulationInterval) {
      const maxFreq = calculateMaxFrequency(simulationInterval);

      // If current frequency exceeds the new max, adjust it
      if (simulationFrequency && simulationFrequency > maxFreq) {
        form.setValue("simulationFrequency", maxFreq, {
          shouldValidate: false,
        });
      }
    }
  }, [simulationInterval, isAutonomous, form, simulationFrequency]);

  const handleScheduleModeChange = (value: string) => {
    const autonomous = value === "autonomous";

    if (autonomous) {
      form.reset({
        isAutonomous: true,
        simulationInterval: 7,
        simulationFrequency: 4,
        startDate: "",
        endDate: "",
        startTime: "",
        endTime: "",
        timezone:
          form.getValues("timezone") ||
          form.getValues("schedule.timezone") ||
          "Asia/Kolkata",
      });
    } else {
      form.reset({
        isAutonomous: false,
        schedule: {
          type: "weekly",
          dayOfWeek: [],
          timeOfDay: "",
          timezone:
            form.getValues("timezone") ||
            form.getValues("schedule.timezone") ||
            "Asia/Kolkata",
        },
      });
    }
  };

  const handleScheduleTypeChange = (newType: ScheduleTypeValue) => {
    console.log("handleScheduleTypeChange called with:", newType);

    // Clear all errors before changing type
    form.clearErrors();

    const currentSchedule = form.getValues("schedule");
    const baseValues = {
      type: newType,
      timeOfDay: currentSchedule?.timeOfDay || "",
      timezone: currentSchedule?.timezone || "Asia/Kolkata",
    };

    switch (newType) {
      case "weekly":
      case "bi-weekly":
        form.setValue(
          "schedule",
          {
            ...baseValues,
            type: newType,
            dayOfWeek: [],
          },
          { shouldValidate: false, shouldDirty: true, shouldTouch: true }
        );
        break;

      case "monthly":
        form.setValue(
          "schedule",
          {
            ...baseValues,
            type: "monthly",
            dayOfMonth: 1,
          },
          { shouldValidate: false, shouldDirty: true, shouldTouch: true }
        );
        break;

      case "quarterly":
        form.setValue(
          "schedule",
          {
            ...baseValues,
            type: "quarterly",
            monthsOfYear: [],
            dayOfMonth: 1,
          },
          { shouldValidate: false, shouldDirty: true, shouldTouch: true }
        );
        break;

      case "custom":
        form.setValue(
          "schedule",
          {
            ...baseValues,
            type: "custom",
            specificDates: [],
          },
          { shouldValidate: false, shouldDirty: true, shouldTouch: true }
        );
        break;
    }

    // Force trigger watch by also setting the type field specifically
    form.setValue("schedule.type", newType, { shouldValidate: false });
  };

  const renderManualScheduleFields = () => {
    console.log(
      "renderManualScheduleFields called with scheduleType:",
      scheduleType
    );
    switch (scheduleType) {
      case "weekly":
      case "bi-weekly":
        return (
          <FormField
            control={form.control}
            name="schedule.dayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" required>
                  Select Day
                </FormLabel>
                <FormDescription className="text-xs text-gray-500">
                  Choose one day of the week to run the simulation
                </FormDescription>
                <FormControl>
                  <RadioGroup
                    value={field.value?.[0] || ""}
                    onValueChange={(value) => {
                      field.onChange([value]);
                    }}
                    disabled={isSubmitting}
                    className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2"
                  >
                    {DAYS_OF_WEEK.map((day) => (
                      <div
                        key={day.value}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={day.value}
                          id={`day-${day.value}`}
                        />
                        <FormLabel
                          htmlFor={`day-${day.value}`}
                          className="text-sm font-normal cursor-pointer"
                        >
                          {day.label}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "monthly":
        return (
          <FormField
            control={form.control}
            name="schedule.dayOfMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" required>
                  Day of Month
                </FormLabel>
                <FormDescription className="text-xs text-gray-500">
                  Enter the day of the month (1-31)
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    placeholder="e.g., 15"
                    value={field.value ?? ""}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue === "") {
                        field.onChange(undefined);
                      } else {
                        const numValue = parseInt(inputValue);
                        if (
                          !isNaN(numValue) &&
                          numValue >= 1 &&
                          numValue <= 31
                        ) {
                          field.onChange(numValue);
                        }
                      }
                    }}
                    disabled={isSubmitting}
                    className="text-base h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );

      case "quarterly":
        return (
          <>
            <FormField
              control={form.control}
              name="schedule.monthsOfYear"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" required>
                    Select Months (Max 4)
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-500">
                    Choose up to 4 months for quarterly execution
                  </FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                    {MONTHS.map((month) => (
                      <FormField
                        key={month.value}
                        control={form.control}
                        name="schedule.monthsOfYear"
                        render={({ field }) => {
                          const value =
                            (field.value as number[] | undefined) || [];
                          return (
                            <FormItem
                              key={month.value}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={value.includes(month.value)}
                                  onCheckedChange={(checked) => {
                                    const newValue = checked
                                      ? [...value, month.value]
                                      : value.filter((m) => m !== month.value);
                                    field.onChange(newValue);
                                  }}
                                  disabled={
                                    isSubmitting ||
                                    (value.length >= 4 &&
                                      !value.includes(month.value))
                                  }
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {month.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="schedule.dayOfMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" required>
                    Day of Month
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-500">
                    Enter the day of the month (1-31) for the selected quarters
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={31}
                      placeholder="e.g., 15"
                      value={field.value ?? ""}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (inputValue === "") {
                          field.onChange(undefined);
                        } else {
                          const numValue = parseInt(inputValue);
                          if (
                            !isNaN(numValue) &&
                            numValue >= 1 &&
                            numValue <= 31
                          ) {
                            field.onChange(numValue);
                          }
                        }
                      }}
                      disabled={isSubmitting}
                      className="text-base h-11"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        );

      case "custom":
        return (
          <>
            <FormField
              control={form.control}
              name="schedule.specificDates"
              render={({ field }) => {
                const selectedDates = field.value || [];
                return (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" required>
                      Select Specific Dates
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Choose multiple specific dates for the simulation
                    </FormDescription>
                    <div className="space-y-3">
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal h-11",
                                !selectedDates.length && "text-muted-foreground"
                              )}
                              disabled={isSubmitting}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {selectedDates.length > 0
                                ? `${selectedDates.length} date${selectedDates.length > 1 ? "s" : ""} selected`
                                : "Pick dates"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="multiple"
                              selected={selectedDates.map((d) => new Date(d))}
                              onSelect={(dates) => {
                                const formattedDates =
                                  dates?.map((d) => format(d, "yyyy-MM-dd")) ||
                                  [];
                                field.onChange(formattedDates);
                              }}
                              disabled={(date) => {
                                const today = new Date();
                                today.setHours(0, 0, 0, 0);
                                return date < today;
                              }}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>

                      {selectedDates.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedDates.map((date) => (
                            <Badge
                              key={date}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {format(new Date(date), "MMM dd, yyyy")}
                              <X
                                className="h-3 w-3 cursor-pointer hover:text-destructive"
                                onClick={() => {
                                  field.onChange(
                                    selectedDates.filter((d) => d !== date)
                                  );
                                }}
                              />
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Time and Timezone for Custom */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <FormField
                control={form.control}
                name="schedule.timeOfDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" required>
                      Time of Day
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      24-hour format (HH:MM)
                    </FormDescription>
                    <FormControl>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        <Input
                          {...field}
                          type="time"
                          placeholder="14:30"
                          disabled={isSubmitting}
                          className="text-base h-11 pl-10"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="schedule.timezone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" required>
                      Timezone
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Select your timezone
                    </FormDescription>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 w-full">
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {TIMEZONES.map((tz) => (
                          <SelectItem key={tz.value} value={tz.value}>
                            {tz.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-8">
        {/* Schedule Mode Selection */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Autonomous Scheduling */}
            <button
              type="button"
              onClick={() => handleScheduleModeChange("autonomous")}
              disabled={isSubmitting}
              className={cn(
                "w-full p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center gap-3",
                isAutonomous
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isAutonomous ? "bg-primary" : "bg-primary/10"
                )}
              >
                <Sparkles
                  className={cn(
                    "h-5 w-5",
                    isAutonomous ? "text-primary-foreground" : "text-primary"
                  )}
                />
              </div>
              <span className="font-medium text-left">
                Autonomous Scheduling
              </span>
            </button>

            {/* Manual Scheduling */}
            <button
              type="button"
              onClick={() => handleScheduleModeChange("manual")}
              disabled={isSubmitting}
              className={cn(
                "w-full p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center gap-3",
                !isAutonomous
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  !isAutonomous ? "bg-primary" : "bg-primary/10"
                )}
              >
                <CalendarRegular
                  className={cn(
                    "h-5 w-5",
                    !isAutonomous ? "text-primary-foreground" : "text-primary"
                  )}
                />
              </div>
              <span className="font-medium text-left">Manual Scheduling</span>
            </button>
          </div>
        </div>

        {/* Autonomous Mode Fields */}
        {isAutonomous && (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm font-medium">
                  Autonomous Scheduling Enabled
                </p>
                <p className="text-xs text-muted-foreground">
                  AI will dynamically schedule simulations within your defined
                  parameters
                </p>
              </div>
            </div>

            {/* Simulation Interval Slider */}
            <FormField
              key="simulationInterval"
              control={form.control}
              name="simulationInterval"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel className="text-sm font-medium" required>
                      Simulation Interval (Days)
                    </FormLabel>
                    <span className="text-sm font-semibold text-primary">
                      {field.value || 7} days
                    </span>
                  </div>
                  <FormDescription className="text-xs text-gray-500 mb-4">
                    Set how many days between each simulation (1-28 days)
                  </FormDescription>
                  <div>
                    <Slider
                      min={1}
                      max={28}
                      step={1}
                      value={[field.value || 7]}
                      onValueChange={field.onChange}
                      disabled={isSubmitting}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-2">
                    <span>1 day</span>
                    <span>28 days</span>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Simulation Frequency Slider */}
            <FormField
              key="simulationFrequency"
              control={form.control}
              name="simulationFrequency"
              render={({ field }) => {
                const maxFreq = simulationInterval
                  ? calculateMaxFrequency(simulationInterval)
                  : 30;

                return (
                  <FormItem>
                    <div className="flex items-center justify-between mb-2">
                      <FormLabel className="text-sm font-medium" required>
                        Simulation Frequency (Per Month)
                      </FormLabel>
                      <span className="text-sm font-semibold text-primary">
                        {field.value || 1} times
                      </span>
                    </div>
                    <FormDescription className="text-xs text-gray-500 mb-4">
                      Set how many simulations per month (max {maxFreq} based on
                      interval)
                    </FormDescription>
                    <FormControl>
                      <div>
                        <Slider
                          min={1}
                          max={maxFreq}
                          step={1}
                          value={[field.value || 1]}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                          className="w-full"
                        />
                      </div>
                    </FormControl>
                    <div className="flex justify-between text-xs text-muted-foreground mt-2">
                      <span>1 time</span>
                      <span>{maxFreq} times</span>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Campaign Timeline with Calendar */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Campaign Timeline</h4>
                <p className="text-xs text-muted-foreground">
                  Set the start and end dates for the simulation campaign
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date with Calendar */}
                <FormField
                  control={form.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium" required>
                        Start Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-11 justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={isSubmitting}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : ""
                              );
                            }}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Date with Calendar */}
                <FormField
                  control={form.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-sm font-medium" required>
                        End Date
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full h-11 justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                              disabled={isSubmitting}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? (
                                format(new Date(field.value), "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onSelect={(date) => {
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : ""
                              );
                            }}
                            disabled={(date) => {
                              const today = new Date(
                                new Date().setHours(0, 0, 0, 0)
                              );
                              const minDate = startDate
                                ? new Date(startDate)
                                : today;
                              return date < minDate;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Time Range */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Time */}
                <FormField
                  control={form.control}
                  name="startTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" required>
                        Start Time
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        Earliest time for simulations (24-hour format)
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <Input
                            {...field}
                            type="time"
                            placeholder="09:00"
                            disabled={isSubmitting}
                            className="text-base h-11 pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* End Time */}
                <FormField
                  control={form.control}
                  name="endTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium" required>
                        End Time
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        Latest time for simulations (24-hour format)
                      </FormDescription>
                      <FormControl>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                          <Input
                            {...field}
                            type="time"
                            placeholder="17:00"
                            disabled={isSubmitting}
                            className="text-base h-11 pl-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Timezone */}
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" required>
                    Timezone
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-500">
                    Select your timezone for scheduling
                  </FormDescription>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TIMEZONES.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Timeline Summary for Autonomous */}
            {startDate &&
              endDate &&
              simulationInterval &&
              simulationFrequency && (
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="text-sm font-medium mb-2">Campaign Summary</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>
                      <span className="font-medium text-foreground">
                        Duration:
                      </span>{" "}
                      {format(new Date(startDate), "MMM dd, yyyy")} -{" "}
                      {format(new Date(endDate), "MMM dd, yyyy")}
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Interval:
                      </span>{" "}
                      {simulationInterval} days between simulations
                    </p>
                    <p>
                      <span className="font-medium text-foreground">
                        Frequency:
                      </span>{" "}
                      {simulationFrequency} simulations per month
                    </p>
                    <p className="mt-2 pt-2 border-t">
                      <span className="font-medium text-foreground">
                        Estimated Total:
                      </span>{" "}
                      {(() => {
                        const start = new Date(startDate);
                        const end = new Date(endDate);
                        const totalDays = Math.ceil(
                          (end.getTime() - start.getTime()) /
                            (1000 * 60 * 60 * 24)
                        );
                        const months = totalDays / 30;
                        const estimatedTotal = Math.round(
                          simulationFrequency * months
                        );
                        return `~${estimatedTotal} simulations`;
                      })()}
                    </p>
                  </div>
                </div>
              )}
          </div>
        )}

        {/* Manual Mode Fields */}
        {!isAutonomous && (
          <>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="schedule.type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" required>
                      Schedule Type
                    </FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={(value) => {
                        handleScheduleTypeChange(value as ScheduleTypeValue);
                      }}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger className="h-11 w-full">
                          <SelectValue placeholder="Select schedule type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="custom">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Type-Specific Fields */}
            {scheduleType && (
              <div className="border-t border-gray-200 pt-6 space-y-6">
                {renderManualScheduleFields()}
              </div>
            )}

            {/* Time and Timezone */}
            {scheduleType && scheduleType !== "custom" && (
              <div className="border-t border-gray-200 pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="schedule.timeOfDay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium" required>
                          Time of Day
                        </FormLabel>
                        <FormDescription className="text-xs text-gray-500">
                          24-hour format (HH:MM)
                        </FormDescription>
                        <FormControl>
                          <div className="relative">
                            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                            <Input
                              {...field}
                              type="time"
                              placeholder="14:30"
                              disabled={isSubmitting}
                              className="text-base h-11 pl-10"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="schedule.timezone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium" required>
                          Timezone
                        </FormLabel>
                        <FormDescription className="text-xs text-gray-500">
                          Select your timezone
                        </FormDescription>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          disabled={isSubmitting}
                        >
                          <FormControl>
                            <SelectTrigger className="h-11 w-full">
                              <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {TIMEZONES.map((tz) => (
                              <SelectItem key={tz.value} value={tz.value}>
                                {tz.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Form>
  );
};
