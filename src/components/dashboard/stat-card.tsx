import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

export const StatCard = ({
  icon: Icon,
  value,
  label,
  // theme,
  description,
}: {
  icon: LucideIcon;
  value: string;
  label: string;
  // theme: "blue" | "amber" | "red" | "green"; 
  description: string;
}) => {
  // const themeColor = {
  //   blue: {
  //     main: "from-blue-50 to-blue-100 border-blue-200",
  //     label: "text-blue-600",
  //     icon: "text-blue-600",
  //     value: "text-blue-900",
  //     description: "text-blue-600",
  //   },
  //   amber: {
  //     main: "from-amber-50 to-amber-100 border-amber-200",
  //     label: "text-amber-600",
  //     icon: "text-amber-600",
  //     value: "text-amber-900",
  //     description: "text-amber-600",
  //   },
  //   red: {
  //     main: "from-red-50 to-red-100 border-red-200",
  //     label: "text-red-600",
  //     icon: "text-red-600",
  //     value: "text-red-900",
  //     description: "text-red-600",
  //   },
  //   green: {
  //     main: "from-green-50 to-green-100 border-green-200",
  //     label: "text-green-700",
  //     icon: "text-green-600",
  //     value: "text-green-900",
  //     description: "text-green-600",
  //   },
  // }[theme];
  return (
    // <Card className={cn("bg-gradient-to-br", themeColor.main)}>
    //   <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //     <CardTitle className={cn("text-sm font-medium", themeColor.label)}>{label}</CardTitle>
    //     <Icon className={cn("h-4 w-4", themeColor.icon)} />
    //   </CardHeader>
    //   <CardContent>
    //     <div className={cn("text-2xl font-bold", themeColor.value)}>{value}</div>
    //     <p className={cn("text-xs mt-1", themeColor.description)}>{description}</p>
    //   </CardContent>
    // </Card>
    <Card className={`py-3 md:py-6 border-0 shadow-0`}>
      <CardContent className="p-6 py-2 border-0">
        <div className="flex items-left justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Icon className={`h-6 w-6`} />
            <span className="text-sm font-medium text-gray-600">{label}</span>
          </div>
        </div>
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <p className="text-xs mt-1">{description}</p>
      </CardContent>
    </Card>
  );
};
