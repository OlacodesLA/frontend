"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { parseAsBoolean, useQueryState } from "nuqs";

interface PaymentOptionCardProps {
  type: "international" | "local" | "in-app" | "usdc" | "invoice";
  title: string;
  description: string;
  href: string;
}

export function PaymentOptionCard({
  type,
  title,
  description,
  href,
}: PaymentOptionCardProps) {
  const [interPayment, setinterPayment] = useQueryState(
    "international_payment",
    parseAsBoolean.withDefault(false)
  );
  const [localpayment, setLocalPayment] = useQueryState(
    "local_payment",
    parseAsBoolean.withDefault(false)
  );
  const icons = {
    international: "international-payment",
    local: "local-payment",
    "in-app": "in-app-payment",
    usdc: "usdc-collection",
    invoice: "invoice-generator",
  };

  const action = {
    international: () => {
      setinterPayment(true);
    },
    local: () => {
      setLocalPayment(true);
    },
    "in-app": () => {},
    usdc: () => {},
    invoice: () => {},
  };

  return (
    <div onClick={action[type]}>
      <Card className="h-full hover:bg-accent/50 transition-colors cursor-pointer">
        <CardContent className="p-6">
          <Image
            src={`/payments/${icons[type]}.svg`}
            alt=""
            width={200}
            height={200}
            className="h-10 w-fit"
          />
          <h3 className="text-lg font-semibold mt-4 mb-2">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </div>
  );
}
