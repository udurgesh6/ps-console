import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export const StatItem = ({
  icon: Icon,
  label,
  iconClassName,
}: {
  icon: LucideIcon;
  label: string;
  iconClassName?: string;
}) => (
  <div className="flex items-center space-x-1">
    <Icon className={cn("h-4 w-4", iconClassName)} />
    <span className="text-slate-600">{label}</span>
  </div>
);
