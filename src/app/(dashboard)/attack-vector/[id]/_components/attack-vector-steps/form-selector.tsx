import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Library as LibraryIcon, Plus } from "lucide-react";
import { Library } from "@/components/shared/library";
import { SubmissionForm, LibraryItem, ObjectType } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorFormsFormData } from "@/types/attack-vector";
import { useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormItem } from "./form-item";
import { FormPreview } from "./form-preview";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { useSidebar } from "@/context/sidebar-context";
import { AddFormComponent } from "@/app/(dashboard)/templates/components/add-form";
import { useGetSubmissionFormFilters, useGetSubmissionForms } from "@/hooks";
import { getFilters } from "@/utils/get-filters";

interface FormSelectorProps {
  form: UseFormReturn<AttackVectorFormsFormData>;
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

  const {
    data: filterGroupsData,
    isLoading: filterGroupsLoading,
    error: filterGroupsError,
  } = useGetSubmissionFormFilters({ objectType: ObjectType.SUBMISSION_FORM });
  const { data: submissionFormsData, isLoading: submissionFormsLoading } =
    useGetSubmissionForms();

  const filters = getFilters(filterGroupsData);

  const submissionFormItems: LibraryItem[] =
    submissionFormsData?.submissionForms?.map((form) => ({
      id: form.id,
      name: form.name,
      description: form.description,
      htmlPage: form.htmlPage,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    })) || [];

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as SubmissionForm[];

    if (newSelections.length > 0) {
      // Replace the existing item with the new selection
      const newForm = newSelections[0]; // Take the first selected item

      // Remove all existing items and add the new one
      while (selectedForms.length > 0) {
        remove(0);
      }
      append(newForm);

      // Force re-validation of the entire form
      setTimeout(() => {
        form.trigger("forms");
      }, 0);
    }

    setShowModal(false);
  };

  const handleSelectFromLibrary = () => {
    setShowModal(true);
  };

  const handleCreateFromScratch = () => {
    setOpenSidebar("add-template");
  };

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Create From Scratch Option */}
            <button
              type="button"
              onClick={handleCreateFromScratch}
              className={cn(
                "w-full rounded-l-lg cursor-pointer p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "flex items-center gap-3",
                openSidebar === "add-template"
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  openSidebar === "add-template"
                    ? "bg-primary"
                    : "bg-primary/10"
                )}
              >
                <Plus
                  className={cn(
                    "h-5 w-5",
                    openSidebar === "add-template"
                      ? "text-primary-foreground"
                      : "text-primary"
                  )}
                />
              </div>
              <span className="font-medium text-left">Create from Scratch</span>
            </button>

            {/* Select From Library Option */}
            <button
              type="button"
              onClick={handleSelectFromLibrary}
              className={cn(
                "w-full rounded-r-lg cursor-pointer p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "flex items-center gap-3",
                selectedForms.length > 0
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  selectedForms.length > 0 ? "bg-primary" : "bg-primary/10"
                )}
              >
                <LibraryIcon
                  className={cn(
                    "h-5 w-5",
                    selectedForms.length > 0
                      ? "text-primary-foreground"
                      : "text-primary"
                  )}
                />
              </div>
              <span className="font-medium text-left">
                Select from Template Library
              </span>
            </button>
          </div>
        </div>

        {/* Selected Form Preview */}
        {selectedForms.length > 0 ? (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedForms.map((formItem, index) => (
                <FormPreview
                  key={formItem.id}
                  item={formItem}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
              <LibraryIcon className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No Forms Selected
            </h3>
            <p className="text-gray-500 mb-6 max-w-xl">
              Choose forms for your attack vector. You can create new forms or
              select from your existing library.
            </p>
          </div>
        )}

        {/* Error State */}
        {filterGroupsError && (
          <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-md p-3">
            Failed to load filters. Using default categories.
          </div>
        )}
      </div>

      {/* Library Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
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
            filterGroups={filters}
            items={submissionFormItems}
            actionButtonText="Add Selected"
            onActionButtonClick={handleDone}
            onClose={() => setShowModal(false)}
            renderItem={FormItem}
            isSingleSelect={true}
            isFilterGroupsLoading={filterGroupsLoading}
            isItemsLoading={submissionFormsLoading}
          />
        </DialogContent>
      </Dialog>

      <SidebarSheet
        open={openSidebar === "add-template"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Create New Template"
        description="Create a new template for your phishing simulations."
      >
        <AddFormComponent />
      </SidebarSheet>
    </>
  );
};
