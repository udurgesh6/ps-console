"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { dummyCourses } from "@/constants/temporary/courses";
import { CourseItem } from "../../attack-vector/[id]/_components/attack-vector-steps/course-item";

export default function Courses() {
  const [showModal, setShowModal] = useState(false);

  const filterGroups = [
    {
      title: "Category",
      key: "category",
      options: [
        { label: "Product", value: "product", count: 1 },
        { label: "SaaS", value: "saas", count: 1 },
        { label: "Event", value: "event", count: 1 },
        { label: "Portfolio", value: "portfolio", count: 1 },
      ]
    },
    {
      title: "Level",
      key: "level",
      options: [
        { label: "Beginner", value: "beginner", count: 2 },
        { label: "Intermediate", value: "intermediate", count: 2 },
        { label: "Advanced", value: "advanced", count: 2 },
      ]
    }
  ];

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
      filterGroups={filterGroups}
      bulkActions={bulkActions}
      items={dummyCourses}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
      renderItem={CourseItem}
    />
  );
}