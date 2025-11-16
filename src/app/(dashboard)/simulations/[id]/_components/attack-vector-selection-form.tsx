import { useState } from "react";
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
import { AttackVector, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { SimulationProfileAttackVectorsFormData } from "@/types";
import { useFieldArray, useWatch } from "react-hook-form";
import { Tag } from "@/components/shared/tag";
import { useRouter } from "next/navigation";
import {
  dummyAttackVectors,
  filterGroups,
} from "@/constants/temporary/attack-vectors";
import { AttackVectorItem } from "@/app/(dashboard)/attack-vector/components/attack-vector-item";

interface SimulationProfileAttackVectorsStepProps {
  form: UseFormReturn<SimulationProfileAttackVectorsFormData>;
  isSubmitting?: boolean;
}

export const SimulationProfileAttackVectorsStep = ({
  form,
  isSubmitting = true,
}: SimulationProfileAttackVectorsStepProps) => {
  const router = useRouter();
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

  const handleCreateFromScratch = () => {
    router.push("/attack-vectors/create");
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-6 py-8 border-2 border-dashed rounded-lg bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center">
        <h3 className="text-xl font-medium tracking-tight">
          ⚡ Select Attack Vectors
        </h3>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-4">
          <Button
            className="w-full sm:w-auto"
            variant="default"
            onClick={handleCreateFromScratch}
            type="button"
            disabled={isSubmitting}
          >
            <Plus className="h-4 w-4" />
            Create From Scratch
          </Button>

          <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogTrigger asChild>
              <Button
                className="w-full sm:w-auto"
                variant="outline"
                type="button"
                disabled={isSubmitting}
              >
                Select From Library
              </Button>
            </DialogTrigger>

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
      </div>

      {selectedAttackVectors.length > 0 && (
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
      )}
    </div>
  );
};
