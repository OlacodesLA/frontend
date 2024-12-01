"use client";
import { Sidebar } from "@/components/dashboard/sidebar";
import { UserDropdown } from "@/components/dropdowns/user-dropdown";
import { MobileNavigation } from "@/components/mobile-dashboard/mobile-navigation";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthStore } from "@/store/use-auth-store";
import { Moon } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { first_name, last_name } = useAuthStore((state) => state.user);
  return (
    <SidebarProvider className="md:w-full">
      <div className="flex w-full md:flex-row h-full pb-10 flex-col min-h-screen bg-background">
        <div className="lg:flex hidden">
          <Sidebar />
          <SidebarTrigger />
        </div>
        <div className="flex flex-col h-full w-full">
          <div className="flex justify-between w-full items-center mb-6 p-4 border-b">
            <div>
              <h1 className="md:text-2xl text-xl font-bold">
                Welcome, {first_name}
              </h1>
              <p className="text-sm text-muted-foreground md:mb-3">
                Send, keep, and receive funds in different currencies.
              </p>
            </div>
            <div className="flex items-center gap-x-2">
              <Button
                variant="outline"
                className="bg-white shadow-sm md:flex hidden hover:bg-white text-[#6139E7]"
              >
                Manage Accounts
              </Button>

              <Button variant="outline" className="rounded-full w-9 h-9">
                <Moon size={21} />
              </Button>
              <UserDropdown />
            </div>
          </div>
          {children}

          <div className="md:hidden flex">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
