"use client";

import { useMemo } from "react";
import { Library } from "@/components/shared/library";
import { AttackVectorItem } from "../components/attack-vector-item";
import { useGetAttackVectors, useGetAttackVectorFilters } from "@/hooks";
import { ObjectType, LibraryItem } from "@/types";
import { getFilters } from "@/utils/get-filters";

export default function AttackVector() {
  const { data, isLoading, error } = useGetAttackVectors();
  const { data: filtersData, isLoading: filtersLoading } =
    useGetAttackVectorFilters({ objectType: ObjectType.ATTACK_VECTOR });

  const filters = getFilters(filtersData);

  // Transform AttackVector data to LibraryItem format
  const transformedData = useMemo(() => {
    if (!data?.attackVectors) return [];

    return data.attackVectors.map(
      (attackVector): LibraryItem => ({
        id: attackVector.id,
        name: attackVector.name,
        description: attackVector.description,
        type: attackVector.type,
        category: attackVector.categoryId,
        subCategory: attackVector.subcategoryId,
        forms: attackVector.form ? [attackVector.form] : undefined,
        landingPages: attackVector.landingPage
          ? [attackVector.landingPage]
          : undefined,
        courses: attackVector.courses ? attackVector.courses : undefined,
        tropicality: attackVector.tropicality,
        startDate: attackVector.startDate,
        endDate: attackVector.endDate,
        status: attackVector.isActive,
      })
    );
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
        <p className="text-primary">
          Failed to load attack vectors: {error.message}
        </p>
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
      isItemsLoading={isLoading}
      isFilterGroupsLoading={filtersLoading}
      filterGroups={filters}
    />
  );
}
