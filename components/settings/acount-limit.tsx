"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "../ui/separator";

export default function AccountLimitPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="border-b-2 border-primary-light">
          <CardTitle>For Deposit</CardTitle>
          <CardDescription>
            The limit for making payments to all your UZEL account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 border-2 border-primary-light max-w-lg shadow-primary-light shadow p-2.5 rounded-sm">
            <div className="flex justify-between">
              <span className="font-medium">Monthly Transaction Limit:</span>
              <span className="text-primary100">$40,000.00</span>
            </div>
            <Separator className="h-[3px] bg-gray-100" />
            <div className="flex italic justify-between text-sm text-muted-foreground">
              <span>Renews every 30 days.</span>
              <span>$10,000.00 left</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>For Withdrawal</CardTitle>
          <CardDescription>
            The limit for transferring funds from all your UZEL accounts to any
            recipient.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex md:flex-row flex-col gap-6 items-center w-full">
          <div className="space-y-3 border-2 border-primary-light max-w-lg w-full shadow-primary-light  shadow p-2.5 rounded-sm">
            <div className="flex justify-between">
              <span className="font-medium">Daily Transaction Limit:</span>
              <span className="text-primary100">$10,000.00</span>
            </div>
            <Separator className="h-[3px] bg-gray-100" />
            <div className="flex italic justify-between text-sm text-muted-foreground">
              <span className="">Renews every 24 hours.</span>
              <span>$5,000.00 left</span>
            </div>
          </div>
          <div className="space-y-3 border-2 border-primary-light max-w-lg w-full shadow-primary-light shadow p-2.5 rounded-sm">
            <div className="flex justify-between">
              <span className="font-medium">Monthly Transaction Limit:</span>
              <span className="text-primary100">$40,000.00</span>
            </div>
            <Separator className="h-[3px] bg-gray-100" />
            <div className="flex italic justify-between text-sm text-muted-foreground">
              <span className="italic">Renews every 24 hours.</span>
              <span>$10,000.00 left</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>You want to increase your limit?</CardTitle>
          <CardDescription>
            To increase the amount of money you are able to withdraw or deposit,
            please contact our customer care service through our mail
            @uzelcustomer.com
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button className="w-full sm:w-auto">Contact Us</Button>
        </CardContent>
      </Card>
    </div>
  );
}
