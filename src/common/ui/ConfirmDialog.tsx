import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  variant = "default",
}: ConfirmDialogProps) {
  const handleConfirm = () => {
    onConfirm();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelText}
          </Button>
          <Button variant={variant} onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Hook for using confirm dialog
export function useConfirmDialog() {
  const [dialog, setDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    confirmText?: string;
    cancelText?: string;
    variant?: "default" | "destructive";
    onConfirm?: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    confirmText: "Confirm",
    cancelText: "Cancel",
    variant: "default",
  });

  const confirm = (
    title: string,
    description: string,
    onConfirm: () => void,
    options?: {
      confirmText?: string;
      cancelText?: string;
      variant?: "default" | "destructive";
    }
  ) => {
    setDialog({
      open: true,
      title,
      description,
      confirmText: options?.confirmText,
      cancelText: options?.cancelText,
      variant: options?.variant || "destructive",
      onConfirm,
    });
  };

  const ConfirmDialogComponent = () => (
    <ConfirmDialog
      open={dialog.open}
      onOpenChange={(open) => setDialog(prev => ({ ...prev, open }))}
      title={dialog.title}
      description={dialog.description}
      confirmText={dialog.confirmText}
      cancelText={dialog.cancelText}
      variant={dialog.variant}
      onConfirm={dialog.onConfirm || (() => {})}
    />
  );

  return { confirm, ConfirmDialogComponent };
}
