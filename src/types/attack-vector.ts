import { LandingPage, landingPageSchema } from "./landing-page";
import { Course, courseSchema } from "./course";
import z from "zod";
import { EmailTemplate, emailTemplateSchema } from "./email-template";
import { SubmissionForm, submissionFormSchema } from "./form";

export enum Tropicality {
  CUSTOM = "custom",
  HOLIDAY = "holiday",
  SEASONAL = "seasonal",
  SPECIAL = "special",
  ALL_YEAR = "all year",
}

export enum VishingLanguage {
  ENGLISH = "en",
  HINDI = "hi",
}

export const attackVectorSchema = z.object({
  id: z.uuid(),
  tenantId: z.uuid(),
  name: z.string().max(255),
  description: z.string().max(1000).optional(),
  categoryId: z.uuid(),
  subcategoryId: z.uuid(),
  emailTemplateId: z.uuid(),
  emailTemplate: emailTemplateSchema,
  landingPageId: z.uuid(),
  landingPage: landingPageSchema,
  formId: z.uuid().optional(),
  form: submissionFormSchema.optional(),
  courseIds: z.array(z.uuid()).optional(),
  courses: z.array(courseSchema).optional(),
  isActive: z.boolean(),
  startDate: z.number().int().positive().optional(),
  endDate: z.number().int().positive().optional(),
  createdAt: z.number().int().positive(),
  updatedAt: z.number().int().positive(),
  type: z.enum(["click", "submission"]),
  tropicality: z.enum(Tropicality),
  language: z.enum(VishingLanguage),
  agentId: z.string().optional(),
  attackVectorType: z.enum(["vishing", "phishing"]),
  variableValues: z.record(z.string(), z.string()).optional(),
});

export type AttackVector = z.infer<typeof attackVectorSchema>;

export const attackVectorsListSchema = z.array(attackVectorSchema);

export type AttackVectorsList = z.infer<typeof attackVectorsListSchema>;

export const attackVectorQueryParamsSchema = z.object({
  limit: z.number().int().positive().optional(),
  offset: z.number().int().nonnegative().optional(),
  query: z.string().optional(),
  sortKey: z.string().optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
  categoryId: z.uuid().optional(),
  subcategoryId: z.uuid().optional(),
  isActive: z.boolean().optional(),
});

export type AttackVectorQueryParams = z.infer<
  typeof attackVectorQueryParamsSchema
>;

export interface AttackVectorDetailsResponse {
  attackVectors: AttackVector[];
  total: number;
  limit: number;
}

export interface VishingAgent {
  id: string;
  agentName: string;
  agentDescription: string;
  agentPrompt: string;
  agentVariables: string[];
}

export interface VishingAgentsResponse {
  vishingAgents: VishingAgent[];
}

// Form Schemas for Phishing
export const attackVectorBasicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  category: z.string().nonempty("Category is required"),
  subCategory: z.string().nonempty("Subcategory is required"),
  type: z.string().nonempty("Type is required"),
});

export const attackVectorEmailTemplateSchema = z.object({
  id: z.uuid().optional(),
  htmlContent: z.string().min(1, "HTML content is required"),
  subject: z.string().min(1, "Subject is required"),
  emailPrefix: z.string().min(1, "Sender username is required"),
  emailFromDomain: z.string().min(1, "Sender domain is required"),
});

export const attackVectorLandingPageSchema = z.object({
  landingPages: z
    .array(landingPageSchema)
    .min(1, "At least one landing page is required"),
});

export const attackVectorFormsSchema = z.object({
  forms: z
    .array(
      z.object({
        id: z.uuid(),
        name: z.string(),
        description: z.string().optional(),
        htmlPage: z.string(),
        // Make these optional since they might not be present when selecting
        tenantId: z.uuid().optional(),
        createdAt: z.number().optional(),
        updatedAt: z.number().optional(),
      })
    )
    .min(1, "At least one form is required"),
});

export const attackVectorCoursesSchema = z.object({
  courses: z.array(courseSchema).min(1, "At least one course is required"),
});

export const attackVectorTimelineSchema = z
  .object({
    tropicality: z.string(),
    startDate: z.string().min(1, "Start date is required"),
    startTime: z.string().min(1, "Start time is required"),
    endDate: z.string().min(1, "End date is required"),
    endTime: z.string().min(1, "End time is required"),
  })
  .refine(
    (data) => {
      // Only validate if custom timeline
      if (data.tropicality !== "custom") return true;

      // Check if all required fields are filled
      if (
        !data.startDate ||
        !data.startTime ||
        !data.endDate ||
        !data.endTime
      ) {
        return true; // Let individual field validations handle empty fields
      }

      // Combine date and time into full datetime strings
      const startDateTime = new Date(`${data.startDate}T${data.startTime}`);
      const endDateTime = new Date(`${data.endDate}T${data.endTime}`);

      // Check if dates are valid
      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        return false;
      }

      // Compare full datetimes
      return endDateTime > startDateTime;
    },
    {
      message: "End date and time must be after start date and time",
      path: ["endTime"], // Changed from endDate to endTime so error appears in the right place
    }
  );

