"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpDown, Info, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Account, PaymentFormData } from "@/interfaces/payments";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import Image from "next/image";
import { usePaymentStore } from "@/store/use-paymanet-store";
import { CircleFlag } from "react-circle-flags";
import SelectCountries from "@/helpers/select-countries";
import { BANKS } from "@/data/banks";
import { BeneficiariesModal } from "../modals/beneficiary";

export function LocalRecipientDetails() {
  const router = useRouter();
  const {
    localStep,
    setLocalStep,
    setSelectedBeneficiary,
    setShowBeneficiaries,
  } = usePaymentStore((state) => state);
  const [currency, setCurrency] = useQueryState("currency", {
    defaultValue: "",
  });

  const [formData, setFormData] = useState({
    account: "uzel-nigerian",
    amount: "",
    accountNumber: "",
    bank: "",
    transactionType: "single",
  });

  const accounts = [
    { currency: "NGN account", code: "NGN", flag: "ng", icon: "₦" },
    { currency: "CAD account", code: "CAD", flag: "ca", icon: "$" },
    { currency: "GBP account", code: "GBP", flag: "gb", icon: "£" },
    { currency: "USD account", code: "USD", flag: "us", icon: "$" },
  ];

  return (
    <div className="">
      <BeneficiariesModal setFormData={setFormData} />

      <ArrowLeft
        onClick={() => {
          router.back();
        }}
        className="h-fit w-7 ml-10 cursor-pointer"
      />

      <div className="max-w-2xl mx-auto p-4 mb-20">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-xl font-semibold text-center">Local payment</h1>
          <p className="text-sm text-center">
            Provide the requested information's below to process your
            transaction
          </p>
        </div>

        <div className="flex flex-col space-y-6 my-6 ">
          <PaymentMethod />
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground bg-primary-light hover:text-muted-foreground ml-auto"
            onClick={() => setShowBeneficiaries(true)}
          >
            <User className="text-muted-foreground" />
            Select from beneficiary
          </Button>
          <div>
            <div className="flex justify-between items-center mb-2">
              <Label htmlFor="account">Recipient account number</Label>
            </div>
            <Input
              id="account"
              placeholder="Enter 10-digit account number here"
              value={formData.accountNumber}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  accountNumber: e.target.value,
                }))
              }
            />
          </div>

          <div>
            <Label htmlFor="bank">Recipient bank</Label>
            <Select
              value={formData.bank}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, bank: value }))
              }
            >
              <SelectTrigger id="bank">
                <SelectValue placeholder="Select bank" />
              </SelectTrigger>
              <SelectContent>
                {BANKS.map((bank) => (
                  <SelectItem key={bank.id} value={bank.id}>
                    {bank.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          className="w-full     "
          onClick={() => {
            console.log("Form Data", formData);
            setLocalStep(3);
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}

export function PaymentMethod() {
  return (
    <div className="flex flex-col opacity-70  space-y-6">
      {/* Header with conversion rates */}

      {/* Delivery Method Section */}
      <div className="space-y-3">
        <h2 className="text-sm font-medium">Delivery Method</h2>

        {/* Swift Payment Option */}
        <Card className="p-4 border border-[#6139E733]">
          <div className="flex items-center gap-4">
            <Image
              src="/payments/bank.svg"
              width={150}
              height={150}
              className="w-8 h-8"
              alt=""
            />

            <div className="space-y-1 flex-1">
              <h3 className="font-medium text-sm">Make payment using Swift</h3>
              <p className="md:text-xs text-xs text-[#4F5E71]">
                Intermediary bank that allows you to send/receive electronic
                payments internationally.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
