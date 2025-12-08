"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { CourseItem } from "../../attack-vector/[id]/_components/attack-vector-steps/course-item";
import { useGetCourseFilters, useGetCourses } from "@/hooks";
import { ObjectType } from "@/types";
import { getFilters } from "@/utils/get-filters";
import { LibraryItem } from "@/types";

export default function Courses() {
  const [showModal, setShowModal] = useState(false);

  const { data: filterGroupsData, isLoading: filterGroupsLoading } =
    useGetCourseFilters({ objectType: ObjectType.COURSE });
  const { data: coursesData, isLoading: coursesLoading } = useGetCourses();

  const filters = getFilters(filterGroupsData);

  const bulkActions = [
    {
      label: "Delete",
      onClick: (items: LibraryItem[]) => console.log("Delete courses:", items),
    },
  ];

  const handleDone = (selectedItems: LibraryItem[]) => {
    console.log("Selected courses:", selectedItems);
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
      filterGroups={filters}
      bulkActions={bulkActions}
      items={coursesData?.courses || []}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
      renderItem={CourseItem}
      isItemsLoading={coursesLoading}
      isFilterGroupsLoading={filterGroupsLoading}
    />
  );
}
