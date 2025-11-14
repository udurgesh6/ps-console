import React from "react";
import { cn } from "@/lib/utils";
import { StoryFlowProps } from "./types";

export const StoryFlow: React.FC<StoryFlowProps> = ({
  items,
  currentStepId,
  className,
}) => {
  return (
    <div className={cn("w-64 bg-gray-50 border-r border-gray-200 p-6", className)}>
      <div className="relative h-full">
        {/* Flow Items */}
        {items.map((item) => {
          const isActive = item.id === currentStepId;
          const isCompleted = item.isCompleted;

          return (
            <div
              key={item.id}
              className="relative mb-8 last:mb-0"
              style={{
                transform: `translate(${item.position.x}px, ${item.position.y}px)`,
              }}
            >
              {/* Flow Item */}
              <div
                className={cn(
                  "flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 bg-white",
                  isActive
                    ? "border-blue-500 shadow-md"
                    : isCompleted
                    ? "border-green-500"
                    : "border-gray-200",
                  "min-w-[120px]"
                )}
              >
                {/* Icon */}
                {item.icon && (
                  <div
                    className={cn(
                      "mb-2 p-2 rounded-full",
                      isActive
                        ? "bg-blue-100 text-blue-600"
                        : isCompleted
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-400"
                    )}
                  >
                    {item.icon}
                  </div>
                )}

                {/* Title */}
                <div
                  className={cn(
                    "text-sm font-medium text-center",
                    isActive
                      ? "text-blue-600"
                      : isCompleted
                      ? "text-green-600"
                      : "text-gray-600"
                  )}
                >
                  {item.title}
                </div>
              </div>

              {/* Connection Lines */}
              {item.connections?.map((connectionId) => {
                const connectedItem = items.find(i => i.id === connectionId);
                if (!connectedItem) return null;

                const dx = connectedItem.position.x - item.position.x;
                const dy = connectedItem.position.y - item.position.y;
                const length = Math.sqrt(dx * dx + dy * dy);
                const angle = Math.atan2(dy, dx) * (180 / Math.PI);

                return (
                  <div
                    key={connectionId}
                    className="absolute top-1/2 left-1/2 origin-left"
                    style={{
                      width: `${length}px`,
                      height: "2px",
                      transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                      backgroundColor: isCompleted ? "#10b981" : "#d1d5db",
                    }}
                  />
                );
              })}
            </div>
          );
        })}

        {/* Vertical Flow Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2 -z-10" />
      </div>
    </div>
  );
};
