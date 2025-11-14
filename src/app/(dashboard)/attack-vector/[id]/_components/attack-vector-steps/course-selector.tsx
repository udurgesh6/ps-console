import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { Library } from "@/components/shared/library";
import { Course, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { useFieldArray, useWatch } from "react-hook-form";
import { Tag } from "@/components/shared/tag";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { useSidebar } from "@/context/sidebar-context";
import { AddCourseForm } from "@/app/(dashboard)/templates/components/add-course";

// Dummy course data
export const courses: Course[] = [
  {
    id: "1",
    name: "Introduction to Cybersecurity",
    description: "Learn the fundamentals of cybersecurity including threat detection, risk assessment, and basic security protocols.",
    category: "security",
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400",
    slug: "intro-to-cybersecurity",
    updated_at: "2024-11-01T10:00:00Z",
  },
  {
    id: "2",
    name: "Advanced Phishing Recognition",
    description: "Master the art of identifying sophisticated phishing attempts and social engineering tactics used by attackers.",
    category: "phishing",
    level: "advanced",
    thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400",
    slug: "advanced-phishing-recognition",
    updated_at: "2024-10-28T14:30:00Z",
  },
  {
    id: "3",
    name: "Password Security Best Practices",
    description: "Comprehensive guide to creating, managing, and securing passwords across all your digital assets.",
    category: "security",
    level: "beginner",
    thumbnail: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400",
    slug: "password-security-best-practices",
    updated_at: "2024-11-05T09:15:00Z",
  },
  {
    id: "4",
    name: "Data Privacy and Compliance",
    description: "Understanding GDPR, CCPA, and other data privacy regulations. Learn how to protect sensitive information.",
    category: "compliance",
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400",
    slug: "data-privacy-compliance",
    updated_at: "2024-10-20T16:45:00Z",
  },
  {
    id: "5",
    name: "Social Engineering Defense",
    description: "Recognize and defend against manipulation tactics used in social engineering attacks.",
    category: "phishing",
    level: "intermediate",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400",
    slug: "social-engineering-defense",
    updated_at: "2024-11-03T11:20:00Z",
  },
  {
    id: "6",
    name: "Incident Response Training",
    description: "Learn how to respond effectively to security incidents, contain threats, and recover from breaches.",
    category: "security",
    level: "advanced",
    thumbnail: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400",
    slug: "incident-response-training",
    updated_at: "2024-10-15T13:00:00Z",
  },
];

// Form data type
export interface AttackVectorCourseSelectorFormData {
  courses: Course[];
}

interface CourseSelectorProps {
  form: UseFormReturn<AttackVectorCourseSelectorFormData>;
}

export const CourseSelector = ({ form }: CourseSelectorProps) => {
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

  const filterGroups = [
    {
      title: "Category",
      key: "category",
      options: [
        { label: "Security", value: "security", count: 3 },
        { label: "Phishing", value: "phishing", count: 2 },
        { label: "Compliance", value: "compliance", count: 1 },
      ],
    },
    {
      title: "Level",
      key: "level",
      options: [
        { label: "Beginner", value: "beginner", count: 2 },
        { label: "Intermediate", value: "intermediate", count: 2 },
        { label: "Advanced", value: "advanced", count: 2 },
      ],
    },
  ];

  const bulkActions = [
    {
      label: "Delete",
      onClick: (items) => console.log("Delete courses:", items),
    },
    {
      label: "Export",
      onClick: (items) => console.log("Export courses:", items),
    },
    {
      label: "Preview",
      onClick: (items) => console.log("Preview courses:", items),
    },
  ];

  const isSelected = (item: LibraryItem) => {
    return formValues.some((course) => course.id === item.id);
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

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="space-y-6 py-8 border-2 border-dashed rounded-lg bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-xl font-medium tracking-tight">
            📚 Select Training Course
          </h3>
          <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
            <Button
              className="w-full sm:w-auto"
              variant="default"
              onClick={() => setOpenSidebar("add-course")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Course
            </Button>

            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto" variant="outline">
                  Select from Course Library
                </Button>
              </DialogTrigger>

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
                  filterGroups={filterGroups}
                  bulkActions={bulkActions}
                  items={courses}
                  actionButtonText="Add Selected"
                  onActionButtonClick={handleDone}
                  onClose={() => setShowModal(false)}
                  isSingleSelect
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {selectedCourses.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedCourses.map((course, index) => (
              <Tag
                key={course.id}
                id={course.id}
                name={course.name}
                handleRemove={() => handleRemoveCourse(index)}
              />
            ))}
          </div>
        )}
      </div>
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
