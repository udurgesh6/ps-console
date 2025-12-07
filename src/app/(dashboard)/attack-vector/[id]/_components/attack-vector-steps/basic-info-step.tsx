import { FC, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AttackVectorBasicInfoFormData,
  FilterObject,
  ObjectType,
} from "@/types";
import { useGetAttackVectorFilters } from "@/hooks";

interface BasicInfoStepProps {
  form: UseFormReturn<AttackVectorBasicInfoFormData>;
  isSubmitting?: boolean;
}

export const BasicInfoStep: FC<BasicInfoStepProps> = ({
  form,
  isSubmitting = false,
}) => {
  const {
    data: attackVectorFilters,
    isLoading: isAttackVectorsFiltersLoading,
    error: attackVectorFiltersError,
  } = useGetAttackVectorFilters({ objectType: ObjectType.ATTACK_VECTOR });

  const selectedCategory = form.watch("category");

  // Get subcategories for the selected category
  const selectedCategorySubcategories = useMemo(() => {
    if (!selectedCategory || !attackVectorFilters?.categories) return [];
    
    const category = attackVectorFilters.categories.find(
      (cat: FilterObject) => cat.id === selectedCategory
    );
    
    return category?.subcategories || [];
  }, [selectedCategory, attackVectorFilters?.categories]);

  return (
    <Form {...form}>
      <div className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium" required>
                  Name
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="e.g., Phishing Email Campaign"
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
                <FormLabel className="text-sm font-medium">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Describe the attack vector, its purpose, and how it works..."
                    rows={5}
                    disabled={isSubmitting}
                    maxLength={1000}
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
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium" required>
                    Type
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: "click" | "submission") => {
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
                      <SelectItem value="click">Click</SelectItem>
                      <SelectItem value="submission">Submission</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col w-full">
                  <FormLabel className="text-sm font-medium" required>
                    Category
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: string) => {
                      field.onChange(value);
                      // Reset subcategory when category changes
                      form.setValue("subCategory", "");
                    }}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {attackVectorFilters?.categories?.map(
                        (category: FilterObject) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subCategory"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-sm font-medium" required>
                    Sub Category
                  </FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    disabled={isSubmitting || !selectedCategory}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 w-full">
                        <SelectValue
                          placeholder={
                            selectedCategory
                              ? "Select sub category"
                              : "Select category first"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedCategorySubcategories.map((subCategory: FilterObject) => (
                        <SelectItem
                          key={subCategory.id}
                          value={subCategory.id}
                        >
                          {subCategory.name}
                        </SelectItem>
                      ))}
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
