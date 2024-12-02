"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface VerificationSuccessProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function VerificationSuccess({
  open,
  onOpenChange,
}: VerificationSuccessProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          <div className="rounded-full bg-orange-100 p-3">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <DialogHeader>
            <DialogTitle className="text-center">
              Account Verification Pending
            </DialogTitle>
          </DialogHeader>
          <p className="text-center text-sm text-muted-foreground">
            You have successfully submitted your details for your account
            verification. Our team are reviewing the information provided, and
            your account will be verified if your information matches.
          </p>
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
