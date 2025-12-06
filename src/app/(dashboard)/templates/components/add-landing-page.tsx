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
  LandingPage, 
  LandingPageFormData, 
  landingPageFormSchema 
} from "@/types";
import { useToast, useHtmlValidation } from "@/hooks";
import { 
  useCreateLandingPage, 
  useUpdateLandingPage 
} from "@/hooks";
import { useSidebar } from "@/context/sidebar-context";

interface AddLandingPageFormProps {
  landingPageDetail?: Partial<LandingPage>;
}

export function AddLandingPageForm({ landingPageDetail }: AddLandingPageFormProps) {
  const { closeSidebar } = useSidebar();
  const { toast } = useToast();
  const createLandingPage = useCreateLandingPage();
  const updateLandingPage = useUpdateLandingPage();

  const [htmlError, setHtmlError] = React.useState<string>("");
  const [isUploading, setIsUploading] = React.useState<boolean>(false); // ADD
  const fileInputRef = React.useRef<HTMLInputElement>(null); // ADD

  const isEditMode = !!landingPageDetail?.id;

  const form = useForm<LandingPageFormData>({
    resolver: zodResolver(landingPageFormSchema),
    defaultValues: {
      name: landingPageDetail?.name || "",
      description: landingPageDetail?.description || "",
      htmlPage: landingPageDetail?.htmlPage || "",
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
      toast({
        title: "Invalid file type",
        description: "Please upload an HTML file",
        type: "error",
      });
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "File size must be less than 5MB",
        type: "error",
      });
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

      toast({
        title: "File uploaded successfully",
        type: "success",
      });
    } catch (error) {
      console.error("Error reading file:", error);
      toast({
        title: "Failed to upload file",
        description: "Please try again",
        type: "error",
      });
    } finally {
      setIsUploading(false);
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleSubmit = async (data: LandingPageFormData) => {
    if (htmlError) {
      toast({
        title: "Invalid HTML",
        description: htmlError,
        type: "error",
      });
      return;
    }

    try {
      if (isEditMode && landingPageDetail?.id) {
        await updateLandingPage.mutateAsync({
          id: landingPageDetail.id,
          data,
        });
        toast({
          title: "Landing page updated successfully",
          type: "success",
        });
      } else {
        await createLandingPage.mutateAsync(data);
        toast({
          title: "Landing page created successfully",
          type: "success",
        });
      }
      closeSidebar();
    } catch (error) {
      console.error(error);
      toast({
        title: isEditMode 
          ? "Failed to update landing page" 
          : "Failed to create landing page",
        type: "error",
      });
    }
  };

  const isMutating = createLandingPage.isPending || updateLandingPage.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Landing Page Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g., Dropbox Login Page"
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
                  placeholder="Brief description of this landing page"
                  rows={3}
                  {...field}
                  value={field.value || ""}
                  disabled={isMutating}
                />
              </FormControl>
              <FormDescription>
                Optional description to help identify this landing page
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
                  placeholder="Enter your HTML landing page template here..."
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
                Enter valid HTML content for your landing page or upload an HTML file. You can use inline CSS for styling.
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
                ? "Update Landing Page"
                : "Create Landing Page"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
