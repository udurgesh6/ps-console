"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { FormItem } from "../../attack-vector/[id]/_components/attack-vector-steps/form-item";

export default function FormTemplates() {
  const [showModal, setShowModal] = useState(false);

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items) => console.log('Delete form templates:', items),
    }
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
      // filterGroups={filterGroups}
      bulkActions={bulkActions}
      items={[]}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
      renderItem={FormItem}
    />
  );
}