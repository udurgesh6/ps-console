import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect, useRef, useCallback } from "react";
import { Eye, Code } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorEmailHtmlTemplateFormData } from "@/types";
import { scopeHtmlTemplate } from "@/lib/scope-html-template";
import { useWatch } from "react-hook-form";
import { availableDomains } from "@/constants/temporary/available-domains";

interface EmailTemplateEditorProps {
  form: UseFormReturn<AttackVectorEmailHtmlTemplateFormData>;
  isSubmitting: boolean;
  htmlError: string;
  setHtmlError: (error: string) => void;
}

export const EmailTemplateEditor = ({
  form,
  isSubmitting,
  htmlError,
  setHtmlError,
}: EmailTemplateEditorProps) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [editableContent, setEditableContent] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastValidatedContentRef = useRef<string>("");

  const watchedHtmlContent =
    useWatch({
      control: form.control,
      name: "htmlContent",
    }) || "";

  const validateHtmlOnServer = async (html: string) => {
    const response = await fetch("/api/validate-html", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html }),
    });
    const result = await response.json();
    return result;
  };

  // Validation function that updates both local state and form state
  const performValidation = useCallback(
    async (html: string) => {
      if (html === lastValidatedContentRef.current) {
        return;
      }

      lastValidatedContentRef.current = html;

      if (!html || html.trim() === "") {
        const errorMessage = "HTML content cannot be empty";
        setHtmlError(errorMessage);
        setIsValidating(false);
        return;
      }

      setIsValidating(true);

      try {
        const validationResult = await validateHtmlOnServer(html);

        if (validationResult.valid) {
          setHtmlError("");
          // Use setTimeout to break out of the render cycle
          setTimeout(() => {
            form.clearErrors("htmlContent");
          }, 0);
        } else {
          const firstError = validationResult.errors[0];
          const errorMessage = `${firstError.message}`;
          setHtmlError(errorMessage);
        }
      } catch (error) {
        console.error("Failed to run server validation:", error);
        const errorMessage = "Could not connect to the validation server.";
        setHtmlError(errorMessage);
      } finally {
        setIsValidating(false);
      }
    },
    [form, setHtmlError]
  );

  // Effect that watches for HTML content changes with debouncing
  useEffect(() => {
    setEditableContent(watchedHtmlContent);

    // Clear any existing timeout
    if (validationTimeoutRef.current) {
      clearTimeout(validationTimeoutRef.current);
    }

    // Debounce validation for changes (not for initial load)
    validationTimeoutRef.current = setTimeout(() => {
      performValidation(watchedHtmlContent);
    }, 500);

    // Cleanup timeout on unmount or when effect re-runs
    return () => {
      if (validationTimeoutRef.current) {
        clearTimeout(validationTimeoutRef.current);
      }
    };
  }, [watchedHtmlContent, performValidation]);

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  const isPreviewDisabled = () => {
    return !watchedHtmlContent.trim() || !!htmlError || isValidating;
  };

  return (
    <Form {...form}>
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <Switch
                      checked={isPreviewMode}
                      onCheckedChange={handleTogglePreview}
                      disabled={isPreviewDisabled()}
                      className="cursor-pointer"
                    />
                    <Eye className="w-4 h-4" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  {isPreviewMode ? (
                    <p>Switch to Edit Mode</p>
                  ) : isValidating ? (
                    <p>Validating HTML...</p>
                  ) : isPreviewDisabled() ? (
                    <p>{htmlError || "Please enter valid HTML to preview"}</p>
                  ) : (
                    <p>Switch to Preview Mode</p>
                  )}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="py-0 pb-6 border-b">
          <div className="space-y-3">
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="w-16">From</FormLabel>{" "}
              <div className="flex flex-1 items-center">
                <FormField
                  control={form.control}
                  name="emailPrefix"
                  render={({ field }) => (
                    <FormItem className="w-28">
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isSubmitting}
                          placeholder="e.g., info"
                          className="border-0 border-b-2 shadow-none rounded-none border-dashed px-0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailFromDomain"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Select
                          disabled={isSubmitting}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger
                            className="flex-1 border-0 border-b-2 cursor-pointer shadow-none rounded-none border-dashed pl-0"
                          >
                            <SelectValue
                              placeholder="@Select domain"
                              className="rounded-0"
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-0">
                            {availableDomains.map((domain) => (
                              <SelectItem key={domain} value={domain}>
                                {domain}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormItem>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormLabel className="w-16">Subject</FormLabel>{" "}
                  <FormControl>
                    <Input
                      placeholder="Enter email subject..."
                      {...field}
                      className="flex-1 pl-0 border-0 border-b-2 shadow-none rounded-none border-dashed"
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="py-6">
          {isPreviewMode ? (
            <div>
              <Label className="block mb-2">Preview</Label>
              <div
                ref={contentEditableRef}
                contentEditable={false}
                className="email-template-preview min-h-[400px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dangerouslySetInnerHTML={{
                  __html: scopeHtmlTemplate(editableContent),
                }}
                suppressContentEditableWarning
                style={{
                  contain: "style layout",
                  isolation: "isolate",
                }}
              />
            </div>
          ) : (
            <FormField
              control={form.control}
              name="htmlContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>HTML Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter HTML content..."
                      className={`font-mono text-sm h-[300px] resize-y ${
                        htmlError
                          ? "border-red-500 focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-red-500"
                          : ""
                      }`}
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                  {/* {isValidating && (
                    <p className="text-sm text-blue-500 mt-2">Validating...</p>
                  )} */}
                  {!isValidating && htmlError && (
                    <p className="text-sm text-red-500 mt-2">{htmlError}</p>
                  )}
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </Form>
  );
};
