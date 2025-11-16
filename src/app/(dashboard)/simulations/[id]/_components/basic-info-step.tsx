import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
// import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SimulationProfileBasicInfoFormData } from "@/types";

interface SimulationProfileBasicInfoStepProps {
  form: UseFormReturn<SimulationProfileBasicInfoFormData>;
  isSubmitting?: boolean;
}

export const SimulationProfileBasicInfoStep: FC<SimulationProfileBasicInfoStepProps> = ({
  form,
  isSubmitting = false,
}) => {
  return (
    <Form {...form}>
      <div className="space-y-8">
        {/* Name Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" required>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Executive Phishing Training"
                    disabled={isSubmitting}
                    className="text-base h-11"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Description Section */}
        <div className="border-t border-gray-200 pt-6">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" required>Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe the simulation profile, its objectives, and target audience..."
                    rows={5}
                    disabled={isSubmitting}
                    maxLength={500}
                    className="resize-none text-sm"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Category and Interval Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium" required>Category</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="high-priority">High Priority</SelectItem>
                      <SelectItem value="department-specific">Department Specific</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="organization-wide">Organization Wide</SelectItem>
                      <SelectItem value="customer-facing">Customer Facing</SelectItem>
                      <SelectItem value="onboarding">Onboarding</SelectItem>
                      <SelectItem value="remote-workers">Remote Workers</SelectItem>
                      <SelectItem value="seasonal">Seasonal</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
              control={form.control}
              name="simulationInterval"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium" required>Simulation Interval</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>
        </div>

        {/* Simulation Frequency Slider Section */}
        {/* <div className="border-t border-gray-200 pt-6">
          <FormField
            control={form.control}
            name="simulationFrequency"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between mb-2">
                  <FormLabel className="text-sm font-medium" required>
                    Simulation Frequency
                    <span className="text-xs text-gray-500 ml-1">(per month)</span>
                  </FormLabel>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-semibold text-primary">
                      {field.value}
                    </span>
                    <span className="text-sm text-gray-500">times/month</span>
                  </div>
                </div>
                <FormControl>
                  <Slider
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    min={1}
                    max={30}
                    step={1}
                    disabled={isSubmitting}
                    className="w-full"
                    defaultValue={[15]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div> */}
      </div>
    </Form>
  );
};
