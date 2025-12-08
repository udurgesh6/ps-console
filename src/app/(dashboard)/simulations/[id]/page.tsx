"use client";

import dummySimulationProfiles from "@/constants/temporary/simulation-profiles";
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
} from "@/types";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useEffect, useState } from "react";
import { Story } from "@/components/shared/story";
import { InfoIcon, UsersIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simulationProfileBasicInfoSchema } from "@/types";
import { SimulationProfileBasicInfoStep } from "./_components/basic-info-step";
import { SimulationProfileTargetSelectionStep } from "./_components/target-selection-form";
import { simulationProfileTargetSelectionSchema } from "@/types";
import { SimulationProfileTargetSelectionFormData } from "@/types";
// import { groups } from "@/constants/temporary/groups";
import { SimulationProfileAttackVectorsStep } from "./_components/attack-vector-selection-form";
import { SimulationProfileScheduleStep } from "./_components/schedule-form";

interface SimulationPageProps {
  params: Promise<{ id: string }>;
}

export default function SimulationPage({ params }: SimulationPageProps) {
  const router = useRouter();
  const { id } = use(params);

  const [currentStepId, setCurrentStepId] = useState("basic-info");
  const [isNextProcessing] = useState(false);

  // Determine if this is a new simulation or editing existing one
  const isNewSimulation = id === "new";

  // Find existing simulation if editing
  const [simulation] = useState<SimulationProfile | null>(() => {
    if (isNewSimulation) return null;
    return (
      dummySimulationProfiles?.find((simulation) => simulation.id === id) ||
      null
    );
  });

  useEffect(() => {
    if (!isNewSimulation && !simulation) {
      router.push("/dashboard/simulations");
    }
  }, [simulation, router, isNewSimulation]);

  const basicSimulationProfileForm =
    useForm<SimulationProfileBasicInfoFormData>({
      resolver: zodResolver(simulationProfileBasicInfoSchema),
      defaultValues: {
        name: simulation?.name || "",
        description: simulation?.description || "",
        category: simulation?.categoryId || undefined,
        // simulationFrequency: simulation?.simulationFrequency || 15,
        // simulationInterval: simulation?.simulationInterval || "monthly",
      },
      mode: "onTouched",
      reValidateMode: "onChange",
      shouldFocusError: false,
    });

  const targetSelectionForm = useForm<SimulationProfileTargetSelectionFormData>(
    {
      resolver: zodResolver(simulationProfileTargetSelectionSchema),
      defaultValues: {
        employeeGroupIds: simulation?.employeeGroupIds || [],
      },
      mode: "onTouched",
      reValidateMode: "onChange",
      shouldFocusError: false,
    }
  );

  const attackVectorSelectionForm =
    useForm<SimulationProfileAttackVectorsFormData>({
      resolver: zodResolver(simulationProfileAttackVectorsSchema),
      defaultValues: {
        attackVectorIds: simulation?.attackVectorIds || [],
      },
      mode: "onTouched",
      reValidateMode: "onChange",
      shouldFocusError: false,
    });

  console.log(attackVectorSelectionForm);

  const scheduleForm = useForm<SimulationProfileScheduleFormData>({
    resolver: zodResolver(simulationProfileScheduleSchema),
    defaultValues: {
      scheduleType: simulation?.scheduleType || "weekly",
      minimumSimulationInterval: simulation?.minimumSimulationInterval || 1,
      maximumSimulationInterval: simulation?.maximumSimulationInterval || 7,
      startDate: simulation?.startDate
        ? new Date(simulation.startDate).toISOString().split("T")[0]
        : "",
      endDate: simulation?.endDate
        ? new Date(simulation.endDate).toISOString().split("T")[0]
        : "",
      startTime: simulation?.startDate
        ? new Date(simulation.startDate).toTimeString().slice(0, 5)
        : "09:00",
      endTime: simulation?.endDate
        ? new Date(simulation.endDate).toTimeString().slice(0, 5)
        : "17:00",
      // Type-specific defaults
      ...(simulation?.scheduleType === "weekly" ||
      simulation?.scheduleType === "bi-weekly"
        ? {
            dayOfWeek: simulation.launchPreference
              ? [
                  Object.entries(DAY_OF_WEEK_MAP).find(
                    ([_, v]) => v === simulation.launchPreference
                  )?.[0] as DayOfWeek,
                ]
              : [],
          }
        : {}),
      ...(simulation?.scheduleType === "monthly"
        ? {
            dayOfMonth: simulation.launchPreference || 1,
          }
        : {}),
      ...(simulation?.scheduleType === "custom"
        ? {
            specificDates: simulation.launchDates
              ? simulation.launchDates.map(
                  (ts) => new Date(ts).toISOString().split("T")[0]
                )
              : [],
          }
        : {}),
    } as SimulationProfileScheduleFormData,
    mode: "onTouched",
    reValidateMode: "onChange",
    shouldFocusError: false,
  });

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
          isSubmitting={isNextProcessing}
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
          isSubmitting={isNextProcessing}
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
          isSubmitting={isNextProcessing}
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
          isSubmitting={isNextProcessing}
        />
      ),
      validation: () => scheduleForm.formState.isValid,
    },
  ];

  const handleComplete = (data: Record<string, unknown>) => {
    // Combine all form data
    const basicInfo = basicSimulationProfileForm.getValues();
    const targetSelection = targetSelectionForm.getValues();
    const attackVectors = attackVectorSelectionForm.getValues();
    const schedule = scheduleForm.getValues();

    // Convert schedule data to API format
    const scheduleAPIData = convertScheduleFormToAPI(schedule);

    const completeData: Partial<SimulationProfile> = {
      name: basicInfo.name,
      description: basicInfo.description,
      categoryId: basicInfo.category,
      employeeGroupIds: targetSelection.employeeGroupIds,
      attackVectorIds: attackVectors.attackVectorIds,
      ...scheduleAPIData,
    };

    console.log(
      `${isNewSimulation ? "Created" : "Updated"} simulation with data:`,
      completeData
    );

    // TODO: Make API call here
    // await createSimulation(completeData);

    router.push("/simulations");
  };

  const handleStepChange = (stepId: string) => {
    setCurrentStepId(stepId);
  };

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
      isNextProcessing={isNextProcessing}
    />
  );
}
