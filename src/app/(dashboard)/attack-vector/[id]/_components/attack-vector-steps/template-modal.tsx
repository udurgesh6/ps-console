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
import { landingPages } from "@/constants/temporary/landing-pages";
import { useGetAttackVectors } from "@/hooks";

interface Suggestion {
  id: string;
  icon: string;
  text: string;
  fullText?: string;
  templateId?: string; // Add template ID to link to actual templates
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

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

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

  // Fetch suggestions on modal open
  useEffect(() => {
    if (isOpen) {
      fetchSuggestions();
    }
  }, [isOpen]);

  const fetchSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      // Simulating API call with delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock suggestions data based on type
      const mockSuggestions: Suggestion[] =
        type === "landing"
          ? [
              {
                id: "1",
                icon: "🚀",
                text: "Create a modern product launch landing page with gradient design...",
                fullText:
                  "Create a modern product launch landing page with gradient design, featuring revolutionary product messaging and clear call-to-action buttons.",
                templateId: "1", // Product Launch
              },
              {
                id: "2",
                icon: "💼",
                text: "Design a clean SaaS startup landing page for business platform...",
                fullText:
                  "Design a clean SaaS startup landing page for business platform with professional navbar, hero section and free trial signup.",
                templateId: "2", // SaaS Startup
              },
              {
                id: "3",
                icon: "🎯",
                text: "Build an event registration page for tech conference 2024...",
                fullText:
                  "Build an event registration page for tech conference 2024 with speaker highlights, venue details and registration form.",
                templateId: "3", // Event Registration
              },
              {
                id: "4",
                icon: "🎨",
                text: "Create a creative portfolio showcase with dark theme design...",
                fullText:
                  "Create a creative portfolio showcase with dark theme design, gradient text effects and portfolio grid layout.",
                templateId: "4", // Portfolio Showcase
              },
            ]
          : [
              {
                id: "1",
                icon: "🏠",
                text: "Create an AirBnb discount scam email offering 50% off bookings...",
                fullText:
                  "Create an AirBnb discount scam email offering 50% off bookings to harvest payment credentials with authentic Airbnb branding.",
                templateId: "av-1", // AirBnb Discount Scam
              },
              {
                id: "2",
                icon: "🔐",
                text: "Design a Zoho 2FA bypass email with security alert messaging...",
                fullText:
                  "Design a Zoho 2FA bypass email with security alert messaging attempting to bypass two-factor authentication.",
                templateId: "av-2", // Zoho 2FA Bypass
              },
              {
                id: "3",
                icon: "🎥",
                text: "Build a YouTube Premium fake subscription offer email...",
                fullText:
                  "Build a YouTube Premium fake subscription offer email to collect payment information with trial messaging.",
                templateId: "av-3", // YouTube Premium Fake
              },
              {
                id: "4",
                icon: "🚗",
                text: "Create an Uber welcome email for account takeover attempt...",
                fullText:
                  "Create an Uber welcome email for account takeover attempt targeting new users with fake welcome messaging.",
                templateId: "av-4", // Uber Welcome
              },
              {
                id: "5",
                icon: "💬",
                text: "Design a Microsoft Teams urgent message for business compromise...",
                fullText:
                  "Design a Microsoft Teams urgent message for business compromise using fake notifications to trick employees.",
                templateId: "av-5", // Microsoft Teams
              },
              {
                id: "6",
                icon: "☁️",
                text: "Build an OneDrive storage full alert phishing email...",
                fullText:
                  "Build an OneDrive storage full alert phishing email targeting users with fake storage limit warnings.",
                templateId: "av-6", // OneDrive Storage
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

    // If suggestion has a templateId, immediately generate that template
    if (suggestion.templateId) {
      generateTemplateById(suggestion.templateId);
    }
  };

  const generateTemplateById = (templateId: string) => {
    setIsGenerating(true);

    // Simulate API delay
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
          // Fallback to first landing page
          result = {
            subject: landingPages[0].name,
            from: landingPages[0].name,
            html: landingPages[0].htmlPage,
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
          // Fallback to first attack vector
          const firstAttackVector = attackVectorsData?.attackVectors[0];
          result = {
            subject: "🏠 Limited Time: 50% Off Your Next Airbnb Stay!",
            from: "phish-sheriff@airbnb.com",
            html: `<div style="margin: 0; padding: 0; font-family: Helvetica, Arial, sans-serif">
  <table
    cellpadding="0"
    style="
      border-collapse: collapse;
      width: 100%;
      max-width: 580px;
      margin: auto;
      background-color: #ffffff;
    "
  >
    <tbody>
      <tr>
        <td>
          <div
            style="
              border: 1px solid #dddddd;
              border-radius: 12px;
              overflow: hidden;
            "
          >
            <table cellpadding="0" style="width: 100%; padding: 48px">
              <tbody>
                <tr>
                  <td align="center" style="padding-bottom: 32px">
                    <img
                      alt="Airbnb"
                      src="https://storage.googleapis.com/template_image_bucket/airbnb%20logo.png"
                      style="height: 32px; width: 32px; border: 0"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <h2
                      style="
                        font-size: 32px;
                        line-height: 40px;
                        text-align: center;
                        color: #222222;
                        margin: 0;
                        font-weight: 800;
                      "
                    >
                      Enjoy 50% Off an Airbnb Stay!
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 16px">
                    <p
                      style="
                        font-size: 18px;
                        line-height: 28px;
                        text-align: center;
                        color: #555555;
                        margin: 0;
                      "
                    >
                      You’ve got places to go, and we’ve got places to stay!
                      Book your Airbnb listing by
                      <strong>%Future_date%</strong> and get 50% off your
                      booking fee. Maximum coupon value of $35.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 24px; text-align: center">
                    <a
                      href="%LandingPageURL%"
                      style="
                        font-size: 18px;
                        line-height: 24px;
                        color: #ffffff;
                        background-color: #222222;
                        padding: 16px 24px;
                        border-radius: 8px;
                        text-decoration: none;
                        display: inline-block;
                      "
                    >
                      Claim Now
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              cellpadding="0"
              style="
                width: 100%;
                background-color: #f9f9f9;
                padding: 24px;
                font-size: 12px;
                line-height: 16px;
                color: #717171;
              "
            >
              <tbody>
                <tr>
                  <td>
                    *This one-time-use coupon expires on
                    <strong>%Future_date%</strong> and is automatically applied
                    to your Airbnb account. Travel must begin before
                    <strong>%Future_date%</strong>. Maximum coupon value is $35.
                    This coupon is valid for stay reservations only and cannot
                    be transferred, exchanged for cash, or combined with another
                    offer. If you cancel a reservation made with the coupon, any
                    refund will exclude the coupon value. Airbnb reserves the
                    right to take corrective action if fraudulent activity is
                    suspected.
                  </td>
                </tr>
              </tbody>
            </table>
            <table cellpadding="0" style="width: 100%; padding: 24px">
              <tbody>
                <tr>
                  <td align="center" style="font-size: 14px; color: #222222">
                    Airbnb, Inc.<br />
                    888 Brannan St.<br />
                    San Francisco, CA 94103
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px">
                    <a href="%LandingPageURL%" style="margin-right: 12px"
                      ><img
                        src="https://storage.googleapis.com/template_image_bucket/facebook%20black%20logo.png"
                        alt="Facebook"
                        style="height: 20px; width: 20px; border: 0"
                    /></a>
                    <a href="%LandingPageURL%" style="margin-right: 12px"
                      ><img
                        src="https://storage.googleapis.com/template_image_bucket/insta%20white.png"
                        alt="Instagram"
                        style="height: 20px; width: 20px; border: 0"
                    /></a>
                    <a href="%LandingPageURL%"
                      ><img
                        src="https://storage.googleapis.com/template_image_bucket/twitter%20white.png"
                        alt="Twitter"
                        style="height: 20px; width: 20px; border: 0"
                    /></a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 16px">
                    <a href="%LandingPageURL%">
                      <img
                        src="https://storage.googleapis.com/template_image_bucket/download%20on%20the%20app%20store.png"
                        alt="App Store"
                        style="height: 40px; width: auto; border: 0"
                      />
                    </a>
                    <a href="%LandingPageURL%">
                      <img
                        src="https://storage.googleapis.com/template_image_bucket/get%20it%20on%20google%20play.png"
                        alt="Google Play"
                        style="height: 40px; width: auto; border: 0"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>`,
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
      // Simulating API call for generation
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Helper function to find best matching template based on prompt
      const findBestMatchingTemplate = (prompt: string) => {
        const normalizedPrompt = prompt.toLowerCase();

        if (type === "landing") {
          // Define keywords for each landing page category
          const landingPageKeywords = {
            product: [
              "product",
              "launch",
              "new",
              "revolutionary",
              "innovation",
              "feature",
            ],
            saas: [
              "saas",
              "software",
              "platform",
              "business",
              "startup",
              "scale",
              "trial",
            ],
            event: [
              "event",
              "conference",
              "registration",
              "register",
              "attend",
              "speaker",
              "tech",
            ],
            portfolio: [
              "portfolio",
              "creative",
              "design",
              "showcase",
              "work",
              "studio",
              "art",
            ],
          };

          let bestMatch = landingPages[0]; // Default fallback
          let maxScore = 0;

          landingPages.forEach((page) => {
            let score = 0;
            const pageKeywords =
              landingPageKeywords[
                page.description || ("" as keyof typeof landingPageKeywords)
              ] || [];

            // Check for keyword matches
            pageKeywords.forEach((keyword) => {
              if (normalizedPrompt.includes(keyword)) {
                score += 2;
              }
            });

            // Check if prompt contains page name or description words
            if (normalizedPrompt.includes(page.name.toLowerCase())) {
              score += 3;
            }
            if (
              normalizedPrompt.includes(page.description?.toLowerCase() || "")
            ) {
              score += 1;
            }

            if (score > maxScore) {
              maxScore = score;
              bestMatch = page;
            }
          });

          return {
            subject: bestMatch.name,
            from: bestMatch.name,
            html: bestMatch.htmlPage,
          };
        } else {
          // Define keywords for each attack vector type
          const attackVectorKeywords = {
            airbnb: [
              "airbnb",
              "booking",
              "travel",
              "discount",
              "stay",
              "accommodation",
            ],
            zoho: [
              "zoho",
              "2fa",
              "security",
              "verification",
              "account",
              "alert",
            ],
            youtube: [
              "youtube",
              "premium",
              "video",
              "trial",
              "subscription",
              "free",
            ],
            uber: ["uber", "ride", "driver", "transport", "confirm", "account"],
            microsoft: [
              "microsoft",
              "teams",
              "office",
              "onedrive",
              "outlook",
              "storage",
            ],
            instagram: ["instagram", "social", "photo", "password", "reset"],
            google: ["google", "gmail", "drive", "security", "gemini", "ai"],
            phishing: ["phishing", "scam", "fake", "credential", "login"],
            social: ["social", "engineering", "pretexting", "manipulation"],
          };

          let bestMatch = attackVectorsData?.attackVectors[0]; // Default fallback
          let maxScore = 0;

          attackVectorsData?.attackVectors.forEach((vector) => {
            let score = 0;

            // Check for brand/service matches
            Object.entries(attackVectorKeywords).forEach(([key, keywords]) => {
              keywords.forEach((keyword) => {
                if (normalizedPrompt.includes(keyword)) {
                  if (
                    vector.name.toLowerCase().includes(key) ||
                    vector.description?.toLowerCase().includes(keyword)
                  ) {
                    score += 3;
                  } else {
                    score += 1;
                  }
                }
              });
            });

            // Check category and subcategory matches
            if (normalizedPrompt.includes(vector.categoryId)) {
              score += 2;
            }
            if (normalizedPrompt.includes(vector.subcategoryId)) {
              score += 2;
            }

            // Check if prompt contains vector name or description words
            const vectorWords = vector.name.toLowerCase().split(" ");
            vectorWords.forEach((word) => {
              if (word.length > 3 && normalizedPrompt.includes(word)) {
                score += 2;
              }
            });

            if (score > maxScore) {
              maxScore = score;
              bestMatch = vector;
            }
          });

          return {
            subject: bestMatch?.emailTemplate?.subject || "",
            from: bestMatch?.emailTemplate?.senderEmail || "",
            html: bestMatch?.emailTemplate?.htmlBody || "",
          };
        }
      };

      // Mock generated result based on type using intelligent matching
      const result: GenerateResult = findBestMatchingTemplate(data.prompt);

      onGenerate(result);
      onClose();
    } catch (error) {
      console.error("Error generating template:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    if (!isGenerating) {
      onClose();
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
            {/* Prompt Section */}
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

            {/* Suggestions Section */}
            <div>
              <h3 className="text-sm font-medium mb-3">Suggestions</h3>
              <div className="space-y-2">
                {isLoadingSuggestions ? (
                  // Loading Skeletons
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
                  // Actual Suggestions
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

          {/* Footer Buttons */}
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
