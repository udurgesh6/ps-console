import { Form, formSchema } from "./form";
import { landingPageSchema, LandingPage } from "./landing-page";
import { Course, courseSchema } from "./course";
import z from "zod";

export interface AttackVector {
    id: string;
    name: string;
    description: string;
    category: string;
    subCategory: string;
    type: "click" | "submission";
    emailHtmlTemplate: string;
    emailSubject: string;
    from: string;
    forms?: Form[];
    landingPages: LandingPage[];
    courses?: Course[];
    tropicality?: string;
    startDate?: Date;
    endDate?: Date;
    status?: boolean;
}

export const attackVectorBasicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().nonempty("Category is required"),
  subCategory: z.string().nonempty("Subcategory is required"),
  type: z.string().nonempty("Type is required"),
});

export const baseAttackVectorEmailHtmlTemplateSchema = z.object({
  htmlContent: z.string().min(1, "HTML content is required"),
  subject: z.string().min(1, "Subject is required"),
  emailPrefix: z.string().min(1, "Sender username is required"),
  emailFromDomain: z.string().min(1, "Sender domain is required"),
});

export const baseAttackVectorLandingPageSelectorSchema = z.object({
    landingPages: z.array(landingPageSchema).min(1, "At least one landing page is required"),
});

export const baseAttackVectorFormsSelectorSchema = z.object({
    forms: z.array(formSchema).min(1, "At least one form is required"),
});

export const baseAttackVectorCoursesSelectorSchema = z.object({
    courses: z.array(courseSchema).min(1, "At least one course is required"),
});

export const baseAttackVectorTimelineSchema = z.object({
  tropicality: z.string().min(1, "Please select a campaign theme"),
  startDate: z.string(),
  startTime: z.string(),
  endDate: z.string(),
  endTime: z.string(),
}).refine((data) => {
  if (data.tropicality === "custom") {
    if (!data.startDate || !data.startTime || !data.endDate || !data.endTime) {
      return false;
    }
    const start = new Date(`${data.startDate}T${data.startTime}`);
    const end = new Date(`${data.endDate}T${data.endTime}`);
    return end > start;
  }
  return true;
}, {
  message: "End date/time must be after start date/time when using custom timeline",
  path: ["endDate"],
});

export type AttackVectorBasicInfoFormData = z.infer<typeof attackVectorBasicInfoSchema>;

export type AttackVectorEmailHtmlTemplateFormData = z.infer<typeof baseAttackVectorEmailHtmlTemplateSchema>;

export type AttackVectorLandingPageSelectorFormData = z.infer<typeof baseAttackVectorLandingPageSelectorSchema>;

export type AttackVectorFormsSelectorFormData = z.infer<typeof baseAttackVectorFormsSelectorSchema>;

export type AttackVectorCoursesSelectorFormData = z.infer<typeof baseAttackVectorCoursesSelectorSchema>;

export const attackVectorEmailHtmlTemplateSchema = baseAttackVectorEmailHtmlTemplateSchema
  .transform((data) => ({
    ...data,
    from: `${data.emailPrefix}@${data.emailFromDomain}`,
  }));

export type AttackVectorTimelineFormData = z.infer<typeof baseAttackVectorTimelineSchema>;