// Form schema for creating/updating attack vector
export const attackVectorFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters").max(255),
    description: z.string().max(1000).optional(),
    categoryId: z.uuid("Please select a valid category"),
    subcategoryId: z.uuid("Please select a valid subcategory"),
    emailTemplateId: z.uuid("Please select a valid email template").optional(),
    landingPageId: z.uuid("Please select a valid landing page").optional(),
    formId: z.uuid().optional(),
    courseIds: z.array(z.string()).optional(),
    isActive: z.boolean().default(true),
    startDate: z.number().int().positive().optional(),
    endDate: z.number().int().positive().optional(),
  })
  .refine(
    (data) => {
      if (data.startDate && data.endDate) {
        return data.endDate > data.startDate;
      }
      return true;
    },
    {
      message: "End date must be after start date",
      path: ["endDate"],
    }
  );

export type AttackVectorBasicInfoFormData = z.infer<
  typeof attackVectorBasicInfoSchema
>;
export type AttackVectorEmailTemplateFormData = z.infer<
  typeof attackVectorEmailTemplateSchema
>;
export type AttackVectorLandingPageFormData = z.infer<
  typeof attackVectorLandingPageSchema
>;
export type AttackVectorFormsFormData = z.infer<typeof attackVectorFormsSchema>;
export type AttackVectorCoursesFormData = z.infer<
  typeof attackVectorCoursesSchema
>;
export type AttackVectorTimelineFormData = z.infer<
  typeof attackVectorTimelineSchema
>;
export type AttackVectorFormData = z.infer<typeof attackVectorFormSchema>;

// Form Schemas for Vishing
export const attackVectorVishingBasicInfoSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  category: z.string().nonempty("Category is required"),
  subCategory: z.string().nonempty("Subcategory is required"),
  language: z.enum(VishingLanguage),
});

export const attackVectorVishingAgentSelectionSchema = z.object({
  agentId: z.string().nonempty("Agent is required"),
  variableValues: z.record(z.string(), z.string()).optional(),
});

export const attackVectorVishingCourseSelectionSchema = z.object({
  courseIds: z.array(z.string()).nonempty("At least one course is required"),
});

export type AttackVectorVishingBasicInfoFormData = z.infer<
  typeof attackVectorVishingBasicInfoSchema
>;
export type AttackVectorVishingAgentSelectionFormData = z.infer<
  typeof attackVectorVishingAgentSelectionSchema
>;
export type AttackVectorVishingCourseSelectionFormData = z.infer<
  typeof attackVectorVishingCourseSelectionSchema
>;

export enum AttackVectorType {
  CLICK = "Click",
  SUBMISSION = "Submission",
  ATTACHMENT = "Attachment",
}

export const attackTypeMap: Record<string, AttackVectorType> = {
  click: AttackVectorType.CLICK,
  submission: AttackVectorType.SUBMISSION,
  attachment: AttackVectorType.ATTACHMENT,
};

export interface CreateAttackVectorRequest {
  name: string;
  description?: string;
  categoryId: string;
  subcategoryId: string;
  attackType?: AttackVectorType;
  emailTemplateId?: string; // Can send ID OR complete object
  emailTemplate?: {
    id?: string; // Optional - if updating existing template
    name: string; // Required - name of the email template
    htmlBody: string; // Required - the HTML content
    subject: string; // Required
    senderEmail: string; // Required - e.g., "phish@example.com"
    senderDisplayName?: string;
    description?: string;
  };
  landingPageId?: string; // Can send ID OR complete object
  landingPage?: LandingPage; // Can send complete object OR just ID
  submissionFormId?: string; // Changed from formId - single ID, not array
  submissionForm?: SubmissionForm; // Can send complete object OR just ID
  courseId?: string[]; // Changed from courseIds - note: singular name but array type per spec
  course?: Course[]; // Can send complete objects OR just IDs
  isActive?: boolean;
  startDate?: number; // Unix timestamp in SECONDS (not milliseconds)
  endDate?: number; // Unix timestamp in SECONDS (not milliseconds)
  agentId?: string; // For vishing agents
  variableValues?: Record<string, string>; // For vishing agent variables
  language?: VishingLanguage;
}

export interface UpdateAttackVectorRequest extends CreateAttackVectorRequest {
  id: string;
}
