"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface FundAccountButtonProps {
  onClick: () => void;
}

export function FundAccountButton({ onClick }: FundAccountButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
    >
      <PlusCircle className="h-4 w-4" />
      Fund account
    </Button>
  );
}
