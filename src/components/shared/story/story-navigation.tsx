import { memo, FC } from "react";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { StoryNavigationProps } from "./types";

const StoryNavigationComponent: FC<StoryNavigationProps> = ({
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
    <div className={cn("bg-white border-t border-gray-200 px-4 lg:px-6 py-3 lg:py-4 rounded-b-3xl", className)}>
      <div className="flex items-center justify-between rounded-b-3xl gap-2">
        {/* Previous Button */}
        <div>
          <Button
            variant="outline"
            onClick={onPrevious}
            className="flex items-center gap-1 lg:gap-2 text-sm lg:text-base px-3 lg:px-4"
            disabled={isFirstStep}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </Button>
        </div>

        {/* Step Info */}
        <div className="text-xs lg:text-sm text-gray-500">
          Step {steps.findIndex(s => s.id === currentStep.id) + 1} of {steps.length}
        </div>

        {/* Next/Complete Button */}
        <div>
          <Button
            onClick={handleNext}
            disabled={!canProceed || isNextProcessing}
            className="flex items-center gap-1 lg:gap-2 bg-primary text-primary-foreground hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm lg:text-base px-3 lg:px-4"
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

export const StoryNavigation = memo(StoryNavigationComponent);
