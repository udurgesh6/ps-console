"use client";

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
  isNextProcessing,
}) => {
  const [internalCurrentStepId, setInternalCurrentStepId] =
    useState(currentStepId);

  const activeStepId = currentStepId || internalCurrentStepId;
  
  const currentStep = useMemo(
    () => steps.find((step) => step.id === activeStepId) || steps[0],
    [steps, activeStepId]
  );

  const currentStepIndex = useMemo(
    () => steps.findIndex((step) => step.id === activeStepId),
    [steps, activeStepId]
  );

  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Calculate which steps are valid
  const stepValidationStatus = useMemo(() => {
    const status: Record<string, boolean> = {};
    
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      status[step.id] = step.validation ? step.validation() : true;
    }
    
    return status;
  }, [steps]);

  // Check if all steps up to a certain index are valid
  const areAllPreviousStepsValid = useCallback(
    (targetIndex: number) => {
      for (let i = 0; i < targetIndex; i++) {
        if (!stepValidationStatus[steps[i].id]) {
          return false;
        }
      }
      return true;
    },
    [steps, stepValidationStatus]
  );

  // Current step validation
  const canProceed = useMemo(() => {
    if (!currentStep) {
      return false;
    }
    return stepValidationStatus[currentStep.id];
  }, [currentStep, stepValidationStatus]);

  // Check if a step can be navigated to
  const canNavigateToStep = useCallback(
    (stepId: string, stepIndex: number) => {
      // Can't navigate if navigation is disabled
      if (!allowStepNavigation) return false;

      // Can always go back to completed steps
      if (stepIndex < currentStepIndex) return true;

      // Can navigate to the next step only if current step is valid
      if (stepIndex === currentStepIndex + 1) {
        return stepValidationStatus[steps[currentStepIndex].id];
      }

      // Can navigate to future steps only if all previous steps are valid
      if (stepIndex > currentStepIndex) {
        return areAllPreviousStepsValid(stepIndex);
      }

      return false;
    },
    [
      allowStepNavigation,
      currentStepIndex,
      stepValidationStatus,
      steps,
      areAllPreviousStepsValid,
    ]
  );

  const handleStepChange = useCallback(
    (stepId: string) => {
      if (onStepChange) {
        onStepChange(stepId);
      } else {
        setInternalCurrentStepId(stepId);
      }
    },
    [onStepChange]
  );

  const handleNext = useCallback(() => {
    if (currentStepIndex < steps.length - 1 && canProceed) {
      const nextStep = steps[currentStepIndex + 1];
      handleStepChange(nextStep.id);
    }
  }, [currentStepIndex, steps, handleStepChange, canProceed]);

  const handlePrevious = useCallback(() => {
    if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      handleStepChange(prevStep.id);
    }
  }, [currentStepIndex, steps, handleStepChange]);

  const handleComplete = useCallback(() => {
    if (onComplete) {
      const storyData = steps.reduce(
        (acc, step) => {
          acc[step.id] = {
            title: step.title,
            isCompleted: step.isCompleted || step.id === activeStepId,
          };
          return acc;
        },
        {} as Record<string, unknown>
      );

      onComplete(storyData);
    }
  }, [onComplete, steps, activeStepId]);

  const StoryContent_Component = useMemo(() => (
    <div
      className={cn(
        "relative border border-gray-200 shadow-lg rounded-3xl flex flex-col lg:flex-row bg-white min-h-[calc(100vh-9rem)] max-h-[calc(100vh-8rem)]",
        className
      )}
    >
      {showFlow && (
        <StoryVerticalProgress
          steps={steps}
          currentStepId={activeStepId}
          onStepClick={handleStepChange}
          allowNavigation={allowStepNavigation}
          canNavigateToStep={canNavigateToStep}
          stepValidationStatus={stepValidationStatus}
        />
      )}

      <div className="py-4 lg:py-6 px-4 lg:pr-6 flex-1 min-w-0">
        <div className="flex flex-col border border-gray-200 rounded-xl h-full">
          {title && !showProgress && (
            <div className="bg-white border-b border-gray-200 px-4 lg:px-6 py-3 lg:py-4">
              <h1 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h1>
            </div>
          )}

          <div className="flex-1 rounded-3xl overflow-y-auto pb-10">
            {currentStep && (
              <StoryContent
                key={currentStep.id}
                step={currentStep}
                isActive={true}
              />
            )}
          </div>

          <div className="sticky bottom-0 z-10 mt-auto">
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
  ), [
    className,
    showFlow,
    steps,
    activeStepId,
    allowStepNavigation,
    handleStepChange,
    title,
    showProgress,
    currentStep,
    handleNext,
    handlePrevious,
    handleComplete,
    isFirstStep,
    isLastStep,
    canProceed,
    isNextProcessing,
    canNavigateToStep,
    stepValidationStatus,
  ]);

  if (showInModal) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent
          showCloseButton={true}
          className={cn("max-w-7xl sm:max-w-7xl h-[90vh] p-0", modalClassName)}
          onEscapeKeyDown={onCancel}
        >
          <VisuallyHidden>
            <DialogTitle>{title || "Story Dialog"}</DialogTitle>
          </VisuallyHidden>
          {StoryContent_Component}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <div className="min-h-0 flex-1">
      {StoryContent_Component}
    </div>
  );
};
