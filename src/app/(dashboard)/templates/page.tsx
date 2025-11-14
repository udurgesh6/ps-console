"use client";

import { Library } from "@/components/shared/library";
import { sampleEmailTemplates } from "@/constants/temporary/templates";
import { useState } from "react";

export default function Templates() {
  const [showModal, setShowModal] = useState(false);

  const filterGroups = [
    {
      title: "Target",
      key: "category",
      options: [
        { label: "Everyone", value: "everyone", count: 228 },
        { label: "Design", value: "design", count: 5 },
      ]
    },
    {
      title: "Custom Templates",
      key: "template_type",
      options: [
        { label: "Branded", value: "branded", count: 12 },
        { label: "Generic", value: "generic", count: 8 },
      ]
    }
  ];

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items) => console.log('Delete items:', items),
    },
    {
      label: 'Export',
      onClick: (items) => console.log('Export items:', items),
    },
  ];

  const handleDone = (selectedItems) => {
    console.log('Selected items:', selectedItems);
    setShowModal(false);
  };
  
  return (
    <Library
      title="Templates"
      showFilters={true}
      showSearch={true}
      showBulkActions={true}
      showActionButton={true}
      showInModal={false}
      isOpen={showModal}
      filterGroups={filterGroups}
      bulkActions={bulkActions}
      items={sampleEmailTemplates}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
    />
  );
}
