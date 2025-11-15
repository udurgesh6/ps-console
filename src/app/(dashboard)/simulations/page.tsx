"use client";

import { useMemo, useRef } from "react";
import { Library, LibraryHandle } from "@/components/shared/library/library";
import { SimulationProfileItem } from "./_components/simulation-profile-item";
import { SimulationProfile } from "@/types/simulation-profile";
import { 
  dummySimulationProfiles, 
  simulationProfileFilterGroups 
} from "@/constants/temporary/simulation-profiles";

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

  const renderSimulationProfile = (item: unknown, isSelected: boolean, isSelectEnabled: boolean) => {
    return SimulationProfileItem(item as SimulationProfile, isSelected, isSelectEnabled);
  };

  return (
    <Library
      ref={libraryRef}
      items={dummySimulationProfiles}
      filterGroups={simulationProfileFilterGroups}
      renderItem={renderSimulationProfile}
      showFilters={true}
      showSearch={true}
      showBulkActions={true}
      showActionButton={false}
      bulkActions={bulkActions}
    />
  );
}
