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
import { useParams } from "next/navigation";
import { Eye, Code, Sparkles, Upload } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorEmailTemplateFormData } from "@/types";
import { scopeHtmlTemplate } from "@/lib/scope-html-template";
import { useWatch } from "react-hook-form";
import { availableDomains } from "@/constants/temporary/available-domains";
import { Button } from "@/components/ui/button";
import { TemplateModal } from "./template-modal";
import { EmailPreviewModal } from "@/app/(dashboard)/templates/components/email-preview-modal";

interface EmailTemplateEditorProps {
  form: UseFormReturn<AttackVectorEmailTemplateFormData>;
  isSubmitting: boolean;
  htmlError: string;
  setHtmlError: (error: string) => void;
}

interface GeneratedTemplateResult {
  subject: string;
  from: string;
  html: string;
}

export const EmailTemplateEditor = ({
  form,
  isSubmitting,
  htmlError,
  setHtmlError,
}: EmailTemplateEditorProps) => {
  const params = useParams();
  const id = params?.id as string;

  const [isPreviewMode, setIsPreviewMode] = useState<boolean>(() => {
    return id !== "new";
  });

  const [editableContent, setEditableContent] = useState("");
  const [isValidating, setIsValidating] = useState(false);

  const [isCreateWithAIModalOpen, setIsCreateWithAIModalOpen] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] =
    useState<GeneratedTemplateResult | null>(null);

  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const contentEditableRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const validationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  // const lastValidatedContentRef = useRef<string>("");

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
  // const performValidation = useCallback(
  //   async (html: string) => {
  //     if (html === lastValidatedContentRef.current) {
  //       return;
  //     }

  //     lastValidatedContentRef.current = html;

  //     if (!html || html.trim() === "") {
  //       const errorMessage = "HTML content cannot be empty";
  //       setHtmlError(errorMessage);
  //       setIsValidating(false);
  //       return;
  //     }

  //     setIsValidating(true);

  //     try {
  //       const validationResult = await validateHtmlOnServer(html);

  //       if (validationResult.valid) {
  //         setHtmlError("");
  //       } else {
  //         const firstError = validationResult.errors[0];
  //         const errorMessage = `${firstError.message}`;
  //         setHtmlError(errorMessage);
  //       }
  //     } catch (error) {
  //       console.error("Failed to run server validation:", error);
  //       const errorMessage = "Could not connect to the validation server.";
  //       setHtmlError(errorMessage);
  //     } finally {
  //       setIsValidating(false);
  //     }
  //   },
  //   [form, setHtmlError]
  // );

  useEffect(() => {
    setEditableContent(watchedHtmlContent);

    // if (validationTimeoutRef.current) {
    //   clearTimeout(validationTimeoutRef.current);
    // }

    // validationTimeoutRef.current = setTimeout(() => {
    //   performValidation(watchedHtmlContent);
    // }, 500);

    // return () => {
    //   if (validationTimeoutRef.current) {
    //     clearTimeout(validationTimeoutRef.current);
    //   }
    // };
  }, [watchedHtmlContent]);

  const handleTogglePreview = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  // const isPreviewDisabled = () => {
  //   return !watchedHtmlContent.trim() || !!htmlError || isValidating;
  // };

  const handleGenerate = (result: GeneratedTemplateResult) => {
    setGeneratedTemplate(result);
    setIsPreviewModalOpen(true);
    console.log("Generated Template:", result);
  };

  const handleUseTemplate = (data: {
    from: string;
    subject: string;
    html: string;
  }) => {
    const [prefix, domain] = data.from.split("@");

    form.setValue("emailPrefix", prefix);
    form.setValue("emailFromDomain", domain ? `@${domain}` : "");
    form.setValue("subject", data.subject);
    form.setValue("htmlContent", data.html);

    setIsPreviewModalOpen(false);
    setIsPreviewMode(true);

    console.log("Template applied to form:", data);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "text/html" && !file.name.endsWith(".html")) {
      setHtmlError("Please select a valid HTML file");
      return;
    }

    setIsUploading(true);
    setHtmlError("");

    try {
      const content = await file.text();

      // Validate the HTML content before setting it
      const validationResult = await validateHtmlOnServer(content);

      if (validationResult.valid) {
        form.setValue("htmlContent", content);
        setIsPreviewMode(true);
        setHtmlError("");
      } else {
        const firstError = validationResult.errors[0];
        const errorMessage = `Invalid HTML: ${firstError.message}`;
        setHtmlError(errorMessage);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setHtmlError("Failed to read or validate the HTML file");
    } finally {
      setIsUploading(false);
      // Reset the input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <Form {...form}>
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-end mb-6 gap-2 h-4 pt-4">
            <Input
              ref={fileInputRef}
              type="file"
              accept=".html,text/html"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              size="sm"
              variant="outline"
              onClick={handleUploadClick}
              disabled={isUploading}
            >
              <Upload className="w-4 h-4 mr-1" />
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
            <div className="h-4 w-px bg-border" />
            <Button size="sm" onClick={() => setIsCreateWithAIModalOpen(true)}>
              <Sparkles /> Create With AI
            </Button>
          </div>

          <div className="pb-6 border-b">
            <div className="space-y-3">
              {/* Fixed From field - single row layout with errors below */}
              <div className="flex flex-row items-start gap-4">
                <FormLabel className="w-16 pt-2">From</FormLabel>
                <div className="flex-1">
                  <div className="flex items-center">
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
                              <SelectTrigger className="flex-1 border-0 border-b-2 cursor-pointer shadow-none rounded-none border-dashed pl-0">
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
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* Display error messages for both fields below the combined input */}
                  <div className="mt-1 min-h-[20px]">
                    {form.formState.errors.emailPrefix && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.emailPrefix.message}
                      </p>
                    )}
                    {form.formState.errors.emailFromDomain && (
                      <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.emailFromDomain.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

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
            {/* {isPreviewMode ? (
              <div>
                <div className="flex flex-row items-center justify-between mb-2">
                  <Label className="text-sm font-medium">Preview</Label>
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
                          <p>
                            {htmlError || "Please enter valid HTML to preview"}
                          </p>
                        ) : (
                          <p>Switch to Preview Mode</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
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
            ) : ( */}
            <FormField
              control={form.control}
              name="htmlContent"
              render={({ field }) => (
                <FormItem>
                  {/* <div className="flex flex-row justify-between items-center">
                      <FormLabel>HTML Content</FormLabel>
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
                              <p>
                                {htmlError ||
                                  "Please enter valid HTML to preview"}
                              </p>
                            ) : (
                              <p>Switch to Preview Mode</p>
                            )}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div> */}

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
            {/* )} */}
          </div>
        </div>
      </Form>
      <TemplateModal
        isOpen={isCreateWithAIModalOpen}
        onClose={() => setIsCreateWithAIModalOpen(false)}
        onGenerate={handleGenerate}
      />
      <EmailPreviewModal
        open={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        htmlTemplate={generatedTemplate?.html}
        title="Email Template Preview"
        from={generatedTemplate?.from || "Email From"}
        subject={generatedTemplate?.subject || "Email Subject"}
        templateType="email"
        onUseTemplate={handleUseTemplate}
      />
    </>
  );
};
