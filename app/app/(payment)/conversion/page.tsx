"use client";

import { useState } from "react";
import { ArrowLeft, ArrowUpDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CurrencyInput } from "./components/currency-input";
import { NoticeModal } from "./components/notice-modal";
import { SuccessModal } from "./components/success-modal";
import type { Currency } from "@/interfaces/currency";
import { useRouter } from "next/navigation";

export default function CurrencyConverter() {
  const router = useRouter();
  const [fromAmount, setFromAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState<Currency>("CAD");
  const [toCurrency, setToCurrency] = useState<Currency>("NGN");
  const [showNotice, setShowNotice] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);

  const conversionRate = 1.7;
  const fee = 2.0;

  const handleContinue = () => {
    setShowNotice(true);
  };

  const handleProceed = () => {
    setShowNotice(false);
    setIsConfirming(true);
  };

  const handleSwap = () => {
    setShowSuccess(true);
  };

  const calculateReceiveAmount = (amount: string) => {
    const numAmount = Number.parseFloat(amount) || 0;
    return (numAmount * conversionRate).toFixed(2);
  };

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
          <h1 className="text-xl font-semibold text-center">
            Convert Currency
          </h1>
          <p className="text-xs text-center text-muted-foreground">
            Kindly enter the amount and currency you want to convert to
          </p>
        </div>

        <div className="space-y-6">
          <CurrencyInput
            label="Amount to convert"
            amount={fromAmount}
            currency={fromCurrency}
            onAmountChange={setFromAmount}
            onCurrencyChange={setFromCurrency}
            currencies={["CAD", "USD", "GBP"]}
          />

          <div className="flex justify-center">
            <ArrowUpDown className="text-muted-foreground" />
          </div>

          <CurrencyInput
            label="Amount you will receive"
            amount={calculateReceiveAmount(fromAmount)}
            currency={toCurrency}
            onAmountChange={() => {}}
            onCurrencyChange={setToCurrency}
            disabled
            currencies={["NGN"]}
          />

          <div className="bg-[#F6F3FE] p-4 rounded-lg space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Conversion fee:</span>
              <span>
                -{fee.toFixed(2)} {fromCurrency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">
                Amount to be converted:
              </span>
              <span>
                {fromAmount || "0.00"} {fromCurrency}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Today's rate:</span>
              <span>
                1 {fromCurrency} = {conversionRate} {toCurrency}
              </span>
            </div>
          </div>

          {isConfirming ? (
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-2 text-sm text-[#7F56D9]">
                <RefreshCw className="w-4 h-4 animate-spin" />
                Re-conversion in {timeLeft}s
              </div>
              <Button
                className="w-full bg-[#7F56D9] hover:bg-[#7F56D9]/90"
                onClick={handleSwap}
              >
                Swap {fromCurrency} for {toCurrency}
              </Button>
              <Button
                variant="link"
                className="w-full text-red-500"
                onClick={() => setIsConfirming(false)}
              >
                Cancel transaction
              </Button>
            </div>
          ) : (
            <Button
              className="w-full bg-[#7F56D9] hover:bg-[#7F56D9]/90"
              onClick={handleContinue}
            >
              Continue
            </Button>
          )}
        </div>

        <NoticeModal
          isOpen={showNotice}
          onClose={() => setShowNotice(false)}
          onProceed={handleProceed}
        />

        <SuccessModal
          isOpen={showSuccess}
          onClose={() => {
            router.push("/app/accounts");
            setShowSuccess(false);
          }}
          onView={() => router.push("/app/accounts")}
          details={`You have successfully converted ${fromCurrency} ${fromAmount} to ${toCurrency}. Check your transactions or your ${toCurrency} account for more details.`}
        />
      </div>
    </div>
  );
}
