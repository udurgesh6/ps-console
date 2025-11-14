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

interface AddFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface FormData {
  id: string;
  name: string;
  description: string;
  category: string;
  htmlTemplate: string;
}

const CATEGORIES = [
  { id: "login", name: "Login Form" },
  { id: "registration", name: "Registration Form" },
  { id: "payment", name: "Payment Form" },
  { id: "contact", name: "Contact Form" },
  { id: "survey", name: "Survey Form" },
  { id: "feedback", name: "Feedback Form" },
  { id: "subscription", name: "Subscription Form" },
  { id: "other", name: "Other" },
];

export function AddFormComponent({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddFormProps) {
  const [formData, setFormData] = React.useState<FormData>({
    id: "",
    name: "",
    description: "",
    category: "",
    htmlTemplate: "",
  });

  const [showPreview, setShowPreview] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // const handlePreview = () => {
  //   setShowPreview(true);
  // };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">
            Form Name <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            placeholder="e.g., Microsoft Login Form"
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
            placeholder="Brief description of this form"
            rows={3}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">
            Category <span className="text-destructive">*</span>
          </Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleChange("category", value)}
            required
          >
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="htmlTemplate">
              HTML Template <span className="text-destructive">*</span>
            </Label>
            {/* <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handlePreview}
              disabled={!formData.htmlTemplate.trim()}
              className="flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button> */}
          </div>
          <Textarea
            id="htmlTemplate"
            value={formData.htmlTemplate}
            onChange={(e) => handleChange("htmlTemplate", e.target.value)}
            placeholder="Enter your HTML form template here..."
            rows={12}
            className="font-mono text-sm"
            required
          />
          <p className="text-xs text-muted-foreground">
            Enter valid HTML content for your form. You can use inline CSS for styling.
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
            {isLoading ? "Creating..." : "Create Form"}
          </Button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">
                {formData.name || "Form Preview"}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(false)}
              >
                Close
              </Button>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <iframe
                srcDoc={formData.htmlTemplate}
                className="w-full h-full min-h-[500px] border rounded"
                title="Form Preview"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
