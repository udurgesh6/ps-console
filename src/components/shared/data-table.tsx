"use client";
// @ts-nocheck

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  useReactTable,
  Row,
  Column,
  PaginationState,
} from "@tanstack/react-table";
import {
  Search,
  X,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Filter,
  Columns3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shared/popover";
import { cn } from "@/lib/utils";
import { BulkActions } from "./bulk-actions";

export interface DataTableAction<TData> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (rows: Row<TData>[]) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchKey?: string;
  searchPlaceholder?: string;
  actions?: DataTableAction<TData>[];
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchKey,
  searchPlaceholder = "Search...",
  actions = [],
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination: pagination,
    },
  });

  // const selectedRows = table.getFilteredSelectedRowModel().rows;
  const isFiltered = columnFilters.length > 0 || globalFilter.length > 0;

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          {/* Search - Always visible */}
          {searchKey && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={
                  (table.getColumn(searchKey)?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn(searchKey)?.setFilterValue(event.target.value)
                }
                className="pl-8"
              />
            </div>
          )}

          {/* Clear Filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters();
                setGlobalFilter("");
              }}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <BulkActions
            actions={actions}
            selectedItems={table.getFilteredSelectedRowModel().rows}
            setSelectedItems={(rows) => table.setRowSelection(
              Object.fromEntries(rows.map(r => [r.id, true]))
            )}
          />
          {/* Column Visibility Dropdown - visible on all screens */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-2">
                <Columns3 className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn(onRowClick && "cursor-pointer")}
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <div className="flex items-center gap-1">
          <span className="text-sm text-muted-foreground">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

// Column Header with separate Sort and Filter controls
interface DataTableColumnHeaderProps<TData, TValue> {
  column: Column<TData, TValue>;
  title: string;
  sortable?: boolean;
  filterable?: boolean;
  filterOptions?: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  sortable = false,
  filterable = false,
  filterOptions = [],
}: DataTableColumnHeaderProps<TData, TValue>) {
  const isSorted = column.getIsSorted();
  const selectedValues = new Set(column?.getFilterValue() as string[]);
  const [filterSearch, setFilterSearch] = React.useState("");

  // Filter the options based on search
  const filteredOptions = filterOptions.filter((option) =>
    option.label.toLowerCase().includes(filterSearch.toLowerCase())
  );

  // If no features, just show plain text
  if (!sortable && !filterable) {
    return <span className="font-medium">{title}</span>;
  }

  const handleSort = () => {
    if (!sortable) return;

    if (isSorted === "asc") {
      column.toggleSorting(true); // Change to desc
    } else if (isSorted === "desc") {
      column.clearSorting(); // Clear sorting
    } else {
      column.toggleSorting(false); // Change to asc
    }
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-1 flex-1">
        {/* Title and Sort Button */}
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 px-2 hover:bg-transparent",
            sortable && "cursor-pointer",
            !sortable && "cursor-default"
          )}
          onClick={handleSort}
          disabled={!sortable}
        >
          <span className="font-medium">{title}</span>
          {sortable && (
            <div className="ml-1">
              {isSorted === "asc" ? (
                <ArrowUp className="h-4 w-4" />
              ) : isSorted === "desc" ? (
                <ArrowDown className="h-4 w-4" />
              ) : (
                <ArrowUpDown className="h-4 w-4 opacity-50" />
              )}
            </div>
          )}
        </Button>
      </div>

      {/* Filter Popover */}
      {filterable && filterOptions.length > 0 && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-accent"
            >
              <Filter
                className={cn(
                  "h-4 w-4",
                  selectedValues.size > 0 && "text-primary"
                )}
              />
              {selectedValues.size > 0 && (
                <span className="sr-only">{selectedValues.size} selected</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start">
            <div className="space-y-1">
              <div className="p-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Filter {title}</span>
                  {selectedValues.size > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 px-2 text-xs"
                      onClick={() => {
                        column?.setFilterValue(undefined);
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </div>
                {/* Search input for filters */}
                <div className="relative">
                  <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="Search..."
                    value={filterSearch}
                    onChange={(e) => setFilterSearch(e.target.value)}
                    className="h-8 pl-7 text-sm"
                  />
                </div>
              </div>
              <div className="max-h-[200px] overflow-auto">
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    const Icon = option.icon;

                    return (
                      <div
                        key={option.value}
                        className={cn(
                          "flex items-center px-2 py-1.5 cursor-pointer hover:bg-accent text-sm",
                          isSelected && "bg-accent"
                        )}
                        onClick={() => {
                          if (isSelected) {
                            selectedValues.delete(option.value);
                          } else {
                            selectedValues.add(option.value);
                          }
                          const filterValues = Array.from(selectedValues);
                          column?.setFilterValue(
                            filterValues.length ? filterValues : undefined
                          );
                        }}
                      >
                        <div
                          className={cn(
                            "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "opacity-50"
                          )}
                        >
                          {isSelected && (
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        {Icon && (
                          <Icon className="mr-2 h-4 w-4 text-muted-foreground" />
                        )}
                        <span>{option.label}</span>
                      </div>
                    );
                  })
                ) : (
                  <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                    No results found.
                  </div>
                )}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
