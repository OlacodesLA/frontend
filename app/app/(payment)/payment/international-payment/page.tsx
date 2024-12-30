"use client";
import { SuccessModal } from "@/components/payments/modals/success";
import { PaymentForm } from "@/components/payments/payment-form";
import { PaymentStepsForm } from "@/components/payments/payment-steps-form";
import { usePaymentStore } from "@/store/use-paymanet-store";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const InternatonalPayment = (props: Props) => {
  const { step, setStep, setSuccess, success } = usePaymentStore(
    (state) => state
  );
  const router = useRouter();

  if (step === 1) {
    return (
      <div>
        <PaymentForm />
      </div>
    );
  }

  if (step === 2) {
    return (
      <div>
        <PaymentStepsForm />
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

export default InternatonalPayment;
