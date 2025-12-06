// template-modal.tsx
import { useState, useEffect, FC } from "react";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAttackVectors } from "@/hooks";
import {
  useGenerateEmailTemplate,
  useEmailTemplateGeneration,
  useGenerateLandingPage,
  useLandingPageGeneration,
  useGetLandingPages,
} from "@/hooks";
import toast from "react-hot-toast";

interface Suggestion {
  id: string;
  icon: string;
  text: string;
  fullText?: string;
  templateId?: string;
}

interface GenerateResult {
  subject: string;
  from: string;
  html: string;
}

interface TemplateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (result: GenerateResult) => void;
  type?: "email" | "landing";
}

interface FormData {
  prompt: string;
}

export const TemplateModal: FC<TemplateModalProps> = ({
  isOpen,
  onClose,
  onGenerate,
  type = "email",
}) => {
  const { data: attackVectorsData } = useGetAttackVectors();
  const { data: landingPagesData } = useGetLandingPages();

  const landingPages = landingPagesData?.landingPages || [];

  const generateEmailTemplate = useGenerateEmailTemplate();
  const generateLandingPage = useGenerateLandingPage();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentOperationId, setCurrentOperationId] = useState<string | null>(
    null
  );

  // Poll for operation status when we have an operation ID
  const { data: emailOperationData } = useEmailTemplateGeneration(
    currentOperationId,
    {
      enabled: !!currentOperationId && type === "email",
    }
  );

  const { data: landingOperationData } = useLandingPageGeneration(
    currentOperationId,
    {
      enabled: !!currentOperationId && type === "landing",
    }
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      prompt: "",
    },
  });

  const promptValue = watch("prompt");

  useEffect(() => {
    if (emailOperationData && currentOperationId && type === "email") {
      if (
        emailOperationData.status === "completed" &&
        emailOperationData.output
      ) {
        const result: GenerateResult = {
          subject: "Generated Email Template",
          from: "generated@example.com",
          html: emailOperationData.output.htmlTemplate,
        };

        onGenerate(result);
        onClose();
        setIsGenerating(false);
        setCurrentOperationId(null);

        toast.success("Email template generated successfully!");
      } else if (emailOperationData.status === "failed") {
        setIsGenerating(false);
        setCurrentOperationId(null);
        toast.error(
          emailOperationData.errorMessage || "Failed to generate email template"
        );
      }
    }
  }, [emailOperationData, currentOperationId, type, onGenerate, onClose]);

  useEffect(() => {
    if (landingOperationData && currentOperationId && type === "landing") {
      if (
        landingOperationData.status === "completed" &&
        landingOperationData.output
      ) {
        const result: GenerateResult = {
          subject: "Generated Landing Page",
          from: "Generated Landing Page",
          html: landingOperationData.output.htmlTemplate,
        };

        onGenerate(result);
        onClose();
        setIsGenerating(false);
        setCurrentOperationId(null);

        toast.success("Landing page generated successfully!");
      } else if (landingOperationData.status === "failed") {
        setIsGenerating(false);
        setCurrentOperationId(null);
        toast.error(
          landingOperationData.errorMessage || "Failed to generate landing page"
        );
      }
    }
  }, [landingOperationData, currentOperationId, type, onGenerate, onClose]);

  // Fetch suggestions on modal open
  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen,]);

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockSuggestions: Suggestion[] =
        type === "landing"
          ? [
              {
                id: "1",
                icon: "🚀",
                text: "Create a modern product launch landing page with gradient design...",
                fullText:
                  "Create a modern product launch landing page with gradient design, featuring revolutionary product messaging and clear call-to-action buttons.",
                templateId: "1",
              },
              {
                id: "2",
                icon: "💼",
                text: "Design a clean SaaS startup landing page for business platform...",
                fullText:
                  "Design a clean SaaS startup landing page for business platform with professional navbar, hero section and free trial signup.",
                templateId: "2",
              },
              {
                id: "3",
                icon: "🎯",
                text: "Build an event registration page for tech conference 2024...",
                fullText:
                  "Build an event registration page for tech conference 2024 with speaker highlights, venue details and registration form.",
                templateId: "3",
              },
              {
                id: "4",
                icon: "🎨",
                text: "Create a creative portfolio showcase with dark theme design...",
                fullText:
                  "Create a creative portfolio showcase with dark theme design, gradient text effects and portfolio grid layout.",
                templateId: "4",
              },
            ]
          : [
              {
                id: "1",
                icon: "🏠",
                text: "Create an AirBnb discount scam email offering 50% off bookings...",
                fullText:
                  "Create an AirBnb discount scam email offering 50% off bookings to harvest payment credentials with authentic Airbnb branding.",
                templateId: "av-1",
              },
              {
                id: "2",
                icon: "🔐",
                text: "Design a Zoho 2FA bypass email with security alert messaging...",
                fullText:
                  "Design a Zoho 2FA bypass email with security alert messaging attempting to bypass two-factor authentication.",
                templateId: "av-2",
              },
              {
                id: "3",
                icon: "🎥",
                text: "Build a YouTube Premium fake subscription offer email...",
                fullText:
                  "Build a YouTube Premium fake subscription offer email to collect payment information with trial messaging.",
                templateId: "av-3",
              },
              {
                id: "4",
                icon: "🚗",
                text: "Create an Uber welcome email for account takeover attempt...",
                fullText:
                  "Create an Uber welcome email for account takeover attempt targeting new users with fake welcome messaging.",
                templateId: "av-4",
              },
              {
                id: "5",
                icon: "💬",
                text: "Design a Microsoft Teams urgent message for business compromise...",
                fullText:
                  "Design a Microsoft Teams urgent message for business compromise using fake notifications to trick employees.",
                templateId: "av-5",
              },
              {
                id: "6",
                icon: "☁️",
                text: "Build an OneDrive storage full alert phishing email...",
                fullText:
                  "Build an OneDrive storage full alert phishing email targeting users with fake storage limit warnings.",
                templateId: "av-6",
              },
            ];

      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    setValue("prompt", suggestion.fullText || suggestion.text, {
      shouldValidate: true,
    });

    if (suggestion.templateId) {
      generateTemplateById(suggestion.templateId);
    }
  };

  const generateTemplateById = (templateId: string) => {
    setIsGenerating(true);

    setTimeout(() => {
      let result: GenerateResult;

      if (type === "landing") {
        const selectedPage = landingPages.find(
          (page) => page.id === templateId
        );
        if (selectedPage) {
          result = {
            subject: selectedPage.name,
            from: selectedPage.name,
            html: selectedPage.htmlPage,
          };
        } else {
          result = {
            subject: landingPages[0]?.name || "Landing Page",
            from: landingPages[0]?.name || "Landing Page",
            html:
              landingPages[0]?.htmlPage ||
              "<html><body><h1>Landing Page</h1></body></html>",
          };
        }
      } else {
        const selectedVector = attackVectorsData?.attackVectors?.find(
          (vector) => vector.id === templateId
        );
        if (selectedVector) {
          result = {
            subject: selectedVector.emailTemplate.subject || "",
            from: selectedVector.emailTemplate.senderEmail || "",
            html: selectedVector.emailTemplate.htmlBody || "",
          };
        } else {
          const firstAttackVector = attackVectorsData?.attackVectors[0];
          result = {
            subject:
              firstAttackVector?.emailTemplate?.subject || "Email Subject",
            from:
              firstAttackVector?.emailTemplate?.senderEmail ||
              "sender@example.com",
            html:
              firstAttackVector?.emailTemplate?.htmlBody ||
              "<p>Email content</p>",
          };
        }
      }

      onGenerate(result);
      onClose();
      setIsGenerating(false);
    }, 2000);
  };

  const onSubmit = async (data: FormData) => {
    if (!data.prompt.trim()) {
      return;
    }

    setIsGenerating(true);

    try {
      if (type === "landing") {
        const response = await generateLandingPage.mutateAsync({
          subject: "AI Generated Landing Page",
          details: data.prompt,
        });
        setCurrentOperationId(response.operationId);
        toast("Generating landing page...");
      } else {
        const response = await generateEmailTemplate.mutateAsync({
          subject: "AI Generated Email",
          details: data.prompt,
        });
        setCurrentOperationId(response.operationId);
        toast("Generating email template...");
      }
    } catch (error) {
      console.error("Error generating template:", error);
      toast.error(`Failed to generate ${type === "landing" ? "landing page" : "email template"}`);
      setIsGenerating(false);
      setCurrentOperationId(null);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      onClose();
      setCurrentOperationId(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {type === "landing"
              ? "What landing page do you want to create?"
              : "What template do you want to create?"}
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <div className="flex-1 overflow-y-auto px-1">
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Prompt</label>
              <Textarea
                {...register("prompt", {
                  required: "Prompt is required",
                  minLength: {
                    value: 10,
                    message: "Prompt must be at least 10 characters",
                  },
                })}
                placeholder={
                  type === "landing"
                    ? "A landing page for a SaaS product with modern design..."
                    : "An email from Linkedin informing users about a ..."
                }
                className="min-h-[120px] resize-none"
                disabled={isGenerating}
              />
              {errors.prompt && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.prompt.message}
                </p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-3">Suggestions</h3>
              <div className="space-y-2">
                {isLoadingSuggestions ? (
                  <>
                    {[...Array(6)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 rounded-lg border"
                      >
                        <Skeleton className="h-5 w-5 rounded-full flex-shrink-0" />
                        <Skeleton className="h-4 flex-1" />
                      </div>
                    ))}
                  </>
                ) : (
                  suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isGenerating}
                      className="w-full cursor-pointer flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors text-left group disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {suggestion.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-700 truncate group-hover:text-gray-900">
                          {suggestion.text}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isGenerating || !promptValue.trim()}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                "Generate"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
