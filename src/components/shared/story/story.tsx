"use client"

import React, { useState, useMemo, useCallback } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";
import { cn } from "@/lib/utils";
import { StoryProps } from "./types";
import { StoryVerticalProgress } from "./story-vertical-progress";
import { StoryContent } from "./story-content";
import { StoryNavigation } from "./story-navigation";

export const Story: React.FC<StoryProps> = ({
  title,
  steps,
  currentStepId,
  showInModal = false,
  isOpen = false,
  showFlow = true,
  showProgress = true,
  allowStepNavigation = false,
  onStepChange,
  onComplete,
  onClose,
  onCancel,
  className,
  modalClassName,
  isNextProcessing
}) => {
  const [internalCurrentStepId, setInternalCurrentStepId] = useState(currentStepId);
  
  const activeStepId = currentStepId || internalCurrentStepId;
  const currentStep = useMemo(() => 
    steps.find(step => step.id === activeStepId) || steps[0], 
    [steps, activeStepId]
  );
  
  const currentStepIndex = useMemo(() => 
    steps.findIndex(step => step.id === activeStepId), 
    [steps, activeStepId]
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;
  
  const canProceed = useMemo(() => {
    if (!currentStep) return false;
    return currentStep.validation ? currentStep.validation() : true;
  }, [currentStep]);

  const handleStepChange = useCallback((stepId: string) => {
    if (onStepChange) {
      onStepChange(stepId);
    } else {
      setInternalCurrentStepId(stepId);
    }
  }, [onStepChange]);

  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      handleStepChange(nextStep.id);
    }
  }, [currentStepIndex, steps, handleStepChange]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      handleStepChange(prevStep.id);
    }
  }, [currentStepIndex, steps, handleStepChange]);

  const handleComplete = useCallback(() => {
    if (onComplete) {
      // Collect data from all steps if needed
      const storyData = steps.reduce((acc, step) => {
        acc[step.id] = {
          title: step.title,
          isCompleted: step.isCompleted || step.id === activeStepId,
        };
        return acc;
      }, {} as Record<string, unknown>);
      
      onComplete(storyData);
    }
  }, [onComplete, steps, activeStepId]);

  const StoryContent_Component = () => (
    <div className={cn("relative border border-gray-200 shadow-lg rounded-xl flex bg-white min-h-[calc(100vh-9rem)] max-h-[calc(100vh-8rem)]", className)}>
      {showFlow && (
        <StoryVerticalProgress
          steps={steps}
          currentStepId={activeStepId}
          onStepClick={allowStepNavigation ? handleStepChange : undefined}
          allowNavigation={allowStepNavigation}
        />
      )}

      {/* Main Content Area */}
      <div className="py-6 pr-6 flex-1 ">
        <div className="flex flex-col border border-gray-200 rounded-xl h-full">
         {/* Title */}
          {title && !showProgress && (
            <div className="bg-white border-b border-gray-200 px-6 py-4">
              <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
          )}

          {/* Step Content with bottom padding to avoid overlap with sticky navigation */}
          <div className="flex-1 overflow-y-auto pb-10">
            {steps.map((step) => (
              <StoryContent
                key={step.id}
                step={step}
                isActive={step.id === activeStepId}
              />
            ))}
          </div>

          {/* Sticky Navigation at bottom of content area */}
          <div className="sticky bottom-0 z-10 mt-auto ">
            <StoryNavigation
              currentStep={currentStep}
              steps={steps}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onComplete={handleComplete}
              isFirstStep={isFirstStep}
              isLastStep={isLastStep}
              canProceed={canProceed}
              isNextProcessing={isNextProcessing}
            />
          </div>
      </div>
      </div>
    </div>
  );

  if (showInModal) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          showCloseButton={true}
          className={cn(
            "max-w-7xl sm:max-w-7xl h-[90vh] p-0",
            modalClassName
          )}
          onEscapeKeyDown={onCancel}
        >
          <VisuallyHidden>
            <DialogTitle>{title || "Story Dialog"}</DialogTitle>
          </VisuallyHidden>
          <StoryContent_Component />
        </DialogContent>
      </Dialog>
    );
  }
  
  return (
    <div className="min-h-0 flex-1">
      <StoryContent_Component />
    </div>
  );
};
