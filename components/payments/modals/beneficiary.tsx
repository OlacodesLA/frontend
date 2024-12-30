"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Account, PaymentFormData } from "@/interfaces/payments";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { RECENT_BENEFICIARIES } from "@/data/banks";
import { usePaymentStore } from "@/store/use-paymanet-store";
import { cn } from "@/lib/utils";

interface LocalPaymentModalProps {
  //   isOpen: boolean;
  //   onClose: () => void;
  onSelectAccount: (account: Account) => void;
}

const accounts: Account[] = [
  { type: "NGN account", balance: "N50,000", currency: "NGN" },
  { type: "CAD account", balance: "$2000", currency: "CAD" },
  { type: "GBP account", balance: "0", currency: "GBP" },
  { type: "USD account", balance: "$0", currency: "USD" },
];

export function BeneficiariesModal({ setFormData }: any) {
  const router = useRouter();

  const [localpayment, setLocalPayment] = useQueryState(
    "local_payment",
    parseAsBoolean.withDefault(false)
  );

  const {
    localStep,
    setLocalStep,
    setSelectedBeneficiary,
    setShowBeneficiaries,
    showBeneficiaries,
  } = usePaymentStore((state) => state);

  const handleBeneficiarySelect = (beneficiary: any) => {
    setSelectedBeneficiary(beneficiary);
    setFormData((prev: any) => ({
      ...prev,
      accountNumber: beneficiary.accountNumber,
      bank: beneficiary.bank,
    }));
    setShowBeneficiaries(false);
  };

  return (
    <Dialog open={showBeneficiaries} onOpenChange={setShowBeneficiaries}>
      <DialogContent className="">
        <DialogHeader className="py-3">
          <DialogTitle className="text-center">Beneficiaries</DialogTitle>
          <p className="text-xs text-center text-muted-foreground pt-1">
            Choose from your beneficiaries to continue.
          </p>
        </DialogHeader>
        <div className="flex flex-col items-start min-h-[300px]">
          {RECENT_BENEFICIARIES.map((beneficiary, index) => (
            <div
              key={beneficiary.id}
              className={cn(
                "flex w-full justify-between py-3 cursor-pointer",
                index != 0 ? "border-t border-t-[#6934D31A]" : ""
              )}
              onClick={() => handleBeneficiarySelect(beneficiary)}
            >
              <div className="flex items-center space-x-2">
                <img
                  src={beneficiary.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full mr-3 shadow"
                />
                <div className="text-left">
                  <div className="font-medium text-sm">{beneficiary.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {beneficiary.bank} ({beneficiary.accountNumber})
                  </div>
                </div>
              </div>
              <ChevronRight className="w-5 h-fit cursor-pointer text-muted-foreground" />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
