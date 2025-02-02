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
import { OTPModal } from "@/components/payments/modals/otp";
import { SuccessModal } from "@/components/payments/modals/success";

export default function PaymentDetailsPage() {
  const router = useRouter();
  const [step, setStep] = useState<"details" | "otp" | "success">("details");
  const [otpOpen, setOtpOpen] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [recipient] = useState({
    name: "Amori Ademakinwa Designer",
    tag: "@Makinwaa",
    avatar: "/placeholder.svg",
    type: "Nigerian account",
    currency: "NGN",
    balance: "",
  });
  const [paymentDetails, setPaymentDetails] =
    useState<PaymentDetailsType | null>(null);

  const handlePaymentDetailsSubmit = (details: PaymentDetailsType) => {
    setPaymentDetails(details);
    setOtpOpen(true);
  };

  const handleOtpSubmit = () => {
    setStep("success");
  };

  const handleClose = () => {
    router.push("/");
  };

  console.log("Step", step);

  return (
    <div className="">
      <PaymentDetails
        recipient={recipient}
        onNext={handlePaymentDetailsSubmit}
      />

      {otpOpen && (
        <OTPModal
          setOtpModal={setOtpOpen}
          otpModal={otpOpen}
          setSuccess={setOnSuccess}
        />
      )}
      {onSuccess && (
        <SuccessModal
          isOpen={onSuccess}
          onClose={() => {
            setOnSuccess(false);
            router.push("/app");
          }}
        />
      )}
    </div>
  );
}
