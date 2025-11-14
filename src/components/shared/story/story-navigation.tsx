import React from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoryNavigationProps } from "./types";

export const StoryNavigation: React.FC<StoryNavigationProps> = ({
  currentStep,
  steps,
  onNext,
  onPrevious,
  onComplete,
  isFirstStep,
  isLastStep,
  canProceed,
  className,
  isNextProcessing
}) => {
  const handleNext = () => {
    if (isLastStep && onComplete) {
      onComplete();
    } else if (onNext) {
      onNext();
    }
  };

  return (
    <div className={cn("bg-white border-t border-gray-200 px-6 py-4 rounded-b-xl", className)}>
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <div>
          { (
            <Button
              variant="outline"
              onClick={onPrevious}
              className="flex items-center gap-2"
              disabled={isFirstStep}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
          )}
        </div>

        {/* Step Info */}
        <div className="text-sm text-gray-500">
          Step {steps.findIndex(s => s.id === currentStep.id) + 1} of {steps.length}
        </div>

        {/* Next/Complete Button */}
        <div>
          <Button
            onClick={handleNext}
            disabled={!canProceed || isNextProcessing}
            className="flex items-center gap-2 bg-black text-white hover:bg-gray-800 disabled:bg-gray-300"
          >
            {isLastStep ? "Complete" : "Next"}
            {!isLastStep && <ChevronRight className="w-4 h-4" />}
            {isLastStep && <Check className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
