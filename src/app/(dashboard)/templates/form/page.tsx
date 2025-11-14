"use client";

import { Library } from "@/components/shared/library";
import { sampleFormTemplates } from "@/constants/temporary/forms";
import { useState } from "react";

export default function FormTemplates() {
  const [showModal, setShowModal] = useState(false);

  const filterGroups = [
    {
      title: "Form Type",
      key: "category",
      options: [
        { label: "Contact", value: "contact", count: 1 },
        { label: "Registration", value: "registration", count: 1 },
        { label: "Survey", value: "survey", count: 1 },
        { label: "Newsletter", value: "newsletter", count: 1 },
      ]
    },
    {
      title: "Complexity",
      key: "complexity",
      options: [
        { label: "Simple", value: "simple", count: 2 },
        { label: "Advanced", value: "advanced", count: 2 },
      ]
    }
  ];

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items) => console.log('Delete form templates:', items),
    },
    {
      label: 'Export',
      onClick: (items) => console.log('Export form templates:', items),
    },
    {
      label: 'Duplicate',
      onClick: (items) => console.log('Duplicate form templates:', items),
    },
  ];

  const handleDone = (selectedItems) => {
    console.log('Selected form templates:', selectedItems);
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
      filterGroups={filterGroups}
      bulkActions={bulkActions}
      items={sampleFormTemplates}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
    />
  );
}