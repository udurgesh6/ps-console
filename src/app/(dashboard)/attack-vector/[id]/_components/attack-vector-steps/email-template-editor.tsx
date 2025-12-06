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
import { useState } from "react";
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
import { useHtmlValidation } from "@/hooks";
import { useFileUpload } from "@/hooks/use-file-upload";

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

  const [isPreviewMode, setIsPreviewMode] = useState(id !== "new");
  const [isCreateWithAIModalOpen, setIsCreateWithAIModalOpen] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] =
    useState<GeneratedTemplateResult | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const htmlContent = useWatch({
    control: form.control,
    name: "htmlContent",
  }) || "";

  const isValidating = useHtmlValidation(htmlContent, setHtmlError);
  const { isUploading, fileInputRef, handleUploadClick, handleFileUpload } =
    useFileUpload(form, setHtmlError, setIsPreviewMode);

  const handleTogglePreview = () => setIsPreviewMode(!isPreviewMode);

  const isPreviewDisabled = !htmlContent.trim() || !!htmlError || isValidating;

  const handleGenerate = (result: GeneratedTemplateResult) => {
    setGeneratedTemplate(result);
    setIsPreviewModalOpen(true);
  };

  const handleUseTemplate = (data: {
    from: string;
    subject: string;
    html: string;
  }) => {
    const [prefix, domain] = data.from.split("@");
    form.setValue("emailPrefix", prefix, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
    form.setValue("emailFromDomain", domain ? `@${domain}` : "", { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
    form.setValue("subject", data.subject, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
    form.setValue("htmlContent", data.html, { 
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true 
    });
    setIsPreviewModalOpen(false);
    setIsPreviewMode(true);
  };

  const getTooltipContent = () => {
    if (isPreviewMode) return "Switch to Edit Mode";
    if (isValidating) return "Validating HTML...";
    if (isPreviewDisabled) return htmlError || "Please enter valid HTML to preview";
    return "Switch to Preview Mode";
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

          {/* Email Header Fields */}
          <div className="pb-6 border-b">
            <div className="space-y-3">
              {/* From Field */}
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
                                <SelectValue placeholder="@Select domain" />
                              </SelectTrigger>
                              <SelectContent>
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

              {/* Subject Field */}
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4">
                    <FormLabel className="w-16">Subject</FormLabel>
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

          {/* Content Editor/Preview */}
          <div className="py-6">
            <div className="flex flex-row items-center justify-between mb-2">
              <Label className="text-sm font-medium flex items-center gap-2">
                {isPreviewMode ? "Preview" : "HTML Content"}
                {isValidating && (
                  <p className="text-xs text-muted-foreground">(Validating...)</p>
                )}
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4" />
                      <Switch
                        checked={isPreviewMode}
                        onCheckedChange={handleTogglePreview}
                        disabled={isPreviewDisabled}
                        className="cursor-pointer"
                      />
                      <Eye className="w-4 h-4" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getTooltipContent()}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            {isPreviewMode ? (
              <div
                contentEditable={false}
                className="email-template-preview min-h-[400px] p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                dangerouslySetInnerHTML={{
                  __html: scopeHtmlTemplate(htmlContent),
                }}
                suppressContentEditableWarning
                style={{
                  contain: "style layout",
                  isolation: "isolate",
                }}
              />
            ) : (
              <FormField
                control={form.control}
                name="htmlContent"
                render={({ field }) => (
                  <FormItem>
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

      {/* Modals */}
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
