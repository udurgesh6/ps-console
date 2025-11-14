"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { landingPages } from "@/constants/temporary/landing-pages";

export default function LandingTemplates() {
  const [showModal, setShowModal] = useState(false);

  const filterGroups = [
    {
      title: "Page Type",
      key: "category",
      options: [
        { label: "Product", value: "product", count: 1 },
        { label: "SaaS", value: "saas", count: 1 },
        { label: "Event", value: "event", count: 1 },
        { label: "Portfolio", value: "portfolio", count: 1 },
      ]
    },
    {
      title: "Style",
      key: "style",
      options: [
        { label: "Modern", value: "modern", count: 2 },
        { label: "Creative", value: "creative", count: 2 },
      ]
    }
  ];

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items) => console.log('Delete landing templates:', items),
    },
    {
      label: 'Export',
      onClick: (items) => console.log('Export landing templates:', items),
    },
    {
      label: 'Preview',
      onClick: (items) => console.log('Preview landing templates:', items),
    },
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
      filterGroups={filterGroups}
      bulkActions={bulkActions}
      items={landingPages}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
    />
  );
}