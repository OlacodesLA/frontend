"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpDown, Info } from "lucide-react";
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

interface PaymentFormProps {
  //   onBack: () => void;
  onContinue: (data: PaymentFormData) => void;
}

export function SaveForm() {
  const router = useRouter();
  const { step, setStep } = usePaymentStore((state) => state);
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

  const accounts = [
    { currency: "NGN account", code: "NGN", flag: "🇳🇬", icon: "₦" },
    { currency: "CAD account", code: "CAD", flag: "🇨🇦", icon: "$" },
    { currency: "GBP account", code: "GBP", flag: "🇬🇧", icon: "£" },
    { currency: "USD account", code: "USD", flag: "🇺🇸", icon: "$" },
  ];

  return (
    <div className="">
      <ArrowLeft
        onClick={() => {
          router.back();
        }}
        className="h-fit w-7 ml-10"
      />

      <div className="max-w-3xl mx-auto p-4 mb-20">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-semibold text-center">
           Save Funds
          </h1>
          <p className="text-sm text-center">
                      Enter the amount you want to save to your Nigerian savings
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Card className="border-[#6139E74D]">
              <CardContent className="md:p-6 p-3 border-[#6139E74D]">
                <div className="flex items-center justify-between w-full">
                  <div>
                                      <Label>Enter the amount you wish to save</Label>
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
                          placeholder="250000"
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
            <div className="flex justify-center">
              <ArrowUpDown className="h-6 w-6 text-black" />
            </div>
            <Card className="border-[#6139E74D]">
              <CardContent className="md:p-6 p-3 border-[#6139E74D]">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <Label>You Save</Label>
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
          <PaymentMethod />

          <Button
            className="w-full"
            onClick={() => {
              console.log("Form Data", formData);
              setStep(2);
            }}
          >
            Save Money
          </Button>
        </div>
      </div>
    </div>
  );
}

export function PaymentMethod() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col  space-y-6">
      

        {/* Info Box */}
        <div className="bg-[#F6F3FE] p-4 rounded-lg flex gap-3 mt-1">
          <Info className="w-5 h-5 text-[#4F5E71] shrink-0 mt-0.5" />
          <p className="md:text-sm text-xs text-[#4F5E71]">
                  After a transaction is successful, the money will reflect into your UZEL USD savings account within 2 to 5 minutes.
          </p>
        </div>
      </div>
   
  );
}
