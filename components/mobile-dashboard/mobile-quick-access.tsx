import { FileText, CreditCard, PiggyBank, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileQuickAccess() {
  const quickAccess = [
    { icon: FileText, label: "Invoicing" },
    { icon: CreditCard, label: "Travel Card" },
    { icon: PiggyBank, label: "Save Funds" },
    { icon: ArrowLeftRight, label: "P2P Trade" },
  ];

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2">Quick Access</h2>
      <div className="grid grid-cols-4 gap-4">
        {quickAccess.map((item, index) => (
          <Button
            key={index}
            variant="outline"
            className="flex flex-col items-center p-2 h-auto"
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span className="text-xs text-center">{item.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
