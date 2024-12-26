"use client";

import {
  parseAsBoolean,
  parseAsInteger,
  useQueryState,
  parseAsJson,
} from "nuqs";
import { AccountSelectModal } from "@/components/payment/account-select-dropdown";
import { AmountInputModal } from "@/components/payment/amount-input-modal";
import { ConfirmationModal } from "@/components/payment/confirmation-modal";
import { PaymentPage } from "@/components/payment/payment-page";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function FundAccount() {
  const router = useRouter();
  const [showAccountSelect, setShowAccountSelect] = useState(false);

  const [showAmountInput, setShowAmountInput] = useState(false);

  const [showConfirmation, setShowConfirmation] = useQueryState(
    "confirmation",
    parseAsBoolean.withDefault(false)
  );
  const [showPayment, setShowPayment] = useQueryState(
    "payment",
    parseAsBoolean.withDefault(false)
  );

  const [selectedAccount, setSelectedAccount] = useState<{
    currency: string;
    code: string;
    flag: string;
  } | null>(null);

  const [amount, setAmount] = useQueryState(
    "amount",
    parseAsInteger.withDefault(0)
  );
  const [code, setCode] = useQueryState("code", { defaultValue: "" });

  const handleAccountSelect = (account: {
    currency: string;
    code: string;
    flag: string;
  }) => {
    setSelectedAccount(account);
    setCode(account?.code);
    setShowAccountSelect(false);
    setShowAmountInput(true);
  };

  const handleAmountSubmit = (value: number) => {
    setAmount(value);
    setShowAmountInput(false);
    setShowConfirmation(true);
  };

  const handleConfirmation = () => {
    router.push(`/app/payment?code=${selectedAccount?.code}&amount=${amount}`);
    // setShowConfirmation(false);
    // setShowPayment(true);
  };

  if (showPayment && selectedAccount) {
    return <PaymentPage amount={amount} currency={selectedAccount.code} />;
  }

  return (
    <div className="">
      <AccountSelectModal onSelect={handleAccountSelect} />

      {selectedAccount && (
        <AmountInputModal
          isOpen={showAmountInput}
          onClose={() => setShowAmountInput(false)}
          onProceed={handleAmountSubmit}
          currency={selectedAccount.code}
        />
      )}

      {selectedAccount && (
        <ConfirmationModal
          isOpen={showConfirmation}
          onClose={() => setShowConfirmation(false)}
          onConfirm={handleConfirmation}
          amount={amount}
          currency={selectedAccount.code}
        />
      )}
    </div>
  );
}
