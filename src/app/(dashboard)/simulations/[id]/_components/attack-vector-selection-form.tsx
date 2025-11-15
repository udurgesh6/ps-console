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
import { AttackVector, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { SimulationProfileAttackVectorsFormData } from "@/types";
import { useFieldArray, useWatch } from "react-hook-form";
import { Tag } from "@/components/shared/tag";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { dummyAttackVectors } from "@/constants/temporary/attack-vectors";
import { AttackVectorItem } from "@/app/(dashboard)/attack-vector/components/attack-vector-item";

interface SimulationProfileAttackVectorsStepProps {
  form: UseFormReturn<SimulationProfileAttackVectorsFormData>;
  isSubmitting?: boolean;
}

export const SimulationProfileAttackVectorsStep: FC<
  SimulationProfileAttackVectorsStepProps
> = ({ form, isSubmitting = false }) => {
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

  const filterGroups = [
    {
      title: "Category",
      key: "category",
      options: [
        { label: "Phishing", value: "phishing", count: 0 },
        { label: "Social Engineering", value: "social-engineering", count: 0 },
        { label: "Malware", value: "malware", count: 0 },
        {
          label: "Credential Harvesting",
          value: "credential-harvesting",
          count: 0,
        },
      ],
    },
    {
      title: "Type",
      key: "type",
      options: [
        { label: "Click", value: "click", count: 0 },
        { label: "Submission", value: "submission", count: 0 },
      ],
    },
    {
      title: "Status",
      key: "status",
      options: [
        { label: "Active", value: "active", count: 0 },
        { label: "Draft", value: "draft", count: 0 },
      ],
    },
  ];

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems.map((item) => item.id);

    // Get currently selected IDs from the form
    const currentIds = attackVectorValues?.map((item) => item.id) || [];

    // Find IDs that need to be added
    const vectorsToAppend = newSelections.filter(
      (newId) => !currentIds.includes(newId)
    );

    // Append new selections as objects with id field
    vectorsToAppend.forEach((id) => append({ id }));

    setShowModal(false);
  };

  const handleRemoveAttackVector = (index: number) => {
    remove(index);
  };

  const handleCreateFromScratch = () => {
    // Navigate to attack vector creation story/flow
    router.push("/attack-vectors/create");
  };

  // Transform attack vectors to LibraryItem format for the Library component
  // const libraryItems: LibraryItem[] = dummyAttackVectors.map((av) => ({
  //   id: av.id,
  //   name: av.name,
  //   description: av.description,
  //   category: av.category,
  //   type: av.type,
  //   status: av.status,
  // }));

  // Get full attack vector details for selected items
  const selectedAttackVectorDetails = selectedAttackVectors
    .map((field) => {
      // field is now always an object with id field from useFieldArray
      const av = dummyAttackVectors.find((vector) => vector.id === field.id);
      return av;
    })
    .filter(Boolean) as AttackVector[];

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
            <Plus className="mr-2 h-4 w-4" />
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
                Select from Attack Vector Library
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

      {selectedAttackVectorDetails.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAttackVectorDetails.map((av, index) => (
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
