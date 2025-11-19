"use client";

import { useMemo, useRef } from "react";
import { Library, LibraryHandle } from "@/components/shared/library/library";
import { AwarenessProfileItem } from "./_components/awareness-profile-item";
import { AwarenessProfile, LibraryItem } from "@/types";
import { 
  dummyAwarenessProfiles, 
  awarenessProfileFilterGroups 
} from "@/constants/temporary/awareness";

export default function SimulationProfiles() {
  const libraryRef = useRef<LibraryHandle>(null);
  const bulkActions = useMemo(
    () => [
      // {
      //   label: "Activate",
      //   onClick: (items) => {
      //     console.log("Activating profiles:", items);
      //   },
      // },
      // {
      //   label: "Deactivate",
      //   onClick: (items) => {
      //     console.log("Deactivating profiles:", items);
      //   },
      // },
      {
        label: "Delete",
        onClick: (items) => {
          console.log("Duplicating profiles:", items);
        },
      },
    ],
    []
  );

  const renderAwarenessProfile = (item: LibraryItem, isSelected: boolean, isSelectEnabled: boolean) => {
    return AwarenessProfileItem(item as AwarenessProfile, isSelected, isSelectEnabled);
  };

  return (
    <Library
      ref={libraryRef}
      items={dummyAwarenessProfiles}
      filterGroups={awarenessProfileFilterGroups}
      renderItem={renderAwarenessProfile}
      showFilters={true}
      showSearch={true}
      showBulkActions={true}
      showActionButton={false}
      bulkActions={bulkActions}
      showMaxItems={3}
    />
  );
}
