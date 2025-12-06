"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { CourseItem } from "../../attack-vector/[id]/_components/attack-vector-steps/course-item";

export default function Courses() {
  const [showModal, setShowModal] = useState(false);

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items) => console.log('Delete courses:', items),
    },
    // {
    //   label: 'Export',
    //   onClick: (items) => console.log('Export courses:', items),
    // },
    // {
    //   label: 'Preview',
    //   onClick: (items) => console.log('Preview courses:', items),
    // },
  ];

  const handleDone = (selectedItems) => {
    console.log('Selected courses:', selectedItems);
    setShowModal(false);
  };
  
  return (
    <Library
      title="Courses"
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
      renderItem={CourseItem}
    />
  );
}