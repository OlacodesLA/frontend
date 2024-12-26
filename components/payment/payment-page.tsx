"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Smartphone, CreditCard, Building2, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PaymentPageProps {
  amount: number;
  currency: string;
}

const paymentMethods = [
  { id: "ussd", name: "USSD", icon: Smartphone },
  { id: "card", name: "Bank Card", icon: CreditCard },
  { id: "transfer", name: "Bank Transfer", icon: Building2 },
  { id: "momo", name: "MoMo", icon: Wallet },
];

const savedCards = Array(5).fill({
  type: "Debit card",
  number: "**** 7721",
});

export function PaymentPage({ amount, currency }: PaymentPageProps) {
  const [selectedMethod, setSelectedMethod] = useState("transfer");
  const router = useRouter();
  const [saveCard, setSaveCard] = useState(false);

  const handlePayment = () => {
    setTimeout(() => {
      toast.success("Success!", {
        description: `Your payment of ${currency}${amount.toLocaleString()} was successful`,
        duration: 5000,
      });
      router.push("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-serif">UZEL</h1>
            <p className="text-sm text-gray-500">
              Reference id: if any 00000000
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span>Pay</span>
            <span className="text-purple-600 font-medium">
              {currency}
              {amount.toLocaleString()}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.back()}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-[300px,1fr] gap-6 p-6 h-full">
          <div className="h-full">
            <h2 className="font-medium mb-4">Payment Method</h2>
            <div className="space-y-2 border border-primary100 h-full">
              {paymentMethods.map(({ id, name, icon: Icon }) => (
                <button
                  key={id}
                  className={cn(
                    "w-full flex items-center gap-3 p-4 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors relative",
                    selectedMethod === id && "bg-white shadow-sm"
                  )}
                  onClick={() => setSelectedMethod(id)}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 text-gray-400",
                      selectedMethod === id && "text-purple-600"
                    )}
                  />
                  {name}
                  {selectedMethod === id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-purple-600 rounded-r-full" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            {selectedMethod === "card" ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Enter Card Details</h3>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="saveCard"
                      checked={saveCard}
                      onCheckedChange={(checked) =>
                        setSaveCard(checked as boolean)
                      }
                    />
                    <Label htmlFor="saveCard">Save Card</Label>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Number</Label>
                    <Input placeholder="Enter card number*" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date</Label>
                      <Input placeholder="mm/yy*" />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV</Label>
                      <Input placeholder="Enter cvv*" />
                    </div>
                  </div>
                </div>

                {savedCards.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-medium">Saved cards</h4>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {savedCards.map((card, i) => (
                        <button
                          key={i}
                          className="flex-shrink-0 px-4 py-2 bg-gray-50 rounded-lg text-sm"
                        >
                          <div className="font-medium">{card.type}</div>
                          <div className="text-gray-500">{card.number}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : selectedMethod === "transfer" ? (
              <div className="space-y-6">
                <h3 className="text-lg font-medium">
                  {currency} Account Funding ~ {currency}
                  {amount.toLocaleString()}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-600">Bank Name</Label>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span>Sterling Bank</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-purple-600"
                        onClick={() => {
                          navigator.clipboard.writeText("Sterling Bank");
                          toast("Bank name copied", {
                            duration: 2000,
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="8"
                            height="4"
                            x="8"
                            y="2"
                            rx="1"
                            ry="1"
                          />
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-600">Account Number</Label>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span>0002224449</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-purple-600"
                        onClick={() => {
                          navigator.clipboard.writeText("0002224449");
                          toast("Account number copied", {
                            duration: 2000,
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="8"
                            height="4"
                            x="8"
                            y="2"
                            rx="1"
                            ry="1"
                          />
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        </svg>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-600">Amount</Label>
                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span>
                        {currency} {amount.toLocaleString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-purple-600"
                        onClick={() => {
                          navigator.clipboard.writeText(amount.toString());
                          toast("Account number copied", {
                            duration: 2000,
                          });
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="8"
                            height="4"
                            x="8"
                            y="2"
                            rx="1"
                            ry="1"
                          />
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white h-12"
                    onClick={handlePayment}
                  >
                    Click here after transfer
                  </Button>

                  <p className="text-sm text-gray-500 text-center">
                    Note: Kindly transfer the exact amount to the account
                    details above.
                    <br />
                    Account number is valid for one hour
                  </p>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                Select a payment method to continue
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 p-4 text-sm text-gray-600 border-t">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-purple-600"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          </svg>
          We safeguard your funds.
        </div>
      </div>
    </div>
  );
}
