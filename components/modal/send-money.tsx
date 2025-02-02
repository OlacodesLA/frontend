"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface SendMoneyProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendMoney({ isOpen, onClose }: SendMoneyProps) {
  const [amount, setAmount] = useState("");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md px-2 py-8">
        <DialogHeader>
          <DialogTitle className="text-center">Send money</DialogTitle>
          <DialogDescription className="text-center">
            Kindly select the type of transaction you want to make
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-3 mt-4">
          <PaymentOptions
            type="international"
            title="International payment"
            description="Transfer money globally with UZEL,  We simplify the process, 
making money transfer as easy as sending data."
            href="/payments/international"
          />
          <PaymentOptions
            type="local"
            title="Local payment"
            description="Make sharing and receiving money with loved ones easy and seamless with Uzel."
            href="/payments/local"
          />
          <PaymentOptions
            type="in-app"
            title="In-app payment"
            description="Send money to another UZEL user in seconds using their unique UZEL tag"
            href="/payments/in-app"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const PaymentOptions = ({ title, description, type, href }) => {
  const icons = {
    international: "international-payment",
    local: "local-payment",
    "in-app": "in-app-payment",
    usdc: "usdc-collection",
    invoice: "invoice-generator",
  };

  return (
    <Link
      href={href}
      className="h-full flex space-x-2 border p-2 rounded-sm border-[#6139E733] hover:bg-accent/50 items-center transition-colors cursor-pointer"
    >
      <Image
        src={`/payments/${icons[type]}.svg`}
        alt=""
        width={200}
        height={200}
        className="h-7 w-fit"
      />
      <div className="">
        <h3 className="text-sm font-semibold mt-0 mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
};
