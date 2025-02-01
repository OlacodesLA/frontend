import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type {
  Account,
  PaymentDetails as PaymentDetailsType,
} from "@/interfaces/in-app";

interface PaymentDetailsProps {
  recipient: Account;
  onNext: (details: PaymentDetailsType) => void;
}

export function PaymentDetails({ recipient, onNext }: PaymentDetailsProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      amount: 200,
      fromCurrency: "GBP",
      toCurrency: "NGN",
      conversionRate: 1553,
      sendRate: 0,
    });
  };

  return (
    <div className="px-4 pb-4 pt-2">
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
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">You send</label>
            <div className="flex gap-2">
              <Input type="number" placeholder="0.00" className="flex-1" />
              <Select defaultValue="GBP">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="GBP" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GBP">GBP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Receiver gets</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="0.00"
                className="flex-1"
                disabled
              />
              <Select defaultValue="NGN">
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="NGN" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NGN">NGN</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>Conversion rate: 1 GBP = 1553.00 NGN</p>
          <p>Send rate: ~0.00 GBP</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-900">
            The funds will be deposited into your UZEL bank account within 5 to
            15 minutes following a successful transaction.
          </p>
        </div>
        <Button
          type="submit"
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]"
        >
          Continue
        </Button>
      </form>
    </div>
  );
}
