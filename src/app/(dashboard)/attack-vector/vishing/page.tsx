"use client";

import { useMemo } from "react";
import { Library } from "@/components/shared/library/library";
import type { AttackVector } from "@/types/attack-vector";
import type { LibraryItem } from "@/types/library";
import { AttackVectorItem } from "../_components/attack-vector-item";
import { useGetAttackVectors } from "@/hooks";

export default function AttackVector() {
  const { data, error } = useGetAttackVectors();

  // Transform AttackVector data to LibraryItem format
  const transformedData = useMemo(() => {
    if (!data?.attackVectors) return [];
    
    return data.attackVectors.map((attackVector): LibraryItem => ({
      id: attackVector.id,
      name: attackVector.name,
      description: attackVector.description,
      type: attackVector.type,
      category: attackVector.categoryId,
      subCategory: attackVector.subcategoryId,
      forms: attackVector.form ? [attackVector.form] : undefined,
      landingPages: attackVector.landingPage ? [attackVector.landingPage] : undefined,
      courses: attackVector.courses ? attackVector.courses : undefined,
      tropicality: attackVector.tropicality,
      startDate: attackVector.startDate,
      endDate: attackVector.endDate,
      status: attackVector.isActive,
    }));
  }, [data?.attackVectors]);

  const bulkActions = useMemo(
    () => [
      {
        label: "Simulate",
        onClick: (items) => {
          console.log(items);
        },
      },
    ],
    []
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-primary">Failed to load attack vectors: {error.message}</p>
      </div>
    );
  }

  return (
    <Library
      items={transformedData}
      renderItem={AttackVectorItem}
      showFilters={true}
      showSearch={true}
      showBulkActions={true}
      showActionButton={false}
      bulkActions={bulkActions}
    />
  );
}
