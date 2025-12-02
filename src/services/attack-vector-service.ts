import { api } from "@/lib/axios";
import type {
  CreateAttackVectorRequest,
  UpdateAttackVectorRequest,
  AttackVector,
  AttackVectorDetailsResponse,
  AttackVectorQueryParams,
} from "@/types";

export const attackVectorService = {
  getAttackVectors: async (
    params?: AttackVectorQueryParams
  ): Promise<AttackVectorDetailsResponse> => {
    const response = await api.get<AttackVectorDetailsResponse>(
      "/attack-vectors",
      params
    );
    return response;
  },

  getAttackVectorById: async (id: string): Promise<AttackVector> => {
    const response = await api.get<AttackVector>(`/attack-vectors/${id}`);
    return response;
  },

  createAttackVector: async (data: CreateAttackVectorRequest): Promise<AttackVector> => {
    const response = await api.post<AttackVector>("/attack-vectors", data);
    return response;
  },

  updateAttackVector: async (
    id: string,
    data: UpdateAttackVectorRequest
  ): Promise<AttackVector> => {
    const response = await api.put<AttackVector>(`/attack-vectors/${id}`, data);
    return response;
  },
};
