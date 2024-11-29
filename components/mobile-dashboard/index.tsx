import { useState } from "react";
import { ChevronDown, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MobileQuickActions } from "./mobile-quick-actions";
import { MobileQuickAccess } from "./mobile-quick-access";
import { MobileTransactions } from "./mobile-transactions";
import { MobileNavigation } from "./mobile-navigation";

export function MobileDashboard() {
  const [selectedAccount] = useState("Nigerian account (NGN)");

  return (
    <div className="flex flex-col min-h-screen w-full bg-background p-4">
      <header className="flex justify-between w-full items-center mb-4">
        <div>
          <h1 className="text-xl font-bold">Welcome Dawn Amori</h1>
          <p className="text-sm text-muted-foreground">
            Send and receive funds with ease
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <span className="sr-only">Toggle theme</span>
            {/* Add theme toggle icon here */}
          </Button>
          <Button variant="ghost" size="sm">
            AA
          </Button>
        </div>
      </header>

      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="mr-2">🇳🇬</span>
              <span className="font-medium">{selectedAccount}</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </div>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="mb-2">
            <div className="text-sm text-muted-foreground">
              Available Balance
            </div>
            <div className="text-2xl font-bold">₦0.00</div>
          </div>
          <div className="text-xs text-muted-foreground">
            Last updated 5 mins ago
          </div>
        </CardContent>
      </Card>

      <MobileQuickActions />
      <MobileQuickAccess />
      <MobileTransactions />
      <MobileNavigation />
    </div>
  );
}
