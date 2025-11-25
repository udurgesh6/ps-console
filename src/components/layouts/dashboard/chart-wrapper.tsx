import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { COLOR_SCHEMES } from "@/constants/colors";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface ChartWrapperProps {
  mainClassname?: string;
  contentClassname?:string;
  iconColor?: string;
  icon: LucideIcon;
  title: string;
  children: ReactNode;
}

export const ChartWrapper = ({
  mainClassname,
  contentClassname,
  iconColor = COLOR_SCHEMES.status.info.main,
  icon: Icon,
  title,
  children,
}: ChartWrapperProps) => {
  return (
    <Card
      className={cn(
        "rounded-xl md:rounded-3xl shadow-md py-4 md:py-8",
        mainClassname
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Icon className="h-5 w-5" style={{ color: iconColor }} />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className={cn("", contentClassname)}>{children}</CardContent>
    </Card>
  );
};
