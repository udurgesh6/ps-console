"use client";

import { useEffect, useState, use } from "react";
import {
  useCreateAttackVector,
  useGetAttackVectorById,
  useGetAttackVectorFilters,
  useUpdateAttackVector,
} from "@/hooks";
import {
  AttackVectorCoursesFormData,
  attackVectorCoursesSchema,
  AttackVectorVishingAgentSelectionFormData,
  attackVectorVishingAgentSelectionSchema,
  AttackVectorVishingBasicInfoFormData,
  attackVectorVishingBasicInfoSchema,
  AttackVectorVishingCourseSelectionFormData,
  attackVectorVishingCourseSelectionSchema,
  CreateAttackVectorRequest,
  FilterObject,
  ObjectType,
  VishingLanguage,
} from "@/types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoIcon } from "lucide-react";
import { BasicInfoStep } from "./_components/vishing-steps/basic-info-step";
import { Story } from "@/components/shared/story";
import { AgentSelectionStep } from "./_components/vishing-steps/agent-selection-step";
import { CourseSelector } from "../../[id]/_components/attack-vector-steps/course-selector";

interface AttackVectorVishingPageProps {
  params: Promise<{ id: string }>;
}

export default function AttackVectorVishingPage({
  params,
}: AttackVectorVishingPageProps) {
  const router = useRouter();

  const { id } = use(params);
  const isNewVishingVector = id === "new";

  const createMutation = useCreateAttackVector();
  const updateMutation = useUpdateAttackVector();

  const {
    data: attackVectorData,
    isLoading: isAttackVectorLoading,
    error: attackVectorError,
  } = useGetAttackVectorById(id);
  const {
    data: attackVectorFilters,
    isLoading: isAttackVectorsFiltersLoading,
    error: attackVectorFiltersError,
  } = useGetAttackVectorFilters({ objectType: ObjectType.ATTACK_VECTOR });

  const isLoading =
    isAttackVectorLoading ||
    isAttackVectorsFiltersLoading ||
    createMutation.isPending ||
    updateMutation.isPending;

  const error =
    attackVectorError ||
    attackVectorFiltersError ||
    createMutation.error ||
    updateMutation.error;

  const attackVectorCategories = (attackVectorFilters?.categories ?? []) as FilterObject[];

  const attackVectorCategoriesWithSubcategories = attackVectorCategories.map(
    (category) => ({
      categoryId: category.id,
      categoryName: category.name,
      subcategories: category.options as FilterObject[],
    })
  );

  const [currentStepId, setCurrentStepId] = useState("basic-info");
  const [isNextProcessing, setIsNextProcessing] = useState(false);

  useEffect(() => {
    if (!isNewVishingVector && !attackVectorData) {
      router.push("/attack-vector/vishing");
    }
  }, [attackVectorData, router, isNewVishingVector]);

  const basicAttackVectorVishingForm =
    useForm<AttackVectorVishingBasicInfoFormData>({
      resolver: zodResolver(attackVectorVishingBasicInfoSchema),
      defaultValues: {
        name: attackVectorData?.name || "",
        description: attackVectorData?.description || "",
        category:
          attackVectorCategories.find(
            (cat) => cat.id === attackVectorData?.categoryId
          )?.name || "",
        subCategory:
          attackVectorCategoriesWithSubcategories
            .find((cat) => cat.categoryId === attackVectorData?.categoryId)
            ?.subcategories.find(
              (subCat: FilterObject) =>
                subCat.id === attackVectorData?.subcategoryId
            )?.name || "email",
        language: attackVectorData?.language || VishingLanguage.ENGLISH,
      },
      mode: "onChange",
      reValidateMode: "onChange",
    });

  const agentSelectionForm = useForm<AttackVectorVishingAgentSelectionFormData>(
    {
      resolver: zodResolver(attackVectorVishingAgentSelectionSchema),
      defaultValues: {
        agentId: attackVectorData?.agentId || "",
        variableValues: attackVectorData?.variableValues || {},
      },
      mode: "onChange",
      reValidateMode: "onChange",
    }
  );

  const courseSelectionForm = useForm<AttackVectorCoursesFormData>({
    resolver: zodResolver(attackVectorCoursesSchema),
    defaultValues: {
      courses: attackVectorData?.courses || [],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const attackVectorVishingSteps = [
    {
      id: "basic-info",
      icon: <InfoIcon className="h-5 w-5" />,
      title: "Define Core Strategy",
      description:
        "Set the foundation for your vector: name, objective, and category.",
      content: (
        <BasicInfoStep
          form={basicAttackVectorVishingForm}
          isSubmitting={isNextProcessing}
        />
      ),
      validation: () => {
        const isValid = basicAttackVectorVishingForm.formState.isValid;
        return isValid;
      },
    },
    {
      id: "agent-selection",
      icon: <InfoIcon className="h-5 w-5" />,
      title: "Select Vishing Agent",
      description:
        "Select a vishing agent for your attack vector, to start collecting data from the target.",
      content: (
        <AgentSelectionStep
          form={agentSelectionForm}
          isSubmitting={isNextProcessing}
        />
      ),
      validation: () => {
        const isValid = agentSelectionForm.formState.isValid;
        return isValid;
      },
    },
    {
      id: "course-selection",
      icon: <InfoIcon className="h-5 w-5" />,
      title: "Select Courses",
      description:
        "Select courses for your attack vector, to start collecting data from the target.",
      content: <CourseSelector form={courseSelectionForm} />,
      validation: () => {
        const isValid = courseSelectionForm.formState.isValid;
        return isValid;
      },
    },
  ];

  const handleStepChange = async (stepId: string) => {
    setCurrentStepId(stepId);
  };

  const handleComplete = async () => {
    setIsNextProcessing(true);
    try {
      const basicInfoData = basicAttackVectorVishingForm.getValues();

      const category = attackVectorCategories.find(
        (cat) => cat.name === basicInfoData.category
      );
      const subcategory = attackVectorCategoriesWithSubcategories
        .find((cat) => cat.categoryName === basicInfoData.category)
        ?.subcategories.find(
          (subCat: FilterObject) => subCat.name === basicInfoData.subCategory
        );

      const requestData: CreateAttackVectorRequest = {
        name: basicInfoData.name,
        description: basicInfoData.description,
        categoryId: category?.id || "",
        subcategoryId: subcategory?.id || "",
        language: basicInfoData.language,
      };

      if (isNewVishingVector) {
        await createMutation.mutateAsync(requestData);
      } else {
        await updateMutation.mutateAsync({
          id,
          data: { ...requestData, id },
        });
      }

      router.push("/attack-vector/vishing");
    } catch (error) {
      console.error("Error creating attack vector:", error);
    } finally {
      setIsNextProcessing(false);
    }
  };

  if (error) {
    console.error("Error loading data:", error);
  }

  return (
    <Story
      title={isNewVishingVector ? "Create Attack Vector" : "Edit Attack Vector"}
      steps={attackVectorVishingSteps}
      currentStepId={currentStepId}
      showFlow={true}
      showProgress={true}
      allowStepNavigation={true}
      onStepChange={handleStepChange}
      onComplete={handleComplete}
      isNextProcessing={isNextProcessing || isLoading}
    />
  );
}
