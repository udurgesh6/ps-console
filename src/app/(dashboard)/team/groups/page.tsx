"use client";

import { EmployeeGroupsTable } from "./components/employee-groups-table";
import { EmployeeGroupSummary } from "./components/employee-group-summary";

export default function Groups() {
  return (
    <div className="flex flex-col space-y-6">
      <EmployeeGroupSummary />
      <EmployeeGroupsTable />
    </div>
  );
}
