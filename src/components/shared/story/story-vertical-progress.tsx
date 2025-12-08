import React, { memo } from "react";
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
  canNavigateToStep?: (stepId: string, stepIndex: number) => boolean;
  stepValidationStatus?: Record<string, boolean>;
  className?: string;
}

const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

const StoryVerticalProgressComponent: React.FC<StoryVerticalProgressProps> = ({
  steps,
  currentStepId,
  onStepClick,
  allowNavigation = false,
  canNavigateToStep,
  stepValidationStatus = {},
  className,
}) => {
  const currentStepIndex = steps.findIndex(step => step.id === currentStepId);

  // Find the last valid step index
  const lastValidStepIndex = React.useMemo(() => {
    let lastValid = -1;
    for (let i = 0; i <= currentStepIndex; i++) {
      if (stepValidationStatus[steps[i].id]) {
        lastValid = i;
      } else {
        break;
      }
    }
    return lastValid;
  }, [steps, currentStepIndex, stepValidationStatus]);

  return (
    <div className={cn(
      "w-full lg:w-64 bg-white rounded-t-3xl lg:rounded-l-3xl lg:rounded-tr-none p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-gray-200",
      className
    )}>
      <div className="relative">
        {/* Mobile: Horizontal layout with connectors */}
        <div className="flex lg:hidden overflow-x-auto gap-0 pb-2">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex || step.isCompleted;
            const isActive = step.id === currentStepId;
            const isClickable = allowNavigation && onStepClick && canNavigateToStep?.(step.id, index);
            const shouldShowConnector = index <= lastValidStepIndex && index < steps.length - 1;

            return (
              <div key={step.id} className="flex items-center">
                {/* Step Circle and Label */}
                <div className="flex flex-col items-center min-w-[80px] px-2">
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 flex-shrink-0",
                      isCompleted || isActive
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-white border-gray-300 text-gray-500",
                      isClickable && "cursor-pointer hover:border-primary hover:scale-110",
                      !isClickable && allowNavigation && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => isClickable && onStepClick(step.id)}
                  >
                    {isCompleted ? (
                      <Check className="w-5 h-5" strokeWidth={3} />
                    ) : (
                      <span className="text-sm font-semibold">{index + 1}</span>
                    )}
                  </div>
                  <div
                    className={cn(
                      "text-xs font-medium text-center mt-2 transition-colors duration-300 line-clamp-2",
                      isActive
                        ? "text-primary"
                        : isCompleted
                        ? "text-foreground"
                        : "text-gray-500",
                      isClickable && "cursor-pointer hover:text-primary"
                    )}
                    onClick={() => isClickable && onStepClick(step.id)}
                  >
                    {step.title}
                  </div>
                </div>

                {/* Horizontal Connector Line */}
                {index < steps.length - 1 && (
                  <div className="flex-shrink-0 w-8 h-0.5 mb-12">
                    <div
                      className={cn(
                        "w-full h-full transition-colors duration-300",
                        shouldShowConnector && index < currentStepIndex
                          ? "bg-primary"
                          : "bg-gray-200"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: Vertical layout */}
        <div className="hidden lg:block">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex || step.isCompleted;
            const isActive = step.id === currentStepId;
            const isClickable = allowNavigation && onStepClick && canNavigateToStep?.(step.id, index);
            const shouldShowConnector = index <= lastValidStepIndex && index < steps.length - 1;

            return (
              <div key={step.id} className="relative pb-8 last:pb-0">
                {/* Vertical Connector Line - Only show up to last valid step */}
                {index < steps.length - 1 && (
                  <div className="absolute left-4 top-8 bottom-0 w-0.5 -translate-x-1/2">
                    <div
                      className={cn(
                        "w-full h-full transition-colors duration-300",
                        shouldShowConnector && index < currentStepIndex
                          ? "bg-primary"
                          : "bg-gray-200"
                      )}
                    />
                  </div>
                )}

                <div className="relative flex items-start">
                  <div
                    className={cn(
                      "relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-300 flex-shrink-0",
                      isCompleted || isActive
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-white border-gray-300 text-gray-500",
                      isClickable && "cursor-pointer hover:border-primary hover:scale-110",
                      !isClickable && allowNavigation && "opacity-50 cursor-not-allowed"
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
                          ? "text-primary"
                          : isCompleted
                          ? "text-foreground"
                          : "text-gray-500",
                        isClickable && "cursor-pointer hover:text-primary",
                        !isClickable && allowNavigation && "opacity-50"
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
    </div>
  );
};

export const StoryVerticalProgress = memo(StoryVerticalProgressComponent);
