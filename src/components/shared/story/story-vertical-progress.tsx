
import React from "react";
import { Check } from "lucide-react";

interface Step {
  id: string;
  title: string;
  description?: string;
  isCompleted?: boolean;
}

interface StoryVerticalProgressProps {
  steps: Step[];
  currentStepId: string;
  onStepClick?: (stepId: string) => void;
  allowNavigation?: boolean;
  className?: string;
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

export const StoryVerticalProgress: React.FC<StoryVerticalProgressProps> = ({
  steps,
  currentStepId,
  onStepClick,
  allowNavigation = false,
  className,
}) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  return (
    <div className={cn("w-64 bg-white rounded-xl p-6", className)}>
      <div className="relative">
        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex || step.isCompleted;
          const isActive = step.id === currentStepId;
          const isClickable = allowNavigation && onStepClick && (isCompleted || index <= currentStepIndex);

          return (
            <div key={step.id} className="relative pb-8 last:pb-0">
              {/* Vertical Connector Line - Behind circles */}
              {index < steps.length - 1 && (
                <div className="absolute left-4 top-8 bottom-0 w-0.5 -translate-x-1/2">
                  <div
                    className={cn(
                      "w-full h-full transition-colors duration-300",
                      index < currentStepIndex ? "bg-black" : "bg-gray-200"
                    )}
                  />
                </div>
              )}

              <div className="relative flex items-start">
                <div
                  className={cn(
                    "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 flex-shrink-0",
                    isCompleted
                      ? "bg-black border-black text-white"
                      : isActive
                      ? "bg-black border-black text-white"
                      : "bg-white border-gray-300 text-gray-500",
                    isClickable && "cursor-pointer hover:border-black hover:scale-110"
                  )}
                  onClick={() => isClickable && onStepClick(step.id)}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4" strokeWidth={3} />
                  ) : (
                    <span className="text-sm font-semibold">{index + 1}</span>
                  )}
                </div>

                <div className="ml-4 flex-1 min-w-0">
                  <div
                    className={cn(
                      "text-sm font-semibold transition-colors duration-300",
                      isActive
                        ? "text-black"
                        : isCompleted
                        ? "text-black"
                        : "text-gray-500",
                      isClickable && "cursor-pointer hover:text-black"
                    )}
                    onClick={() => isClickable && onStepClick(step.id)}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-gray-500 mt-1 leading-4">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};