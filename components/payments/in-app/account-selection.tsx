import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface AccountSelectionProps {
  onNext: () => void;
}

export function AccountSelection({ onNext }: AccountSelectionProps) {
  return (
    <div className="px-4 pb-4 pt-2">
      <p className="text-center text-sm text-muted-foreground pb-6">
        Choose the account you would like to use for the money transfer.
      </p>
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Select the account you want to send from
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nigerian account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nigerian">Nigerian account</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Select the recipient account where you want to transfer the money
          </label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Nigerian account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nigerian">Nigerian account</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={onNext}
          className="w-full bg-[#7C3AED] hover:bg-[#6D28D9]"
        >
          Select accounts
        </Button>
      </div>
    </div>
  );
}
