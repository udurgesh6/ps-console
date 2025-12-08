"use client";

import {
  convertScheduleFormToAPI,
  DAY_OF_WEEK_MAP,
  DayOfWeek,
  SimulationProfile,
  SimulationProfileAttackVectorsFormData,
  simulationProfileAttackVectorsSchema,
  SimulationProfileBasicInfoFormData,
  SimulationProfileScheduleFormData,
  simulationProfileScheduleSchema,
  simulationProfileBasicInfoSchema,
  simulationProfileTargetSelectionSchema,
  SimulationProfileTargetSelectionFormData,
  CreateSimulationProfileRequest,
  UpdateSimulationProfileRequest,
} from "@/types";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { Story } from "@/components/shared/story";
import { InfoIcon, UsersIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SimulationProfileBasicInfoStep } from "./_components/basic-info-step";
import { SimulationProfileTargetSelectionStep } from "./_components/target-selection-form";
import { SimulationProfileAttackVectorsStep } from "./_components/attack-vector-selection-form";
import { SimulationProfileScheduleStep } from "./_components/schedule-form";
import {
  useGetSimulationProfileById,
  useCreateSimulationProfile,
  useUpdateSimulationProfile,
} from "@/hooks";
import toast from "react-hot-toast";

interface SimulationPageProps {
  params: Promise<{ id: string }>;
}

