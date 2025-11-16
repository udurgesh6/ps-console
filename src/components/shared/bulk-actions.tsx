"use client";

import * as React from "react";
import { Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

export interface BulkAction<TItem> {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (items: TItem[]) => void;
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost";
}

interface BulkActionsProps<TItem> {
  actions: BulkAction<TItem>[];
  selectedItems: TItem[];
  showDivider?: boolean;
  showEndDivider?: boolean;
  setIsSelectEnabled?: (value: boolean) => void;
  isSelectEnabled?: boolean;
  setSelectedItems: (value: TItem[]) => void;
  showInModal?: boolean;
}

export function BulkActions<TItem>({
  actions,
  selectedItems,
  showDivider = true,
  showEndDivider = true,
  setIsSelectEnabled,
  isSelectEnabled = true,
  setSelectedItems,
  showInModal = false,
}: BulkActionsProps<TItem>) {
  const hasSelection = selectedItems.length > 0;

  return (
    <div className="flex items-center justify-end gap-2">
      {/* Desktop View */}
      <div className="hidden md:flex items-center gap-2">
        {!showInModal && isSelectEnabled && setIsSelectEnabled && (
          <>
            <span
              onClick={() => {
                setIsSelectEnabled(false);
                setSelectedItems([]);
              }}
              className="text-sm font-medium text-muted-foreground flex flex-row items-center cursor-pointer"
            >
              {selectedItems.length} selected{" "}
              {isSelectEnabled && <X className="ml-1 h-4 w-4 cursor-pointer" />}
            </span>
            {actions.length > 0 && showDivider && <div className="h-4 w-px bg-border" />}
          </>
        )}
        {!showInModal && !isSelectEnabled && setIsSelectEnabled && (
          <>
            <Button
              variant={"outline"}
              size="sm"
              onClick={() => setIsSelectEnabled(!isSelectEnabled)}
              className="h-8"
            >
              {isSelectEnabled ? "Cancel" : "Select"}
            </Button>
            {actions.length > 0 && showDivider && <div className="h-4 w-px bg-border" />}
          </>
        )}

        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Button
              key={index}
              variant={action.variant || "outline"}
              size="sm"
              onClick={() => action.onClick(selectedItems)}
              className="h-8"
              disabled={!hasSelection}
            >
              {Icon && <Icon className="mr-2 h-4 w-4" />}
              {action.label}
            </Button>
          );
        })}

        {showEndDivider && <div className="h-4 w-px bg-border" />}
      </div>

      {/* Mobile View */}
      {hasSelection && (
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-8 gap-2"
                disabled={!hasSelection}
              >
                <Settings className="h-4 w-4" />
                <span className="text-xs">Actions</span>
                <span className="ml-1 rounded-full bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">
                  {selectedItems.length}
                </span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="w-full">
              <div className="flex flex-col gap-2 py-2">
                {actions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => action.onClick(selectedItems)}
                      disabled={!hasSelection}
                      className="flex items-center gap-2 px-2"
                    >
                      {Icon && <Icon className="mr-1 h-4 w-4" />}
                      {action.label}
                    </DropdownMenuItem>
                  );
                })}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
