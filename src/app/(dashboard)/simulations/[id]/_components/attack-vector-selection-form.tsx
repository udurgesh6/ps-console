import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Library as LibraryIcon, X } from "lucide-react";
import { Library } from "@/components/shared/library";
import { AttackVector, LibraryItem } from "@/types";
import { UseFormReturn } from "react-hook-form";
import { SimulationProfileAttackVectorsFormUIData } from "@/types";
import { useFieldArray, useWatch } from "react-hook-form";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttackVectorItem } from "@/app/(dashboard)/attack-vector/components/attack-vector-item";
import { cn } from "@/lib/utils";
import { useGetAttackVectors, useGetAttackVectorFilters } from "@/hooks";
import { ObjectType } from "@/types";

interface SimulationProfileAttackVectorsStepProps {
  form: UseFormReturn<SimulationProfileAttackVectorsFormUIData>;
  isSubmitting?: boolean;
}

export const SimulationProfileAttackVectorsStep = ({
  form,
  isSubmitting = false,
}: SimulationProfileAttackVectorsStepProps) => {
  const { data: attackVectorsData, isLoading: attackVectorsLoading, error: attackVectorsError } = useGetAttackVectors();
  const { data: filterGroupsData, isLoading: filterGroupsLoading, error: filterGroupsError } = useGetAttackVectorFilters({ objectType: ObjectType.ATTACK_VECTOR });

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
    return attackVectorValues?.some((attackVector) => attackVector?.id === item.id) ?? false;
  };

  const handleDone = (selectedItems: LibraryItem[]) => {
    const newSelections = selectedItems as AttackVector[];
    
    console.log('Selected items:', selectedItems);
    console.log('Current attack vectors:', attackVectorValues);
    
    const vectorsToAppend = newSelections.filter(
      (newItem) => !isSelected(newItem)
    );
    
    console.log('Vectors to append:', vectorsToAppend);
    
    vectorsToAppend.forEach((vector) => append(vector));
    
    form.trigger("attackVectors");
    
    setShowModal(false);
  };

  const handleRemoveAttackVector = (index: number) => {
    remove(index);
    form.trigger("attackVectors");
  };

  const handleSelectFromLibrary = () => {
    setShowModal(true);
  };

  const isLoading = attackVectorsLoading || filterGroupsLoading;
  const error = attackVectorsError || filterGroupsError;

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
          <LibraryIcon className="w-8 h-8 text-primary" />
        </div>
        <p className="text-gray-500">Loading attack vectors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-red-200 rounded-lg bg-red-50/50">
        <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
          <X className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-red-900 mb-2">
          Error Loading Attack Vectors
        </h3>
        <p className="text-red-600 mb-4">
          {attackVectorsError?.message || filterGroupsError?.message || "Failed to load data"}
        </p>
        <Button onClick={() => window.location.reload()} variant="outline">
          Retry
        </Button>
      </div>
    );
  }

  const initialSelectedItems = (
    attackVectorValues?.map((av) => av?.id) || []
  ).filter(Boolean);

  return (
    <div className="flex flex-col gap-y-4">
      <div className="space-y-6">
        {/* Select From Library Button */}
        <button
          type="button"
          onClick={handleSelectFromLibrary}
          disabled={isSubmitting}
          className={cn(
            "w-full p-4 border-2 transition-all duration-200 rounded-lg",
            "hover:border-primary hover:shadow-md",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "flex items-center gap-3",
            selectedAttackVectors.length > 0
              ? "border-primary bg-primary/5 shadow-md"
              : "border-border bg-background"
          )}
        >
          <div
            className={cn(
              "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
              selectedAttackVectors.length > 0
                ? "bg-primary"
                : "bg-primary/10"
            )}
          >
            <LibraryIcon
              className={cn(
                "h-5 w-5",
                selectedAttackVectors.length > 0
                  ? "text-primary-foreground"
                  : "text-primary"
              )}
            />
          </div>
          <span className="font-medium text-left">Select Attack Vectors From Library</span>
        </button>
      </div>

      {selectedAttackVectors.length > 0 ? (
        <div className="space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedAttackVectors.map((av, index) => {
              const AttackVectorPreviewCard = () => {
                const containerRef = useRef<HTMLDivElement>(null);
                const [scale, setScale] = useState(0.25);

                useEffect(() => {
                  const updateScale = () => {
                    if (containerRef.current) {
                      const containerWidth = containerRef.current.offsetWidth;
                      const emailWidth = 600;
                      const calculatedScale = (containerWidth / emailWidth) * 0.9;
                      setScale(Math.min(calculatedScale, 0.4));
                    }
                  };

                  updateScale();
                  window.addEventListener('resize', updateScale);
                  return () => window.removeEventListener('resize', updateScale);
                }, []);

                return (
                  <div key={av.id} className="relative group">
                    <Card className="cursor-default py-0 relative aspect-square rounded-lg transition-all hover:shadow-md group overflow-hidden border border-primary">
                      <div 
                        ref={containerRef}
                        className="w-full h-full bg-gray-50 relative overflow-hidden rounded-lg flex items-start justify-center pt-4"
                      >
                        <div
                          style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                            width: '600px',
                            minHeight: '800px',
                          }}
                        >
                          <iframe
                            className="w-full h-full border-0 pointer-events-none bg-white shadow-sm"
                            style={{
                              width: '600px',
                              height: '800px',
                            }}
                            srcDoc={av.emailTemplate.htmlBody}
                            sandbox=""
                            title={`Email preview for ${av.name}`}
                          />
                        </div>
                      </div>
                      
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-3 z-20">
                        <p className="text-white text-sm font-semibold truncate">{av.name}</p>
                        <p className="text-white/80 text-xs truncate">{av.emailTemplate.subject}</p>
                      </div>
                    </Card>

                    {/* Remove Button */}
                    <Button
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-100 transition-opacity duration-200 z-30"
                      onClick={() => handleRemoveAttackVector(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              };

              return <AttackVectorPreviewCard key={av.id} />;
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center border-2 border-dashed border-gray-200 rounded-lg bg-gray-50/50">
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
            <LibraryIcon className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Attack Vectors Selected
          </h3>
          <p className="text-gray-500 mb-6 max-w-xl">
            Choose attack vectors for your simulation profile. Click the button above to select from your library.
          </p>
        </div>
      )}

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Attack Vector Library</DialogTitle>
          </DialogHeader>
          <Library
            items={attackVectorsData?.attackVectors || []}
            filterGroups={filterGroupsData?.categories || []}
            renderItem={AttackVectorItem}
            showFilters={true}
            showSearch={true}
            showBulkActions={true}
            showActionButton={true}
            showInModal={true}
            isOpen={showModal}
            initialSelectedItems={initialSelectedItems}
            onActionButtonClick={handleDone}
            onClose={() => setShowModal(false)}
            isSingleSelect={false}
            isItemsLoading={attackVectorsLoading}
            isFilterGroupsLoading={filterGroupsLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};
