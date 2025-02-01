"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TagInput } from "./tag-input";
import { AccountMatch } from "./account-match";
import { AccountSelection } from "./account-selection";
import type { PaymentStep, Account } from "@/interfaces/in-app";
import { parseAsBoolean, useQueryState } from "nuqs";

interface PaymentFlowProps {
  onClose: () => void;
}

export default function PaymentFlow() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<PaymentStep>("tag-input");
  const [recipient, setRecipient] = useState<Account | null>(null);

  const [inApppayment, setInAppPayment] = useQueryState(
    "in_app",
    parseAsBoolean.withDefault(false)
  );

  const handleClose = () => {
    setInAppPayment(false);
  };

  const steps = {
    "tag-input": {
      title: "In-app payment",
      component: (
        <TagInput
          onNext={(account) => {
            setRecipient(account);
            setCurrentStep("account-match");
          }}
        />
      ),
    },
    "account-match": {
      title: "In-app payment",
      component: (
        <AccountMatch
          account={recipient!}
          onNext={() => setCurrentStep("account-selection")}
        />
      ),
    },
    "account-selection": {
      title: "Account selection",
      component: (
        <AccountSelection
          onNext={() => {
            router.push("/app/payment/in-app");
            handleClose();
          }}
        />
      ),
    },
  };

  return (
    <Dialog open={inApppayment} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {steps[currentStep].title}
          </DialogTitle>
        </DialogHeader>
        {steps[currentStep].component}
      </DialogContent>
    </Dialog>
  );
}
