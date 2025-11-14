import React, { useState } from "react";
import { FileText, Plus, Library as LibraryIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AttackVector } from "@/types/attack-vector";
import { Form } from "@/types/form";
import { Library } from "@/components/shared/library/library";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FormsStepProps {
  formData: Partial<AttackVector>;
  onDataChange?: (data: Partial<AttackVector>) => void;
}

export const FormsStep: React.FC<FormsStepProps> = ({
  onDataChange,
}) => {
  const [showFormLibrary, setShowFormLibrary] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data for library components
  const mockForms = [
    { id: "1", name: "Login Form", title: "Login Form", description: "Standard login form template", category: "authentication", tags: ["login", "auth"] },
    { id: "2", name: "Contact Form", title: "Contact Form", description: "Contact information form", category: "contact", tags: ["contact", "info"] },
  ];

  return (
    <>
      <div className="space-y-6">
        <div className="text-center py-8">
          <FileText className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Form Configuration</h3>
          <p className="text-gray-600">Add forms to collect user data during your simulation.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => setShowCreateForm(true)}
          >
            <Plus className="w-6 h-6" />
            <span>Create New Form</span>
          </Button>
          <Button 
            variant="outline" 
            className="h-24 flex flex-col items-center justify-center space-y-2"
            onClick={() => setShowFormLibrary(true)}
          >
            <LibraryIcon className="w-6 h-6" />
            <span>Browse Form Library</span>
          </Button>
        </div>
      </div>

      {/* Form Library Modal */}
      <Library
        showInModal={true}
        isOpen={showFormLibrary}
        onClose={() => setShowFormLibrary(false)}
        items={mockForms}
        actionButtonText="Select Form"
        onActionButtonClick={(selected) => {
          console.log("Selected forms:", selected);
          onDataChange?.({ forms: selected as Form[] });
          setShowFormLibrary(false);
        }}
        renderItem={(item) => (
          <div className="p-4 border rounded-lg">
            <h3 className="font-medium">{item.name}</h3>
            <p className="text-sm text-gray-600">{item.description}</p>
          </div>
        )}
      />

      {/* Create Form Sidebar */}
      <SidebarSheet
        open={showCreateForm}
        onOpenChange={(open) => !open && setShowCreateForm(false)}
        title="Create New Form"
        description="Create a new form template for your attack vector."
      >
        <div className="space-y-4 p-4">
          <div className="space-y-2">
            <Label>Form Name</Label>
            <Input placeholder="Enter form name" />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea placeholder="Describe the form purpose" />
          </div>
          <div className="flex gap-2 pt-4">
            <Button onClick={() => setShowCreateForm(false)}>Create Form</Button>
            <Button variant="outline" onClick={() => setShowCreateForm(false)}>Cancel</Button>
          </div>
        </div>
      </SidebarSheet>
    </>
  );
};
