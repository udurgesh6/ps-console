import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Library as LibraryIcon, Plus } from "lucide-react";
import { Library } from "@/components/shared/library";
import { LandingPage, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorLandingPageFormData } from "@/types/attack-vector";
import { useFieldArray, useWatch } from "react-hook-form";  // ✅ Add useWatch
import { cn } from "@/lib/utils";
import { LandingPageItem } from "./landing-page-item";
import { LandingPagePreview } from "./landing-page-preview";
import { TemplateModal } from "./template-modal";
import { EmailPreviewModal } from "@/app/(dashboard)/templates/components/email-preview-modal";
import { SidebarSheet } from "@/components/shared/sidebar-sheet";
import { AddLandingPageForm } from "@/app/(dashboard)/templates/components/add-landing-page";
import { useSidebar } from "@/context/sidebar-context";
import { useGetLandingPageFilters, useGetLandingPages } from "@/hooks";
import { ObjectType } from "@/types";

interface LandingPageSelectorProps {
  form: UseFormReturn<AttackVectorLandingPageFormData>;
}

interface GeneratedTemplateResult {
  subject: string;
  from: string;
  html: string;
}

export const LandingPageSelector = ({ form }: LandingPageSelectorProps) => {
  const { openSidebar, setOpenSidebar, closeSidebar } = useSidebar();

  const [showModal, setShowModal] = useState(false);
  const [isCreateWithAIModalOpen, setIsCreateWithAIModalOpen] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] =
    useState<GeneratedTemplateResult | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const {
    fields: selectedPages,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "landingPages",
  });

  const formValues = useWatch({
    control: form.control,
    name: "landingPages",
  });

  const {
    data: filterGroupsData,
    isLoading: filterGroupsLoading,
  } = useGetLandingPageFilters({ objectType: ObjectType.LANDING_PAGE });

  const { data: landingPagesData, isLoading: landingPagesLoading } =
    useGetLandingPages();

  const filterGroups = filterGroupsData?.categories || [];

  const landingPageItems: LibraryItem[] =
    landingPagesData?.landingPages?.map((page) => ({
      id: page.id,
      name: page.name,
      description: page.description,
      htmlPage: page.htmlPage,
      tenantId: page.tenantId,
      createdAt: page.createdAt,
      updatedAt: page.updatedAt,
    })) || [];

  const initialSelectedItems = (
    formValues?.map((page) => page?.id) || []
  ).filter(Boolean);

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as LandingPage[];

    console.log('Selected items:', selectedItems);
    console.log('New selections:', newSelections);

    if (newSelections.length > 0) {
      const newPage = newSelections[0];
      
      console.log('Current pages before:', form.getValues("landingPages"));

      form.setValue("landingPages", [newPage], {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });

      console.log('Pages after setValue:', form.getValues("landingPages"));
      console.log('Form errors:', form.formState.errors);
      console.log('Form isValid:', form.formState.isValid);
    }

    setShowModal(false);
  };

  const handleReplacePage = (newPage: LandingPage) => {
    form.setValue("landingPages", [newPage], {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const handleCreateWithAI = () => {
    setIsCreateWithAIModalOpen(true);
  };

  const handleGenerate = (result: GeneratedTemplateResult) => {
    setGeneratedTemplate(result);
    setIsPreviewModalOpen(true);
  };

  const handleUseTemplate = (data: {
    from: string;
    subject: string;
    html: string;
  }) => {
    const newLandingPage: LandingPage = {
      id: `generated-${crypto.randomUUID()}`,
      name: data.subject || "Generated Landing Page",
      description: "AI-generated landing page",
      htmlPage: data.html,
      tenantId: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    handleReplacePage(newLandingPage);
    setIsPreviewModalOpen(false);
    setGeneratedTemplate(null);
  };

  const handleSelectFromLibrary = () => {
    setShowModal(true);
  };

  const uploadLandingPageTemplate = () => {
    setOpenSidebar("add-template");
  };

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Create With AI Option */}
            <button
              type="button"
              onClick={handleCreateWithAI}
              className={cn(
                "w-full rounded-l-lg cursor-pointer p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "flex items-center gap-3",
                isCreateWithAIModalOpen
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isCreateWithAIModalOpen ? "bg-primary" : "bg-primary/10"
                )}
              >
                <Sparkles
                  className={cn(
                    "h-5 w-5",
                    isCreateWithAIModalOpen
                      ? "text-primary-foreground"
                      : "text-primary"
                  )}
                />
              </div>
              <span className="font-medium text-left">Create With AI</span>
            </button>
            <button
              type="button"
              onClick={uploadLandingPageTemplate}
              className={cn(
                "w-full cursor-pointer p-4 border-2 transition-all duration-200",
                "hover:border-primary hover:shadow-md",
                "flex items-center gap-3",
                isCreateWithAIModalOpen
                  ? "border-primary bg-primary/5 shadow-md"
                  : "border-border bg-background"
              )}
            >
              <div
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  isCreateWithAIModalOpen ? "bg-primary" : "bg-primary/10"
                )}
              >
                <Plus
                  className={cn(
                    "h-5 w-5",
                    isCreateWithAIModalOpen
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

        {/* Selected Page Preview */}
        {selectedPages.length > 0 ? (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedPages.map((page, index) => (
                <LandingPagePreview
                  key={page.id}
                  item={page}
                  onRemove={() => {
                    remove(index);
                    form.trigger("landingPages");
                  }}
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
              No Landing Pages Selected
            </h3>
            <p className="text-gray-500 mb-6 max-w-xl">
              Choose landing pages for your attack vector. You can create new
              pages or select from your existing library.
            </p>
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
            items={landingPageItems}
            actionButtonText="Add Selected"
            onActionButtonClick={handleDone}
            onClose={() => setShowModal(false)}
            renderItem={LandingPageItem}
            isSingleSelect={true}
            initialSelectedItems={initialSelectedItems}
            isItemsLoading={landingPagesLoading}
            isFilterGroupsLoading={filterGroupsLoading}
          />
        </DialogContent>
      </Dialog>

      {/* AI Template Generation Modal */}
      <TemplateModal
        isOpen={isCreateWithAIModalOpen}
        onClose={() => setIsCreateWithAIModalOpen(false)}
        onGenerate={handleGenerate}
        type="landing"
      />

      {/* Landing Page Preview Modal */}
      <EmailPreviewModal
        open={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        htmlTemplate={generatedTemplate?.html}
        title="Landing Page Preview"
        from={generatedTemplate?.from || "Generated Landing Page"}
        subject={generatedTemplate?.subject || "Landing Page Title"}
        templateType="landing"
        onUseTemplate={handleUseTemplate}
      />
      <SidebarSheet
        open={openSidebar === "add-template"}
        onOpenChange={(open) => !open && closeSidebar()}
        title="Create New Landing Page"
        description="Create a new landing page for your phishing simulations."
      >
        <AddLandingPageForm />
      </SidebarSheet>
    </>
  );
};
