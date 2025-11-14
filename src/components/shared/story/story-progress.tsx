import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoryProgressProps } from "./types";

export const StoryProgress: React.FC<StoryProgressProps> = ({
  steps,
  currentStepId,
  onStepClick,
  allowNavigation = false,
  className,
}) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  return (
    <div className={cn("w-full bg-white border-b border-gray-200", className)}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex || step.isCompleted;
            const isActive = step.id === currentStepId;
            const isClickable = allowNavigation && onStepClick && (isCompleted || index <= currentStepIndex);

            return (
              <React.Fragment key={step.id}>
                <div className="flex items-center">
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200",
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "bg-blue-500 border-blue-500 text-white"
                        : "bg-white border-gray-300 text-gray-400",
                      isClickable && "cursor-pointer hover:border-blue-400"
                    )}
                    onClick={() => isClickable && onStepClick(step.id)}
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{index + 1}</span>
                    )}
                  </div>

                  {/* Step Label */}
                  <div className="ml-3">
                    <div
                      className={cn(
                        "text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-500",
                        isClickable && "cursor-pointer hover:text-blue-600"
                      )}
                      onClick={() => isClickable && onStepClick(step.id)}
                    >
                      {step.title}
                    </div>
                    {step.description && (
                      <div className="text-xs text-gray-400 mt-1">
                        {step.description}
                      </div>
                    )}
                  </div>
                </div>

                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 mx-4">
                    <div
                      className={cn(
                        "h-0.5 transition-colors duration-200",
                        index < currentStepIndex
                          ? "bg-green-500"
                          : "bg-gray-200"
                      )}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};
