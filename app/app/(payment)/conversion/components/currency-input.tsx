import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import type { Currency } from "@/interfaces/currency";
import SelectCountries from "@/helpers/select-countries";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface CurrencyInputProps {
  label: string;
  amount: string;
  currency: Currency;
  onAmountChange: (value: string) => void;
  onCurrencyChange: (currency: Currency) => void;
  disabled?: boolean;
  currencies: Currency[];
}

export function CurrencyInput({
  label,
  amount,
  currency,
  onAmountChange,
  onCurrencyChange,
  disabled = false,
  currencies,
}: CurrencyInputProps) {
  const accounts = [
    { currency: "NGN account", code: "NGN", flag: "ng", icon: "₦" },
    { currency: "CAD account", code: "CAD", flag: "ca", icon: "$" },
    { currency: "GBP account", code: "GBP", flag: "gb", icon: "£" },
    { currency: "USD account", code: "USD", flag: "us", icon: "$" },
  ];

  console.log("Currency", currency);

  return (
    <Card className="border-[#6139E74D]">
      <CardContent className="md:p-6 p-3 border-[#6139E74D]">
        <div className="flex items-center justify-between w-full">
          <div>
            <Label>{label}</Label>
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
                  // type="number"
                  value={amount}
                  onChange={(e) => onAmountChange(e.target.value)}
                  placeholder="0.00"
                  disabled={disabled}
                  className="flex-1 border-none w-full md:text-lg md:placeholder:text-lg focus:border-none focus:ring-0 focus-within:border-none"
                />
              </div>
            </div>
          </div>
          <Select
            value={currency}
            onValueChange={(value) => onCurrencyChange(value as Currency)}
          >
            <SelectTrigger className="w-32">
              <SelectValue className="flex" />
            </SelectTrigger>
            <SelectContent>
              <SelectCountries defaultValue={currency} />
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
