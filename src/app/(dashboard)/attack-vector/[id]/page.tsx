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
  useHtmlValidation,
} from "@/hooks";
import {
  attackTypeMap,
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
  AttackVectorType,
  CreateAttackVectorRequest,
  FilterObject,
  ObjectType,
} from "@/types";
import { availableDomains } from "@/constants/temporary/available-domains";

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

  const attackVectorCategories = attackVectorFilters?.categories || [];

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
      name: attackVectorData?.name || "Amazon Attack",
      description: attackVectorData?.description || "",
      category: attackVectorData?.categoryId || "",
      subCategory: attackVectorData?.subcategoryId || "",
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
      htmlContent: attackVectorData?.emailTemplate?.htmlBody || "<html></html>",
      subject: attackVectorData?.emailTemplate?.subject || "Amazon Attack",
      emailPrefix: prefix || "phish",
      emailFromDomain: domain || availableDomains[0],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const isValidating = useHtmlValidation(
    emailHtmlTemplateForm.watch("htmlContent"),
    setHtmlError
  );

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
        ? new Date(attackVectorData.startDate * 1000).toISOString().split("T")[0]
        : "",
      startTime: attackVectorData?.startDate
        ? new Date(attackVectorData.startDate * 1000).toTimeString().slice(0, 5)
        : "",
      endDate: attackVectorData?.endDate
        ? new Date(attackVectorData.endDate * 1000).toISOString().split("T")[0]
        : "",
      endTime: attackVectorData?.endDate
        ? new Date(attackVectorData.endDate * 1000).toTimeString().slice(0, 5)
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
    {
      id: "landing-pages",
      icon: <GlobeIcon className="h-5 w-5" />,
      title: "Select Target Page",
      description:
        "Choose or build the landing page that hosts the form or delivers the payload.",
      content: <LandingPageSelector form={landingPageSelectorForm} />,
      validation: () => landingPageSelectorForm.formState.isValid,
    },
    {
      id: "courses",
      icon: <GlobeIcon className="h-5 w-5" />,
      title: "Select Courses",
      description:
        "Select the courses that will be associated with this attack vector.",
      content: <CourseSelector form={coursesSelectorForm} />,
      validation: () => {
        return true;
      },
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

      // Convert milliseconds to seconds for Unix timestamp
      const startDateTime =
        timelineData.tropicality === "custom" &&
        timelineData.startDate &&
        timelineData.startTime
          ? Math.floor(
              new Date(
                `${timelineData.startDate}T${timelineData.startTime}`
              ).getTime() / 1000
            )
          : undefined;

      const endDateTime =
        timelineData.tropicality === "custom" &&
        timelineData.endDate &&
        timelineData.endTime
          ? Math.floor(
              new Date(
                `${timelineData.endDate}T${timelineData.endTime}`
              ).getTime() / 1000
            )
          : undefined;

      const requestData: CreateAttackVectorRequest = {
        name: basicInfoData.name,
        description: basicInfoData.description,
        categoryId: basicInfoData.category,
        subcategoryId: basicInfoData.subCategory,
        attackType: attackTypeMap[basicInfoData.type] || AttackVectorType.CLICK,
        // Send complete email template object instead of just ID
        emailTemplate: {
          ...(emailHtmlTemplateData.id && { id: emailHtmlTemplateData.id }),
          name: emailHtmlTemplateData.subject || basicInfoData.name, // Use subject as name, fallback to attack vector name
          htmlBody: emailHtmlTemplateData.htmlContent,
          subject: emailHtmlTemplateData.subject,
          senderEmail: `${emailHtmlTemplateData.emailPrefix}@${emailHtmlTemplateData.emailFromDomain.replace(/^@/, '')}`, // Remove leading @ if present
        },
        landingPageId: landingPageData.landingPages[0]?.id,
        ...(basicInfoData.type === "submission" && {
          submissionFormId: formData.forms[0]?.id,
        }),
        courseId: coursesData.courses.map((course) => course.id),
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
      isNextProcessing={isNextProcessing || isLoading || isValidating}
    />
  );
}
