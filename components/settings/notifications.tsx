"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function NotificationsPage() {
  return (
    <Card>
      <CardHeader className="border-b-2 border-primary-light">
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Choose what we get in touch about</CardDescription>
      </CardHeader>
      <CardContent className="space-y-8 md:p-0 p-0">
        <div className="space-y-4 px-4 md:px-6 pt-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="font-medium">Allow Notifications</div>
              <div className="text-sm text-muted-foreground">
                Get updated about new features on UZEL when you earn interest,
                and perform other transactions.
              </div>
            </div>
            <Switch />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-primary-light px-4 md:px-6 py-3 mb-2 ">
            <h3 className="text-base font-medium">
              Your Transfers and Balances
            </h3>
            <div className="text-sm text-muted-foreground">
              Notifications about your transactions.
            </div>
          </div>
          <div className="grid gap-4 px-4 md:px-6">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Mobile Push Notifications</Label>
              <Switch />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-primary-light px-4 md:px-6 py-3 mb-2 ">
            <h3 className="text-base font-medium">Your Virtual Debit Card</h3>
            <div className="text-sm text-muted-foreground">
              Notifications about your card transactions.
            </div>
          </div>
          <div className="grid gap-4 px-4 md:px-6">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Mobile Push Notifications</Label>
              <Switch />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-primary-light px-4 md:px-6 py-3 mb-2 ">
            <h3 className="text-base font-medium">Currencies and features</h3>
            <div className="text-sm text-muted-foreground">
              News about our latest and greatest work. Plus tips on using UZEL.
            </div>
          </div>
          <div className="grid gap-4 px-4 md:px-6">
            <div className="flex items-center justify-between">
              <Label>Email Notifications</Label>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <Label>Mobile Push Notifications</Label>
              <Switch />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-0.5">
      <div className="font-medium">{children}</div>
      <div className="text-sm text-muted-foreground">
        {children.toString().toLowerCase().includes("email")
          ? "Send me a mail as regarding my transactions and balances."
          : "Receive push notification on your mobile device when ever any transaction is made."}
      </div>
    </div>
  );
}
