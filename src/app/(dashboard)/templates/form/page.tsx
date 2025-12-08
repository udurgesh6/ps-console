"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { FormItem } from "../../attack-vector/[id]/_components/attack-vector-steps/form-item";
import { useGetSubmissionFormFilters, useGetSubmissionForms } from "@/hooks";
import { ObjectType } from "@/types";
import { getFilters } from "@/utils/get-filters";

export default function FormTemplates() {
  const [showModal, setShowModal] = useState(false);

  const { data: filterGroupsData, isLoading: filterGroupsLoading } =
    useGetSubmissionFormFilters({ objectType: ObjectType.SUBMISSION_FORM });
  const { data: submissionFormsData, isLoading: submissionFormsLoading } =
    useGetSubmissionForms();

  const filters = getFilters(filterGroupsData);

  const bulkActions = [
    {
      label: "Delete",
      onClick: (items) => console.log("Delete form templates:", items),
    },
  ];

  const handleDone = (selectedItems) => {
    console.log("Selected form templates:", selectedItems);
    setShowModal(false);
  };

  return (
    <Library
      title="Form Templates"
      showFilters={true}
      showSearch={true}
      showBulkActions={true}
      showActionButton={true}
      showInModal={false}
      isOpen={showModal}
      filterGroups={filters}
      bulkActions={bulkActions}
      items={submissionFormsData?.submissionForms || []}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
      renderItem={FormItem}
      isItemsLoading={submissionFormsLoading}
      isFilterGroupsLoading={filterGroupsLoading}
    />
  );
}
