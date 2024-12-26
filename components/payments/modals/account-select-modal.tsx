"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { Account } from "@/interfaces/payments";
import { parseAsBoolean, useQueryState } from "nuqs";
import { useRouter } from "next/navigation";

interface AccountSelectModalProps {
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

export function AccountSelectModal({
  onSelectAccount,
}: AccountSelectModalProps) {
  const router = useRouter();
  const [interPayment, setinterPayment] = useQueryState(
    "international_payment",
    parseAsBoolean.withDefault(false)
  );

  const handleSelectAccount = (account: Account) => {
    // setinterPayment(null);
    router.push(
      `/app/payment/international-payment?currency=${account?.currency}`
    );
  };

  return (
    <Dialog open={interPayment} onOpenChange={setinterPayment}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="py-3">
          <DialogTitle className="text-center">
            International payment
          </DialogTitle>
          <p className="text-xs text-center text-muted-foreground">
            Select the account from which you would like to initiate the money
            transfer.
          </p>
        </DialogHeader>
        <div className="space-y-2">
          {accounts.map((account) => (
            <Card
              key={account.type}
              className="cursor-pointer hover:bg-accent rounded"
              onClick={() => handleSelectAccount(account)}
            >
              <CardContent className="flex items-center justify-between p-3 md:p-4  ">
                <div>
                  <p className="font-medium text-sm">{account.type}</p>
                  <p className="text-xs text-muted-foreground">
                    Available balance: {account.balance}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
