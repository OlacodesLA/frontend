"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpDown, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type {
  Account,
  PaymentDetails as PaymentDetailsType,
} from "@/interfaces/payments";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import Image from "next/image";
import { usePaymentStore } from "@/store/use-paymanet-store";
import { CircleFlag } from "react-circle-flags";
import SelectCountries from "@/helpers/select-countries";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PaymentDetailsProps {
  recipient: Account;
  onNext: (details: PaymentDetailsType) => void;
}

export function PaymentDetails({ recipient, onNext }: PaymentDetailsProps) {
  const router = useRouter();
  const { localStep, setLocalStep, setOtpModal, otpModal } = usePaymentStore(
    (state) => state
  );
  const [currency, setCurrency] = useQueryState("currency", {
    defaultValue: "",
  });

  const [formData, setFormData] = useState<any>({
    amount: "",
    fromCurrency: currency,
    toCurrency: "GBP",
    recipientDetails: {
      country: "",
      fullName: "",
      bankName: "",
      branchAddress: "",
      swiftCode: "",
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    // e.preventDefault();
    onNext({
      amount: 200,
      fromCurrency: "GBP",
      toCurrency: "NGN",
      conversionRate: 1553,
      sendRate: 0,
    });
  };

  const accounts = [
    { currency: "NGN account", code: "NGN", flag: "ng", icon: "₦" },
    { currency: "CAD account", code: "CAD", flag: "ca", icon: "$" },
    { currency: "GBP account", code: "GBP", flag: "gb", icon: "£" },
    { currency: "USD account", code: "USD", flag: "us", icon: "$" },
  ];

  return (
    <div className="">
      <ArrowLeft
        onClick={() => {
          router.back();
        }}
        className="h-fit w-7 ml-10"
      />

      <div className="max-w-2xl mx-auto p-4 mb-20">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-xl font-semibold text-center">In-app payment</h1>
          <p className="text-xs text-center text-muted-foreground">
            Provide the requested information's below to process your
            transaction
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-2 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src={recipient.avatar} alt={recipient.name} />
              <AvatarFallback>{recipient.name[0]}</AvatarFallback>
            </Avatar>
            <h3 className="font-medium text-sm">{recipient.name}</h3>
            <p className="text-sm text-muted-foreground">
              UZEL tag: {recipient.tag}
            </p>
          </div>
          <div className="border-dashed border-t border-primary100 my-4" />
          <div className="space-y-4">
            <div className="mb-4 text-black text-sm">Transaction details</div>
            <Card className="border-[#6139E74D]">
              <CardContent className="md:p-3 p-2 border-[#6139E74D]">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <Label>You send</Label>
                    <div className="flex gap-4 mt-2 w-full">
                      <div className="relative flex items-center w-full">
                        <div className="text-black md:text-lg text-base">
                          {accounts.map((acc) => {
                            if (acc.code == currency) {
                              return acc.icon;
                            }
                          })}
                        </div>
                        {/* <div className="flex-1  w-full md:text-lg md:placeholder:text-lg ">
                          250,000.00
                        </div> */}
                        <Input
                          type="text"
                          noBorders
                          value={formData.amount}
                          placeholder="0.00"
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          className="flex-1 border-none w-full md:text-lg md:placeholder:text-lg focus:border-none focus:ring-0 focus-within:border-none"
                        />
                      </div>
                    </div>
                  </div>
                  <Select
                    value={formData.fromCurrency}
                    onValueChange={(value) => {
                      setFormData({ ...formData, fromCurrency: value });
                      setCurrency(value);
                    }}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem defaultValue={currency} value="NGN">
                        NGN
                      </SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="border-[#6139E74D]">
              <CardContent className="md:p-3 p-2 border-[#6139E74D]">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <Label>Amori Ademakinwa (Recipient) gets</Label>
                    <div className="flex gap-4 mt-2 w-full">
                      <div className="relative flex items-center w-full">
                        <div className="text-black md:text-lg text-base">
                          {accounts.map((acc) => {
                            if (acc.code == currency) {
                              return acc.icon;
                            }
                          })}
                        </div>
                        <Input
                          type="text"
                          noBorders
                          value={formData.amount}
                          placeholder="0.00"
                          onChange={(e) =>
                            setFormData({ ...formData, amount: e.target.value })
                          }
                          className="flex-1 border-none w-full md:text-lg md:placeholder:text-lg focus:border-none focus:ring-0 focus-within:border-none"
                        />
                      </div>
                    </div>
                  </div>

                  <Select
                    value={formData.fromCurrency}
                    onValueChange={(value) => {
                      setFormData({ ...formData, fromCurrency: value });
                      setCurrency(value);
                    }}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem defaultValue={currency} value="NGN">
                        NGN
                      </SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="CAD">CAD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="ml-auto space-y-1 text-xs md:text-sm">
            <p className="text-[#4F5E71]">
              Conversion rate: 1 GBP = 1653.00 NGN
            </p>
            <p className="text-[#4F5E71]">Send rate: -0.00 GBP</p>
          </div>

          <div className="bg-[#F6F3FE] p-4 rounded-lg flex gap-3 mt-1">
            <Info className="w-5 h-5 text-[#4F5E71] shrink-0 mt-0.5" />
            <p className="md:text-sm text-xs text-[#4F5E71]">
              The funds will be deposited into your recipient's local bank
              account within 5 to 15 minutes following a successful transaction.
            </p>
          </div>

          <Button onClick={handleSubmit} className="w-full" type="submit">
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PaymentMethod() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col  space-y-6">
      {/* Header with conversion rates */}

      {/* Delivery Method Section */}
      <div className="space-y-3">
        <h2 className="text-lg font-medium">Delivery Method</h2>

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
              <h3 className="font-medium">Make payment using Swift</h3>
              <p className="md:text-sm text-xs text-[#4F5E71]">
                Intermediary bank that allows you to send/receive electronic
                payments internationally.
              </p>
            </div>
          </div>
        </Card>

        {/* Info Box */}
        <div className="bg-[#F6F3FE] p-4 rounded-lg flex gap-3 mt-1">
          <Info className="w-5 h-5 text-[#4F5E71] shrink-0 mt-0.5" />
          <p className="md:text-sm text-xs text-[#4F5E71]">
            The funds will be deposited into your recipient's local bank account
            within 5 to 15 minutes following a successful transaction.
          </p>
        </div>
      </div>
    </div>
  );
}
