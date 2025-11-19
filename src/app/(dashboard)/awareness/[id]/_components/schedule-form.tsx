import { UseFormReturn, Controller } from "react-hook-form";
import { Calendar } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AwarenessProfileTimelineFormData {
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
}

interface AwarenessTimelineSelectorProps {
  form: UseFormReturn<AwarenessProfileTimelineFormData>;
  isSubmitting?: boolean;
}

export const AwarenessTimelineSelector = ({
  form,
  isSubmitting = false,
}: AwarenessTimelineSelectorProps) => {
  const {
    control,
    watch,
    formState: { errors },
  } = form;

  const startDateValue = watch("startDate");
  const startTimeValue = watch("startTime");
  const endDateValue = watch("endDate");
  const endTimeValue = watch("endTime");

  return (
    <div className="space-y-8">
      <div className="space-y-4 bg-card">
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="h-4 w-4 text-primary" />
          <h4 className="text-sm font-medium">Campaign Timeline</h4>
        </div>
        <p className="text-xs text-muted-foreground">
          Set the start and end dates for your awareness campaign
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
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
          <h4 className="text-sm font-medium mb-2">Campaign Timeline Summary</h4>
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

                const parts: string[] = [];
                if (diffDays > 0)
                  parts.push(`${diffDays} day${diffDays !== 1 ? "s" : ""}`);
                if (diffHours > 0)
                  parts.push(
                    `${diffHours} hour${diffHours !== 1 ? "s" : ""}`
                  );

                return parts.join(", ") || "Less than 1 hour";
              })()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};