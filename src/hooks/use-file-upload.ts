import { UseFormReturn } from "react-hook-form";
import { useState, useRef } from "react";
import { AttackVectorEmailTemplateFormData } from "@/types";

export const useFileUpload = (
  form: UseFormReturn<AttackVectorEmailTemplateFormData>,
  setHtmlError: (error: string) => void,
  setIsPreviewMode: (value: boolean) => void
) => {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => fileInputRef.current?.click();

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
      const response = await fetch("/api/validate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: content }),
      });
      const validationResult = await response.json();

      if (validationResult.valid) {
        form.setValue("htmlContent", content, { 
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true 
        });
        setIsPreviewMode(true);
        setHtmlError("");
      } else {
        setHtmlError(`Invalid HTML: ${validationResult.errors[0].message}`);
      }
    } catch (error) {
      console.error("Error processing file:", error);
      setHtmlError("Failed to read or validate the HTML file");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return { isUploading, fileInputRef, handleUploadClick, handleFileUpload };
};