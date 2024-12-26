"use client";
import { SuccessModal } from "@/components/payments/modals/success";
import { LocalPaymentForm } from "@/components/payments/local-payment";
import { PaymentStepsForm } from "@/components/payments/payment-steps-form";
import { usePaymentStore } from "@/store/use-paymanet-store";
import React from "react";

type Props = {};

const LocalPayment = (props: Props) => {
  const { localStep, setLocalStep, setSuccess, success } = usePaymentStore(
    (state) => state
  );

  if (localStep === 1) {
    return (
      <div>
        <LocalPaymentForm />
      </div>
    );
  }

  // if (step === 2) {
  //   return (
  //     <div>
  //       <PaymentStepsForm />
  //       <SuccessModal isOpen={success} onClose={() => setSuccess(false)} />
  //     </div>
  //   );
  // }
};

export default LocalPayment;
