"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { LandingPageItem } from "../../attack-vector/[id]/_components/attack-vector-steps/landing-page-item";

export default function LandingTemplates() {
  const [showModal, setShowModal] = useState(false);

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items) => console.log('Delete landing templates:', items),
    },
    // {
    //   label: 'Export',
    //   onClick: (items) => console.log('Export landing templates:', items),
    // },
    // {
    //   label: 'Preview',
    //   onClick: (items) => console.log('Preview landing templates:', items),
    // },
  ];

  const handleDone = (selectedItems) => {
    console.log('Selected landing templates:', selectedItems);
    setShowModal(false);
  };
  
  return (
    <Library
      title="Landing Page Templates"
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
      renderItem={LandingPageItem}
    />
  );
}