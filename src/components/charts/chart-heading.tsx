import { LucideIcon } from "lucide-react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { COLOR_SCHEMES } from "@/constants/colors";

export const ChartHeading = ({ 
  title, 
  icon: Icon, 
  color = COLOR_SCHEMES.status.info.main
}: { 
  title: string; 
  icon: LucideIcon; 
  color?: string;
}) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Icon className="h-5 w-5" style={{ color }} />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
  );
};
