"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";

interface AmountInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: (amount: number) => void;
  currency: string;
}

export function AmountInputModal({
  isOpen,
  onClose,
  onProceed,
  currency,
}: AmountInputModalProps) {
  const [amount, setAmount] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {currency} account ({currency})
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-6 mt-4">
          <div className="space-y-2">
            <label className="text-sm">
              Enter the amount of {currency} you wish to deposit
            </label>
            <div className="relative">
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-16"
              />
              <div className="absolute left-0 top-0 h-full px-3 flex items-center bg-purple-100 rounded-l-md">
                {currency}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <ArrowUpDown className="text-gray-400" />
          </div>
          <div className="space-y-2">
            <label className="text-sm">
              Equivalent in {currency.toLowerCase()}
            </label>
            <div className="relative">
              <Input type="number" value={amount} disabled className="pl-16" />
              <div className="absolute left-0 top-0 h-full px-3 flex items-center bg-purple-100 rounded-l-md">
                {currency}
              </div>
            </div>
          </div>
          <Button
            onClick={() => onProceed(Number(amount))}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Proceed
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
