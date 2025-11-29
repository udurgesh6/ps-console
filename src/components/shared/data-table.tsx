"use client";
// @ts-nocheck

import { useImperativeHandle, useState, useEffect, useCallback, useRef, forwardRef } from "react";
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
  ChevronDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Loader2,
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
import { Skeleton } from "@/components/ui/skeleton";

export interface DataTableAction<TData> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (rows: Row<TData>[]) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

export interface DataTableRef<TData> {
  resetRowSelection: () => void;
  getSelectedRows: () => Row<TData>[];
  getTable: () => ReturnType<typeof useReactTable<TData>>;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  total?: number;
  searchKey?: string;
  searchPlaceholder?: string;
  actions?: DataTableAction<TData>[];
  onRowClick?: (row: TData) => void;
  onSearchChange?: (value: string) => void;
  onSortingChange?: (sorting: SortingState) => void;
  onPaginationChange?: (pagination: PaginationState) => void;
  manualPagination?: boolean;
  manualSorting?: boolean;
  pageCount?: number;
  pageIndex?: number;
  pageSize?: number;
  isLoading?: boolean;
  searchDebounceMs?: number;
}

function DataTableInner<TData, TValue>(
  {
    columns,
    data,
    total,
    searchKey,
    searchPlaceholder = "Search...",
    actions = [],
    onRowClick,
    onSearchChange,
    onSortingChange,
    onPaginationChange,
    manualPagination = false,
    manualSorting = false,
    pageCount: controlledPageCount,
    pageIndex: controlledPageIndex = 0,
    pageSize: controlledPageSize = 10,
    isLoading = false,
    searchDebounceMs = 500,
  }: DataTableProps<TData, TValue>,
  ref: React.Ref<DataTableRef<TData>>
) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: controlledPageIndex,
    pageSize: controlledPageSize,
  });
  const [searchValue, setSearchValue] = useState("");
  
  const isMountedRef = useRef(false);
  const isUserInteractionRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
  }, []);

  useEffect(() => {
    if (manualPagination) {
      isUserInteractionRef.current = false;
      setPagination({
        pageIndex: controlledPageIndex,
        pageSize: controlledPageSize,
      });
    }
  }, [controlledPageIndex, controlledPageSize, manualPagination]);

  useEffect(() => {
    if (!isMountedRef.current) return;

    const handler = setTimeout(() => {
      if (searchKey) {
        table.getColumn(searchKey)?.setFilterValue(searchValue);
      }
      
      if (onSearchChange) {
        onSearchChange(searchValue);
      }
    }, searchDebounceMs);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue, searchDebounceMs]);

  const handleSortingChange = useCallback(
    (updater: SortingState | ((old: SortingState) => SortingState)) => {
      setSorting((old) => {
        const newSorting = typeof updater === "function" ? updater(old) : updater;
        
        if (onSortingChange && manualSorting && isMountedRef.current && isUserInteractionRef.current) {
          onSortingChange(newSorting);
        }
        
        return newSorting;
      });
    },
    [onSortingChange, manualSorting]
  );

  const handlePaginationChange = useCallback(
    (updater: PaginationState | ((old: PaginationState) => PaginationState)) => {
      setPagination((old) => {
        const newPagination = typeof updater === "function" ? updater(old) : updater;
        
        if (onPaginationChange && manualPagination && isMountedRef.current && isUserInteractionRef.current) {
          onPaginationChange(newPagination);
        }
        
        return newPagination;
      });
    },
    [onPaginationChange, manualPagination]
  );

  const table = useReactTable({
    data,
    columns,
    pageCount: manualPagination ? controlledPageCount : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: handleSortingChange,
    getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: handlePaginationChange,
    manualPagination,
    manualSorting,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
      pagination,
    },
  });

  // Expose methods to parent
  useImperativeHandle(ref, () => ({
    resetRowSelection: () => table.resetRowSelection(),
    getSelectedRows: () => table.getFilteredSelectedRowModel().rows,
    getTable: () => table,
  }), [table]);

  // ... rest of your existing component code (no changes needed below this)
  
  const isFiltered = columnFilters.length > 0 || globalFilter.length > 0;
  const rowCount = total ?? table.getFilteredRowModel().rows.length;

  const handleSearchInputChange = (value: string) => {
    setSearchValue(value);
  };

  const handleClearFilters = () => {
    table.resetColumnFilters();
    setGlobalFilter("");
    setSearchValue("");
    if (onSearchChange) {
      onSearchChange("");
    }
  };

  const handleUserPageChange = (action: () => void) => {
    isUserInteractionRef.current = true;
    action();
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-3xl">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-1 items-center gap-2">
          {/* Search - Always visible */}
          {searchKey && (
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(event) =>
                  handleSearchInputChange(event.target.value)
                }
                className="pl-8 rounded-full border border-gray-300"
              />
              {isLoading && searchValue && (
                <Loader2 className="absolute right-2.5 top-2.5 h-4 w-4 animate-spin text-muted-foreground" />
              )}
            </div>
          )}

          {/* Clear Filters */}
          {isFiltered && (
            <Button
              variant="default"
              onClick={handleClearFilters}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <BulkActions
            actions={actions}
            selectedItems={table.getFilteredSelectedRowModel().rows}
            setSelectedItems={(rows) =>
              table.setRowSelection(
                Object.fromEntries(rows.map((r) => [r.id, true]))
              )
            }
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
          <TableHeader className="sticky top-0 bg-gray-50 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="table table-fixed w-full"
              >
                {headerGroup.headers.map((header, headerIndex) => {
                  return (
                    <TableHead
                      className={cn(
                        headerIndex !== headerGroup.headers.length - 1 &&
                          headerIndex !== 0
                          ? "border-r border-gray-200"
                          : ""
                      )}
                      key={header.id}
                      style={{ width: header.column.getSize() }}
                    >
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
          <TableBody className={cn("block")} style={{ height: "500px" }}>
            {isLoading ? (
              // Loading skeleton
              <>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow
                    key={`skeleton-${index}`}
                    className="table table-fixed w-full"
                    style={{ height: "50px" }}
                  >
                    {columns.map((column, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        style={{ width: column.size || "auto" }}
                      >
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : table.getRowModel().rows?.length ? (
              <>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={cn(
                      "table table-fixed w-full",
                      onRowClick && "cursor-pointer"
                    )}
                    style={{ height: "50px" }}
                    onClick={() => onRowClick?.(row.original)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className="truncate"
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                {/* Fill empty rows if less than 10 items */}
                {Array.from({
                  length: Math.max(0, 10 - table.getRowModel().rows.length),
                }).map((_, index) => (
                  <TableRow
                    key={`empty-${index}`}
                    className="table table-fixed w-full"
                    style={{ height: "50px" }}
                  >
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>&nbsp;</TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            ) : (
              <>
                <TableRow
                  className="table table-fixed w-full"
                  style={{ height: "50px" }}
                >
                  <TableCell colSpan={columns.length} className="text-center">
                    No results.
                  </TableCell>
                </TableRow>
                {/* Fill remaining empty rows */}
                {Array.from({ length: 9 }).map((_, index) => (
                  <TableRow
                    key={`empty-${index}`}
                    className="table table-fixed w-full"
                    style={{ height: "50px" }}
                  >
                    {columns.map((_, cellIndex) => (
                      <TableCell key={cellIndex}>&nbsp;</TableCell>
                    ))}
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        {/* Left side - Rows per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground hidden lg:block">
            Rows per page
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-[70px]"
                disabled={isLoading}
              >
                {table.getState().pagination.pageSize} <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {[10, 20, 30, 50, 100].map((pageSize) => (
                <DropdownMenuCheckboxItem
                  key={pageSize}
                  checked={table.getState().pagination.pageSize === pageSize}
                  onCheckedChange={() => {
                    handleUserPageChange(() => table.setPageSize(pageSize));
                  }}
                >
                  {pageSize}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <span className="text-sm text-muted-foreground hidden lg:block">
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              rowCount
            )}{" "}
            of {rowCount} rows
          </span>
        </div>

        {/* Right side - Page navigation */}
        <div className="flex items-center gap-1">
          {/* First page */}
          <Button
            variant="outline"
            size="sm"
            className="hidden lg:flex lg:h-8 lg:w-8 lg:p-0"
            onClick={() => handleUserPageChange(() => table.setPageIndex(0))}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>

          {/* Previous page */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleUserPageChange(() => table.previousPage())}
            disabled={!table.getCanPreviousPage() || isLoading}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>

          {/* Page numbers */}
          {(() => {
            const currentPage = table.getState().pagination.pageIndex;
            const pageCount = table.getPageCount();
            const pages: (number | string)[] = [];

            if (pageCount <= 3) {
              pages.push(...Array.from({ length: pageCount }, (_, i) => i));
            } else {
              pages.push(0);

              if (currentPage <= 2) {
                pages.push(1, 2, "...", pageCount - 1);
              } else if (currentPage >= pageCount - 2) {
                pages.push("...", pageCount - 2, pageCount - 1);
              } else {
                pages.push(
                  "...",
                  currentPage - 1,
                  currentPage,
                  currentPage + 1,
                  "...",
                  pageCount - 1
                );
              }
            }

            return pages.map((page, idx) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="flex h-8 w-8 items-center justify-center"
                >
                  ...
                </span>
              ) : (
                <Button
                  key={page}
                  variant={page === currentPage ? "default" : "outline"}
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    handleUserPageChange(() =>
                      table.setPageIndex(page as number)
                    )
                  }
                  disabled={isLoading}
                >
                  {(page as number) + 1}
                </Button>
              )
            );
          })()}

          {/* Next page */}
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => handleUserPageChange(() => table.nextPage())}
            disabled={!table.getCanNextPage() || isLoading}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>

          {/* Last page */}
          <Button
            variant="outline"
            size="sm"
            className="hidden lg:flex lg:h-8 lg:w-8 lg:p-0"
            onClick={() =>
              handleUserPageChange(() =>
                table.setPageIndex(table.getPageCount() - 1)
              )
            }
            disabled={!table.getCanNextPage() || isLoading}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

// DataTableColumnHeader remains the same...

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
  const [filterSearch, setFilterSearch] = useState("");

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
            "h-8 !px-0 hover:bg-transparent font-medium text-black",
            sortable && "cursor-pointer",
            !sortable && "cursor-default"
          )}
          onClick={handleSort}
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

export const DataTable = forwardRef(DataTableInner) as <TData, TValue>(
  props: DataTableProps<TData, TValue> & { ref?: React.Ref<DataTableRef<TData>> }
) => ReturnType<typeof DataTableInner>;
