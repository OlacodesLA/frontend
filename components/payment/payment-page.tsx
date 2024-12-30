"use client";
import logo from "@/public/UZEL.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Smartphone, CreditCard, Building2, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Image from "next/image";
import BankIcon from "../icons/BankIcon";
import CardIcon from "../icons/CardIcon";
import PhoneIcon from "../icons/PhoneIcon";
import WalletIcon from "../icons/WalletIcon";

interface PaymentPageProps {
  amount: number;
  currency: string;
}

const paymentMethods = [
  { id: "ussd", name: "USSD", icon: PhoneIcon },
  { id: "card", name: "Bank Card", icon: CardIcon },
  { id: "transfer", name: "Bank Transfer", icon: BankIcon },
  { id: "momo", name: "MoMo", icon: WalletIcon },
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
    <div className="min-h-screen bg-[#FBFBFF] p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="">
           <Image src={logo} alt="" className="" />
           
          </div>
          <div className="flex text-right items-center gap-2">
            <div>
              <p className="text-sm text-gray-500">
                Reference id: if any 00000000
              </p>
              <span>Pay {''}</span>
              <span className="text-[#6139E7] font-sm">
                {currency}
                {amount.toLocaleString()}
              </span>
            </div>
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

        <div className="grid md:grid-cols-[300px,1fr]  gap-6 p-6 h-full">
          <div className="">
            <h2 className="font-medium mb-4">Payment Method</h2>
            <div className="space-y-2 w-full border border-[#6139E733] h-[460px] rounded-[8px] p-5">
              {paymentMethods.map(({ id, name, icon: Icon }) => (
                <button 
                  key={id}
                  className={cn(
                    "w-full bg-[#ffffff] flex items-center gap-3 p-4 rounded-lg text-black focus:bg-[#F6F3FE] transition-colors relative",
                    selectedMethod === id && "bg-white shadow-sm"
                  )}
                  onClick={() => setSelectedMethod(id)}
                >
                  <div className="w-8 h-8 bg-white rounded p-2 flex items-center justify-center">

                    <Icon


                    />
                </div>
                 
                  {name}
                  {selectedMethod === id && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-[54px] bg-[#6139E7]" />
                  )}
                </button>
              ))}
            </div>
          </div>
         <div>
            <h2 className="font-medium mb-4">Payment System</h2>
            <div className="rounded-lg border border-[#6139E733] p-6">
              {selectedMethod === "card" ? (
                <div className="space-y-6">
                  <div className=" border border-dashed border-[#6139E733] p-3 rounded-[6px]">
                    <div className="flex items-center justify-between border-b border-dashed border-[#6139E733] py-3">
                      <h3 className="text-lg font-medium text-[#4F5E71]">Enter Card Details</h3>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="saveCard"
                          checked={saveCard}
                          onCheckedChange={(checked) =>
                            setSaveCard(checked as boolean)
                          }
                        />
                        <Label htmlFor="saveCard " className="text-[#4F5E71]">Save Card</Label>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="space-y-1 pt-3">
                        <Label>Card Number</Label>
                        <Input placeholder="Enter card number*" className="border border-[#6139E733] bg-[#FAF9FF]" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Expiry Date</Label>
                          <Input placeholder="mm/yy*" className="border border-[#6139E733] bg-[#FAF9FF]" />
                        </div>
                        <div className="space-y-2">
                          <Label>CVV</Label>
                          <Input placeholder="Enter cvv*" className="border border-[#6139E733] bg-[#FAF9FF]" />
                        </div>
                      </div>
                    </div>
                 </div>

                  {savedCards.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Saved cards</h4>
                      <div className="flex gap-2 overflow-x-hidden pb-2">
                        {savedCards.map((card, i) => (
                          <button
                            key={i}
                            className="flex-shrink-0 px-4 py-2 bg-[#F6F3FE] rounded-lg text-sm"
                          >
                            <div className="font-medium">{card.type}</div>
                            <div className="text-gray-500">{card.number}</div>
                          </button>
                        ))}
                      </div>
                      <div>
                        <button className="bg-[#6139E7] text-white w-full p-2 rounded">Make Payment {currency}
                          {amount.toLocaleString()}</button>
                      </div>
                    </div>
                  )}
                 
                </div>
              ) : selectedMethod === "transfer" ? (
                <div className="space-y-8 h-full">
                  <h3 className="text-lg font-medium text-center pt-4">
                    {currency} Account Funding ~ {currency}
                    {amount.toLocaleString()}
                  </h3>

                  <div className="space-y-4">
                    <div className="">
                        <Label className="text-[#4F5E71]">Bank Name</Label>
                      <div className="flex items-center justify-between bg-gray-50 rounded-lg text-[16px]">
                        <span>Sterling Bank</span>
                      
                      </div>
                    </div>

                    <div className=" text-[16px]">
                        <Label className="text-[#4F5E71] text-[16px]">Account Number</Label>
                      <div className="flex items-center justify-between bg-gray-50  rounded-lg">
                        <span className="text-[16px]">0002224449</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#6139E7]"
                          onClick={() => {
                            navigator.clipboard.writeText("0002224449");
                            toast("Account number copied", {
                              duration: 2000,
                            });
                          }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.833313H7.296C6.07067 0.833313 5.1 0.833313 4.34067 0.935313C3.55933 1.04065 2.92667 1.26198 2.42733 1.76065C1.92867 2.25998 1.70733 2.89265 1.602 3.67398C1.5 4.43398 1.5 5.40398 1.5 6.62931V10.6666C1.50002 11.2623 1.71262 11.8383 2.09956 12.2911C2.48649 12.7439 3.02234 13.0438 3.61067 13.1366C3.702 13.646 3.87867 14.0806 4.232 14.4346C4.63333 14.836 5.13867 15.008 5.73867 15.0893C6.31667 15.1666 7.052 15.1666 7.96333 15.1666H10.0367C10.948 15.1666 11.6833 15.1666 12.2613 15.0893C12.8613 15.008 13.3667 14.836 13.768 14.4346C14.1693 14.0333 14.3413 13.528 14.4227 12.928C14.5 12.35 14.5 11.6146 14.5 10.7033V7.29665C14.5 6.38531 14.5 5.64998 14.4227 5.07198C14.3413 4.47198 14.1693 3.96665 13.768 3.56531C13.414 3.21198 12.9793 3.03531 12.47 2.94398C12.3771 2.35566 12.0773 1.81981 11.6245 1.43287C11.1717 1.04594 10.5956 0.833329 10 0.833313ZM11.42 2.84731C11.3186 2.55131 11.1272 2.29442 10.8726 2.1126C10.618 1.93077 10.3129 1.83312 10 1.83331H7.33333C6.062 1.83331 5.15933 1.83465 4.47333 1.92665C3.80333 2.01665 3.41667 2.18598 3.13467 2.46798C2.85267 2.74998 2.68333 3.13665 2.59333 3.80731C2.50133 4.49265 2.5 5.39531 2.5 6.66665V10.6666C2.49981 10.9795 2.59746 11.2846 2.77928 11.5393C2.96111 11.7939 3.218 11.9853 3.514 12.0866C3.5 11.68 3.5 11.22 3.5 10.7033V7.29665C3.5 6.38531 3.5 5.64998 3.578 5.07198C3.658 4.47198 3.83133 3.96665 4.232 3.56531C4.63333 3.16398 5.13867 2.99198 5.73867 2.91131C6.31667 2.83331 7.052 2.83331 7.96333 2.83331H10.0367C10.5533 2.83331 11.0133 2.83331 11.42 2.84731ZM4.93867 4.27331C5.12333 4.08865 5.382 3.96865 5.872 3.90265C6.37467 3.83531 7.04267 3.83398 7.99933 3.83398H9.99933C10.956 3.83398 11.6233 3.83531 12.1273 3.90265C12.6167 3.96865 12.8753 4.08931 13.06 4.27331C13.2447 4.45798 13.3647 4.71665 13.4307 5.20665C13.498 5.70931 13.4993 6.37731 13.4993 7.33398V10.6673C13.4993 11.624 13.498 12.2913 13.4307 12.7953C13.3647 13.2846 13.244 13.5433 13.06 13.728C12.8753 13.9126 12.6167 14.0326 12.1267 14.0986C11.6233 14.166 10.956 14.1673 9.99933 14.1673H7.99933C7.04267 14.1673 6.37467 14.166 5.87133 14.0986C5.382 14.0326 5.12333 13.912 4.93867 13.728C4.754 13.5433 4.634 13.2846 4.568 12.7946C4.50067 12.2913 4.49933 11.624 4.49933 10.6673V7.33398C4.49933 6.37731 4.50067 5.70931 4.568 5.20598C4.634 4.71665 4.75467 4.45798 4.93867 4.27331Z" fill="#6139E7" />
                            </svg>

                        </Button>
                      </div>
                    </div>

                    <div className="">
                        <Label className="text-[#4F5E71]">Amount</Label>
                      <div className="flex items-center justify-between bg-gray-50  rounded-lg">
                        <span className="text-[16px]">
                          {currency} {amount.toLocaleString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-[#6139E7]"
                          onClick={() => {
                            navigator.clipboard.writeText(amount.toString());
                            toast("Account number copied", {
                              duration: 2000,
                            });
                          }}
                        >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd" clip-rule="evenodd" d="M10 0.833313H7.296C6.07067 0.833313 5.1 0.833313 4.34067 0.935313C3.55933 1.04065 2.92667 1.26198 2.42733 1.76065C1.92867 2.25998 1.70733 2.89265 1.602 3.67398C1.5 4.43398 1.5 5.40398 1.5 6.62931V10.6666C1.50002 11.2623 1.71262 11.8383 2.09956 12.2911C2.48649 12.7439 3.02234 13.0438 3.61067 13.1366C3.702 13.646 3.87867 14.0806 4.232 14.4346C4.63333 14.836 5.13867 15.008 5.73867 15.0893C6.31667 15.1666 7.052 15.1666 7.96333 15.1666H10.0367C10.948 15.1666 11.6833 15.1666 12.2613 15.0893C12.8613 15.008 13.3667 14.836 13.768 14.4346C14.1693 14.0333 14.3413 13.528 14.4227 12.928C14.5 12.35 14.5 11.6146 14.5 10.7033V7.29665C14.5 6.38531 14.5 5.64998 14.4227 5.07198C14.3413 4.47198 14.1693 3.96665 13.768 3.56531C13.414 3.21198 12.9793 3.03531 12.47 2.94398C12.3771 2.35566 12.0773 1.81981 11.6245 1.43287C11.1717 1.04594 10.5956 0.833329 10 0.833313ZM11.42 2.84731C11.3186 2.55131 11.1272 2.29442 10.8726 2.1126C10.618 1.93077 10.3129 1.83312 10 1.83331H7.33333C6.062 1.83331 5.15933 1.83465 4.47333 1.92665C3.80333 2.01665 3.41667 2.18598 3.13467 2.46798C2.85267 2.74998 2.68333 3.13665 2.59333 3.80731C2.50133 4.49265 2.5 5.39531 2.5 6.66665V10.6666C2.49981 10.9795 2.59746 11.2846 2.77928 11.5393C2.96111 11.7939 3.218 11.9853 3.514 12.0866C3.5 11.68 3.5 11.22 3.5 10.7033V7.29665C3.5 6.38531 3.5 5.64998 3.578 5.07198C3.658 4.47198 3.83133 3.96665 4.232 3.56531C4.63333 3.16398 5.13867 2.99198 5.73867 2.91131C6.31667 2.83331 7.052 2.83331 7.96333 2.83331H10.0367C10.5533 2.83331 11.0133 2.83331 11.42 2.84731ZM4.93867 4.27331C5.12333 4.08865 5.382 3.96865 5.872 3.90265C6.37467 3.83531 7.04267 3.83398 7.99933 3.83398H9.99933C10.956 3.83398 11.6233 3.83531 12.1273 3.90265C12.6167 3.96865 12.8753 4.08931 13.06 4.27331C13.2447 4.45798 13.3647 4.71665 13.4307 5.20665C13.498 5.70931 13.4993 6.37731 13.4993 7.33398V10.6673C13.4993 11.624 13.498 12.2913 13.4307 12.7953C13.3647 13.2846 13.244 13.5433 13.06 13.728C12.8753 13.9126 12.6167 14.0326 12.1267 14.0986C11.6233 14.166 10.956 14.1673 9.99933 14.1673H7.99933C7.04267 14.1673 6.37467 14.166 5.87133 14.0986C5.382 14.0326 5.12333 13.912 4.93867 13.728C4.754 13.5433 4.634 13.2846 4.568 12.7946C4.50067 12.2913 4.49933 11.624 4.49933 10.6673V7.33398C4.49933 6.37731 4.50067 5.70931 4.568 5.20598C4.634 4.71665 4.75467 4.45798 4.93867 4.27331Z" fill="#6139E7" />
                            </svg>

                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Button
                        className="w-full bg-[#6139E7] hover:bg-[#6139E7] text-white h-12"
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
            <div className="flex items-center gap-2 p-4 text-sm text-gray-600 ">
              <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.83333 13.0909L2.5 9.81818L3.675 8.66455L5.83333 10.7755L11.325 5.38364L12.5 6.54545M7.5 0L0 3.27273V8.18182C0 12.7227 3.2 16.9691 7.5 18C11.8 16.9691 15 12.7227 15 8.18182V3.27273L7.5 0Z" fill="#6139E7" />
              </svg>

              We safeguard your funds.
            </div>
          </div>

          
         </div>
      </div>
    </div>
  );
}
