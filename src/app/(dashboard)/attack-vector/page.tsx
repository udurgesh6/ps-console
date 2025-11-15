"use client";

import { useMemo } from "react";
import { Library } from "@/components/shared/library/library";
import type { AttackVector } from "@/types/attack-vector";
import { AttackVectorItem } from "./components/attack-vector-item";
import { dummyAttackVectors, filterGroups } from "@/constants/temporary/attack-vectors";

export default function AttackVector() {
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

  return (
    <Library
      items={dummyAttackVectors}
      filterGroups={filterGroups}
      renderItem={AttackVectorItem}
      showFilters={true}
      showSearch={true}
      showBulkActions={true}
      showActionButton={false}
      bulkActions={bulkActions}
    />
  );
}
