"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: number;
  currency: string;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  amount,
  currency,
}: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {currency} account ({currency})
          </DialogTitle>
        </DialogHeader>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-center text-sm text-gray-600">
            Please kindly check to confirm the information provided below, click
            on the make payment button if the information is correct; else click
            on the back button
          </p>
        </div>
        <div className="space-y-4 mt-4">
          <div>
            <p className="text-sm mb-2">
              Amount to be deposited in {currency.toLowerCase()}
            </p>
            <div className="relative">
              <Input
                type="text"
                value={`${amount.toLocaleString()}.00`}
                disabled
                className="pl-16"
              />
              <div className="absolute left-0 top-0 h-full px-3 flex items-center bg-purple-100 rounded-l-md">
                {currency}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={onConfirm}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Make payment ({amount.toLocaleString()})
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              className="text-red-500 hover:text-red-600"
            >
              Back
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
