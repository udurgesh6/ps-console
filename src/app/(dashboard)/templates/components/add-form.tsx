"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react"; // ADD this import
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { 
  SubmissionForm, 
  SubmissionFormFormData, 
  submissionFormFormSchema 
} from "@/types";
import { useHtmlValidation } from "@/hooks";
import { 
  useCreateSubmissionForm, 
  useUpdateSubmissionForm 
} from "@/hooks";
import { useSidebar } from "@/context/sidebar-context";
import toast from "react-hot-toast"

interface AddFormComponentProps {
  submissionFormDetail?: Partial<SubmissionForm>;
}

export function AddFormComponent({ submissionFormDetail }: AddFormComponentProps) {
  const { closeSidebar } = useSidebar();
  const createSubmissionForm = useCreateSubmissionForm();
  const updateSubmissionForm = useUpdateSubmissionForm();

  const [htmlError, setHtmlError] = React.useState<string>("");
  const [isUploading, setIsUploading] = React.useState<boolean>(false); // ADD
  const fileInputRef = React.useRef<HTMLInputElement>(null); // ADD

  const isEditMode = !!submissionFormDetail?.id;

  const form = useForm<SubmissionFormFormData>({
    resolver: zodResolver(submissionFormFormSchema),
    defaultValues: {
      name: submissionFormDetail?.name || "",
      description: submissionFormDetail?.description || "",
      htmlPage: submissionFormDetail?.htmlPage || "",
    },
  });

  const htmlContent = form.watch("htmlPage");
  const isValidating = useHtmlValidation(htmlContent, setHtmlError);

  // ADD: Handle file upload
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ADD: Handle file change
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".html") && file.type !== "text/html") {
      toast.error("Please upload an HTML file");
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setIsUploading(true);

    try {
      const text = await file.text();
      
      // Set the HTML content
      form.setValue("htmlPage", text, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      toast.success("File uploaded successfully");
    } catch (error) {
      console.error("Error reading file:", error);
      toast.error("Failed to upload file. Please try again");
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (data: SubmissionFormFormData) => {
    // Check for HTML validation errors before submitting
    if (htmlError) {
      toast.error("Invalid HTML");
      return;
    }

    try {
      if (isEditMode && submissionFormDetail?.id) {
        await updateSubmissionForm.mutateAsync({
          id: submissionFormDetail.id,
          data,
        });
        toast.success("Submission form updated successfully");
      } else {
        await createSubmissionForm.mutateAsync(data);
        toast.success("Submission form created successfully");
      }
      closeSidebar();
    } catch (error) {
      console.error(error);
      toast.error(isEditMode 
          ? "Failed to update submission form" 
          : "Failed to create submission form");
    }
  };

  const isMutating = createSubmissionForm.isPending || updateSubmissionForm.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Form Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Microsoft Login Form"
                  {...field}
                  disabled={isMutating}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief description of this form"
                  rows={3}
                  {...field}
                  value={field.value || ""}
                  disabled={isMutating}
                />
              </FormControl>
              <FormDescription>
                Optional description to help identify this form
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="htmlPage"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel>
                  HTML Template <span className="text-destructive">*</span>
                  {isValidating && (
                    <span className="text-xs text-muted-foreground ml-2">
                      (Validating...)
                    </span>
                  )}
                </FormLabel>
                {/* ADD: Upload button */}
                <div className="flex items-center gap-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".html,text/html"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleUploadClick}
                    disabled={isUploading || isMutating}
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    {isUploading ? "Uploading..." : "Upload HTML"}
                  </Button>
                </div>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Enter your HTML form template here..."
                  rows={12}
                  className={`font-mono max-h-[200px] text-sm ${
                    htmlError
                      ? "border-red-500 focus-visible:border-0 focus-visible:ring-1 focus-visible:ring-red-500"
                      : ""
                  }`}
                  {...field}
                  disabled={isMutating}
                />
              </FormControl>
              <FormDescription>
                Enter valid HTML content for your form or upload an HTML file. You can use inline CSS for styling.
              </FormDescription>
              <FormMessage />
              {!isValidating && htmlError && (
                <p className="text-sm text-red-500 mt-2">{htmlError}</p>
              )}
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={closeSidebar}
            disabled={isMutating}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isMutating || isValidating || !!htmlError}
          >
            {isMutating
              ? "Saving..."
              : isEditMode
                ? "Update Form"
                : "Create Form"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
