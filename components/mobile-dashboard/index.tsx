import { useState } from "react";
import { ChevronDown, Moon, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MobileQuickActions } from "./mobile-quick-actions";
import { MobileQuickAccess } from "./mobile-quick-access";
import { MobileTransactions } from "./mobile-transactions";
import { MobileNavigation } from "./mobile-navigation";
import { UserDropdown } from "../dropdowns/user-dropdown";
import { useAuthStore } from "@/store/use-auth-store";

export function MobileDashboard() {
  const [selectedAccount] = useState("Nigerian account (NGN)");

  return (
    <>
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
    </>
  );
}
