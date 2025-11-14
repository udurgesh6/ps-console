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
import { Form, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorFormsSelectorFormData } from "@/types/attack-vector";
import { useFieldArray, useWatch } from "react-hook-form";
import { Tag } from "@/components/shared/tag";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { useSidebar } from "@/context/sidebar-context";
import { sampleFormTemplates } from "@/constants/temporary/forms";
import { AddFormComponent } from "@/app/(dashboard)/templates/components/add-form";

interface FormSelectorProps {
  form: UseFormReturn<AttackVectorFormsSelectorFormData>;
}

export const FormSelector = ({ form }: FormSelectorProps) => {
  const { openSidebar, setOpenSidebar, closeSidebar } = useSidebar();

  const [showModal, setShowModal] = useState(false);

  const {
    fields: selectedForms,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "forms",
  });

  const formValues = useWatch({
    control: form.control,
    name: "forms",
  });

  const filterGroups = [
    {
      title: "Form Type",
      key: "category",
      options: [
        { label: "Contact", value: "contact", count: 1 },
        { label: "Registration", value: "registration", count: 1 },
        { label: "Survey", value: "survey", count: 1 },
        { label: "Newsletter", value: "newsletter", count: 1 },
      ]
    },
    {
      title: "Complexity",
      key: "complexity",
      options: [
        { label: "Simple", value: "simple", count: 2 },
        { label: "Advanced", value: "advanced", count: 2 },
      ]
    }
  ];

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items) => console.log('Delete form templates:', items),
    },
    {
      label: 'Export',
      onClick: (items) => console.log('Export form templates:', items),
    },
    {
      label: 'Duplicate',
      onClick: (items) => console.log('Duplicate form templates:', items),
    },
  ];

  const isSelected = (item: LibraryItem) => {
    return formValues.some((page) => page.id === item.id);
  };

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as Form[];

    const pagesToAppend = newSelections.filter(
      (newItem) => !isSelected(newItem)
    );

    pagesToAppend.forEach((page) => append(page));

    setShowModal(false);
  };

  const handleRemoveForm = (index: number) => {
    remove(index);
  };

  const handleCreateTemplate = async () => {
    // TODO: Replace with actual API call
  }

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="space-y-6 py-8 border-2 border-dashed rounded-lg bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center">
          <h3 className="text-xl font-medium tracking-tight">
            ✨ Select Form Source
          </h3>
          <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
            <Button className="w-full sm:w-auto" variant="default" onClick={() => setOpenSidebar("add-template")}>
              <Plus className="mr-2 h-4 w-4" />
              Create From Scratch
            </Button>

            <Dialog open={showModal} onOpenChange={setShowModal}>
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto" variant="outline">
                  Select from Template Library
                </Button>
              </DialogTrigger>

              <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Template Library</DialogTitle>
                </DialogHeader>
                <Library
                  title="Template Library"
                  showFilters={true}
                  showSearch={true}
                  showBulkActions={true}
                  showActionButton={true}
                  showInModal={true}
                  isOpen={showModal}
                  filterGroups={filterGroups}
                  bulkActions={bulkActions}
                  items={sampleFormTemplates}
                  actionButtonText="Add Selected"
                  onActionButtonClick={handleDone}
                  onClose={() => setShowModal(false)}
                  isSingleSelect
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {selectedForms.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedForms.map((form, index) => (
              <Tag
                key={form.id}
                id={form.id}
                name={form.name}
                handleRemove={() => handleRemoveForm(index)}
              />
            ))}
          </div>
        )}
      </div>
      <SidebarSheet
        open={openSidebar === "add-template"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Create New Template"
        description="Create a new template for your phishing simulations."
      >
        <AddFormComponent
          onSubmit={handleCreateTemplate}
          onCancel={closeSidebar}
        />
      </SidebarSheet>
    </>
  );
};
