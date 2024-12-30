"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlusCircle } from "lucide-react";

interface Account {
  currency: string;
  code: string;
  flag: string;
}

interface AccountSelectModalProps {
  // isOpen: boolean;
  // onClose: () => void;
  onSelect: (account: Account) => void;
}

const accounts: Account[] = [
  { currency: "NGN account", code: "NGN", flag: "🇳🇬" },
  { currency: "CAD account", code: "CAD", flag: "🇨🇦" },
  { currency: "GBP account", code: "GBP", flag: "🇬🇧" },
  { currency: "USD account", code: "USD", flag: "🇺🇸" },
];

export function AccountSelectModal({ onSelect }: AccountSelectModalProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-primary100 hover:bg-primary100/90 text-white flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Fund account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>
          Kindly Select the account you want to fund
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {accounts.map((account) => (
          <DropdownMenuItem
            key={account.code}
            onClick={() => onSelect(account)}
          >
            <span>{account.currency}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
