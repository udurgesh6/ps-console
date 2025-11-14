"use client";

import { useMemo } from "react";
import { Library } from "@/components/shared/library/library";
import type { AttackVector } from "@/types/attack-vector";
import { AttackVectorItem } from "./components/attack-vector-item";
import { FilterGroup } from "@/types";
import { dummyAttackVectors } from "@/constants/temporary/attack-vectors";

const filterGroups: FilterGroup[] = [
  {
    title: "Category",
    key: "category",
    options: [
      { label: "Social Engineering", value: "Social Engineering", count: 2 },
      { label: "Physical Security", value: "Physical Security", count: 1 },
      {
        label: "Business Email Compromise",
        value: "Business Email Compromise",
        count: 1,
      },
      {
        label: "Malware Distribution",
        value: "Malware Distribution",
        count: 1,
      },
      { label: "Reconnaissance", value: "Reconnaissance", count: 1 },
    ],
  },
  {
    title: "Type",
    key: "type",
    options: [
      { label: "Click", value: "click", count: 4 },
      { label: "Submission", value: "submission", count: 2 },
    ],
  },
  {
    title: "Status",
    key: "status",
    options: [
      { label: "Active", value: "true", count: 4 },
      { label: "Inactive", value: "false", count: 2 },
    ],
  },
  {
    title: "Tropicality",
    key: "tropicality",
    options: [
      { label: "Critical", value: "Critical", count: 1 },
      { label: "High", value: "High", count: 2 },
      { label: "Medium", value: "Medium", count: 2 },
      { label: "Low", value: "Low", count: 1 },
    ],
  },
];

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
