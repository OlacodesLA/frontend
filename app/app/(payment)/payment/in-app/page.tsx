"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PaymentDetails } from "@/components/payments/in-app/payment-details";
import { OtpVerification } from "@/components/payments/in-app/otp-verification";
import { PaymentSuccess } from "@/components/payments/in-app/payment-success";
import type {
  Account,
  PaymentDetails as PaymentDetailsType,
} from "@/interfaces/in-app";

export default function PaymentDetailsPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "otp" | "success">("details");
  const [recipient] = useState<Account>({
    name: "Amori Ademakinwa Designer",
    tag: "@Makinwaa",
    avatar: "/placeholder.svg",
    type: "Nigerian account",
    currency: "NGN",
  });
  const [paymentDetails, setPaymentDetails] =
    useState<PaymentDetailsType | null>(null);

  const handlePaymentDetailsSubmit = (details: PaymentDetailsType) => {
    setPaymentDetails(details);
    setStep("otp");
  };

  const handleOtpSubmit = () => {
    setStep("success");
  };

  const handleClose = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {step === "details" && (
          <PaymentDetails
            recipient={recipient}
            onNext={handlePaymentDetailsSubmit}
          />
        )}
        {step === "otp" && <OtpVerification onNext={handleOtpSubmit} />}
        {step === "success" && paymentDetails && (
          <PaymentSuccess
            recipient={recipient}
            paymentDetails={paymentDetails}
            onClose={handleClose}
          />
        )}
      </div>
    </div>
  );
}
