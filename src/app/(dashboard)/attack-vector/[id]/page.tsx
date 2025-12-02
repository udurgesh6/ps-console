"use client";

import { useEffect, useState, useMemo } from "react";
import { Story } from "@/components/shared/story";
import { use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { BasicInfoStep } from "./_components/attack-vector-steps/basic-info-step";
import { EmailTemplateEditor } from "./_components/attack-vector-steps/email-template-editor";
import { LandingPageSelector } from "./_components/attack-vector-steps/landing-page-selector";
import { splitEmail } from "@/helpers/split-email";
import { FormSelector } from "./_components/attack-vector-steps/form-selector";
import { TimelineSelector } from "./_components/attack-vector-steps/timeline-selector";
import {
  CalendarIcon,
  FileIcon,
  GlobeIcon,
  InfoIcon,
  MailIcon,
} from "lucide-react";
import { CourseSelector } from "./_components/attack-vector-steps/course-selector";
import {
  useGetAttackVectorById,
  useCreateAttackVector,
  useUpdateAttackVector,
  useGetAttackVectorFilters,
} from "@/hooks";
import {
  AttackVectorBasicInfoFormData,
  attackVectorBasicInfoSchema,
  AttackVectorCoursesFormData,
  attackVectorCoursesSchema,
  AttackVectorEmailTemplateFormData,
  attackVectorEmailTemplateSchema,
  AttackVectorFormsFormData,
  attackVectorFormsSchema,
  AttackVectorLandingPageFormData,
  attackVectorLandingPageSchema,
  AttackVectorTimelineFormData,
  attackVectorTimelineSchema,
  CreateAttackVectorRequest,
  FilterObject,
} from "@/types";

interface AttackVectorPageProps {
  params: Promise<{ id: string }>;
}

export default function AttackVectorPage({ params }: AttackVectorPageProps) {
  const router = useRouter();

  const { id } = use(params);
  const isNewVector = id === "new";

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
  } = useGetAttackVectorFilters();

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

  const attackVectorCategories = (attackVectorFilters?.filters?.find(
    (filter) => filter.name === "category"
  )?.options ?? []) as FilterObject[];

  const attackVectorCategoriesWithSubcategories = attackVectorCategories.map(
    (category) => ({
      categoryId: category.id,
      categoryName: category.name,
      subcategories: category.options as FilterObject[],
    })
  );

  const [htmlError, setHtmlError] = useState("");
  const [currentStepId, setCurrentStepId] = useState("basic-info");
  const [isNextProcessing, setIsNextProcessing] = useState(false);

  const { prefix, domain } = useMemo(() => {
    if (attackVectorData?.emailTemplate?.senderEmail) {
      return splitEmail(attackVectorData.emailTemplate.senderEmail);
    }
    return { prefix: "", domain: "" };
  }, [attackVectorData?.emailTemplate?.senderEmail]);

  useEffect(() => {
    if (!isNewVector && !attackVectorData) {
      router.push("/attack-vector");
    }
  }, [attackVectorData, router, isNewVector]);

  const basicAttackVectorForm = useForm<AttackVectorBasicInfoFormData>({
    resolver: zodResolver(attackVectorBasicInfoSchema),
    defaultValues: {
      name: attackVectorData?.name || "dsds",
      description: attackVectorData?.description || "fdwfwfwwf fdwfwfsdv",
      category:
        attackVectorCategories.find(
          (cat) => cat.id === attackVectorData?.categoryId
        )?.name || "phishing",
      subCategory:
        attackVectorCategoriesWithSubcategories
          .find((cat) => cat.categoryId === attackVectorData?.categoryId)
          ?.subcategories.find(
            (subCat: FilterObject) =>
              subCat.id === attackVectorData?.subcategoryId
          )?.name || "email",
      type: attackVectorData?.type || "submission",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const emailHtmlTemplateForm = useForm<AttackVectorEmailTemplateFormData>({
    resolver: zodResolver(attackVectorEmailTemplateSchema),
    defaultValues: {
      ...(attackVectorData?.emailTemplate?.id && {
        id: attackVectorData.emailTemplate.id,
      }),
      htmlContent: attackVectorData?.emailTemplate?.htmlBody || "",
      subject: attackVectorData?.emailTemplate?.subject || "",
      emailPrefix: prefix,
      emailFromDomain: domain,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const landingPageSelectorForm = useForm<AttackVectorLandingPageFormData>({
    resolver: zodResolver(attackVectorLandingPageSchema),
    defaultValues: {
      landingPages: attackVectorData?.landingPage
        ? [attackVectorData.landingPage]
        : [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const formSelectorForm = useForm<AttackVectorFormsFormData>({
    resolver: zodResolver(attackVectorFormsSchema),
    defaultValues: {
      forms: attackVectorData?.form ? [attackVectorData.form] : [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const coursesSelectorForm = useForm<AttackVectorCoursesFormData>({
    resolver: zodResolver(attackVectorCoursesSchema),
    defaultValues: {
      courses: attackVectorData?.courses ? attackVectorData.courses : [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const timelineSelectorForm = useForm<AttackVectorTimelineFormData>({
    resolver: zodResolver(attackVectorTimelineSchema),
    defaultValues: {
      tropicality: attackVectorData?.tropicality || "custom",
      startDate: attackVectorData?.startDate
        ? new Date(attackVectorData.startDate).toISOString().split("T")[0]
        : "",
      startTime: attackVectorData?.startDate
        ? new Date(attackVectorData.startDate).toTimeString().slice(0, 5)
        : "",
      endDate: attackVectorData?.endDate
        ? new Date(attackVectorData.endDate).toISOString().split("T")[0]
        : "",
      endTime: attackVectorData?.endDate
        ? new Date(attackVectorData.endDate).toTimeString().slice(0, 5)
        : "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const attackVectorSteps = [
    {
      id: "basic-info",
      icon: <InfoIcon className="h-5 w-5" />,
      title: "Define Core Strategy",
      description:
        "Set the foundation for your vector: name, objective, and category.",
      content: (
        <BasicInfoStep
          form={basicAttackVectorForm}
          isSubmitting={isNextProcessing}
        />
      ),
      validation: () => {
        const isValid = basicAttackVectorForm.formState.isValid;
        return isValid;
      },
    },
    {
      id: "emails",
      icon: <MailIcon className="h-5 w-5" />,
      title: "Craft Phishing Email",
      description:
        "Design the template your targets will see, including subject line and body content.",
      content: (
        <EmailTemplateEditor
          form={emailHtmlTemplateForm}
          isSubmitting={isNextProcessing}
          htmlError={htmlError}
          setHtmlError={setHtmlError}
        />
      ),
      validation: () =>
        emailHtmlTemplateForm.formState.isValid && htmlError === "",
    },
    ...(basicAttackVectorForm.watch("type") === "submission"
      ? [
          {
            id: "forms",
            icon: <FileIcon className="h-5 w-5" />,
            title: "Configure Data Capture",
            description:
              "Select or create a form to collect credentials or information from the target.",
            content: <FormSelector form={formSelectorForm} />,
            validation: () => formSelectorForm.formState.isValid,
          },
        ]
      : []),
    // {
    //   id: "landing-pages",
    //   icon: <GlobeIcon className="h-5 w-5" />,
    //   title: "Select Target Page",
    //   description:
    //     "Choose or build the landing page that hosts the form or delivers the payload.",
    //   content: <LandingPageSelector form={landingPageSelectorForm} />,
    //   validation: () => landingPageSelectorForm.formState.isValid,
    // },
    {
      id: "courses",
      icon: <GlobeIcon className="h-5 w-5" />,
      title: "Select Courses",
      description:
        "Select the courses that will be associated with this attack vector.",
      content: <CourseSelector form={coursesSelectorForm} />,
      validation: () => coursesSelectorForm.formState.isValid,
    },
    {
      id: "timeline",
      icon: <CalendarIcon className="h-5 w-5" />,
      title: "Season",
      description:
        "Choose a seasonal theme or set a custom timeline for when this attack vector will be active.",
      content: <TimelineSelector form={timelineSelectorForm} />,
      validation: () => timelineSelectorForm.formState.isValid,
    },
  ];

  const handleStepChange = async (stepId: string) => {
    setCurrentStepId(stepId);
  };

  const handleComplete = async () => {
    setIsNextProcessing(true);
    try {
      const basicInfoData = basicAttackVectorForm.getValues();
      const emailHtmlTemplateData = emailHtmlTemplateForm.getValues();
      const landingPageData = landingPageSelectorForm.getValues();
      const formData = formSelectorForm.getValues();
      const coursesData = coursesSelectorForm.getValues();
      const timelineData = timelineSelectorForm.getValues();

      const category = attackVectorCategories.find(
        (cat) => cat.name === basicInfoData.category
      );
      const subcategory = attackVectorCategoriesWithSubcategories
        .find((cat) => cat.categoryName === basicInfoData.category)
        ?.subcategories.find(
          (subCat: FilterObject) => subCat.name === basicInfoData.subCategory
        );

      const startDateTime =
        timelineData.tropicality === "custom" &&
        timelineData.startDate &&
        timelineData.startTime
          ? new Date(
              `${timelineData.startDate}T${timelineData.startTime}`
            ).getTime()
          : undefined;

      const endDateTime =
        timelineData.tropicality === "custom" &&
        timelineData.endDate &&
        timelineData.endTime
          ? new Date(
              `${timelineData.endDate}T${timelineData.endTime}`
            ).getTime()
          : undefined;

      const requestData: CreateAttackVectorRequest = {
        name: basicInfoData.name,
        description: basicInfoData.description,
        categoryId: category?.id || "",
        subcategoryId: subcategory?.id || "",
        landingPageId: landingPageData.landingPages[0]?.id,
        emailTemplateId: emailHtmlTemplateData.id,
        ...(basicInfoData.type === "submission" && {
          formsId: formData.forms.map((form) => form.id),
        }),
        courseIds: coursesData.courses.map((course) => course.id),
        startDate: startDateTime,
        endDate: endDateTime,
      };

      if (isNewVector) {
        await createMutation.mutateAsync(requestData);
      } else {
        await updateMutation.mutateAsync({
          id,
          data: { ...requestData, id },
        });
      }

      router.push("/attack-vector");
    } catch (error) {
      console.error("Failed to save attack vector:", error);
    } finally {
      setIsNextProcessing(false);
    }
  };

  if (error) {
    console.error("Error loading data:", error);
  }

  return (
    <Story
      title={isNewVector ? "Create Attack Vector" : "Edit Attack Vector"}
      steps={attackVectorSteps}
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
