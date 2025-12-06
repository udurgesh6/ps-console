import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  color,
  bgColor,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  color?: string;
  bgColor?: string;
}) => {
  return (
    <Card className="py-3 md:py-6 border-0 shadow-sm rounded-3xl">
      <CardContent className="p-6 py-2 border-0">
        <div className="flex items-left justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: bgColor || 'rgba(0, 0, 0, 0.05)' }}
            >
              <Icon className="h-6 w-6" style={{ color: color || 'currentColor' }} />
            </div>
            <span className="text-sm font-medium text-gray-600">{label}</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {/* <p className="text-xs mt-1 text-gray-500">{description}</p> */}
      </CardContent>
    </Card>
  );
};