export default function SimulationPage({ params }: SimulationPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [currentStepId, setCurrentStepId] = useState("basic-info");

  // Determine if this is a new simulation or editing existing one
  const isNewSimulation = id === "new";

  // Fetch existing simulation if editing
  const {
    data: simulation,
    isLoading: isLoadingSimulation,
    isError,
  } = useGetSimulationProfileById(id);

  // Mutations
  const createMutation = useCreateSimulationProfile();
  const updateMutation = useUpdateSimulationProfile();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  useEffect(() => {
    if (!isNewSimulation && isError) {
      toast.error("Simulation profile not found");
      router.push("/dashboard/simulations");
    }
  }, [isError, router, isNewSimulation]);

  // Form initialization
  const basicSimulationProfileForm =
    useForm<SimulationProfileBasicInfoFormData>({
      resolver: zodResolver(simulationProfileBasicInfoSchema),
      defaultValues: {
        name: "",
        description: "",
        category: undefined,
      },
      mode: "onTouched",
      reValidateMode: "onChange",
      shouldFocusError: false,
    });

  const targetSelectionForm =
    useForm<SimulationProfileTargetSelectionFormData>({
      resolver: zodResolver(simulationProfileTargetSelectionSchema),
      defaultValues: {
        employeeGroupIds: [],
      },
      mode: "onTouched",
      reValidateMode: "onChange",
      shouldFocusError: false,
    });

  const attackVectorSelectionForm =
    useForm<SimulationProfileAttackVectorsFormData>({
      resolver: zodResolver(simulationProfileAttackVectorsSchema),
      defaultValues: {
        attackVectorIds: [],
      },
      mode: "onTouched",
      reValidateMode: "onChange",
      shouldFocusError: false,
    });

  const scheduleForm = useForm<SimulationProfileScheduleFormData>({
    resolver: zodResolver(simulationProfileScheduleSchema),
    defaultValues: {
      isAutonomous: true,
      minSimulationInterval: 1,
      maxSimulationFrequency: 7,
      timezone: "Asia/Kolkata",
      startDate: "",
      endDate: "",
      startTime: "09:00",
      endTime: "17:00",
    } as SimulationProfileScheduleFormData,
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

  // Populate forms when simulation data is loaded
  useEffect(() => {
    if (simulation && !isNewSimulation) {
      // Basic Info
      basicSimulationProfileForm.reset({
        name: simulation.name || "",
        description: simulation.description || "",
        category: simulation.categoryId || undefined,
      });

      // Target Selection
      targetSelectionForm.reset({
        employeeGroupIds: simulation.employeeGroupIds || [],
      });

      // Attack Vectors
      attackVectorSelectionForm.reset({
        attackVectorIds: simulation.attackVectorIds || [],
      });

      // Schedule - determine if autonomous or scheduled mode
      const isAutonomous = !simulation.scheduleType;

      if (isAutonomous) {
        // Autonomous mode
        scheduleForm.reset({
          isAutonomous: true,
          minSimulationInterval: simulation.minSimulationInterval || 1,
          maxSimulationFrequency: simulation.maxSimulationFrequency || 7,
          timezone: "Asia/Kolkata", // You might want to store this
          startDate: simulation.startDate
            ? new Date(simulation.startDate).toISOString().split("T")[0]
            : "",
          endDate: simulation.endDate
            ? new Date(simulation.endDate).toISOString().split("T")[0]
            : "",
          startTime: simulation.startDate
            ? new Date(simulation.startDate).toTimeString().slice(0, 5)
            : "09:00",
          endTime: simulation.endDate
            ? new Date(simulation.endDate).toTimeString().slice(0, 5)
            : "17:00",
        } as SimulationProfileScheduleFormData);
      } else {
        // Scheduled mode
        const scheduleType = simulation.scheduleType!;
        let scheduleData: SimulationProfileScheduleFormData;

        if (scheduleType === "weekly" || scheduleType === "bi-weekly") {
          scheduleData = {
            isAutonomous: false,
            scheduleType,
            dayOfWeek: simulation.launchPreference
              ? [
                  Object.entries(DAY_OF_WEEK_MAP).find(
                    ([_, v]) => v === simulation.launchPreference
                  )?.[0] as DayOfWeek,
                ]
              : [],
            timezone: "Asia/Kolkata",
            startDate: simulation.startDate
              ? new Date(simulation.startDate).toISOString().split("T")[0]
              : "",
            endDate: simulation.endDate
              ? new Date(simulation.endDate).toISOString().split("T")[0]
              : "",
            startTime: simulation.startDate
              ? new Date(simulation.startDate).toTimeString().slice(0, 5)
              : "09:00",
            endTime: simulation.endDate
              ? new Date(simulation.endDate).toTimeString().slice(0, 5)
              : "17:00",
          } as SimulationProfileScheduleFormData;
        } else if (scheduleType === "monthly") {
          scheduleData = {
            isAutonomous: false,
            scheduleType,
            dayOfMonth: simulation.launchPreference || 1,
            timezone: "Asia/Kolkata",
            startDate: simulation.startDate
              ? new Date(simulation.startDate).toISOString().split("T")[0]
              : "",
            endDate: simulation.endDate
              ? new Date(simulation.endDate).toISOString().split("T")[0]
              : "",
            startTime: simulation.startDate
              ? new Date(simulation.startDate).toTimeString().slice(0, 5)
              : "09:00",
            endTime: simulation.endDate
              ? new Date(simulation.endDate).toTimeString().slice(0, 5)
              : "17:00",
          } as SimulationProfileScheduleFormData;
        } else {
          // custom
          scheduleData = {
            isAutonomous: false,
            scheduleType,
            specificDates: simulation.launchDates
              ? simulation.launchDates.map(
                  (ts) => new Date(ts).toISOString().split("T")[0]
                )
              : [],
            timezone: "Asia/Kolkata",
            startDate: simulation.startDate
              ? new Date(simulation.startDate).toISOString().split("T")[0]
              : "",
            endDate: simulation.endDate
              ? new Date(simulation.endDate).toISOString().split("T")[0]
              : "",
            startTime: simulation.startDate
              ? new Date(simulation.startDate).toTimeString().slice(0, 5)
              : "09:00",
            endTime: simulation.endDate
              ? new Date(simulation.endDate).toTimeString().slice(0, 5)
              : "17:00",
          } as SimulationProfileScheduleFormData;
        }

        scheduleForm.reset(scheduleData);
      }
    }
  }, [
    simulation,
    isNewSimulation,
    basicSimulationProfileForm,
    targetSelectionForm,
    attackVectorSelectionForm,
    scheduleForm,
  ]);

  const simulationSteps = [
    {
      id: "basic-info",
      icon: <InfoIcon className="h-5 w-5" />,
      title: "Define Core Strategy",
      description:
        "Set the foundation for your simulation: name, description, and category.",
      content: (
        <SimulationProfileBasicInfoStep
          form={basicSimulationProfileForm}
          isSubmitting={isSubmitting}
        />
      ),
      validation: () => basicSimulationProfileForm.formState.isValid,
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
          isSubmitting={isSubmitting}
        />
      ),
      validation: () => targetSelectionForm.formState.isValid,
    },
    {
      id: "attack-vector-selection",
      icon: <UsersIcon className="h-5 w-5" />,
      title: "Select Attack Vectors",
      description:
        "Choose attack vectors to include in this simulation profile.",
      content: (
        <SimulationProfileAttackVectorsStep
          form={attackVectorSelectionForm}
          isSubmitting={isSubmitting}
        />
      ),
      validation: () => attackVectorSelectionForm.formState.isValid,
    },
    {
      id: "schedule",
      icon: <UsersIcon className="h-5 w-5" />,
      title: "Select Schedule",
      description: "Choose a schedule for this simulation profile.",
      content: (
        <SimulationProfileScheduleStep
          form={scheduleForm}
          isSubmitting={isSubmitting}
        />
      ),
      validation: () => scheduleForm.formState.isValid,
    },
  ];

  const handleComplete = async () => {
    try {
      // Combine all form data
      const basicInfo = basicSimulationProfileForm.getValues();
      const targetSelection = targetSelectionForm.getValues();
      const attackVectors = attackVectorSelectionForm.getValues();
      const schedule = scheduleForm.getValues();

      // Convert schedule data to API format
      const scheduleAPIData = convertScheduleFormToAPI(
        schedule,
        schedule.timezone
      );

      const requestData:
        | CreateSimulationProfileRequest
        | UpdateSimulationProfileRequest = {
        name: basicInfo.name,
        description: basicInfo.description,
        categoryId: basicInfo.category,
        employeeGroupIds: targetSelection.employeeGroupIds,
        attackVectorIds: attackVectors.attackVectorIds,
        ...scheduleAPIData,
      };

      if (isNewSimulation) {
        await createMutation.mutateAsync(requestData);
        toast.success("Simulation profile created successfully");
      } else {
        await updateMutation.mutateAsync({
          id,
          data: { ...requestData, id },
        });
        toast.success("Simulation profile updated successfully");
      }

      router.push("/dashboard/simulations");
    } catch (error) {
      toast.error(
        isNewSimulation
          ? "Failed to create simulation profile"
          : "Failed to update simulation profile"
      );
      console.error("Error saving simulation profile:", error);
    }
  };

  const handleStepChange = (stepId: string) => {
    setCurrentStepId(stepId);
  };

  if (isLoadingSimulation && !isNewSimulation) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <Story
      title={isNewSimulation ? "Create Simulation" : "Edit Simulation"}
      steps={simulationSteps}
      currentStepId={currentStepId}
      showFlow={true}
      showProgress={true}
      allowStepNavigation={true}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
      isNextProcessing={isSubmitting}
    />
  );
}
