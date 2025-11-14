import { CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export const ChartHeading = ({ title, icon: Icon }: { title: string; icon: LucideIcon }) => {
  return (
    <CardHeader>
      <CardTitle className="flex items-center space-x-2">
        <Icon className="h-5 w-5 text-red-600" />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
  );
};
