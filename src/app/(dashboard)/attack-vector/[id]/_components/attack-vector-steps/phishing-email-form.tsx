import { AttackVectorEmailTemplateFormData } from "@/types";
import { useRef, useState, memo, useEffect } from "react";
import { StableInput, StableInputRef } from "./stable-input";
import { UseFormReturn } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, Sparkles } from "lucide-react";
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
import { availableDomains } from "@/constants/temporary/available-domains";

interface PhishingEmailFormProps {
  form: UseFormReturn<AttackVectorEmailTemplateFormData>;
  isSubmitting: boolean;
  htmlError: string;
  setHtmlError: (error: string) => void;
}

const PhishingEmailFormComponent = ({
  form,
  isSubmitting,
//   htmlError,
//   setHtmlError,
}: PhishingEmailFormProps) => {
  console.log("PhishingEmailForm render:", {
    formId: form.formState.submitCount + "_" + form.formState.isDirty,
    isSubmitting,
    formInstance: form === form ? "same" : "different"
  });

  const subjectInputRef = useRef<StableInputRef>(null);
  const wasFocusedRef = useRef(false);
  const renderCountRef = useRef(0);

  // Track renders and restore focus if component was focused before re-render
  useEffect(() => {
    renderCountRef.current += 1;
    
    if (wasFocusedRef.current && subjectInputRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        if (subjectInputRef.current) {
          subjectInputRef.current.focus();
        }
      }, 0);
    }
  });

  const handleSubjectFocus = () => {
    wasFocusedRef.current = true;
  };

  const handleSubjectBlur = () => {
    wasFocusedRef.current = false;
  };
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const [isUploading, setIsUploading] = useState(false);

//   const handleUploadClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleFileUpload = async (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (!file) return;
//   };

  return (
    <>
      <Form {...form}>
        <div className="bg-white rounded-lg">
          {/* <div className="flex items-center justify-end mb-6 gap-2 h-4 pt-4">
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
            <Button size="sm">
              <Sparkles /> Create With AI
            </Button>
          </div> */}

          <div className="pb-6 border-b">
            <div className="space-y-3">
              {/* <div className="flex flex-row items-start gap-4">
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
              </div> */}

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center gap-4">
                    <FormLabel className="w-16">Subject</FormLabel>{" "}
                    <FormControl>
                      <StableInput
                        ref={subjectInputRef}
                        placeholder="Enter email subject..."
                        defaultValue={field.value}
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        className="flex-1 pl-0 border-0 border-b-2 shadow-none rounded-none border-dashed"
                        disabled={isSubmitting}
                        onFocus={handleSubjectFocus}
                        onBlur={handleSubjectBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export const PhishingEmailForm = memo(PhishingEmailFormComponent, (prevProps, nextProps) => {
  const isEqual = prevProps.form === nextProps.form && prevProps.isSubmitting === nextProps.isSubmitting;
  if (!isEqual) {
    console.log("PhishingEmailForm props changed:", {
      formChanged: prevProps.form !== nextProps.form,
      isSubmittingChanged: prevProps.isSubmitting !== nextProps.isSubmitting,
    });
  }
  return isEqual;
});
