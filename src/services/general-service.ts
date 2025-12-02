import { api } from "@/lib/axios";
import { FiltersParams, FiltersResponse } from "@/types";


export const generalService = {
  getFilters:async (
      params?: FiltersParams
    ): Promise<FiltersResponse> => {
    const response = await api.get<FiltersResponse>(
      "/filters",
      params
    );
    return response;
  }
}