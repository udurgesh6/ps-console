"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Users, Zap, TrendingUp, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

export const SimulationProfileItem = (item,
  isSelected = false,
  isSelectEnabled = false
) => {
  const router = useRouter();

  const onToggleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(
      `Toggling status for profile: ${item.name}. New status would be ${item.isActive ? "Inactive" : "Active"}.`
    );
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "high-priority": "bg-red-50 text-red-700 border-red-200",
      "department-specific": "bg-blue-50 text-blue-700 border-blue-200",
      technical: "bg-purple-50 text-purple-700 border-purple-200",
      "organization-wide": "bg-green-50 text-green-700 border-green-200",
      "customer-facing": "bg-orange-50 text-orange-700 border-orange-200",
      onboarding: "bg-teal-50 text-teal-700 border-teal-200",
      "remote-workers": "bg-indigo-50 text-indigo-700 border-indigo-200",
      seasonal: "bg-pink-50 text-pink-700 border-pink-200",
      compliance: "bg-yellow-50 text-yellow-700 border-yellow-200",
    };
    return colors[category] || "bg-gray-50 text-gray-700 border-gray-200";
  };

  // Memoize computed values to ensure consistency between server and client
  const { intervalDisplay, scheduleText, categoryName } = useMemo(() => {
    // Interval display
    let interval = "Not set";
    if (item.simulationInterval) {
      const intervalValue = item.simulationInterval;
      if (intervalValue === 1) interval = "Daily";
      else if (intervalValue === 7) interval = "Weekly";
      else if (intervalValue === 14) interval = "Bi-weekly";
      else if (intervalValue >= 28) interval = "Monthly";
      else interval = `Every ${intervalValue} days`;
    }

    // Schedule text
    let schedule = "No schedule";
    if (item.isAutonomous && item.simulationInterval) {
      schedule = `Every ${item.simulationInterval} ${item.simulationInterval === 1 ? 'day' : 'days'}`;
    } else if (item.schedule) {
      const scheduleItem = item.schedule;
      switch (scheduleItem.type) {
        case "weekly": {
          const days = scheduleItem.dayOfWeek
            .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
            .join(", ");
          schedule = `Every ${days} @ ${scheduleItem.timeOfDay}`;
          break;
        }
        case "bi-weekly": {
          const days = scheduleItem.dayOfWeek
            .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
            .join(", ");
          schedule = `Bi-weekly ${days} @ ${scheduleItem.timeOfDay}`;
          break;
        }
        case "monthly": {
          schedule = `Day ${scheduleItem.dayOfMonth} @ ${scheduleItem.timeOfDay}`;
          break;
        }
        case "quarterly": {
          schedule = `Quarterly @ ${scheduleItem.timeOfDay}`;
          break;
        }
        case "custom": {
          if (scheduleItem.dayOfWeek && scheduleItem.dayOfWeek.length > 0) {
            const days = scheduleItem.dayOfWeek
              .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
              .join(", ");
            schedule = `Custom: ${days} @ ${scheduleItem.timeOfDay}`;
          } else if (scheduleItem.specificDates && scheduleItem.specificDates.length > 0) {
            schedule = `Custom dates @ ${scheduleItem.timeOfDay}`;
          } else {
            schedule = `Custom @ ${scheduleItem.timeOfDay}`;
          }
          break;
        }
      }
    }

    // Category name
    const category = item.category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    return {
      intervalDisplay: interval,
      scheduleText: schedule,
      categoryName: category,
    };
  }, [item.simulationInterval, item.isAutonomous, item.schedule, item.category]);

  const onProfileClick = () => {
    if (isSelectEnabled) {
      return;
    }
    router.push(`/simulations/${item.id}`);
  };

  return (
    <Card
      onClick={onProfileClick}
      className={`relative py-0 overflow-hidden transition-all duration-200 hover:shadow-lg group cursor-pointer ${
        isSelected ? "ring-2 ring-primary ring-offset-2" : ""
      } ${!item.isActive ? "opacity-60" : ""}`}
    >
      {/* Status Toggle Button */}
      {!isSelectEnabled && (
        <Button
          onClick={onToggleStatus}
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-20 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm"
          aria-label={item.isActive ? "Pause Simulation" : "Start Simulation"}
        >
          {item.isActive ? (
            <Power className="h-4 w-4 text-green-600" />
          ) : (
            <Power className="h-4 w-4 text-red-600" />
          )}
        </Button>
      )}

      {/* Hover Overlay */}
      {!isSelected && (
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      )}

      <div className="p-6">
        {/* Header Section */}
        <div className="mb-4">
          <h3 className="font-semibold text-lg mb-3 line-clamp-2 pr-10 min-h-[3.5rem]">
            {item.name}
          </h3>

          {/* Category Badge */}
          <Badge
            variant="outline"
            className={`text-xs font-medium ${getCategoryColor(item.category)}`}
          >
            {categoryName}
          </Badge>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t">
          {/* Attack Vectors */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-100 mb-2">
              <Zap className="h-5 w-5 text-red-600" />
            </div>
            <p className="text-lg font-semibold">{item.attackVectors.length}</p>
            <p className="text-xs text-muted-foreground">
              {item.attackVectors.length === 1 ? "Vector" : "Vectors"}
            </p>
          </div>

          {/* Employee Groups */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 mb-2">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <p className="text-lg font-semibold">{item.employeeGroups.length}</p>
            <p className="text-xs text-muted-foreground">
              {item.employeeGroups.length === 1 ? "Group" : "Groups"}
            </p>
          </div>

          {/* Frequency */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-100 mb-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <p className="text-lg font-semibold">
              {item.simulationFrequency ? `${item.simulationFrequency}x` : "N/A"}
            </p>
            <p className="text-xs text-muted-foreground">Per Month</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="pt-4 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Interval</span>
            <span className="font-medium" suppressHydrationWarning>
              {intervalDisplay}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Schedule</span>
            <span className="font-medium text-right line-clamp-1" suppressHydrationWarning>
              {scheduleText}
            </span>
          </div>
        </div>

        {/* Status Indicator Bar */}
        <div className="mt-4 pt-3 border-t">
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full ${
                item.isActive ? "bg-green-500 animate-pulse" : "bg-gray-300"
              }`}
            />
            <span className="text-xs font-medium">
              {item.isActive ? "Active Simulation" : "Inactive Simulation"}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
