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
import { landingPages } from "@/constants/temporary/landing-pages";
import { LandingPage, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorLandingPageSelectorFormData } from "@/types/attack-vector";
import { useFieldArray, useWatch } from "react-hook-form";
import { Tag } from "@/components/shared/tag";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { useSidebar } from "@/context/sidebar-context";
import { AddLandingPageForm } from "@/app/(dashboard)/templates/components/add-landing-page";

interface LandingPageSelectorProps {
  form: UseFormReturn<AttackVectorLandingPageSelectorFormData>;
}

export const LandingPageSelector = ({ form }: LandingPageSelectorProps) => {
  const { openSidebar, setOpenSidebar, closeSidebar } = useSidebar();

  const [showModal, setShowModal] = useState(false);

  const {
    fields: selectedPages,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "landingPages",
  });

  const formValues = useWatch({
    control: form.control,
    name: "landingPages",
  });

  const filterGroups = [
    {
      title: "Page Type",
      key: "category",
      options: [
        { label: "Product", value: "product", count: 1 },
        { label: "SaaS", value: "saas", count: 1 },
        { label: "Event", value: "event", count: 1 },
        { label: "Portfolio", value: "portfolio", count: 1 },
      ],
    },
    {
      title: "Style",
      key: "style",
      options: [
        { label: "Modern", value: "modern", count: 2 },
        { label: "Creative", value: "creative", count: 2 },
      ],
    },
  ];

  const bulkActions = [
    {
      label: "Delete",
      onClick: (items) => console.log("Delete landing templates:", items),
    },
    {
      label: "Export",
      onClick: (items) => console.log("Export landing templates:", items),
    },
    {
      label: "Preview",
      onClick: (items) => console.log("Preview landing templates:", items),
    },
  ];

  const isSelected = (item: LibraryItem) => {
    return formValues.some((page) => page.id === item.id);
  };

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as LandingPage[];

    const pagesToAppend = newSelections.filter(
      (newItem) => !isSelected(newItem)
    );

    pagesToAppend.forEach((page) => append(page));

    setShowModal(false);
  };

  const handleRemovePage = (index: number) => {
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
            ✨ Select Landing Page Source
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
                  items={landingPages}
                  actionButtonText="Add Selected"
                  onActionButtonClick={handleDone}
                  onClose={() => setShowModal(false)}
                  isSingleSelect
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {selectedPages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedPages.map((page, index) => (
              <Tag
                key={page.id}
                id={page.id}
                name={page.name}
                handleRemove={() => handleRemovePage(index)}
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
        <AddLandingPageForm
          onSubmit={handleCreateTemplate}
          onCancel={closeSidebar}
        />
      </SidebarSheet>
    </>
  );
};
