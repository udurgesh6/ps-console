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

interface AddCourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export interface CourseFormData {
  id: string;
  name: string;
  description: string;
  category: string;
  level: string;
  thumbnail: string;
  slug: string;
}

const CATEGORIES = [
  { id: "security", name: "Security" },
  { id: "phishing", name: "Phishing" },
  { id: "compliance", name: "Compliance" },
  { id: "password", name: "Password Management" },
  { id: "social-engineering", name: "Social Engineering" },
  { id: "incident-response", name: "Incident Response" },
  { id: "data-privacy", name: "Data Privacy" },
  { id: "other", name: "Other" },
];

const LEVELS = [
  { id: "beginner", name: "Beginner" },
  { id: "intermediate", name: "Intermediate" },
  { id: "advanced", name: "Advanced" },
];

export function AddCourseForm({
  onSubmit,
  onCancel,
  isLoading = false,
}: AddCourseFormProps) {
  const [formData, setFormData] = React.useState<CourseFormData>({
    id: "",
    name: "",
    description: "",
    category: "",
    level: "",
    thumbnail: "",
    slug: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: keyof CourseFormData, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [field]: value };
      
      // Auto-generate slug from name if name is being changed
      if (field === "name" && value) {
        updated.slug = value
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      
      return updated;
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="id">
          ID <span className="text-destructive">*</span>
        </Label>
        <Input
          id="id"
          value={formData.id}
          onChange={(e) => handleChange("id", e.target.value)}
          placeholder="e.g., course-001"
          required
        />
        <p className="text-xs text-muted-foreground">
          A unique identifier for this course (lowercase, hyphens allowed)
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          Course Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          placeholder="e.g., Introduction to Cybersecurity"
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
          placeholder="Brief description of what students will learn in this course"
          rows={4}
          required
        />
        <p className="text-xs text-muted-foreground">
          Minimum 10 characters
        </p>
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
          <SelectTrigger id="category">
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
        <Label htmlFor="level">
          Difficulty Level <span className="text-destructive">*</span>
        </Label>
        <Select
          value={formData.level}
          onValueChange={(value) => handleChange("level", value)}
          required
        >
          <SelectTrigger id="level">
            <SelectValue placeholder="Select difficulty level" />
          </SelectTrigger>
          <SelectContent>
            {LEVELS.map((level) => (
              <SelectItem key={level.id} value={level.id}>
                {level.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail">
          Thumbnail URL <span className="text-destructive">*</span>
        </Label>
        <Input
          id="thumbnail"
          value={formData.thumbnail}
          onChange={(e) => handleChange("thumbnail", e.target.value)}
          placeholder="e.g., https://example.com/image.jpg"
          type="url"
          required
        />
        <p className="text-xs text-muted-foreground">
          Enter a valid URL for the course thumbnail image
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">
          URL Slug <span className="text-destructive">*</span>
        </Label>
        <Input
          id="slug"
          value={formData.slug}
          onChange={(e) => handleChange("slug", e.target.value)}
          placeholder="e.g., intro-to-cybersecurity"
          required
        />
        <p className="text-xs text-muted-foreground">
          Auto-generated from course name, but can be customized
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
          {isLoading ? "Creating..." : "Create Course"}
        </Button>
      </div>
    </form>
  );
}
