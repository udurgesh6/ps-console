"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetEmployeeGroups } from "@/hooks/use-employee-group";
import { Loader2, Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AssignGroupDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (groupId: string) => void;
  employeeCount: number;
}

export function AssignGroupDialog({
  open,
  onOpenChange,
  onConfirm,
  employeeCount,
}: AssignGroupDialogProps) {
  const [selectedGroupId, setSelectedGroupId] = React.useState<string>("");
  const [comboboxOpen, setComboboxOpen] = React.useState(false);

  const { data, isLoading } = useGetEmployeeGroups();

  const selectedGroup = React.useMemo(
    () => data?.employeeGroups?.find((group) => group.id === selectedGroupId),
    [data?.employeeGroups, selectedGroupId]
  );

  const handleConfirm = () => {
    if (selectedGroupId) {
      onConfirm(selectedGroupId);
      setSelectedGroupId("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setSelectedGroupId("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Assign Group</DialogTitle>
          <DialogDescription>
            Select a group to assign to {employeeCount} selected employee
            {employeeCount !== 1 ? "s" : ""}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="group">
              Employee Group <span className="text-destructive">*</span>
            </Label>
            {isLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <Popover open={comboboxOpen} onOpenChange={setComboboxOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={comboboxOpen}
                    className="w-full justify-between"
                  >
                    {selectedGroup ? (
                      <span>
                        {selectedGroup.name} ({selectedGroup.employeeCount}{" "}
                        employees)
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Select a group...
                      </span>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[552px] p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search groups..." />
                    <CommandEmpty>No groups found.</CommandEmpty>
                    <ScrollArea className="h-[300px]">
                      <CommandGroup>
                        {data?.employeeGroups && data.employeeGroups.length > 0 ? (
                          data.employeeGroups.map((group) => (
                            <CommandItem
                              key={group.id}
                              value={group.name}
                              onSelect={() => {
                                setSelectedGroupId(group.id);
                                setComboboxOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedGroupId === group.id
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              <div className="flex flex-col">
                                <span className="font-medium">{group.name}</span>
                                <span className="text-sm text-muted-foreground">
                                  {group.employeeCount} employee
                                  {group.employeeCount !== 1 ? "s" : ""}
                                </span>
                              </div>
                            </CommandItem>
                          ))
                        ) : (
                          <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                            No groups available
                          </div>
                        )}
                      </CommandGroup>
                    </ScrollArea>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm} disabled={!selectedGroupId}>
            Assign Group
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
