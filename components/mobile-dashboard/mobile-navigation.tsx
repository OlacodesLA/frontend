import { Home, CreditCard, PlusCircle, BarChart2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function MobileNavigation() {
  const navItems = [
    { icon: Home, label: "Home", href: "/app" },
    { icon: CreditCard, label: "Payments", href: "/app/payments" },
    { icon: PlusCircle, label: "Cards", href: "/app" },
    { icon: BarChart2, label: "History", href: "/app" },
    { icon: Menu, label: "More", href: "/app" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="flex justify-between items-center p-3 pt-4">
        {navItems.map((item, index) => (
          <Link href={item?.href}>
            <Button
              key={index}
              variant="ghost"
              className="flex flex-col items-center hover:bg-none"
            >
              <item.icon className="h-7 w-7" />
              <span className="text-xs mt-1">{item.label}</span>
            </Button>
          </Link>
        ))}
      </div>
    </nav>
  );
}
