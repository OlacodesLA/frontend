"use client";
import { AccountSelectModal } from "@/components/payments/modals/account-select-modal";
import { LocalPaymentModal } from "@/components/payments/modals/local-payment";
import { PaymentOptionCard } from "@/components/payments/payment-option-card";
import { Account, PaymentFormData } from "@/interfaces/payments";
import { parseAsInteger, useQueryState } from "nuqs";
import { useState } from "react";

export default function PaymentDashboard() {
  const [step, setStep] = useState(1);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [paymentData, setPaymentData] = useState<Partial<PaymentFormData>>({});

  const handleAccountSelect = (account: Account) => {
    setSelectedAccount(account);
    setStep(2);
  };

  const handlePaymentFormSubmit = (data: PaymentFormData) => {
    setPaymentData(data);
    setStep(3);
  };

  const handleFinalSubmit = (data: PaymentFormData) => {
    // Here you would typically make an API call to process the payment
    console.log("Final payment data:", {
      ...paymentData,
      ...data,
    });
    setShowSuccessModal(true);
  };

  const handleViewReceipt = () => {
    // Implement receipt view logic
    console.log("Viewing receipt");
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <AccountSelectModal onSelectAccount={handleAccountSelect} />
      <LocalPaymentModal />

      <section>
        <h2 className="text-xl font-semibold mb-4">Send money</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PaymentOptionCard
            type="international"
            title="International payment"
            description="Transfer money globally with Uzel. We simplify the process, making money transfer as easy as sending data."
            href="/payments/international"
          />
          <PaymentOptionCard
            type="local"
            title="Local payment"
            description="Make sharing and receiving money with loved ones easy and seamless with Uzel."
            href="/payments/local"
          />
          <PaymentOptionCard
            type="in-app"
            title="In-app payment"
            description="Send money to another UZEL user in seconds using their unique UZEL tag"
            href="/payments/in-app"
          />
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Receive money</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <PaymentOptionCard
            type="usdc"
            title="Circle USDC collection"
            description="Efficiently and securely transfer funds internationally to a recipient outside your country by utilizing their international bank details."
            href="/receive/usdc"
          />
          <PaymentOptionCard
            type="invoice"
            title="Invoice generator"
            description="Create an invoice online customized for your customers around the world, with Uzel. Receiving and sending money becomes easier with Uzel."
            href="/receive/invoice"
          />
        </div>
      </section>
    </div>
  );
}
