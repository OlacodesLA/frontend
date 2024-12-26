"use client";
import { SuccessModal } from "@/components/payments/modals/success";
import { PaymentForm } from "@/components/payments/payment-form";
import { PaymentStepsForm } from "@/components/payments/payment-steps-form";
import { usePaymentStore } from "@/store/use-paymanet-store";
import React from "react";

type Props = {};

const InternatonalPayment = (props: Props) => {
  const { step, setStep, setSuccess, success } = usePaymentStore(
    (state) => state
  );
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
        <SuccessModal isOpen={success} onClose={() => setSuccess(false)} />
      </div>
    );
  }
};

export default InternatonalPayment;
