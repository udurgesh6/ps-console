import { useQuery } from "@tanstack/react-query";
import { vishingAgentService } from "@/services";
import { VishingAgentsResponse, ApiError } from "@/types";

export const useGetVishingAgents = () => {
  return useQuery<VishingAgentsResponse, ApiError>({
    queryKey: ['vishing-agents'],
    queryFn: () => vishingAgentService.getVishingAgents(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
