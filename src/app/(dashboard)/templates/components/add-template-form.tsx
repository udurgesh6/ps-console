"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
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
import { Eye } from "lucide-react";
import { EmailPreviewModal } from "./email-preview-modal";
import { COMPANY_LOGOS } from "@/constants/company-logos";
import Image from "next/image";

interface AddTemplateFormProps {
  onSubmit: (data: TemplateFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface TemplateFormData {
  name: string;
  description: string;
  companyLogoId: string;
  htmlContent: string;
  subject: string;
}

export function AddTemplateForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddTemplateFormProps) {
  const [formData, setFormData] = React.useState<TemplateFormData>({
    name: "",
    description: "",
    companyLogoId: "",
    htmlContent: "",
    subject: "",
  });

  const [showPreview, setShowPreview] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    field: keyof TemplateFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedLogo = COMPANY_LOGOS.find(logo => logo.id === formData.companyLogoId);

  const handlePreview = () => {
    setShowPreview(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Template Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Dropbox Security Alert"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Description <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Brief description of this template"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyLogo">
            Company Logo <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.companyLogoId}
            onValueChange={(value) => handleChange("companyLogoId", value)}
            required
          >
            <SelectTrigger id="companyLogo">
              <div className="flex items-center gap-2">
                {selectedLogo && (
                  <div className="w-5 h-5 relative flex-shrink-0">
                    <Image
                      src={selectedLogo.logoPath}
                      alt={selectedLogo.name}
                      fill
                      className="object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <SelectValue placeholder="Select company logo" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {COMPANY_LOGOS.map((logo) => (
                <SelectItem key={logo.id} value={logo.id}>
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 relative flex-shrink-0">
                      <Image
                        src={logo.logoPath}
                        alt={logo.name}
                        fill
                        className="object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    <span>{logo.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">
            Email Subject <span className="text-destructive">*</span>
          </Label>
          <Input
            id="subject"
            value={formData.subject}
            onChange={(e) => handleChange("subject", e.target.value)}
            placeholder="e.g., Security Alert: Verify Your Account"
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="htmlContent">
              Template HTML <span className="text-destructive">*</span>
            </Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePreview}
              disabled={!formData.htmlContent.trim()}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
          </div>
          <Textarea
            id="htmlContent"
            value={formData.htmlContent}
            onChange={(e) => handleChange("htmlContent", e.target.value)}
            placeholder="Enter your HTML email template here..."
            rows={12}
            className="font-mono text-sm"
            required
          />
          <p className="text-xs text-muted-foreground">
            Enter valid HTML content for your email template. You can use inline CSS for styling.
          </p>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Template"}
          </Button>
        </div>
      </form>

      {/* Preview Modal */}
      <EmailPreviewModal
        open={showPreview}
        onClose={() => setShowPreview(false)}
        htmlTemplate={formData.htmlContent}
        title={formData.name || "Template Preview"}
        subject={formData.subject || "Email Subject"}
      />
    </>
  );
}
