"use client";

import { EmployeesTable } from "./components/employee-table";
import { EmployeeSummary } from "./components/employee-summary";

export default function Employee() {
  return (
    <div className="flex flex-col space-y-6">
      <EmployeeSummary />
      <EmployeesTable />
    </div>
  );
}
