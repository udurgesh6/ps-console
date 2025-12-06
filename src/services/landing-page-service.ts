import { api } from "@/lib/axios";

import type {
  LandingPageGenerateRequest,
  LandingPageGenerateResponse,
  Operation,
  LandingPageOperation,
  LandingPageQueryParams,
  LandingPagesResponse,
  LandingPage,
  CreateLandingPageRequest,
} from "@/types";
import { decodeLandingPage } from "@/utils/encode-decode-base64";

export const landingPageService = {
  generateLandingPage: async (
    data: LandingPageGenerateRequest
  ): Promise<LandingPageGenerateResponse> => {
    const response = await api.post<LandingPageGenerateResponse>(
      "/landing-pages/generate",
      data
    );
    return response;
  },

  getOperationStatus: async (operationId: string): Promise<Operation> => {
    const response = await api.get<Operation>(`/operations/${operationId}`);
    return response;
  },

  getLandingPageOperation: async (
    operationId: string
  ): Promise<LandingPageOperation> => {
    const operation = await api.get<Operation>(`/operations/${operationId}`);

    if (operation.output && operation.output.length > 0) {
      const htmlTemplateOutput = operation.output.find(
        (item) => item.key === "htmlTemplate"
      );

      if (htmlTemplateOutput && htmlTemplateOutput.value) {
        try {
          const decodedHtml = atob(htmlTemplateOutput.value);
          return {
            ...operation,
            output: {
              htmlTemplate: decodedHtml,
            },
          };
        } catch (error) {
          console.error("Failed to decode HTML template:", error);
        }
      }
    }

    return {
      ...operation,
      output: null,
    };
  },

  getLandingPages: async (
    params?: LandingPageQueryParams
  ): Promise<LandingPagesResponse> => {
    const response = await api.get<LandingPagesResponse>(
      "/landing-pages",
      params
    );

    return {
      ...response,
      landingPages: response.landingPages.map(decodeLandingPage),
    };
  },

  getLandingPageById: async (id: string): Promise<LandingPage> => {
    const response = await api.get<LandingPage>(`/landing-pages/${id}`);
    return decodeLandingPage(response);
  },

  createLandingPage: async (
    data: CreateLandingPageRequest
  ): Promise<LandingPage> => {
    const response = await api.post<LandingPage>("/landing-pages", data);
    return decodeLandingPage(response);
  },

  updateLandingPage: async (
    id: string,
    data: CreateLandingPageRequest
  ): Promise<LandingPage> => {
    const response = await api.put<LandingPage>(
      `/landing-pages/${id}`,
      data
    );
    return decodeLandingPage(response);
  },

  deleteLandingPage: async (id: string): Promise<void> => {
    await api.delete(`/landing-pages/${id}`);
  },
};
