"use client";

import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { SimulationProfile } from "@/types/simulation-profile";
import { Calendar, Users, Zap, Clock, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";

export const SimulationProfileItem = (
  item: SimulationProfile,
  isSelected: boolean,
  isSelectEnabled: boolean
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
      "high-priority": "bg-red-100 text-red-800 border-red-200",
      "department-specific": "bg-blue-100 text-blue-800 border-blue-200",
      technical: "bg-purple-100 text-purple-800 border-purple-200",
      "organization-wide": "bg-green-100 text-green-800 border-green-200",
      "customer-facing": "bg-orange-100 text-orange-800 border-orange-200",
      onboarding: "bg-teal-100 text-teal-800 border-teal-200",
      "remote-workers": "bg-indigo-100 text-indigo-800 border-indigo-200",
      seasonal: "bg-pink-100 text-pink-800 border-pink-200",
      compliance: "bg-yellow-100 text-yellow-800 border-yellow-200",
    };
    return colors[category] || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getIntervalDisplay = (interval: string) => {
    const displays: Record<string, string> = {
      daily: "Daily",
      weekly: "Weekly",
      "bi-weekly": "Bi-weekly",
      monthly: "Monthly",
      quarterly: "Quarterly",
      custom: "Custom",
    };
    return displays[interval] || interval;
  };

  const onProfileClick = () => {
    if (isSelectEnabled) {
      return;
    }
    router.push(`/simulations/${item.id}`);
  };

  return (
    <Card
      onClick={onProfileClick}
      className={`cursor-pointer py-0 relative rounded-lg transition-all hover:shadow-md group overflow-hidden ${
        isSelected ? "border-2 border-primary" : "border-2 border-gray-100"
      }`}
    >
      {!isSelectEnabled && (
        <Button
          onClick={onToggleStatus}
          className="absolute cursor-pointer top-3 p-1 right-3 z-20 rounded-full bg-background/80 hover:bg-background shadow-sm transition-colors"
          aria-label={item.isActive ? "Pause Simulation" : "Start Simulation"}
        >
          {item.isActive ? (
            <Pause
              fill="currentColor"
              className="h-4 w-4 text-primary cursor-pointer"
            />
          ) : (
            <Play
              fill="currentColor"
              className="h-4 w-4 text-primary cursor-pointer"
            />
          )}
        </Button>
      )}

      {!isSelected && (
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pointer-events-none rounded-lg" />
      )}

      <div className="p-5 space-y-2">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-1">
            <h3 className="font-semibold text-base line-clamp-1 flex-1 pr-10">
              {item.name}
            </h3>
          </div>
        </div>

        <div className="flex flex-row gap-2 mb-4">
          <span
            className={`text-xs px-2.5 truncate rounded-full border ${getCategoryColor(item.category)} flex-shrink-0`}
          >
            {item.category
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </span>

          <span
            className={`text-xs px-2.5 truncate rounded-full border ${getStatusColor(item?.isActive || false)} flex-shrink-0`}
          >
            {item.isActive ? "Active" : "Inactive"}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 my-6">
          <div className="flex flex-row items-center gap-1">
            <div className="p-1.5 rounded bg-primary/5 flex-shrink-0 rounded-full">
              <Clock className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground truncate">
                {item.simulationFrequency}x/month
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className="p-1.5 rounded bg-primary/5 flex-shrink-0 rounded-full">
              <Calendar className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground truncate">
                {getIntervalDisplay(item.simulationInterval)}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className="p-1.5 rounded bg-primary/5 flex-shrink-0 rounded-full">
              <Users className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground truncate">
                {item.employeeGroups.length}{" "}
                {item.employeeGroups.length === 1 ? "group" : "groups"}
              </p>
            </div>
          </div>

          <div className="flex flex-row items-center gap-1">
            <div className="p-1.5 rounded bg-primary/5 flex-shrink-0 rounded-full">
              <Zap className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground truncate">
                {item.attackVectors.length}{" "}
                {item.attackVectors.length === 1 ? "vector" : "vectors"}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-gray-500">
              {item.schedule.type === "weekly" &&
                item.schedule.dayOfWeek?.length && (
                  <>
                    Every{" "}
                    {item.schedule.dayOfWeek
                      .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
                      .join(", ")}
                  </>
                )}
              {item.schedule.type === "monthly" && item.schedule.dayOfMonth && (
                <>Day {item.schedule.dayOfMonth} of month</>
              )}
              {item.schedule.type === "quarterly" && <>Quarterly</>}
              {item.schedule.type === "bi-weekly" &&
                item.schedule.dayOfWeek?.length && (
                  <>
                    Bi-weekly{" "}
                    {item.schedule.dayOfWeek
                      .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
                      .join(", ")}
                  </>
                )}
              {item.schedule.type === "custom" && <>Custom schedule</>}
            </span>
            <span className="text-gray-500">@ {item.schedule.timeOfDay}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
