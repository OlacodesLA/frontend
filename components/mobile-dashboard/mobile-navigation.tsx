import { Home, CreditCard, PlusCircle, BarChart2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MobileNavigation() {
  const navItems = [
    { icon: Home, label: "Home" },
    { icon: CreditCard, label: "Payments" },
    { icon: PlusCircle, label: "Cards" },
    { icon: BarChart2, label: "History" },
    { icon: Menu, label: "More" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="flex justify-between items-center p-2">
        {navItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className="flex flex-col items-center"
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Button>
        ))}
      </div>
    </nav>
  );
}
