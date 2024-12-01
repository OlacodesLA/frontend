"use client";

import * as React from "react";
import { AccountBalances } from "@/components/dashboard/account-balance";
import { TransactionsTable } from "@/components/dashboard/transaction-table";
import { AccountVerification } from "@/components/dashboard/account-verification";
import { MobileDashboard } from "@/components/mobile-dashboard";
import { WelcomeModal } from "@/components/modal/welcomemodal";
import { Button } from "@/components/ui/button";
import { ChevronDown, Moon, RefreshCw } from "lucide-react";
import { useAuthStore } from "@/store/use-auth-store";
import { UserDropdown } from "@/components/dropdowns/user-dropdown";
import { Card, CardContent } from "@/components/ui/card";
import { MobileQuickActions } from "@/components/mobile-dashboard/mobile-quick-actions";
import { MobileQuickAccess } from "@/components/mobile-dashboard/mobile-quick-access";
import { MobileTransactions } from "@/components/mobile-dashboard/mobile-transactions";
import { MobileNavigation } from "@/components/mobile-dashboard/mobile-navigation";

export default function Dashboard() {
  // const { setTheme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);
  const { first_name } = useAuthStore((state) => state.user);
  const [selectedAccount] = React.useState("Nigerian account (NGN)");

  return (
    <main className="flex-1 w-full overflow-y-auto md:pr-4">
      {/* Desktop Dashboard */}
      <div className="md:flex hidden flex-col">
        <AccountBalances />
        <AccountVerification />
        <TransactionsTable />
        <WelcomeModal />
      </div>

      {/* Mobile Dashboard */}
      <div className="md:hidden flex flex-col px-4 pb-10">
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
      </div>
    </main>
  );
}
