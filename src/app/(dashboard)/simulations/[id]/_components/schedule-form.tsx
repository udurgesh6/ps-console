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
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
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

export const SimulationProfileScheduleStep: FC<
  SimulationProfileScheduleStepProps
> = ({ form, isSubmitting = false }) => {
  const scheduleType = form.watch("type");

  const handleScheduleTypeChange = (newType: ScheduleTypeValue) => {
    const baseValues = {
      type: newType,
      timeOfDay: form.getValues("timeOfDay") || "",
      timezone: form.getValues("timezone") || "",
    };

    switch (newType) {
      case "weekly":
      case "bi-weekly":
        form.reset({
          ...baseValues,
          dayOfWeek: [],
        } as SimulationProfileScheduleFormData);
        break;

      case "monthly":
        form.reset({
          ...baseValues,
          dayOfMonth: 1,
        } as SimulationProfileScheduleFormData);
        break;

      case "quarterly":
        form.reset({
          ...baseValues,
          monthsOfYear: [],
          dayOfMonth: 1,
        } as SimulationProfileScheduleFormData);
        break;

      case "custom":
        form.reset({
          ...baseValues,
          dayOfWeek: [],
          specificDates: [],
        } as SimulationProfileScheduleFormData);
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
            render={() => (
              <FormItem>
                <FormLabel className="text-sm font-medium" required>
                  Select Days
                </FormLabel>
                <FormDescription className="text-xs text-gray-500">
                  Choose which days of the week to run the simulation
                </FormDescription>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                  {DAYS_OF_WEEK.map((day) => (
                    <FormField
                      key={day.value}
                      control={form.control}
                      name="dayOfWeek"
                      render={({ field }) => {
                        const value = field.value as string[] | undefined;
                        return (
                          <FormItem
                            key={day.value}
                            className="flex items-center space-x-2 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={value?.includes(day.value)}
                                onCheckedChange={(checked) => {
                                  const currentValue = value || [];
                                  const newValue = checked
                                    ? [...currentValue, day.value]
                                    : currentValue.filter(
                                        (d) => d !== day.value
                                      );
                                  field.onChange(newValue);
                                }}
                                disabled={isSubmitting}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">
                              {day.label}
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
                  Select the day of the month (1-31)
                </FormDescription>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={31}
                    placeholder="e.g., 15"
                    value={field.value || ""}
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 1)
                    }
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
              name="monthsOfYear"
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
                        name="monthsOfYear"
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
              name="dayOfMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium" required>
                    Day of Month
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-500">
                    Select the day of the month (1-31)
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="number"
                      min={1}
                      max={31}
                      placeholder="e.g., 15"
                      value={field.value || ""}
                      onChange={(e) =>
                        field.onChange(parseInt(e.target.value) || 1)
                      }
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
              name="dayOfWeek"
              render={() => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Select Days (Optional)
                  </FormLabel>
                  <FormDescription className="text-xs text-gray-500">
                    Choose recurring days of the week
                  </FormDescription>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2">
                    {DAYS_OF_WEEK.map((day) => (
                      <FormField
                        key={day.value}
                        control={form.control}
                        name="dayOfWeek"
                        render={({ field }) => {
                          const value = field.value as string[] | undefined;
                          return (
                            <FormItem
                              key={day.value}
                              className="flex items-center space-x-2 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={value?.includes(day.value)}
                                  onCheckedChange={(checked) => {
                                    const currentValue = value || [];
                                    const newValue = checked
                                      ? [...currentValue, day.value]
                                      : currentValue.filter(
                                          (d) => d !== day.value
                                        );
                                    field.onChange(newValue);
                                  }}
                                  disabled={isSubmitting}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal cursor-pointer">
                                {day.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <div className="border-t border-gray-200 pt-6">
              <FormField
                control={form.control}
                name="specificDates"
                render={({ field }) => {
                  const selectedDates = field.value || [];
                  return (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Specific Dates (Optional)
                      </FormLabel>
                      <FormDescription className="text-xs text-gray-500">
                        Select specific dates for the simulation
                      </FormDescription>
                      <div className="space-y-3">
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
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>

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
        {/* Schedule Type Selection */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" required>
                  Schedule Type
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={handleScheduleTypeChange}
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
            {renderScheduleTypeFields()}
          </div>
        )}

        {/* Time and Timezone */}
        {scheduleType && (
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="timeOfDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium" required>
                      Time of Day
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      24-hour format (HH:MM)
                    </FormDescription>
                    <FormControl>
                      <Input
                        {...field}
                        type="time"
                        placeholder="14:30"
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
                name="timezone"
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
      </div>
    </Form>
  );
};
