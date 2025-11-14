"use client";

import { useEffect, useState, useMemo } from "react";
import { Story } from "@/components/shared/story";
import { use } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  attackVectorBasicInfoSchema,
  AttackVectorBasicInfoFormData,
  AttackVector,
  attackVectorEmailHtmlTemplateSchema,
  AttackVectorEmailHtmlTemplateFormData,
  baseAttackVectorLandingPageSelectorSchema,
  AttackVectorLandingPageSelectorFormData,
  AttackVectorFormsSelectorFormData,
  baseAttackVectorFormsSelectorSchema,
  baseAttackVectorTimelineSchema,
  AttackVectorTimelineFormData,
  AttackVectorCoursesSelectorFormData,
  baseAttackVectorCoursesSelectorSchema,
} from "@/types";
import { dummyAttackVectors } from "@/constants/temporary/attack-vectors";
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

interface AttackVectorPageProps {
  params: Promise<{ id: string }>;
}

export default function AttackVectorPage({ params }: AttackVectorPageProps) {
  const router = useRouter();
  const { id } = use(params);

  // Determine if this is a new attack vector or editing existing one
  const isNewVector = id === "new";

  // Find existing attack vector if editing
  const [attackVector] = useState<AttackVector | null>(() => {
    if (isNewVector) return null;
    return dummyAttackVectors?.find((vector) => vector.id === id) || null;
  });

  const [htmlError, setHtmlError] = useState("");
  const [currentStepId, setCurrentStepId] = useState("basic-info");
  const [isNextProcessing, setIsNextProcessing] = useState(false);

  // Redirect if trying to edit non-existent vector
  useEffect(() => {
    if (!isNewVector && !attackVector) {
      router.push("/dashboard/attack-vector");
    }
  }, [attackVector, router, isNewVector]);

  // Get initial email values
  const { prefix, domain } = useMemo(() => {
    if (attackVector?.from) {
      return splitEmail(attackVector.from);
    }
    return { prefix: "", domain: "" };
  }, [attackVector?.from]);

  // Form configurations with conditional defaults
  const basicAttackVectorForm = useForm<AttackVectorBasicInfoFormData>({
    resolver: zodResolver(attackVectorBasicInfoSchema),
    defaultValues: {
      name: attackVector?.name || "",
      description: attackVector?.description || "",
      category: attackVector?.category || undefined,
      subCategory: attackVector?.subCategory || "",
      type: attackVector?.type || "click",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const emailHtmlTemplateForm = useForm<AttackVectorEmailHtmlTemplateFormData>({
    resolver: zodResolver(attackVectorEmailHtmlTemplateSchema),
    defaultValues: {
      htmlContent: attackVector?.emailHtmlTemplate || "",
      subject: attackVector?.emailSubject || "",
      emailPrefix: prefix,
      emailFromDomain: domain,
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const landingPageSelectorForm =
    useForm<AttackVectorLandingPageSelectorFormData>({
      resolver: zodResolver(baseAttackVectorLandingPageSelectorSchema),
      defaultValues: {
        landingPages: attackVector?.landingPages || [],
      },
      mode: "onTouched",
      reValidateMode: "onChange",
    });

  const formSelectorForm = useForm<AttackVectorFormsSelectorFormData>({
    resolver: zodResolver(baseAttackVectorFormsSelectorSchema),
    defaultValues: {
      forms: attackVector?.forms || [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const coursesSelectorForm = useForm<AttackVectorCoursesSelectorFormData>({
    resolver: zodResolver(baseAttackVectorCoursesSelectorSchema),
    defaultValues: {
      courses: attackVector?.courses || [],
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const timelineSelectorForm = useForm<AttackVectorTimelineFormData>({
    resolver: zodResolver(baseAttackVectorTimelineSchema),
    defaultValues: {
      tropicality: attackVector?.tropicality || "custom",
      startDate: attackVector?.startDate
        ? new Date(attackVector.startDate).toISOString().split("T")[0]
        : "",
      startTime: attackVector?.startDate
        ? new Date(attackVector.startDate).toTimeString().slice(0, 5)
        : "",
      endDate: attackVector?.endDate
        ? new Date(attackVector.endDate).toISOString().split("T")[0]
        : "",
      endTime: attackVector?.endDate
        ? new Date(attackVector.endDate).toTimeString().slice(0, 5)
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
      validation: () => basicAttackVectorForm.formState.isValid,
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
      validation: () => coursesSelectorForm.formState.isValid,
    },
    {
      id: "timeline",
      icon: <CalendarIcon className="h-5 w-5" />,
      title: "Schedule Attack Vector",
      description:
        "Choose a seasonal theme or set a custom timeline for when this attack vector will be active.",
      content: <TimelineSelector form={timelineSelectorForm} />,
      validation: () => timelineSelectorForm.formState.isValid,
    },
  ];

  const handleStepChange = async (stepId: string) => {
    const currentStep = attackVectorSteps.find(
      (step) => step.id === currentStepId
    );

    if (currentStep) {
      switch (currentStep.id) {
        case "basic-info":
          setIsNextProcessing(true);
          try {
            const basicInfoData = basicAttackVectorForm.getValues();
            console.log("Basic info data:", basicInfoData);
            
            if (isNewVector) {
              // await createAttackVector(basicInfoData);
              console.log("New attack vector created");
            } else {
              // await updateAttackVector(id, basicInfoData);
              console.log("Attack vector updated");
            }
          } catch (error) {
            console.error("Failed to save basic info:", error);
            return;
          } finally {
            setIsNextProcessing(false);
          }
          break;

        case "emails":
          setIsNextProcessing(true);
          try {
            const emailHtmlTemplateData = emailHtmlTemplateForm.getValues();
            console.log("Email HTML template data:", emailHtmlTemplateData);
            
            if (isNewVector) {
              // await createEmailTemplate(emailHtmlTemplateData);
            } else {
              // await updateEmailTemplate(id, emailHtmlTemplateData);
            }
            console.log("Email HTML template saved successfully");
          } catch (error) {
            console.error("Failed to save email HTML template:", error);
            return;
          } finally {
            setIsNextProcessing(false);
          }
          break;

        case "landing-pages":
          // Handle landing page logic
          break;
      }
    }

    setCurrentStepId(stepId);
  };

  const handleComplete = (data: Record<string, unknown>) => {
    console.log(
      `${isNewVector ? "Created" : "Updated"} attack vector with data:`,
      data
    );
    // Redirect back to list after completion
    router.push("/dashboard/attack-vector");
  };

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
      isNextProcessing={isNextProcessing}
    />
  );
}