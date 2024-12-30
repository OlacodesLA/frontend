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

export function LocalPaymentModal() {
  const router = useRouter();
  const [formData, setFormData] = useState<any>({
    account: "uzel-nigerian",
    amount: "",
    accountNumber: "",
    bank: "",
    transactionType: "single",
  });
  const [localpayment, setLocalPayment] = useQueryState(
    "local_payment",
    parseAsBoolean.withDefault(false)
  );

  const handleSelectAccount = (account: Account) => {
    // setlocalpayment(null);
    router.push(
      `/app/payment/international-payment?currency=${account?.currency}`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data", formData);

    if (formData?.account && formData?.transactionType == "single") {
      router.push(`/app/payment/local-payment/single?currency=NGN`);
    }
  };

  return (
    <Dialog open={localpayment} onOpenChange={setLocalPayment}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="py-3">
          <DialogTitle className="text-center">Local payment</DialogTitle>
          <p className="text-xs text-center text-muted-foreground">
            Kindly fill the following information to initiate the money
            transfer.
          </p>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="mb-6">
            <Label>Select the account you want to send from</Label>
            <Select
              value={formData.account}
              onValueChange={(value) =>
                setFormData((prev: any) => ({ ...prev, account: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  defaultValue="uzel-nigerian"
                  placeholder="Select account"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uzel-nigerian">
                  <div className="inline-flex items-center gap-2">
                    <CircleFlag
                      countryCode="ng"
                      height="7"
                      width="7"
                      className="w-5 h-5"
                    />
                    UZEL Nigerian account
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-6">
            <div className="mb-20">
              <Label>Select transaction type</Label>
              <RadioGroup
                defaultValue="single"
                className="grid grid-cols-2 gap-4 mt-2"
                onValueChange={(value) =>
                  setFormData((prev: any) => ({
                    ...prev,
                    transactionType: value as "single" | "mass",
                  }))
                }
              >
                <div>
                  <RadioGroupItem
                    value="single"
                    id="single"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="single"
                    className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary100 peer-data-[state=checked]:bg-primary-light [&:has([data-state=checked])]:border-primary100"
                  >
                    Single Payment
                  </Label>
                </div>
                <div>
                  <RadioGroupItem
                    value="mass"
                    id="mass"
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor="mass"
                    className="flex flex-col cursor-pointer items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary100 [&:has([data-state=checked])]:border-primary100"
                  >
                    Mass Payment
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button type="submit" className="w-full ">
              Proceed
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
