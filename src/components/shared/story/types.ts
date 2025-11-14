import { ReactNode } from "react";

export interface StoryStep {
  id: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  isCompleted?: boolean;
  isActive?: boolean;
  isDisabled?: boolean;
  content: ReactNode;
  validation?: () => boolean;
}

export interface StoryFlowItem {
  id: string;
  title: string;
  icon?: ReactNode;
  isActive?: boolean;
  isCompleted?: boolean;
  position: {
    x: number;
    y: number;
  };
  connections?: string[]; // IDs of connected items
}

export interface StoryProps {
  title?: string;
  steps: StoryStep[];
  currentStepId: string;
  showInModal?: boolean;
  isOpen?: boolean;
  showFlow?: boolean;
  showProgress?: boolean;
  allowStepNavigation?: boolean;
  onStepChange?: (stepId: string) => void;
  onComplete?: (data: Record<string, unknown>) => void;
  onClose?: () => void;
  onCancel?: () => void;
  className?: string;
  modalClassName?: string;
  isNextProcessing?: boolean;
}

export interface StoryProgressProps {
  steps: StoryStep[];
  currentStepId: string;
  onStepClick?: (stepId: string) => void;
  allowNavigation?: boolean;
  className?: string;
}

export interface StoryFlowProps {
  items: StoryFlowItem[];
  currentStepId: string;
  className?: string;
}

export interface StoryVerticalProgressProps {
  steps: StoryStep[];
  currentStepId: string;
  onStepClick?: (stepId: string) => void;
  allowNavigation?: boolean;
  className?: string;
}

export interface StoryContentProps {
  step: StoryStep;
  isActive: boolean;
  className?: string;
}

export interface StoryNavigationProps {
  currentStep: StoryStep;
  steps: StoryStep[];
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
  canProceed: boolean;
  className?: string;
  isNextProcessing?: boolean;
}
