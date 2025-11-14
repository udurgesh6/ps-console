import { UseFormReturn, Controller } from "react-hook-form";
import { Sparkles } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AttackVectorTimelineFormData {
  tropicality: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface TimelineSelectorProps {
  form: UseFormReturn<AttackVectorTimelineFormData>;
  isSubmitting?: boolean;
}

const tropicalityOptions = [
  { value: "custom", label: "Custom Timeline" },
  { value: "appraisal", label: "Appraisal Season" },
  { value: "diwali", label: "Diwali" },
  { value: "big-billion-days", label: "Big Billion Days" },
  { value: "black-friday", label: "Black Friday" },
  { value: "cyber-monday", label: "Cyber Monday" },
  { value: "christmas", label: "Christmas" },
  { value: "new-year", label: "New Year" },
  { value: "holi", label: "Holi" },
  { value: "prime-day", label: "Prime Day" },
];

export const TimelineSelector = ({
  form,
  isSubmitting = false,
}: TimelineSelectorProps) => {
  const {
    control,
    watch,
    formState: { errors },
    setValue,
  } = form;
  const tropicalityValue = watch("tropicality");
  const startDateValue = watch("startDate");
  const startTimeValue = watch("startTime");
  const endDateValue = watch("endDate");
  const endTimeValue = watch("endTime");

  const isCustomTimeline = tropicalityValue === "custom" || !tropicalityValue;

  const handleTropicalityChange = (value: string) => {
    setValue("tropicality", value, { shouldValidate: true });

    if (value !== "custom") {
      setValue("startDate", "", { shouldValidate: true });
      setValue("startTime", "", { shouldValidate: true });
      setValue("endDate", "", { shouldValidate: true });
      setValue("endTime", "", { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-4 bg-card">
        <>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-medium">Attack Vector Theme</h4>
          </div>
          <p className="text-xs text-muted-foreground">
            Select a seasonal theme or choose &quot;Custom Timeline&quot; to set
            specific dates
          </p>
        </>

        <div className="space-y-2">
          <Controller
            control={control}
            name="tropicality"
            render={({ field }) => (
              <Select
                disabled={isSubmitting}
                value={field.value || "custom"}
                onValueChange={handleTropicalityChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a theme..." />
                </SelectTrigger>
                <SelectContent>
                  {tropicalityOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.tropicality && (
            <p className="text-sm font-medium text-destructive">
              {errors.tropicality.message}
            </p>
          )}
        </div>

        {tropicalityValue && tropicalityValue !== "custom" && (
          <div className="rounded-md bg-primary/10 border border-primary/20 p-3">
            <p className="text-sm text-primary font-medium">
              🎯{" "}
              {
                tropicalityOptions.find((opt) => opt.value === tropicalityValue)
                  ?.label
              }{" "}
              Theme Selected
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              This attack vector will use the predefined timeline for this
              seasonal event
            </p>
          </div>
        )}
      </div>

      {isCustomTimeline && (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              {/* <div className="space-y-2">
                <h4 className="text-sm font-medium">Start Date & Time</h4>
                <p className="text-xs text-muted-foreground">
                  When should this attack vector begin?
                </p>
              </div> */}

              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Start Date
                </Label>
                <Controller
                  control={control}
                  name="startDate"
                  render={({ field }) => (
                    <Input type="date" disabled={isSubmitting} {...field} />
                  )}
                />
                {errors.startDate && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.startDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Start Time
                </Label>
                <Controller
                  control={control}
                  name="startTime"
                  render={({ field }) => (
                    <Input type="time" disabled={isSubmitting} {...field} />
                  )}
                />
                <p className="text-sm text-muted-foreground">
                  Time in your local timezone
                </p>
                {errors.startTime && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.startTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              {/* <div className="space-y-2">
                <h4 className="text-sm font-medium">End Date & Time</h4>
                <p className="text-xs text-muted-foreground">
                  When should this attack vector end?
                </p>
              </div> */}

              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  End Date
                </Label>
                <Controller
                  control={control}
                  name="endDate"
                  render={({ field }) => (
                    <Input
                      type="date"
                      disabled={isSubmitting}
                      {...field}
                      min={startDateValue}
                    />
                  )}
                />
                {errors.endDate && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.endDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  End Time
                </Label>
                <Controller
                  control={control}
                  name="endTime"
                  render={({ field }) => (
                    <Input type="time" disabled={isSubmitting} {...field} />
                  )}
                />
                <p className="text-sm text-muted-foreground">
                  Time in your local timezone
                </p>
                {errors.endTime && (
                  <p className="text-sm font-medium text-destructive">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {startDateValue && startTimeValue && endDateValue && endTimeValue && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <h4 className="text-sm font-medium mb-2">Timeline Summary</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>
                  <span className="font-medium text-foreground">Start:</span>{" "}
                  {new Date(
                    `${startDateValue}T${startTimeValue}`
                  ).toLocaleString()}
                </p>
                <p>
                  <span className="font-medium text-foreground">End:</span>{" "}
                  {new Date(`${endDateValue}T${endTimeValue}`).toLocaleString()}
                </p>
                <p className="mt-2 pt-2 border-t">
                  <span className="font-medium text-foreground">Duration:</span>{" "}
                  {(() => {
                    const start = new Date(
                      `${startDateValue}T${startTimeValue}`
                    );
                    const end = new Date(`${endDateValue}T${endTimeValue}`);
                    const diffMs = end.getTime() - start.getTime();
                    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
                    const diffHours = Math.floor(
                      (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );
                    const diffMins = Math.floor(
                      (diffMs % (1000 * 60 * 60)) / (1000 * 60)
                    );

                    const parts: string[] = [];
                    if (diffDays > 0)
                      parts.push(`${diffDays} day${diffDays !== 1 ? "s" : ""}`);
                    if (diffHours > 0)
                      parts.push(
                        `${diffHours} hour${diffHours !== 1 ? "s" : ""}`
                      );
                    if (diffMins > 0)
                      parts.push(
                        `${diffMins} minute${diffMins !== 1 ? "s" : ""}`
                      );

                    return parts.join(", ") || "0 minutes";
                  })()}
                </p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
