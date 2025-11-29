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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle } from "lucide-react";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  itemCount: number;
  itemType?: string;
}

export function DeleteConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  itemCount,
  itemType = "employee",
}: DeleteConfirmationDialogProps) {
  const [confirmText, setConfirmText] = React.useState("");

  const isConfirmValid = confirmText === "DELETE";

  const handleConfirm = () => {
    if (isConfirmValid) {
      onConfirm();
      setConfirmText("");
      onOpenChange(false);
    }
  };

  const handleCancel = () => {
    setConfirmText("");
    onOpenChange(false);
  };

  // Reset confirmation text when dialog opens/closes
  React.useEffect(() => {
    if (!open) {
      setConfirmText("");
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <AlertTriangle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </div>
          </div>
          <DialogDescription className="pt-3">
            You are about to permanently delete {itemCount} {itemType}
            {itemCount !== 1 ? "s" : ""}. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="confirm">
              Type <span className="font-mono font-bold">DELETE</span> to
              confirm
            </Label>
            <Input
              id="confirm"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder="Type DELETE here"
              className="font-mono"
              autoComplete="off"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleConfirm}
            disabled={!isConfirmValid}
          >
            Delete {itemType}
            {itemCount !== 1 ? "s" : ""}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
