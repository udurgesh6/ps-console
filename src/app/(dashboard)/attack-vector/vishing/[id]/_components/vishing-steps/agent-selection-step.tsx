import { FC, JSX, useMemo, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVishingAgents } from "@/hooks";
import { Info } from "lucide-react";
import { AttackVectorVishingAgentSelectionFormData, VishingAgent } from "@/types";

interface AgentSelectionStepProps {
  form: UseFormReturn<AttackVectorVishingAgentSelectionFormData>;
  isSubmitting?: boolean;
}

export const AgentSelectionStep: FC<AgentSelectionStepProps> = ({
  form,
  isSubmitting = false,
}) => {
  const { data, error, isLoading } = useGetVishingAgents();
  const selectedAgentId = form.watch("agentId");

  const selectedAgent = useMemo(() => {
    return data?.vishingAgents?.find((agent: VishingAgent) => agent.id === selectedAgentId);
  }, [selectedAgentId, data?.vishingAgents]);

  // Initialize variable values when agent is selected
  useEffect(() => {
    if (selectedAgent && selectedAgent.agentVariables) {
      const currentValues = form.getValues("variableValues") || {};
      const initializedValues: Record<string, string> = {};
      
      // Initialize all variables with empty strings if not already set
      selectedAgent.agentVariables.forEach((variable) => {
        initializedValues[variable] = currentValues[variable] || "";
      });
      
      form.setValue("variableValues", initializedValues);
    }
  }, [selectedAgent, form]);

  // Function to render prompt with editable variables
  const renderPromptWithVariables = (prompt: string, variables: string[]) => {
    if (!variables || variables.length === 0) {
      return <p className="text-sm text-gray-700 leading-relaxed">{prompt}</p>;
    }

    const variablePositions: Array<{ variable: string; index: number }> = [];

    // Find all variable positions
    variables.forEach((variable) => {
      const regex = new RegExp(`\\{${variable}\\}`, 'gi');
      let match;
      while ((match = regex.exec(prompt)) !== null) {
        variablePositions.push({
          variable,
          index: match.index,
        });
      }
    });

    // Sort by position (descending to replace from end to start)
    variablePositions.sort((a, b) => b.index - a.index);

    // Split the prompt and insert editable inputs
    const parts: Array<string | JSX.Element> = [];
    let lastIndex = prompt.length;

    variablePositions.forEach(({ variable, index }, i) => {
      const variableLength = variable.length + 2; // +2 for the curly braces
      
      // Add text after this variable
      if (lastIndex > index + variableLength) {
        parts.unshift(prompt.substring(index + variableLength, lastIndex));
      }

      // Add the editable variable
      parts.unshift(
        <span key={`var-${variable}-${i}`} className="inline-flex items-center">
          <FormField
            control={form.control}
            name={`variableValues.${variable}`}
            render={({ field }) => (
              <Input
                {...field}
                value={field.value || ""} // Ensure controlled input with fallback to empty string
                placeholder={variable}
                disabled={isSubmitting}
                className="inline-flex h-7 px-2 py-1 mx-1 text-sm border-0 rounded-3xl focus-visible:ring-0 focus-visible:border-gray-600 min-w-[120px] max-w-[200px] bg-gray-100"
              />
            )}
          />
        </span>
      );

      lastIndex = index;
    });

    // Add remaining text before first variable
    if (lastIndex > 0) {
      parts.unshift(prompt.substring(0, lastIndex));
    }

    return (
      <div className="text-sm text-gray-700 leading-9">
        {parts.map((part, index) => (
          typeof part === 'string' ? <span key={`text-${index}`}>{part}</span> : part
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        {/* Agent Selection Skeleton */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Label */}
            <Skeleton className="h-11 w-full rounded-md" /> {/* Select */}
          </div>
          <Skeleton className="h-16 w-full rounded-md" /> {/* Description */}
        </div>

        {/* Vishing Prompt Skeleton */}
        <div className="border-t border-gray-200 pt-6 space-y-6">
          <div className="space-y-4">
            <Skeleton className="h-4 w-32" /> {/* Title */}
            <Skeleton className="h-3 w-96" /> {/* Subtitle */}
            
            {/* Prompt box skeleton */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Info box skeleton */}
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4">
        <p className="text-sm text-red-800">Failed to load vishing agents. Please try again.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-8">
        {/* Agent Selection */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="agentId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel className="text-sm font-medium" required>
                  Select Agent
                </FormLabel>
                <Select
                  value={field.value}
                  onValueChange={(value: string) => {
                    field.onChange(value);
                    // Reset variable values when agent changes
                    form.setValue("variableValues", {});
                  }}
                  disabled={isSubmitting}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 w-full">
                      <SelectValue placeholder="Select an agent type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data?.vishingAgents?.map((agent: VishingAgent) => (
                      <SelectItem key={agent.id} value={agent.id}>
                        {agent.agentName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Agent Description */}
          {selectedAgent && (
            <div className="rounded-md bg-gray-50 p-4 border border-gray-200">
              <p className="text-sm text-gray-600">{selectedAgent.agentDescription}</p>
            </div>
          )}
        </div>

        {/* Vishing Prompt Section */}
        {selectedAgent && (
          <div className="border-t border-gray-200 pt-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium mb-2">Vishing Prompt</h3>
              <p className="text-xs text-gray-500 mb-4">
                Customize the underlined variables below to personalize your vishing scenario
              </p>
              
              <div className="rounded-lg border border-gray-200 bg-white p-6">
                {renderPromptWithVariables(
                  selectedAgent.agentPrompt,
                  selectedAgent.agentVariables
                )}
              </div>
            </div>

            {/* Information Note */}
            <div className="bg-black text-white rounded-lg p-4 flex items-start gap-3">
              <Info className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="text-sm leading-relaxed">
                <p className="font-medium mb-1">Data Collection Notice</p>
                <p className="text-gray-200">
                  These details will be collected from the target during the vishing call and 
                  used to enhance the authenticity of the {selectedAgent.agentName.toLowerCase()} scenario.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Form>
  );
};
