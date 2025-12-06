"use client";

import * as React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course, CourseFormData, courseFormSchema, ObjectType } from "@/types";
import { useCreateCourse, useGetCourseFilters, useUpdateCourse } from "@/hooks";
import { useSidebar } from "@/context/sidebar-context";
import toast from "react-hot-toast";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

interface AddCourseFormProps {
  courseDetail?: Partial<Course>;
}

export function AddCourseForm({ courseDetail }: AddCourseFormProps) {
  const { closeSidebar } = useSidebar();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  const {
    data: filterGroupsData,
    isLoading: filterGroupsLoading,
    // error: filterGroupsError,
  } = useGetCourseFilters({ objectType: ObjectType.COURSE });

  const categories = filterGroupsData?.categories || [];

  const isEditMode = !!courseDetail?.id;

  const form = useForm<CourseFormData>({
    resolver: zodResolver(courseFormSchema),
    defaultValues: {
      name: courseDetail?.name || "",
      description: courseDetail?.description || "",
      category: courseDetail?.category || "",
      episodes: courseDetail?.episodes || [],
    },
  });

  const {
    fields: episodes,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "episodes",
  });

  const handleSubmit = async (data: CourseFormData) => {
    try {
      if (isEditMode && courseDetail?.id) {
        await updateCourse.mutateAsync({
          id: courseDetail.id,
          data,
        });
        toast.success("Course updated successfully");
      } else {
        await createCourse.mutateAsync(data);
        toast.success("Course created successfully");
      }
      closeSidebar();
    } catch (error) {
      console.error(error);
      toast.error(
        isEditMode ? "Failed to update course" : "Failed to create course"
      );
    }
  };

  const addEpisode = () => {
    append({
      title: "",
      description: "",
      duration: 1,
      order: episodes.length + 1,
      video: [{ language: "English", url: "" }],
      subtitle: [],
    });
  };

  const isMutating = createCourse.isPending || updateCourse.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Course Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g., Phishing Awareness Fundamentals"
                    {...field}
                    disabled={isMutating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Description <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description of what students will learn"
                    rows={3}
                    {...field}
                    disabled={isMutating}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>
                  Category <span className="text-destructive">*</span>
                </FormLabel>
                <Select
                  disabled={isMutating}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {filterGroupsLoading ? (
                      <div className="flex flex-col gap-y-4">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-full" />
                      </div>
                    ) : (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        {/* Episodes Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Episodes</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addEpisode}
              disabled={isMutating}
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Episode
            </Button>
          </div>

          {episodes.length === 0 ? (
            <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg">
              <p className="text-sm">No episodes added yet</p>
              <p className="text-xs mt-1">
                Click &quot;Add Episode&quot; to create your first episode
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {episodes.map((episode, index) => (
                <div
                  key={episode.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Episode {index + 1}</h4>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(index)}
                      disabled={isMutating}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <FormField
                    control={form.control}
                    name={`episodes.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Title <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Episode title"
                            {...field}
                            disabled={isMutating}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name={`episodes.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Episode description"
                            rows={2}
                            {...field}
                            disabled={isMutating}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name={`episodes.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Duration (minutes){" "}
                            <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              placeholder="15"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              disabled={isMutating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`episodes.${index}.order`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Order <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="1"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value))
                              }
                              disabled={isMutating}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name={`episodes.${index}.video.0.url`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Video URL <span className="text-destructive">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="url"
                            placeholder="https://cdn.example.com/video.mp4"
                            {...field}
                            disabled={isMutating}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={closeSidebar}
            disabled={isMutating}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isMutating}>
            {isMutating
              ? "Saving..."
              : isEditMode
                ? "Update Course"
                : "Create Course"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
