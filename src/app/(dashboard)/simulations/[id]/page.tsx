"use client";

import dummySimulationProfiles from "@/constants/temporary/simulation-profiles";
import { SimulationProfile, SimulationProfileBasicInfoFormData } from "@/types";
import { useRouter } from "next/navigation";
import { use } from "react";
import { useEffect, useState } from "react";
import { Story } from "@/components/shared/story";
import { InfoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { simulationProfileBasicInfoSchema } from "@/types";
import { SimulationProfileBasicInfoStep } from "../_components/basic-info-step";

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
        category: simulation?.category || undefined,
        simulationFrequency: simulation?.simulationFrequency || 15,
        simulationInterval: simulation?.simulationInterval || "monthly",
      },
      mode: "onTouched",
      reValidateMode: "onChange",
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
  ];

  const handleComplete = (data: Record<string, unknown>) => {
    console.log(
      `${isNewSimulation ? "Created" : "Updated"} simulation with data:`,
      data
    );
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
