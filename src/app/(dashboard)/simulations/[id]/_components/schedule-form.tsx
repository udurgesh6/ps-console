import { FC } from "react";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  CalendarIcon,
  X,
  Clock,
  Sparkles,
  Calendar as CalendarRegular,
} from "lucide-react";
import { format } from "date-fns";
import { SimulationProfileScheduleFormData } from "@/types";
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

export const SimulationProfileScheduleStep: FC<
  SimulationProfileScheduleStepProps
> = ({ form, isSubmitting = false }) => {
  const isAutonomous = form.watch("isAutonomous");
  const scheduleType = form.watch("scheduleType");
  const startDate = form.watch("startDate");

  const handleModeChange = (autonomous: boolean) => {
    form.clearErrors();

    if (autonomous) {
      // Autonomous mode - reset the entire form with autonomous defaults
      form.reset({
        isAutonomous: true,
        minimumSimulationInterval: 1,
        maximumSimulationInterval: 7,
        timezone: form.getValues("timezone") || "Asia/Kolkata",
        startDate: form.getValues("startDate") || "",
        endDate: form.getValues("endDate") || "",
        startTime: form.getValues("startTime") || "09:00",
        endTime: form.getValues("endTime") || "17:00",
      } as SimulationProfileScheduleFormData);
    } else {
      // Scheduled mode - reset with scheduled defaults
      form.reset({
        isAutonomous: false,
        scheduleType: "weekly",
        dayOfWeek: [],
        timezone: form.getValues("timezone") || "Asia/Kolkata",
        startDate: form.getValues("startDate") || "",
        endDate: form.getValues("endDate") || "",
        startTime: form.getValues("startTime") || "09:00",
        endTime: form.getValues("endTime") || "17:00",
      } as SimulationProfileScheduleFormData);
    }
  };

  const handleScheduleTypeChange = (
    newType: "weekly" | "bi-weekly" | "monthly" | "custom"
  ) => {
    form.clearErrors();

    const currentValues = form.getValues();

    // Reset type-specific fields based on new schedule type
    switch (newType) {
      case "weekly":
      case "bi-weekly":
        form.reset(
          {
            isAutonomous: false,
            scheduleType: newType,
            dayOfWeek: [],
            timezone: currentValues.timezone,
            startDate: currentValues.startDate,
            endDate: currentValues.endDate,
            startTime: currentValues.startTime,
            endTime: currentValues.endTime,
          } as SimulationProfileScheduleFormData,
          {
            keepErrors: false,
            keepDirty: false,
          }
        );
        break;

      case "monthly":
        form.reset(
          {
            isAutonomous: false,
            scheduleType: newType,
            dayOfMonth: 1,
            timezone: currentValues.timezone,
            startDate: currentValues.startDate,
            endDate: currentValues.endDate,
            startTime: currentValues.startTime,
            endTime: currentValues.endTime,
          } as SimulationProfileScheduleFormData,
          {
            keepErrors: false,
            keepDirty: false,
          }
        );
        break;

      case "custom":
        form.reset(
          {
            isAutonomous: false,
            scheduleType: newType,
            specificDates: [],
            timezone: currentValues.timezone,
            startDate: currentValues.startDate,
            endDate: currentValues.endDate,
            startTime: currentValues.startTime,
            endTime: currentValues.endTime,
          } as SimulationProfileScheduleFormData,
          {
            keepErrors: false,
            keepDirty: false,
          }
        );
        break;
    }
  };

  const renderScheduleTypeFields = () => {
    switch (scheduleType) {
      case "weekly":
      case "bi-weekly":
        return (
          <FormField
            control={form.control}
            name="dayOfWeek"
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
            name="dayOfMonth"
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

      case "custom":
        return (
          <FormField
            control={form.control}
            name="specificDates"
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
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <div className="space-y-8">
        {/* Mode Selection */}
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium mb-1">Scheduling Mode</h4>
            <p className="text-xs text-muted-foreground">
              Choose between AI-powered autonomous scheduling or fixed schedule
              patterns
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Autonomous Mode */}
            <button
              type="button"
              onClick={() => handleModeChange(true)}
              disabled={isSubmitting}
              className={cn(
                "w-full p-4 border-2 rounded-lg transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-start gap-3 text-left",
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
              <div className="flex-1">
                <p className="font-medium text-sm mb-1">Autonomous Mode</p>
                <p className="text-xs text-muted-foreground">
                  AI dynamically schedules simulations within defined intervals
                </p>
              </div>
            </button>

            {/* Scheduled Mode */}
            <button
              type="button"
              onClick={() => handleModeChange(false)}
              disabled={isSubmitting}
              className={cn(
                "w-full p-4 border-2 rounded-lg transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-start gap-3 text-left",
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
              <div className="flex-1">
                <p className="font-medium text-sm mb-1">Scheduled Mode</p>
                <p className="text-xs text-muted-foreground">
                  Set fixed patterns like weekly, monthly, or custom dates
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* Autonomous Mode Fields */}
        {isAutonomous && (
          <div className="space-y-6">
            {/* Simulation Intervals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="minimumSimulationInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" required>
                      Minimum Simulation Interval (Days)
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Minimum days between simulations (1-365)
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={365}
                        placeholder="e.g., 7"
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
                              numValue <= 365
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

              <FormField
                control={form.control}
                name="maximumSimulationInterval"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" required>
                      Maximum Simulation Interval (Days)
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Maximum days between simulations (1-365)
                    </FormDescription>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        max={365}
                        placeholder="e.g., 30"
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
                              numValue <= 365
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
            </div>
          </div>
        )}

        {/* Scheduled Mode Fields */}
        {!isAutonomous && (
          <div className="space-y-6">
            {/* Schedule Type Selection */}
            <FormField
              control={form.control}
              name="scheduleType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" required>
                    Schedule Type
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-500">
                    Choose how frequently simulations should run
                  </FormDescription>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      handleScheduleTypeChange(
                        value as "weekly" | "bi-weekly" | "monthly" | "custom"
                      );
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
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type-Specific Fields */}
            {scheduleType && (
              <div className="space-y-6">{renderScheduleTypeFields()}</div>
            )}
          </div>
        )}

        {/* Common Fields for Both Modes */}
        {(isAutonomous || scheduleType) && (
          <>
            {/* Timezone Selection */}
            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" required>
                    Timezone
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-500">
                    Select timezone for scheduling (dates and times will be
                    converted to UTC)
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

            {/* Campaign Timeline */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-1">Campaign Timeline</h4>
                <p className="text-xs text-muted-foreground">
                  Set the start and end dates for the simulation campaign
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Start Date */}
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

                {/* End Date */}
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
              <div>
                <h4 className="text-sm font-medium mb-1">Time Window</h4>
                <p className="text-xs text-muted-foreground">
                  Define the time range when simulations can be launched
                </p>
              </div>
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
          </>
        )}
      </div>
    </Form>
  );
};
