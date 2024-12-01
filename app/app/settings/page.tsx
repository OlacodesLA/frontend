"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AccountLimitPage from "@/components/settings/acount-limit";
import NotificationsPage from "@/components/settings/notifications";
import OtherSettingsPage from "@/components/settings/other-settings";
import SupportPage from "@/components/settings/support";
import SecurityPage from "@/components/settings/security";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useQueryState } from "nuqs";

export default function SettingsPage() {
  // Use URL query to manage tab state
  const [tab, setTab] = useQueryState("tab", {
    defaultValue: "security",
  });

  // Handle tab change by updating query state
  const handleTabChange = (value: string) => {
    setTab(value);
  };
  return (
    <div className="mx-auto p-4 w-full">
      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <ScrollArea>
          <TabsList className=" rounded-none w-full justify-start h-auto p-0 bg-transparent">
            <TabsTrigger
              value="security"
              className="rounded-none border-b-2 md:text-base text-sm border-transparent data-[state=active]:border-b-primary100 data-[state=active]:text-primary100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Security
            </TabsTrigger>
            <TabsTrigger
              value="account_limit"
              className="rounded-none border-b-2 md:text-base text-sm  border-transparent data-[state=active]:border-b-primary100 data-[state=active]:text-primary100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Account Limit
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="rounded-none border-b-2 md:text-base text-sm  border-transparent data-[state=active]:border-b-primary100 data-[state=active]:text-primary100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="other_settings"
              className="rounded-none border-b-2 md:text-base text-sm  border-transparent data-[state=active]:border-b-primary100 data-[state=active]:text-primary100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Other Settings
            </TabsTrigger>
            <TabsTrigger
              value="help"
              className="rounded-none border-b-2 md:text-base text-sm  border-transparent data-[state=active]:border-b-primary100 data-[state=active]:text-primary100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
            >
              Help & Support
            </TabsTrigger>
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="security">
          <SecurityPage />
        </TabsContent>
        <TabsContent value="account_limit">
          <AccountLimitPage />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationsPage />
        </TabsContent>
        <TabsContent value="other_settings">
          <OtherSettingsPage />
        </TabsContent>
        <TabsContent value="help">
          <SupportPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
