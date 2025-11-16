import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Sparkles, Library as LibraryIcon, Check } from "lucide-react";
import { Library } from "@/components/shared/library";
import { AttackVector, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { SimulationProfileAttackVectorsFormData } from "@/types";
import { useFieldArray, useWatch } from "react-hook-form";
import { Tag } from "@/components/shared/tag";
import {
  dummyAttackVectors,
  filterGroups,
} from "@/constants/temporary/attack-vectors";
import { AttackVectorItem } from "@/app/(dashboard)/attack-vector/components/attack-vector-item";
import { cn } from "@/lib/utils";

interface SimulationProfileAttackVectorsStepProps {
  form: UseFormReturn<SimulationProfileAttackVectorsFormData>;
  isSubmitting?: boolean;
}

export const SimulationProfileAttackVectorsStep = ({
  form,
  isSubmitting = true,
}: SimulationProfileAttackVectorsStepProps) => {
  const [showModal, setShowModal] = useState(false);

  const {
    fields: selectedAttackVectors,
    append,
    remove,
  } = useFieldArray({
    control: form.control,
    name: "attackVectors",
  });

  const attackVectorValues = useWatch({
    control: form.control,
    name: "attackVectors",
  });

  const letAIDecide = useWatch({
    control: form.control,
    name: "letAIDecideAttackVectors",
  });

  const isSelected = (item: LibraryItem) => {
    return attackVectorValues.some((page) => page.id === item.id);
  };

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as AttackVector[];
    const vectorsToAppend = newSelections.filter(
      (newItem) => !isSelected(newItem)
    );
    vectorsToAppend.forEach((page) => append(page));
    setShowModal(false);
  };

  const handleRemoveAttackVector = (index: number) => {
    remove(index);
  };

  const handleLetAIDecide = () => {
    // Clear any manually selected attack vectors
    // form.setValue("attackVectors", []);
    // Set the AI decision flag
    form.setValue("letAIDecideAttackVectors", true);
  };

  const handleSelectFromLibrary = () => {
    // Unset the AI decision flag
    form.setValue("letAIDecideAttackVectors", false);
    // Open the library modal
    setShowModal(true);
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2">
          {/* Let AI Decide Option */}
          <button
            type="button"
            onClick={handleLetAIDecide}
            disabled={isSubmitting}
            className={cn(
              "w-full p-4 border-2 transition-all duration-200",
              "hover:border-primary hover:shadow-md",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center gap-3",
              letAIDecide
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-background"
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                letAIDecide ? "bg-primary" : "bg-primary/10"
              )}
            >
              <Sparkles
                className={cn(
                  "h-5 w-5",
                  letAIDecide ? "text-primary-foreground" : "text-primary"
                )}
              />
            </div>
            <span className="font-medium text-left">Let AI Decide</span>
          </button>

          {/* Select From Library Option */}
          <button
            type="button"
            onClick={handleSelectFromLibrary}
            disabled={isSubmitting}
            className={cn(
              "w-full p-4 border-2 transition-all duration-200",
              "hover:border-primary hover:shadow-md",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              "flex items-center gap-3",
              !letAIDecide && selectedAttackVectors.length > 0
                ? "border-primary bg-primary/5 shadow-md"
                : "border-border bg-background"
            )}
          >
            <div
              className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                !letAIDecide && selectedAttackVectors.length > 0
                  ? "bg-primary"
                  : "bg-primary/10"
              )}
            >
              <LibraryIcon
                className={cn(
                  "h-5 w-5",
                  !letAIDecide && selectedAttackVectors.length > 0
                    ? "text-primary-foreground"
                    : "text-primary"
                )}
              />
            </div>
            <span className="font-medium text-left">Select From Library</span>
          </button>
        </div>
      </div>

      {/* Show AI Decision Banner */}
      {letAIDecide && (
        <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium">AI-Powered Selection Enabled</p>
            <p className="text-xs text-muted-foreground">
              Attack vectors will be automatically selected based on your
              simulation profile
            </p>
          </div>
        </div>
      )}

      {!letAIDecide && selectedAttackVectors.length > 0 && (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-2">
            {selectedAttackVectors.map((av, index) => (
              <Tag
                key={av.id}
                id={av.id}
                name={av.name}
                handleRemove={() => handleRemoveAttackVector(index)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Library Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Attack Vector Library</DialogTitle>
          </DialogHeader>
          <Library
            items={dummyAttackVectors}
            filterGroups={filterGroups}
            renderItem={AttackVectorItem}
            showFilters={true}
            showSearch={true}
            showBulkActions={true}
            showActionButton={true}
            showInModal={true}
            isOpen={showModal}
            onActionButtonClick={handleDone}
            onClose={() => setShowModal(false)}
            isSingleSelect={false}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
