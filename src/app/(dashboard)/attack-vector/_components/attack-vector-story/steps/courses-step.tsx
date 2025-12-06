import React, { useState } from "react";
import { BookOpen, Plus, Library as LibraryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttackVector } from "@/types/attack-vector";
import { Course } from "@/types/course";
import { Library } from "@/components/shared/library/library";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface CoursesStepProps {
  formData: Partial<AttackVector>;
  onDataChange?: (data: Partial<AttackVector>) => void;
}

export const CoursesStep: React.FC<CoursesStepProps> = ({
  onDataChange,
}) => {
  const [showCourseLibrary, setShowCourseLibrary] = useState(false);
  const [showCreateCourse, setShowCreateCourse] = useState(false);

  // Mock data for library components
  const mockCourses = [
    { id: "1", name: "Phishing Awareness", title: "Phishing Awareness", description: "Basic phishing awareness course", category: "security", tags: ["phishing", "awareness"] },
    { id: "2", name: "Password Security", title: "Password Security", description: "Password security best practices", category: "security", tags: ["password", "security"] },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="text-center py-8">
          <BookOpen className="w-16 h-16 mx-auto text-purple-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Course Configuration</h3>
          <p className="text-gray-600">Add educational content to improve security awareness.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => setShowCreateCourse(true)}
          >
            <Plus className="w-6 h-6" />
            <span>Create New Course</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => setShowCourseLibrary(true)}
          >
            <LibraryIcon className="w-6 h-6" />
            <span>Browse Course Library</span>
          </Button>
        </div>
      </div>

      {/* Course Library Modal */}
      <Library
        showInModal={true}
        isOpen={showCourseLibrary}
        onClose={() => setShowCourseLibrary(false)}
        items={mockCourses}
        actionButtonText="Select Course"
        onActionButtonClick={(selected) => {
          console.log("Selected courses:", selected);
          onDataChange?.({ courses: selected as Course[] });
          setShowCourseLibrary(false);
        }}
        renderItem={(item) => (
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        )}
      />

      {/* Create Course Sidebar */}
      <SidebarSheet
        open={showCreateCourse}
        onOpenChange={(open) => !open && setShowCreateCourse(false)}
        title="Create New Course"
        description="Create a new educational course for your attack vector."
      >
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Course Name</Label>
            <Input placeholder="Enter course name" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe the course content" />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowCreateCourse(false)}>Create Course</Button>
            <Button variant="outline" onClick={() => setShowCreateCourse(false)}>Cancel</Button>
          </div>
        </div>
      </SidebarSheet>
    </>
  );
};
