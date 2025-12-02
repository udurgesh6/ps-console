import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, BookOpen, X, Loader2 } from "lucide-react";
import { Library } from "@/components/shared/library";
import { Course, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { useFieldArray, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { useSidebar } from "@/context/sidebar-context";
import { AddCourseForm } from "@/app/(dashboard)/templates/components/add-course";
import { CourseItem } from "./course-item";
import { cn } from "@/lib/utils";
import { courseFilterGroups } from "@/constants/temporary/courses";
import { useGetCourses } from "@/hooks/use-courses";
export interface AttackVectorCourseSelectorFormData {
  courses: Course[];
}

interface CourseSelectorProps {
  form: UseFormReturn<AttackVectorCourseSelectorFormData>;
}

export const CourseSelector = ({ form }: CourseSelectorProps) => {
  const { data: coursesData, error, isLoading } = useGetCourses();
  const { openSidebar, setOpenSidebar, closeSidebar } = useSidebar();

  const [showModal, setShowModal] = useState(false);

  const {
    fields: selectedCourses,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "courses",
  });

  const formValues = useWatch({
    control: form.control,
    name: "courses",
  });

  // const bulkActions = [
  //   {
  //     label: "Delete",
  //     onClick: (items) => console.log("Delete courses:", items),
  //   },
  //   {
  //     label: "Export",
  //     onClick: (items) => console.log("Export courses:", items),
  //   },
  //   {
  //     label: "Preview",
  //     onClick: (items) => console.log("Preview courses:", items),
  //   },
  // ];

  const isSelected = (item: LibraryItem) => {
    return formValues?.some((course) => course?.id === item.id) ?? false;
  };

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as Course[];

    const coursesToAppend = newSelections.filter(
      (newItem) => !isSelected(newItem)
    );

    coursesToAppend.forEach((course) => append(course));

    setShowModal(false);
  };

  const handleRemoveCourse = (index: number) => {
    remove(index);
  };

  const handleCreateCourse = async () => {
    // TODO: Replace with actual API call
  };

  const handleCreateNewCourse = () => {
    setOpenSidebar("add-course");
  };

  const handleSelectFromLibrary = () => {
    setShowModal(true);
  };

  const initialSelectedItems = (
    formValues?.map((course) => course.id) || []
  ).map((id) => id);

  if (isLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Create New Course Option */}
            <button
              type="button"
              onClick={handleCreateNewCourse}
              className={cn(
                "w-full rounded-l-lg cursor-pointer p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "flex items-center gap-3",
                openSidebar === "add-course"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  openSidebar === "add-course" ? "bg-primary" : "bg-primary/10"
                )}
              >
                <Plus
                  className={cn(
                    "h-5 w-5",
                    openSidebar === "add-course"
                      ? "text-primary-foreground"
                      : "text-primary"
                  )}
                />
              </div>
              <span className="font-medium text-left">Create New Course</span>
            </button>

            {/* Select From Library Option */}
            <button
              type="button"
              onClick={handleSelectFromLibrary}
              className={cn(
                "w-full rounded-r-lg cursor-pointer p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "flex items-center gap-3",
                selectedCourses.length > 0
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  selectedCourses.length > 0 ? "bg-primary" : "bg-primary/10"
                )}
              >
                <BookOpen
                  className={cn(
                    "h-5 w-5",
                    selectedCourses.length > 0
                      ? "text-primary-foreground"
                      : "text-primary"
                  )}
                />
              </div>
              <span className="font-medium text-left">
                Select from Course Library
              </span>
            </button>
          </div>
        </div>

        {selectedCourses.length > 0 ? (
          <div className="space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {selectedCourses.map((course, index) => (
                <div key={course.id} className="relative group">
                  <Card className="cursor-default py-0 relative aspect-square rounded-lg transition-all hover:shadow-md overflow-hidden border border-primary">
                    <div className="w-full h-full relative overflow-hidden">
                      {course.thumbnail ? (
                        <Image
                          src={course.thumbnail}
                          alt={course.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTUwQzE4My40MzEgMTUwIDE3MCAyMzYuNTY5IDE3MCAyNTNDMTcwIDI2OS40MzEgMTgzLjQzMSAyODMgMjAwIDI4M0MyMTYuNTY5IDI4MyAyMzAgMjY5LjQzMSAyMzAgMjUzQzIzMCAyMzYuNTY5IDIxNi41NjkgMTUwIDIwMCAxNTBaIiBmaWxsPSIjOUI5QkEwIi8+Cjwvc3ZnPgo=";
                          }}
                          width={600}
                          height={600}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                          <div className="text-gray-400 text-4xl">📚</div>
                        </div>
                      )}
                    </div>

                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-black/80 p-4 py-2 z-20">
                      <p className="text-white text-sm font-semibold truncate">
                        {course.name}
                      </p>
                      {course.description && (
                        <p className="text-white/80 text-xs truncate mt-1">
                          {course.description}
                        </p>
                      )}
                    </div>
                  </Card>

                  {/* Remove Button */}
                  <Button
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-100 transition-opacity duration-200 z-30"
                    onClick={() => handleRemoveCourse(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Courses Selected
            </h3>
            <p className="text-gray-500 mb-6 max-w-xl">
              Choose training courses for your attack vector. You can create new
              courses or select from your existing library.
            </p>
          </div>
        )}
      </div>

      {/* Library Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Course Library</DialogTitle>
          </DialogHeader>
          <Library
            title="Course Library"
            showFilters={true}
            showSearch={true}
            showBulkActions={true}
            showActionButton={true}
            showInModal={true}
            isOpen={showModal}
            filterGroups={courseFilterGroups}
            items={coursesData?.courses || []}
            actionButtonText="Add Selected"
            onActionButtonClick={handleDone}
            onClose={() => setShowModal(false)}
            renderItem={CourseItem}
            initialSelectedItems={initialSelectedItems}
          />
        </DialogContent>
      </Dialog>
      <SidebarSheet
        open={openSidebar === "add-course"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Create New Course"
        description="Create a new training course for your security awareness program."
      >
        <AddCourseForm onSubmit={handleCreateCourse} onCancel={closeSidebar} />
      </SidebarSheet>
    </>
  );
};
