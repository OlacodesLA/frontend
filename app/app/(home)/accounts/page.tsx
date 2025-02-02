"use client";
import { SendMoney } from "@/components/modal/send-money";
import FundAccount from "@/components/payment";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Info } from "lucide-react";
import { useState } from "react";
import { CircleFlag } from "react-circle-flags";

export default function FinancialDashboard() {
  const [open, setOpen] = useState(false);
  const accounts = [
    { currency: "NGN account", code: "NGN", flag: "ng", icon: "₦" },
    { currency: "CAD account", code: "CAD", flag: "ca", icon: "$" },
    { currency: "GBP account", code: "GBP", flag: "gb", icon: "£" },
    { currency: "USD account", code: "USD", flag: "us", icon: "$" },
  ];

  return (
    <div className="p-6 w-full  space-y-6">
      <SendMoney isOpen={open} onClose={() => setOpen(false)} />
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-sm text-muted-foreground">My account</h2>
          <p className="font-medium">United States Account (USD)</p>
        </div>
        {/* <Button className="bg-[#7F56D9] hover:bg-[#7F56D9]/90 text-white">
          <span className="mr-2">+</span> Fund account
        </Button> */}

        <FundAccount />
      </div>

      {/* Main Card */}
      <div className="border flex flex-col w-full pb-5 border-[#6139E74D] rounded-[8px]">
        {/* Currency Selector */}
        <div className="flex gap-2 justify-center items-center border-b border-dashed border-[#6139E74D] pb-2 pt-3">
          {accounts?.map((acc) => {
            return (
              <Button
                variant="outline"
                size="sm"
                className="text-muted-foreground rounded"
              >
                <span className="mr-2">
                  <CircleFlag
                    countryCode={acc?.flag}
                    height="4"
                    width="4"
                    className="w-4 h-4"
                  />
                </span>
                <span className="font-medium">{acc?.code}</span>
              </Button>
            );
          })}
        </div>

        {/* Balance Section */}
        <div className="py-6 space-y-4 max-w-sm mx-auto">
          <div className="flex justify-between space-x-4 items-start ">
            <div className="space-y-1 flex flex-col items-center">
              <div className="flex justify-center items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Available USD balance
                </span>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-semibold">$0.00</p>
            </div>
            <div className="border-dashed border-r h-16 border-[#6139E74D]"></div>
            <div className="space-y-1 flex flex-col items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  Pending USD balance
                </span>
                <Info className="w-4 h-4 text-muted-foreground" />
              </div>
              <p className="text-2xl font-semibold">$0.00</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            Last updated 3 mins ago
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 max-w-xs mx-auto">
          <Button
            onClick={() => setOpen(true)}
            variant="outline"
            className="flex-1 h-9 text-[#7F56D9]"
          >
            Send money
          </Button>
          <Button className="flex-1 h-9 bg-[#7F56D9] hover:bg-[#7F56D9]/90 text-white">
            Convert money
          </Button>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Recent transactions</h3>
          <Button variant="link" className="text-[#7F56D9]">
            See all
          </Button>
        </div>
        <Card className="p-12 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Info className="w-6 h-6 text-gray-500" />
          </div>
          <p className="text-muted-foreground">
            Oops you do not have a recent transaction yet
          </p>
        </Card>
      </div>
    </div>
  );
}
