"use client";

import * as React from "react";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AccountBalances } from "@/components/dashboard/account-balance";
import { TransactionsTable } from "@/components/dashboard/transaction-table";
import { AccountVerification } from "@/components/dashboard/account-verification";
import { MobileDashboard } from "@/components/mobile-dashboard";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { WelcomeModal } from "@/components/modal/welcomemodal";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
  // const { setTheme } = useTheme();
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return <MobileDashboard />;
  }

  return (
    <div className="flex w-full h-screen bg-background">
      <Sidebar />
      <SidebarTrigger />
      <main className="flex-1 w-full overflow-y-auto py-8 pr-8">
        <div className="flex justify-between items-center mb-6 border-b">
          <div>
            <h1 className="text-2xl font-bold">Welcome, Ademakinwa</h1>
            <p className="text-sm text-muted-foreground mb-3">
              Send, keep, and receive funds in different currencies.
            </p>
          </div>
          <div>
            <Button className="bg-white shadow-sm border hover:bg-white text-[#6139E7]">Manage Accounts</Button>

          </div>
        </div>
        <AccountBalances />
        <AccountVerification />
        <TransactionsTable />
        <WelcomeModal />
      </main>
    </div>
  );
}
