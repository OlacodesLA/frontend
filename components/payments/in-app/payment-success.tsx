import { CheckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Account, PaymentDetails } from "@/interfaces/in-app";

interface PaymentSuccessProps {
  recipient: Account;
  paymentDetails: PaymentDetails;
  onClose: () => void;
}

export function PaymentSuccess({
  recipient,
  paymentDetails,
  onClose,
}: PaymentSuccessProps) {
  return (
    <div className="px-4 pb-4 pt-2">
      <div className="flex justify-center mb-4">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckIcon className="h-6 w-6 text-green-600" />
        </div>
      </div>
      <p className="text-center text-sm text-muted-foreground pb-6">
        You have successfully sent {paymentDetails.amount}GBP to {recipient.tag}
        , with the account name {recipient.name}. This recipient will receive
        the money in less than 12 hours, click any of the buttons to continue.
      </p>
      <div className="flex gap-4">
        <Button className="flex-1 bg-[#7C3AED] hover:bg-[#6D28D9]">
          View Receipt
        </Button>
        <Button variant="outline" className="flex-1" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  );
}
