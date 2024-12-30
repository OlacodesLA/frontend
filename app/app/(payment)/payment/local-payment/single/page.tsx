"use client";
import { SuccessModal } from "@/components/payments/modals/success";
import { LocalPaymentForm } from "@/components/payments/local-payment";
import { PaymentStepsForm } from "@/components/payments/payment-steps-form";
import { usePaymentStore } from "@/store/use-paymanet-store";
import React from "react";
import { LocalRecipientDetails } from "@/components/payments/local-payment/recipient";
import { BeneficiariesModal } from "@/components/payments/modals/beneficiary";
import { ConfirmPayment } from "@/components/payments/local-payment/confirm";
import { OTPModal } from "@/components/payments/modals/otp";
import { useRouter } from "next/navigation";

type Props = {};

const LocalPayment = (props: Props) => {
  const { localStep, setLocalStep, setSuccess, success } = usePaymentStore(
    (state) => state
  );

  const router = useRouter();
  if (localStep === 1) {
    return (
      <div>
        <LocalPaymentForm />
      </div>
    );
  }

  if (localStep === 2) {
    return (
      <div>
        <LocalRecipientDetails />
      </div>
    );
  }
  if (localStep === 3) {
    return (
      <div>
        <ConfirmPayment />
        <OTPModal />
        <SuccessModal
          isOpen={success}
          onClose={() => {
            setSuccess(false);
            router.push("/app");
          }}
        />
      </div>
    );
  }
};

export default LocalPayment;
