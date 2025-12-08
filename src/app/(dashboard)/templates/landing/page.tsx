"use client";

import { Library } from "@/components/shared/library";
import { useState } from "react";
import { LandingPageItem } from "../../attack-vector/[id]/_components/attack-vector-steps/landing-page-item";
import { useGetLandingPageFilters, useGetLandingPages } from "@/hooks";
import { LibraryItem, ObjectType } from "@/types";
import { getFilters } from "@/utils/get-filters";

export default function LandingTemplates() {
  const [showModal, setShowModal] = useState(false);

  const { data: filterGroupsData, isLoading: filterGroupsLoading } =
    useGetLandingPageFilters({ objectType: ObjectType.LANDING_PAGE });
  const { data: landingPagesData, isLoading: landingPagesLoading } =
    useGetLandingPages();

  const filters = getFilters(filterGroupsData);

  const bulkActions = [
    {
      label: 'Delete',
      onClick: (items: LibraryItem[]) => console.log('Delete landing templates:', items),
    }
  ];

  const handleDone = (selectedItems: LibraryItem[]) => {
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
      filterGroups={filters}
      bulkActions={bulkActions}
      items={landingPagesData?.landingPages || []}
      actionButtonText="Done"
      onActionButtonClick={handleDone}
      onClose={() => setShowModal(false)}
      renderItem={LandingPageItem}
      isItemsLoading={landingPagesLoading}
      isFilterGroupsLoading={filterGroupsLoading}
    />
  );
}