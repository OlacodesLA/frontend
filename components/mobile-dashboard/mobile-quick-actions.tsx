import { User, PlusCircle, ArrowRightLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileQuickActions() {
  const actions = [
    { icon: User, label: "Account" },
    { icon: PlusCircle, label: "Add Money" },
    { icon: ArrowRightLeft, label: "Transfer" },
    { icon: RefreshCcw, label: "Convert" },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      {actions.map((action, index) => (
        <Button
          key={index}
          variant="outline"
          className="flex flex-col items-center p-2 h-auto"
        >
          <action.icon className="h-6 w-6 mb-1" />
          <span className="text-xs">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
