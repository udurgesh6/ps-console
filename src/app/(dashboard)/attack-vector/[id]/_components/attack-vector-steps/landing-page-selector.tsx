import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus, Library as LibraryIcon } from "lucide-react";
import { Library } from "@/components/shared/library";
import { landingPages } from "@/constants/temporary/landing-pages";
import { LandingPage, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorLandingPageSelectorFormData } from "@/types/attack-vector";
import { useFieldArray, useWatch } from "react-hook-form";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { useSidebar } from "@/context/sidebar-context";
import { AddLandingPageForm } from "@/app/(dashboard)/templates/components/add-landing-page";
import { cn } from "@/lib/utils";
import { LandingPageItem } from "./landing-page-item";
import { LandingPagePreview } from "./landing-page-preview";

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
  };

  const handleCreateFromScratch = () => {
    setOpenSidebar("add-template");
  };

  const handleSelectFromLibrary = () => {
    setShowModal(true);
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
                "w-full cursor-pointer p-4 border-2 transition-all duration-200",
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
                  openSidebar === "add-template" ? "bg-primary" : "bg-primary/10"
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
              <span className="font-medium text-left">Create From Scratch</span>
            </button>

            {/* Select From Library Option */}
            <button
              type="button"
              onClick={handleSelectFromLibrary}
              className={cn(
                "w-full cursor-pointer p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "flex items-center gap-3",
                selectedPages.length > 0
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  selectedPages.length > 0 ? "bg-primary" : "bg-primary/10"
                )}
              >
                <LibraryIcon
                  className={cn(
                    "h-5 w-5",
                    selectedPages.length > 0
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

        {/* Selected Pages Tags */}
        {selectedPages.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedPages.map((page, index) => (
                <LandingPagePreview
                  key={page.id}
                  item={page}
                  onRemove={() => handleRemovePage(index)}
                />
              ))}
            </div>
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
            filterGroups={filterGroups}
            items={landingPages}
            actionButtonText="Add Selected"
            onActionButtonClick={handleDone}
            onClose={() => setShowModal(false)}
            renderItem={LandingPageItem}
            isSingleSelect
          />
        </DialogContent>
      </Dialog>

      {/* Sidebar Sheet for Create From Scratch */}
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
