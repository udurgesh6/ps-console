import { Progress } from "../ui/progress";
import { cn } from "@/lib/utils";

export const ProgressItem = ({
  label,
  value,
  description,
  className,
}: {
  label: string;
  value: number;
  description?: string;
  className?: string;
}) => (
  <div className={cn(className)}>
    <div className="flex justify-between text-sm mb-2">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <Progress value={value} className="h-2" />
    {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
  </div>
);
