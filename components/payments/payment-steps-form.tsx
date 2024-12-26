"use client";

import { useState } from "react";
import { ArrowLeft, Globe } from "lucide-react";
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
import type { PaymentFormData } from "@/interfaces/payments";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePaymentStore } from "@/store/use-paymanet-store";

export function PaymentStepsForm() {
  const router = useRouter();
  const { step, setStep, setSuccess } = usePaymentStore((state) => state);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<PaymentFormData>({
    amount: "",
    fromCurrency: "NGN",
    toCurrency: "GBP",
    step1: {
      country: "",
      fullName: "",
      bankName: "",
      branchAddress: "",
      swiftCode: "",
    },
    step2: {
      accountNumber: "",
      intermediaryBank: "",
      bankName: "",
      branchAddress: "",
      swiftCode: "",
    },
  });

  const handleProceed = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    } else {
      setSuccess(true);
    }
  };

  return (
    <div className="relative">
      <ArrowLeft
        onClick={() => {
          router.back();
        }}
        className="h-fit w-7 absolute top-5 left-3 md:left-10"
      />
      <div className="text-sm text-muted-foreground  absolute top-5 right-3 md:right-10">
        {currentStep}/2
      </div>

      <div className="max-w-3xl mx-auto p-4 mb-20">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-2xl font-semibold text-center">
            International payment
          </h1>
          <p className="text-sm text-center">
            Provide the requested information's below to process your
            transaction
          </p>
        </div>

        <PaymentMethod />

        {currentStep === 1 ? (
          <div className="space-y-4">
            <div>
              <Label>Country</Label>
              <Select
                value={formData.step1.country}
                onValueChange={(value) =>
                  setFormData({
                    ...formData,
                    step1: { ...formData.step1, country: value },
                  })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="canada">Canada</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="usa">United States</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Full Name</Label>
              <Input
                placeholder="Enter full name here"
                value={formData.step1.fullName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step1: { ...formData.step1, fullName: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>Name of Receiving Bank</Label>
              <Input
                placeholder="Enter name here"
                value={formData.step1.bankName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step1: { ...formData.step1, bankName: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>Branch address of designated bank</Label>
              <Input
                placeholder="Enter branch"
                value={formData.step1.branchAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step1: { ...formData.step1, branchAddress: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>BIC/SWIFT Code</Label>
              <Input
                placeholder="Enter code here"
                value={formData.step1.swiftCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step1: { ...formData.step1, swiftCode: e.target.value },
                  })
                }
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label>Account Number / IBAN</Label>
              <Input
                placeholder="Enter full name here"
                value={formData.step2.accountNumber}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step2: { ...formData.step2, accountNumber: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>Intermediary bank (optional)</Label>
              <Input
                placeholder="Enter full name here"
                value={formData.step2.intermediaryBank}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step2: {
                      ...formData.step2,
                      intermediaryBank: e.target.value,
                    },
                  })
                }
              />
            </div>

            <div>
              <Label>Name of Receiving Bank</Label>
              <Input
                placeholder="Enter name here"
                value={formData.step2.bankName}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step2: { ...formData.step2, bankName: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>Branch address of designated bank</Label>
              <Input
                placeholder="Enter branch"
                value={formData.step2.branchAddress}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step2: { ...formData.step2, branchAddress: e.target.value },
                  })
                }
              />
            </div>

            <div>
              <Label>BIC/SWIFT Code</Label>
              <Input
                placeholder="Enter code here"
                value={formData.step2.swiftCode}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    step2: { ...formData.step2, swiftCode: e.target.value },
                  })
                }
              />
            </div>
          </div>
        )}

        <Button className="w-full mt-6" onClick={handleProceed}>
          {currentStep === 1 ? "Proceed" : "Submit Payment"}
        </Button>
      </div>
    </div>
  );
}

export function PaymentMethod() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col  space-y-6 mb-5 opacity-70">
      {/* Header with conversion rates */}

      {/* Delivery Method Section */}
      <div className="space-y-3">
        <h2 className="text-base font-medium">Delivery Method</h2>

        {/* Swift Payment Option */}
        <Card className="p-4 border border-[#6139E733]">
          <div className="flex items-center gap-4">
            <Image
              src="/payments/swift.svg"
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
      </div>
    </div>
  );
}
