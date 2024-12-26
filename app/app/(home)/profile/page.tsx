"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileDetails } from "@/components/profile/profile-details";
import { AccountVerification } from "@/components/profile/account-verification";
import { parseAsInteger, useQueryState } from "nuqs";
import { VerificationFlow } from "@/components/profile/account-verification/verification-flow";

export default function ProfilePage() {
  return (
    <div className="mx-auto p-4 w-full">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className=" rounded-none w-full justify-start h-auto p-0 bg-transparent">
          <TabsTrigger
            value="details"
            className="rounded-none border-b-2 md:text-base text-sm border-transparent data-[state=active]:border-b-primary100 data-[state=active]:text-primary100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Your Details
          </TabsTrigger>
          <TabsTrigger
            value="verification"
            className="rounded-none border-b-2 md:text-base text-sm  border-transparent data-[state=active]:border-b-primary100 data-[state=active]:text-primary100 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
          >
            Account Verification
          </TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <ProfileDetails />
        </TabsContent>
        <TabsContent value="verification">
          <AccountVerification />
        </TabsContent>
      </Tabs>
    </div>
  );
}
