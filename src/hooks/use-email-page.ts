import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { emailTemplateService } from "@/services";
import type {
  EmailTemplateGenerateRequest,
  EmailTemplateGenerateResponse,
  Operation,
  EmailTemplateOperation,
  ApiError,
} from "@/types";

export const useGenerateEmailTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation<
    EmailTemplateGenerateResponse,
    ApiError,
    EmailTemplateGenerateRequest
  >({
    mutationFn: (data: EmailTemplateGenerateRequest) =>
      emailTemplateService.generateEmailTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["email-templates"] });
    },
  });
};

export const useGetEmailTemplateOperationStatus = (
  operationId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
  }
) => {
  return useQuery<Operation, ApiError>({
    queryKey: ["operation", operationId],
    queryFn: () => emailTemplateService.getOperationStatus(operationId),
    enabled: options?.enabled ?? !!operationId,
    refetchInterval: options?.refetchInterval,
  });
};

export const useGetEmailTemplateOperation = (
  operationId: string,
  options?: {
    enabled?: boolean;
    refetchInterval?: number | false;
  }
) => {
  return useQuery<EmailTemplateOperation, ApiError>({
    queryKey: ["email-template-operation", operationId],
    queryFn: () => emailTemplateService.getEmailTemplateOperation(operationId),
    enabled: options?.enabled ?? !!operationId,
    refetchInterval: options?.refetchInterval,
  });
};

export const useEmailTemplateGeneration = (
  operationId: string | null,
  options?: {
    enabled?: boolean;
  }
) => {
  return useQuery<EmailTemplateOperation, ApiError>({
    queryKey: ["email-template-generation", operationId],
    queryFn: () => emailTemplateService.getEmailTemplateOperation(operationId!),
    enabled: options?.enabled ?? !!operationId,
    refetchInterval: (query) => {
      // Stop polling if operation is completed or failed
      const data = query.state.data;
      if (data?.status === "completed" || data?.status === "failed") {
        return false;
      }
      // Poll every 3 seconds while processing
      return 3000;
    },
  });
};
