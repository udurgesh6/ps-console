"use client";

import { dummyAwarenessProfiles } from "@/constants/temporary/awareness";
import {
  AwarenessProfile,
  AwarenessProfileBasicInfoFormData,
  awarenessProfileBasicInfoSchema,
  AwarenessProfileCoursesFormData,
  awarenessProfileCoursesSchema,
  AwarenessProfileEmployeeGroupsFormData,
  AwarenessProfileTimelineFormData,
  baseAwarenessProfileTimelineSchema,
} from "@/types";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useEffect, useState } from "react";
import { Story } from "@/components/shared/story";
import { Book, Calendar, InfoIcon, UsersIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simulationProfileTargetSelectionSchema } from "@/types";
import { groups } from "@/constants/temporary/groups";
import { AwarenessProfileBasicInfoStep } from "./_components/base-info-step";
import { SimulationProfileTargetSelectionStep } from "../../simulations/[id]/_components/target-selection-form";
import { CourseSelector } from "../../attack-vector/[id]/_components/attack-vector-steps/course-selector";
import { AwarenessTimelineSelector } from "./_components/schedule-form";

interface AwarenessPageProps {
  params: Promise<{ id: string }>;
}

export default function AwarenessPage({ params }: AwarenessPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [currentStepId, setCurrentStepId] = useState("basic-info");
  const [isNextProcessing] = useState(false);

  // Determine if this is a new simulation or editing existing one
  const isNewAwareness = id === "new";

  // Find existing simulation if editing
  const [awareness] = useState<AwarenessProfile | null>(() => {
    if (isNewAwareness) return null;
    return (
      dummyAwarenessProfiles?.find((awareness) => awareness.id === id) || null
    );
  });

  useEffect(() => {
    if (!isNewAwareness && !awareness) {
      router.push("/dashboard/awareness");
    }
  }, [awareness, router, isNewAwareness]);

  const basicAwarenessProfileForm = useForm<AwarenessProfileBasicInfoFormData>({
    resolver: zodResolver(awarenessProfileBasicInfoSchema),
    defaultValues: {
      name: awareness?.name || "",
      description: awareness?.description || "",
      category: awareness?.category || undefined,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const targetSelectionForm = useForm<AwarenessProfileEmployeeGroupsFormData>({
    resolver: zodResolver(simulationProfileTargetSelectionSchema),
    defaultValues: {
      employeeGroups: awareness?.employeeGroups || [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const courseSelectionForm = useForm<AwarenessProfileCoursesFormData>({
    resolver: zodResolver(awarenessProfileCoursesSchema),
    defaultValues: {
      courses: awareness?.courses || [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  const scheduleForm = useForm<AwarenessProfileTimelineFormData>({
    resolver: zodResolver(baseAwarenessProfileTimelineSchema),
    defaultValues: {
      startDate: awareness?.startDate
        ? new Date(awareness.startDate).toISOString().split("T")[0]
        : "",
      startTime: awareness?.startDate
        ? new Date(awareness.startDate).toTimeString().slice(0, 5)
        : "",
      endDate: awareness?.endDate
        ? new Date(awareness.endDate).toISOString().split("T")[0]
        : "",
      endTime: awareness?.endDate
        ? new Date(awareness.endDate).toTimeString().slice(0, 5)
        : "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const awarenessSteps = [
    {
      id: "basic-info",
      icon: <InfoIcon className="h-5 w-5" />,
      title: "Define Core Strategy",
      description:
        "Set the foundation for your awareness profile: name, description, and category.",
      content: (
        <AwarenessProfileBasicInfoStep
          form={basicAwarenessProfileForm}
          isSubmitting={isNextProcessing}
        />
      ),
      validation: () => basicAwarenessProfileForm.formState.isValid,
    },
    {
      id: "target-selection",
      icon: <UsersIcon className="h-5 w-5" />,
      title: "Select Target Groups",
      description:
        "Choose employee groups to include in this simulation profile.",
      content: (
        <SimulationProfileTargetSelectionStep
          form={targetSelectionForm}
          isSubmitting={isNextProcessing}
          availableGroups={groups}
        />
      ),
      validation: () => targetSelectionForm.formState.isValid,
    },
    {
      id: "courses-selection",
      icon: <Book className="h-5 w-5" />,
      title: "Select Courses",
      description: "Choose courses to include in this awareness profile.",
      content: (
        <CourseSelector
          form={courseSelectionForm}
        />
      ),
      validation: () => courseSelectionForm.formState.isValid,
    },
    {
      id: "schedule",
      icon: <Calendar className="h-5 w-5" />,
      title: "Select Schedule",
      description: "Choose a schedule for this simulation profile.",
      content: (
        <AwarenessTimelineSelector
          form={scheduleForm}
          isSubmitting={isNextProcessing}
        />
      ),
      validation: () => scheduleForm.formState.isValid,
    },
  ];

  const handleComplete = (data: Record<string, unknown>) => {
    console.log(
      `${isNewAwareness ? "Created" : "Updated"} awareness profile with data:`,
      data
    );
    router.push("/awareness");
  };

  const handleStepChange = (stepId: string) => {
    setCurrentStepId(stepId);
  };

  return (
    <Story
      title={
        isNewAwareness ? "Create Awareness Profile" : "Edit Awareness Profile"
      }
      steps={awarenessSteps}
      currentStepId={currentStepId}
      showFlow={true}
      showProgress={true}
      allowStepNavigation={true}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
      isNextProcessing={isNextProcessing}
    />
  );
}
