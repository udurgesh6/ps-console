import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AwarenessProfileBasicInfoFormData } from "@/types/awareness";


interface BasicInfoStepProps {
  form: UseFormReturn<AwarenessProfileBasicInfoFormData>;
  isSubmitting?: boolean;
}

export const AwarenessProfileBasicInfoStep: FC<BasicInfoStepProps> = ({
  form,
  isSubmitting = false,
}) => {  
  return (
    <Form {...form}>
      <div className="space-y-8">
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
                    placeholder="e.g., Awareness Campaign"
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
                <FormLabel className="text-sm font-medium">Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe the awareness profile, its purpose, and how it works..."
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

        <div className="border-t border-gray-200 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium" required>Category</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      field.onChange(value);
                    }}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="ai">AI & Machine Learning</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </Form>
  );
};
