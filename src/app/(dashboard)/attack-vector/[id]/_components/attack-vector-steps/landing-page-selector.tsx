import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Library as LibraryIcon } from "lucide-react";
import { Library } from "@/components/shared/library";
import { landingPages } from "@/constants/temporary/landing-pages";
import { LandingPage, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { AttackVectorLandingPageSelectorFormData } from "@/types/attack-vector";
import { useFieldArray } from "react-hook-form";
import { cn } from "@/lib/utils";
import { LandingPageItem } from "./landing-page-item";
import { LandingPagePreview } from "./landing-page-preview";
import { TemplateModal } from "./template-modal";
import { EmailPreviewModal } from "@/app/(dashboard)/templates/components/email-preview-modal";

interface LandingPageSelectorProps {
  form: UseFormReturn<AttackVectorLandingPageSelectorFormData>;
}

interface GeneratedTemplateResult {
  subject: string;
  from: string;
  html: string;
}

export const LandingPageSelector = ({ form }: LandingPageSelectorProps) => {

  const [showModal, setShowModal] = useState(false);
  const [isCreateWithAIModalOpen, setIsCreateWithAIModalOpen] = useState(false);
  const [generatedTemplate, setGeneratedTemplate] = useState<GeneratedTemplateResult | null>(null);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);

  const {
    fields: selectedPages,
    append,
    remove,
  } = useFieldArray({
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

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as LandingPage[];

    if (newSelections.length > 0) {
      // Replace the existing item with the new selection
      const newPage = newSelections[0]; // Take the first selected item
      
      // Remove all existing items and add the new one
      while (selectedPages.length > 0) {
        remove(0);
      }
      append(newPage);
    }

    setShowModal(false);
  };

  const handleReplacePage = (newPage: LandingPage) => {
    // Replace the existing item with the new one
    remove(0);
    append(newPage);
  };

  const handleCreateWithAI = () => {
    setIsCreateWithAIModalOpen(true);
  };

  const handleGenerate = (result: GeneratedTemplateResult) => {
    setGeneratedTemplate(result);
    setIsPreviewModalOpen(true);
  };

  const handleUseTemplate = (data: { from: string; subject: string; html: string }) => {
    // Create a new landing page from the generated template
    const newLandingPage: LandingPage = {
      id: `generated-${Date.now()}`,
      name: data.subject || "Generated Landing Page",
      description: "AI-generated landing page",
      category: "generated",
      htmlTemplate: data.html,
    };
    
    // Replace the existing item with the new generated one
    handleReplacePage(newLandingPage);
    setIsPreviewModalOpen(false);
    setGeneratedTemplate(null);
  };

  const handleSelectFromLibrary = () => {
    setShowModal(true);
  };

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2">
            {/* Create With AI Option */}
            <button
              type="button"
              onClick={handleCreateWithAI}
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

        {/* Selected Page Preview */}
        {selectedPages.length > 0 && (
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {selectedPages.map((page, index) => (
                <LandingPagePreview
                  key={page.id}
                  item={page}
                  onRemove={() => remove(index)}
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
            isSingleSelect={true}
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
    </>
  );
};
