"use client";
import { parseAsInteger, useQueryState } from "nuqs";
import { PaymentPage } from "@/components/payment/payment-page";
import React from "react";

type Props = {};

const Payment = (props: Props) => {
  const [amount, setAmount] = useQueryState(
    "amount",
    parseAsInteger.withDefault(0)
  );
  const [code, setCode] = useQueryState("code", { defaultValue: "" });
  if (code && amount) {
    return <PaymentPage amount={amount} currency={code} />;
  } else {
    return <div>Payment Not initiated correctly</div>;
  }
};

export default Payment;
